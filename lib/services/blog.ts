import { API_CONFIG } from "@/config/api";

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
}

/** Full pagination metadata returned by the Laravel API */
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
  per_page: number;
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

/** Fetch one page of blogs from the server (server-side pagination). */
export async function getPagedBlogs(page: number): Promise<PaginatedBlogs> {
  const res = await fetch(
    `${API_CONFIG.endpoints.blogs.getAll}?page=${page}`,
    { ...API_CONFIG.defaultOptions }
  );
  if (!res.ok) throw new Error(`Failed to fetch blogs — HTTP ${res.status}`);

  const json: BlogListApiResponse = await res.json();
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

/**
 * Fetch ALL blogs across every page in parallel.
 * Used by the blog-detail page and sidebar population.
 */
export async function getAllBlogs(): Promise<Blog[]> {
  const first = await getPagedBlogs(1);
  if (first.lastPage <= 1) return first.data;

  const rest = await Promise.all(
    Array.from({ length: first.lastPage - 1 }, (_, i) =>
      getPagedBlogs(i + 2)
    )
  );
  return [first.data, ...rest.map((r) => r.data)].flat();
}

/** Try the single-blog endpoint; fall back to getAllBlogs + slug filter. */
export async function getBlogBySlug(slug: string): Promise<Blog> {
  try {
    const res = await fetch(`${API_CONFIG.endpoints.blogs.getOne}/${slug}`, {
      ...API_CONFIG.defaultOptions,
    });
    if (res.ok) {
      const json: BlogDetailApiResponse = await res.json();
      if (json?.data) return json.data;
    }
  } catch { /* fall through */ }

  const blogs = await getAllBlogs();
  const found = blogs.find((b) => b.slug === slug);
  if (!found) throw new Error(`Blog "${slug}" not found`);
  return found;
}

export function extractCategories(
  blogs: Blog[]
): { type: string; count: number }[] {
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
