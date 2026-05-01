import { API_CONFIG } from "@/config/api";

const CACHE_TTL = 5 * 60 * 1000;
let _allCache: { data: Project[]; at: number } | null = null;
let _featuredCache: { data: Project[]; at: number } | null = null;

export interface Project {
  id: number;
  title?: string;
  name?: string;
  description: string;
  content: string | null;
  slug: string;
  thumb_image: string | null;
  images: string[] | string | null;
  link: string | null;
  project_url: string | null;
  github_url: string | null;
  tags: string | null;
  category: string | null;
  technology: string | null;
  status: string;
  is_featured: number;
  is_published: number;
  start_date: string | null;
  end_date: string | null;
  total_likes?: number;
  total_views?: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface PaginatedProjects {
  data: Project[];
  currentPage: number;
  lastPage: number;
  total: number;
  perPage: number;
  from: number;
  to: number;
}

interface RawPaginated {
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
  from: number;
  to: number;
  data: Project[];
}

interface ProjectListApiResponse {
  data: RawPaginated;
  status?: string;
  statusCode?: number;
}

interface ProjectDetailApiResponse {
  data: Project;
}

export async function getPagedProjects(
  page: number,
  extraParams: Record<string, string> = {}
): Promise<PaginatedProjects> {
  const qs = new URLSearchParams({ status: "active", ...extraParams, page: String(page) });
  const res = await fetch(
    `${API_CONFIG.endpoints.projects.getAll}?${qs}`,
    { ...API_CONFIG.defaultOptions }
  );
  if (!res.ok) throw new Error(`Failed to fetch projects — HTTP ${res.status}`);

  const json: ProjectListApiResponse = await res.json();
  const d = json.data;
  return {
    data:        d.data         ?? [],
    currentPage: d.current_page ?? page,
    lastPage:    d.last_page    ?? 1,
    total:       d.total        ?? 0,
    perPage:     d.per_page     ?? 10,
    from:        d.from         ?? 0,
    to:          d.to           ?? 0,
  };
}

async function fetchAllPages(extraParams: Record<string, string> = {}): Promise<Project[]> {
  const first = await getPagedProjects(1, extraParams);
  if (first.lastPage <= 1) return first.data;
  const rest = await Promise.all(
    Array.from({ length: first.lastPage - 1 }, (_, i) =>
      getPagedProjects(i + 2, extraParams)
    )
  );
  return [first.data, ...rest.map((r) => r.data)].flat();
}

/** All active projects — used on /projects page and slug lookups. */
export async function getAllProjects(): Promise<Project[]> {
  if (_allCache && Date.now() - _allCache.at < CACHE_TTL) return _allCache.data;
  const result = await fetchAllPages();
  _allCache = { data: result, at: Date.now() };
  return result;
}

/** Featured active projects — used on the home page. */
export async function getFeaturedProjects(): Promise<Project[]> {
  if (_featuredCache && Date.now() - _featuredCache.at < CACHE_TTL) return _featuredCache.data;
  const result = await fetchAllPages({ is_featured: "1" });
  _featuredCache = { data: result, at: Date.now() };
  return result;
}

export async function getProjectBySlug(slug: string): Promise<Project> {
  try {
    const res = await fetch(`${API_CONFIG.endpoints.projects.getOne}/${slug}`, {
      ...API_CONFIG.defaultOptions,
    });
    if (res.ok) {
      const json: ProjectDetailApiResponse = await res.json();
      if (json?.data) return json.data;
    }
  } catch { /* fall through */ }

  const projects = await getAllProjects();
  const found = projects.find((p) => p.slug === slug);
  if (!found) throw new Error(`Project "${slug}" not found`);
  return found;
}

export function extractProjectCategories(
  projects: Project[]
): { type: string; count: number }[] {
  const map = new Map<string, number>();
  for (const p of projects) {
    if (p.category) map.set(p.category, (map.get(p.category) ?? 0) + 1);
  }
  return Array.from(map.entries())
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count);
}

export function getPopularProjects(projects: Project[], limit = 5): Project[] {
  const featured = projects.filter((p) => p.is_featured === 1);
  const pool = featured.length > 0 ? featured : projects;
  return pool.slice(0, limit);
}

export function parseTags(raw: string | null): string[] {
  if (!raw) return [];
  try { return JSON.parse(raw) as string[]; } catch { /**/ }
  return raw.split(",").map((t) => t.trim()).filter(Boolean);
}
