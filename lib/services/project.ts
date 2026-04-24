import { API_CONFIG } from "@/config/api";

export interface Project {
  id: number;
  title: string;
  description: string;
  content: string | null;
  slug: string;
  thumbnail_image: string | null;
  images: string | null;
  project_url: string | null;
  github_url: string | null;
  tags: string | null;           // JSON string or comma-separated
  category: string | null;
  technology: string | null;     // tech stack info
  status: string;
  is_featured: number;
  is_published: number;
  start_date: string | null;
  end_date: string | null;
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

export async function getPagedProjects(page: number): Promise<PaginatedProjects> {
  const res = await fetch(
    `${API_CONFIG.endpoints.projects.getAll}?page=${page}`,
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

export async function getAllProjects(): Promise<Project[]> {
  const first = await getPagedProjects(1);
  if (first.lastPage <= 1) return first.data;

  const rest = await Promise.all(
    Array.from({ length: first.lastPage - 1 }, (_, i) =>
      getPagedProjects(i + 2)
    )
  );
  return [first.data, ...rest.map((r) => r.data)].flat();
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
