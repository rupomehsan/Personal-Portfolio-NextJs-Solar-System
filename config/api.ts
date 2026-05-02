/**
 * Central API configuration.
 *
 * To switch environments just change NEXT_PUBLIC_API_BASE_URL in .env.local
 * (local dev) or in your hosting provider's environment settings (production).
 *
 * Never hard-code the base URL anywhere else — always import from this file.
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

export const API_CONFIG = {
  baseUrl: BASE_URL,

  endpoints: {
    projects: {
      getAll: `${BASE_URL}/api/get-all-projects`,
      getOne: `${BASE_URL}/api/get-single-projects`,
    },
    projectComments: {
      get: `${BASE_URL}/api/get-projects-comments`,
      submit: `${BASE_URL}/api/submit-project-comment`,
    },

    marketplaces: {
      getAll: `${BASE_URL}/api/get-all-digital-products`,
      getOne: `${BASE_URL}/api/get-single-digital-product`,
    },

    blogs: {
      getAll:      `${BASE_URL}/api/get-all-blogs`,
      getOne:      `${BASE_URL}/api/get-single-blog`,
      categories:  `${BASE_URL}/api/get-blog-categories`,
      like:        `${BASE_URL}/api/submit-blog-like`,
    },
    comments: {
      create:     `${BASE_URL}/api/post-blog-comment`,
      getByBlog:  `${BASE_URL}/api/get-all-comments-by-blog`,
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
