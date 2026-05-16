import { API_CONFIG } from "@/config/api";
import type { Comment } from "./comment";

const CACHE_TTL = 5 * 60 * 1000;

let _allCache:      { data: Blog[]; at: number } | null = null;
let _featuredCache: { data: Blog[]; at: number } | null = null;

export interface Blog {
  id: number;
  blog_category_id: number;
  title: string;
  description: string;
  content: string;
  slug: string;
  url: string | null;
  thumbnail_image: string | null;
  images: string | null;
  reading_time: number | null;
  blog_type: string | null;
  tags: string | null;
  contributors: string | null;
  status: string;
  is_published: number;
  is_featured: number;
  publish_date: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  video_link: string | null;
  show_top: string | null;
  writer: number | null;
  creator: number | null;
  total_likes?: number;
  total_views?: number;
  comments?: Comment[];
}

export interface PaginatedBlogs {
  data: Blog[];
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
  limit: number;
  from: number;
  to: number;
  data: Blog[];
}

interface BlogListApiResponse {
  data: RawPaginated;
  status?: string;
  statusCode?: number;
}

interface BlogDetailApiResponse {
  data: Blog;
}

/** Parse the `images` JSON string field into a string array. */
export function parseImages(raw: string | null): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed as string[];
  } catch { /* fall through */ }
  return [];
}

/** Build the full public URL for a stored file path. */
export function resolveStorageUrl(path: string | null): string {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  // Paths like "uploads/..." live directly under public/, not under /storage/
  return `${API_CONFIG.baseUrl}/${path}`;
}

/** Fetch one page of active blogs (server-side pagination). */
export async function getPagedBlogs(page: number): Promise<PaginatedBlogs> {
  const url = new URL(API_CONFIG.endpoints.blogs.getAll);
  url.searchParams.set("status", "active");
  url.searchParams.set("limit", "12");
  url.searchParams.set("page", String(page));

  const res = await fetch(url.toString(), { ...API_CONFIG.defaultOptions });
  if (!res.ok) throw new Error(`Failed to fetch blogs — HTTP ${res.status}`);

  const json: BlogListApiResponse = await res.json();
  const d = json.data;
  return {
    data:        d.data         ?? [],
    currentPage: d.current_page ?? page,
    lastPage:    d.last_page    ?? 1,
    total:       d.total        ?? 0,
    perPage:     d.limit     ?? 12,
    from:        d.from         ?? 0,
    to:          d.to           ?? 0,
  };
}

/** Fetch ALL active blogs across every page (used by detail + sidebar). */
export async function getAllBlogs(): Promise<Blog[]> {
  if (_allCache && Date.now() - _allCache.at < CACHE_TTL) return _allCache.data;

  const first = await getPagedBlogs(1);
  let result: Blog[];
  if (first.lastPage <= 1) {
    result = first.data;
  } else {
    const rest = await Promise.all(
      Array.from({ length: first.lastPage - 1 }, (_, i) => getPagedBlogs(i + 2))
    );
    result = [first.data, ...rest.map((r) => r.data)].flat();
  }
  _allCache = { data: result, at: Date.now() };
  return result;
}

/** Fetch only featured active blogs — used on the home page. */
export async function getFeaturedBlogs(): Promise<Blog[]> {
  if (_featuredCache && Date.now() - _featuredCache.at < CACHE_TTL) return _featuredCache.data;

  const url = new URL(API_CONFIG.endpoints.blogs.getAll);
  url.searchParams.set("status", "active");
  url.searchParams.set("show_top", "yes");

  const res = await fetch(url.toString(), { ...API_CONFIG.defaultOptions });
  if (!res.ok) throw new Error(`Failed to fetch featured blogs — HTTP ${res.status}`);

  const json: BlogListApiResponse = await res.json();
  const result = json.data?.data ?? [];
  _featuredCache = { data: result, at: Date.now() };
  return result;
}

/** Fetch single blog by slug — returns total_likes and total_views from the API. */
export async function getBlogBySlug(slug: string): Promise<Blog> {
  const res = await fetch(`${API_CONFIG.endpoints.blogs.getOne}/${slug}`, {
    ...API_CONFIG.defaultOptions,
  });
  if (res.ok) {
    const json: BlogDetailApiResponse = await res.json();
    if (json?.data) return json.data;
  }
  // Fallback: find from all-blogs list (no total_likes/views in this path)
  const blogs = await getAllBlogs();
  const found = blogs.find((b) => b.slug === slug);
  if (!found) throw new Error(`Blog "${slug}" not found`);
  return found;
}

export interface BlogCategory {
  id: number;
  title: string;
  slug: string | null;
  icon: string | null;
  blog_count: number;
}

interface BlogCategoryApiResponse {
  data: BlogCategory[];
}

/** Fetch all active blog categories with their active blog count. */
export async function getBlogCategories(): Promise<BlogCategory[]> {
  try {
    const res = await fetch(API_CONFIG.endpoints.blogs.categories, {
      ...API_CONFIG.defaultOptions,
    });
    if (!res.ok) return [];
    const json: BlogCategoryApiResponse = await res.json();
    return Array.isArray(json.data) ? json.data : [];
  } catch {
    return [];
  }
}

export function extractCategories(blogs: Blog[]): { type: string; count: number }[] {
  const map = new Map<string, number>();
  for (const b of blogs) {
    if (b.blog_type) map.set(b.blog_type, (map.get(b.blog_type) ?? 0) + 1);
  }
  return Array.from(map.entries())
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count);
}

export function getMostPopular(blogs: Blog[], limit = 5): Blog[] {
  const featured = blogs.filter((b) => b.is_featured === 1);
  const pool = featured.length > 0 ? featured : blogs;
  return pool.slice(0, limit);
}
