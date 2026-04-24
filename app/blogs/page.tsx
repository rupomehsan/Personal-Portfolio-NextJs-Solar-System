"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  getPagedBlogs,
  getAllBlogs,
  extractCategories,
  getMostPopular,
  type Blog,
  type PaginatedBlogs,
} from "@/lib/services/blog";
import { API_CONFIG } from "@/config/api";

/* ─── helpers ─────────────────────────────────────────────────────────────── */
const DUMMY_IMG =
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=70";

function fmtDate(s: string, short = false) {
  const d = new Date(s);
  if (isNaN(d.getTime())) return s;
  return short
    ? `${String(d.getDate()).padStart(2, "0")} ${d.toLocaleString("en-US", { month: "short" })}`
    : `${String(d.getDate()).padStart(2, "0")} ${d.toLocaleString("en-US", { month: "short" })} ${d.getFullYear()}`;
}

function thumb(p: string | null) {
  if (!p) return DUMMY_IMG;
  if (p.startsWith("http")) return p;
  return `${API_CONFIG.baseUrl}/storage/${p}`;
}

function buildPageNums(cur: number, last: number): (number | "…")[] {
  if (last <= 7) return Array.from({ length: last }, (_, i) => i + 1);
  const out: (number | "…")[] = [1];
  if (cur > 3) out.push("…");
  for (let i = Math.max(2, cur - 1); i <= Math.min(last - 1, cur + 1); i++) out.push(i);
  if (cur < last - 2) out.push("…");
  out.push(last);
  return out;
}

/* ─── small reusable pieces ──────────────────────────────────────────────── */
function SidebarCard({ children, title, dot }: { children: React.ReactNode; title: string; dot: string }) {
  return (
    <div className="bg-[#0b1426]/80 border border-cyan-500/10 p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
        <span className="font-mono text-[9px] text-slate-600 uppercase tracking-[0.2em]">{title}</span>
      </div>
      {children}
    </div>
  );
}

