import { API_CONFIG } from "@/config/api";

const CACHE_TTL = 5 * 60 * 1000;
let _marketplacesCache: { data: Marketplace[]; at: number } | null = null;

export interface Marketplace {
  id: number;
  title?: string;
  name?: string;
  description: string;
  content: string | null;
  slug: string;
  thumbnail_image: string | null;
  images: string | null;
  marketplace_url: string | null;
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

export interface PaginatedMarketplaces {
  data: Marketplace[];
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
  data: Marketplace[];
}

interface MarketplaceListApiResponse {
  data: RawPaginated;
  status?: string;
  statusCode?: number;
}

interface MarketplaceDetailApiResponse {
  data: Marketplace;
}

export async function getPagedMarketplaces(page: number): Promise<PaginatedMarketplaces> {
  const res = await fetch(
    `${API_CONFIG.endpoints.marketplaces.getAll}?page=${page}`,
    { ...API_CONFIG.defaultOptions }
  );
  if (!res.ok) throw new Error(`Failed to fetch marketplaces — HTTP ${res.status}`);

  const json: MarketplaceListApiResponse = await res.json();
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

export async function getAllMarketplaces(): Promise<Marketplace[]> {
  if (_marketplacesCache && Date.now() - _marketplacesCache.at < CACHE_TTL) {
    return _marketplacesCache.data;
  }
  const first = await getPagedMarketplaces(1);
  let result: Marketplace[];
  if (first.lastPage <= 1) {
    result = first.data;
  } else {
    const rest = await Promise.all(
      Array.from({ length: first.lastPage - 1 }, (_, i) =>
        getPagedMarketplaces(i + 2)
      )
    );
    result = [first.data, ...rest.map((r) => r.data)].flat();
  }
  _marketplacesCache = { data: result, at: Date.now() };
  return result;
}

export async function getMarketplaceBySlug(slug: string): Promise<Marketplace> {
  try {
    const res = await fetch(`${API_CONFIG.endpoints.marketplaces.getOne}/${slug}`, {
      ...API_CONFIG.defaultOptions,
    });
    if (res.ok) {
      const json: MarketplaceDetailApiResponse = await res.json();
      if (json?.data) return json.data;
    }
  } catch { /* fall through */ }

  const marketplaces = await getAllMarketplaces();
  const found = marketplaces.find((p) => p.slug === slug);
  if (!found) throw new Error(`Marketplace "${slug}" not found`);
  return found;
}

export function extractMarketplaceCategories(
  marketplaces: Marketplace[]
): { type: string; count: number }[] {
  const map = new Map<string, number>();
  for (const p of marketplaces) {
    if (p.category) map.set(p.category, (map.get(p.category) ?? 0) + 1);
  }
  return Array.from(map.entries())
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count);
}

export function getPopularMarketplaces(marketplaces: Marketplace[], limit = 5): Marketplace[] {
  const featured = marketplaces.filter((p) => p.is_featured === 1);
  const pool = featured.length > 0 ? featured : marketplaces;
  return pool.slice(0, limit);
}

export function parseTags(raw: string | null): string[] {
  if (!raw) return [];
  try { return JSON.parse(raw) as string[]; } catch { /**/ }
  return raw.split(",").map((t) => t.trim()).filter(Boolean);
}
