/**
 * Central API configuration.
 *
 * To switch environments just change NEXT_PUBLIC_API_BASE_URL in .env.local
 * (local dev) or in your hosting provider's environment settings (production).
 *
 * Never hard-code the base URL anywhere else — always import from this file.
 */

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

export const API_CONFIG = {
  baseUrl: BASE_URL,

  endpoints: {
    blogs: {
      getAll: `${BASE_URL}/api/get-all-blogs`,
      getOne: `${BASE_URL}/api/get-blog`,
    },
    projects: {
      getAll: `${BASE_URL}/api/get-all-projects`,
      getOne: `${BASE_URL}/api/get-project`,         // GET /{slug} — update if route differs
    },
    marketplaces: {
      getAll: `${BASE_URL}/api/get-all-projects`, // Reusing projects endpt for now, or you can specify actual
      getOne: `${BASE_URL}/api/get-project`,         // GET /{slug}
    },
    comments: {
      getByBlog: `${BASE_URL}/api/get-blog-comments`,
      create: `${BASE_URL}/api/post-blog-comment`,
    },
  },

  /** Shared fetch defaults applied to every request */
  defaultOptions: {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    // Next.js 15 cache: 'no-store' → always fresh, 'force-cache' → static
    cache: "no-store" as RequestCache,
  },
} as const;