/* ─── page ───────────────────────────────────────────────────────────────── */
export default function AllBlogsPage() {
  /* server-paginated grid data */
  const [result, setResult]         = useState<PaginatedBlogs | null>(null);
  const [page, setPage]             = useState(1);
  const [gridLoading, setGridLoad]  = useState(true);
  const [pageSwitch, setPageSwitch] = useState(false);
  const [gridError, setGridError]   = useState<string | null>(null);

  /* sidebar data (all 100 blogs fetched in background) */
  const [allBlogs, setAllBlogs]     = useState<Blog[]>([]);
  const [sidebarReady, setSbReady]  = useState(false);

  /* ── initial load ── */
  useEffect(() => {
    // Fetch page 1 for grid
    getPagedBlogs(1)
      .then((r) => { setResult(r); })
      .catch((e: Error) => setGridError(e.message))
      .finally(() => setGridLoad(false));

    // Fetch all blogs in background for sidebar
    getAllBlogs()
      .then((blogs) => { setAllBlogs(blogs); setSbReady(true); })
      .catch(() => { /* sidebar degrades gracefully */ });
  }, []);

  /* ── page change ── */
  const goToPage = (p: number) => {
    if (p === page || p < 1 || (result && p > result.lastPage)) return;
    setPage(p);
    setPageSwitch(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    getPagedBlogs(p)
      .then(setResult)
      .catch((e: Error) => setGridError(e.message))
      .finally(() => setPageSwitch(false));
  };

  /* ── sidebar derivations ── */
  const popular    = useMemo(() => getMostPopular(allBlogs), [allBlogs]);
  const categories = useMemo(() => extractCategories(allBlogs), [allBlogs]);

  /* ── loading skeleton ── */
  if (gridLoading) return (
    <main className="min-h-screen bg-[#030014]">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-10 pt-28 pb-20">
        <div className="h-12 w-56 bg-slate-800/50 animate-pulse mb-10 rounded-sm" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-64 bg-slate-800/30 animate-pulse border border-slate-700/10" style={{ animationDelay: `${i * 80}ms` }} />
            ))}
          </div>
          <div className="lg:col-span-3 space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-16 bg-slate-800/30 animate-pulse" style={{ animationDelay: `${i * 60}ms` }} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );

  if (gridError) return (
    <main className="min-h-screen bg-[#030014] flex items-center justify-center px-6">
      <div className="text-center font-mono space-y-4">
        <div className="text-7xl font-black text-slate-800/50">ERR</div>
        <p className="text-orange-400 text-xs tracking-widest">[SYSTEM_ERROR] {gridError}</p>
        <p className="text-slate-700 text-[10px]">Backend: {API_CONFIG.baseUrl}</p>
        <Link href="/"><button className="mt-4 px-6 py-2 border border-cyan-500/30 text-cyan-400 text-xs uppercase tracking-widest hover:bg-cyan-500/10 transition-colors">&lt; HOME</button></Link>
      </div>
    </main>
  );

  const blogs = result?.data ?? [];

  return (
    <main className="min-h-screen bg-[#030014] relative overflow-x-hidden">

      {/* Ambient glows */}
      <div className="fixed top-0 left-1/4 w-[700px] h-[600px] bg-cyan-500/[0.025] rounded-full blur-[200px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-orange-500/[0.025] rounded-full blur-[200px] pointer-events-none" />

      <div className="relative z-10 max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-10 py-10 pt-24">

        {/* ── Breadcrumb ── */}
        <div className="flex items-center gap-2 font-mono text-[11px] text-slate-600 mb-8">
          <Link href="/" className="hover:text-cyan-400 transition-colors">root@sys:~</Link>
          <span className="text-slate-800">/</span>
          <span className="text-cyan-400">blogs</span>
          {result && (
            <span className="text-slate-700 ml-2">[{result.total}_TOTAL]</span>
          )}
        </div>

        {/* ── Title ── */}
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center gap-3 mb-1.5">
            <span className="font-mono text-[9px] text-slate-700 tracking-[0.22em] uppercase">// SYSTEM_DATALOG_ARCHIVE</span>
            <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/20 to-transparent" />
          </div>
          <h1 className="font-mono font-black text-4xl sm:text-6xl text-white leading-none">
            <span className="text-cyan-500 text-xl sm:text-3xl mr-2 animate-pulse">root@sys:~#</span>
            ALL<span className="text-orange-400">_</span>BLOGS
            <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.85 }}
              className="inline-block w-[3px] h-10 sm:h-14 bg-cyan-400 ml-2 align-middle" />
          </h1>
        </motion.div>

        {/* ── Two-column layout (no items-start → enables sticky sidebar) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* ════ LEFT: grid + pagination ════ */}
          <div className="lg:col-span-9">

            {/* Stats row */}
            {result && (
              <div className="flex items-center justify-between mb-5 font-mono text-[11px]">
                <span className="text-slate-600">
                  Showing{" "}
                  <span className="text-cyan-400">{result.from}–{result.to}</span>
                  {" "}of{" "}
                  <span className="text-slate-300">{result.total}</span>
                  {" "}entries
                </span>
                <span className="text-slate-700 hidden sm:block">
                  PAGE <span className="text-slate-400">{result.currentPage}</span> / {result.lastPage}
                </span>
              </div>
            )}

            {/* Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={page}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: pageSwitch ? 0.4 : 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8"
              >
                {blogs.map((blog, i) => (
                  <Link key={blog.id} href={`/blogs/${blog.slug}`} className="block group">
                    <motion.div
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="h-full flex flex-col bg-[#0b1426]/75 border border-cyan-500/10 group-hover:border-orange-500/35 transition-all duration-300 relative overflow-hidden group-hover:shadow-[0_4px_30px_rgba(249,115,22,0.08)]"
                    >
                      {/* Corner accents */}
                      <span className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-cyan-500/40 group-hover:border-orange-400/60 m-1.5 z-10 transition-colors pointer-events-none" />
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-cyan-500/40 group-hover:border-orange-400/60 m-1.5 z-10 transition-colors pointer-events-none" />

                      {/* Thumbnail */}
                      <div className="relative h-44 overflow-hidden bg-black/50 shrink-0">
                        <div className="absolute inset-0 bg-cyan-900/20 mix-blend-color z-[5] group-hover:bg-orange-900/10 transition-all duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1426] via-transparent to-transparent z-10" />
                        <img
                          src={thumb(blog.thumbnail_image)}
                          alt={blog.title}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-[1.04] transition-all duration-700"
                          onError={(e) => { (e.target as HTMLImageElement).src = DUMMY_IMG; }}
                        />
                        {blog.is_featured === 1 && (
                          <span className="absolute top-2.5 right-2.5 z-20 px-2 py-0.5 bg-orange-500/90 backdrop-blur-sm font-mono text-[9px] text-white uppercase tracking-widest">
                            ★ FEATURED
                          </span>
                        )}
                        {blog.blog_type && (
                          <span className="absolute bottom-2.5 left-2.5 z-20 px-2 py-0.5 bg-black/75 border border-cyan-500/20 text-cyan-400 font-mono text-[9px] uppercase tracking-wider">
                            {blog.blog_type.substring(0, 22)}
                          </span>
                        )}
                      </div>

                      {/* Body */}
                      <div className="flex flex-col flex-1 p-4">
                        <div className="flex items-center justify-between font-mono text-[9px] text-slate-700 mb-2.5">
                          <span>{fmtDate(blog.publish_date || blog.created_at)}</span>
                          {(blog.reading_time ?? 0) > 0 && (blog.reading_time ?? 0) <= 300 && (
                            <span className="text-cyan-800">{blog.reading_time} min</span>
                          )}
                        </div>
                        <h2 className="font-mono font-bold text-white text-sm leading-snug mb-2.5 group-hover:text-cyan-300 transition-colors line-clamp-2">
                          {blog.title}
                        </h2>
                        <p className="font-mono text-slate-600 text-[11px] leading-relaxed line-clamp-2 flex-1 mb-3 pl-2.5 border-l border-cyan-500/12 group-hover:border-orange-500/20 transition-colors">
                          {blog.description}
                        </p>
                        <div className="flex items-center justify-between pt-2.5 border-t border-slate-800/50">
                          <span className="flex items-center gap-1 font-mono text-[9px] text-slate-700">
                            <span className="w-1 h-1 bg-green-500/60 rounded-full" />
                            {blog.status}
                          </span>
                          <span className="font-mono text-[9px] text-cyan-700 group-hover:text-orange-400 transition-colors flex items-center gap-1">
                            OPEN LOG
                            <svg className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* ── Pagination ── */}
            {result && result.lastPage > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-center gap-1.5 flex-wrap"
              >
                {/* Prev */}
                <button
                  onClick={() => goToPage(page - 1)}
                  disabled={page === 1 || pageSwitch}
                  className="flex items-center gap-1 px-3 py-2 font-mono text-[10px] border border-slate-700/60 text-slate-500 hover:border-cyan-500/40 hover:text-cyan-400 disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                  PREV
                </button>

                {/* Page numbers */}
                {buildPageNums(page, result.lastPage).map((n, i) =>
                  n === "…" ? (
                    <span key={`d${i}`} className="font-mono text-slate-700 px-1 text-xs select-none">…</span>
                  ) : (
                    <button
                      key={n}
                      onClick={() => goToPage(n as number)}
                      disabled={pageSwitch}
                      className={`w-9 h-9 font-mono text-[11px] border transition-all duration-200 ${
                        page === n
                          ? "bg-cyan-500/20 border-cyan-400/60 text-cyan-300 shadow-[0_0_14px_rgba(6,182,212,0.2)]"
                          : "border-slate-700/50 text-slate-500 hover:border-cyan-500/30 hover:text-white disabled:opacity-40"
                      }`}
                    >
                      {n}
                    </button>
                  )
                )}

                {/* Next */}
                <button
                  onClick={() => goToPage(page + 1)}
                  disabled={page === result.lastPage || pageSwitch}
                  className="flex items-center gap-1 px-3 py-2 font-mono text-[10px] border border-slate-700/60 text-slate-500 hover:border-cyan-500/40 hover:text-cyan-400 disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
                >
                  NEXT
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                </button>
              </motion.div>
            )}

            {/* Page jump info */}
            {result && result.lastPage > 1 && (
              <p className="text-center font-mono text-[10px] text-slate-700 mt-3">
                Page {result.currentPage} of {result.lastPage} · {result.total} total entries
              </p>
            )}
          </div>

          {/* ════ RIGHT: sticky sidebar ════ */}
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-24 space-y-4">

              {/* Stats */}
              {result && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
                  <SidebarCard title="ARCHIVE_STATS" dot="bg-cyan-400 animate-pulse">
                    <div className="grid grid-cols-2 gap-2.5">
                      {[
                        { l: "TOTAL",      v: result.total },
                        { l: "PER_PAGE",   v: result.perPage },
                        { l: "PAGES",      v: result.lastPage },
                        { l: "CATEGORIES", v: sidebarReady ? categories.length : "—" },
                      ].map((s) => (
                        <div key={s.l} className="bg-black/25 border border-slate-800/60 p-2.5">
                          <div className="font-mono text-[8px] text-slate-700 uppercase tracking-widest mb-1">{s.l}</div>
                          <div className="font-mono text-xl font-black text-white">{s.v}</div>
                        </div>
                      ))}
                    </div>
                  </SidebarCard>
                </motion.div>
              )}

              {/* Most Popular */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.22 }}>
                <SidebarCard title="MOST_POPULAR" dot="bg-orange-400">
                  {!sidebarReady ? (
                    <div className="space-y-3">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="flex gap-3 animate-pulse">
                          <div className="w-14 h-14 bg-slate-800/60 shrink-0" />
                          <div className="flex-1 space-y-2 py-1">
                            <div className="h-2.5 bg-slate-800/60 rounded-sm w-full" />
                            <div className="h-2 bg-slate-800/40 rounded-sm w-2/3" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : popular.length === 0 ? (
                    <p className="font-mono text-[10px] text-slate-700 text-center py-4">NO_FEATURED_LOGS</p>
                  ) : (
                    <div className="space-y-3">
                      {popular.map((b, i) => (
                        <Link key={b.id} href={`/blogs/${b.slug}`} className="flex gap-3 group">
                          <div className="w-14 h-14 shrink-0 overflow-hidden border border-cyan-500/10 group-hover:border-orange-400/35 transition-colors">
                            <img
                              src={thumb(b.thumbnail_image)}
                              alt={b.title}
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                              onError={(e) => { (e.target as HTMLImageElement).src = DUMMY_IMG; }}
                            />
                          </div>
                          <div className="min-w-0 flex flex-col justify-center gap-1">
                            <div className="flex items-center gap-1.5">
                              <span className="font-mono text-[9px] text-orange-600 font-bold">#{i + 1}</span>
                              {b.is_featured === 1 && (
                                <span className="font-mono text-[8px] text-orange-500">★</span>
                              )}
                            </div>
                            <p className="font-mono text-[11px] text-slate-300 group-hover:text-cyan-300 transition-colors line-clamp-2 leading-tight">
                              {b.title}
                            </p>
                            <span className="font-mono text-[9px] text-slate-700">{fmtDate(b.created_at, true)}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </SidebarCard>
              </motion.div>

              {/* Categories */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                <SidebarCard title="CATEGORIES" dot="bg-green-400">
                  {!sidebarReady ? (
                    <div className="space-y-2">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="h-8 bg-slate-800/40 animate-pulse rounded-sm" style={{ animationDelay: `${i * 50}ms` }} />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-0.5 max-h-[300px] overflow-y-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
                      {categories.map(({ type, count }) => (
                        <Link
                          key={type}
                          href={`/blogs?type=${encodeURIComponent(type)}`}
                          className="flex items-center justify-between px-3 py-2 border border-transparent hover:border-cyan-500/20 hover:bg-cyan-500/5 transition-all group"
                        >
                          <span className="font-mono text-[11px] text-slate-500 group-hover:text-slate-200 transition-colors truncate flex items-center gap-2 min-w-0">
                            <span className="text-cyan-800 shrink-0">&gt;</span>
                            <span className="truncate">{type.substring(0, 26)}</span>
                          </span>
                          <span className="font-mono text-[10px] px-1.5 py-0.5 bg-slate-800/80 text-slate-600 group-hover:bg-cyan-500/10 group-hover:text-cyan-500 transition-all shrink-0 ml-2">
                            {count}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </SidebarCard>
              </motion.div>

              {/* Back to home */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.38 }}>
                <Link href="/#blogs">
                  <div className="group flex items-center gap-3 p-4 border border-slate-700/30 hover:border-cyan-500/25 transition-all cursor-pointer">
                    <svg className="w-4 h-4 text-slate-700 group-hover:text-cyan-500 group-hover:-translate-x-0.5 transition-all shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span className="font-mono text-[10px] text-slate-600 group-hover:text-cyan-400 transition-colors uppercase tracking-widest">
                      BACK_TO_HOME
                    </span>
                  </div>
                </Link>
              </motion.div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
