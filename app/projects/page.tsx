"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  getPagedProjects,
  getAllProjects,
  extractProjectCategories,
  getPopularProjects,
  parseTags,
  type Project,
  type PaginatedProjects,
} from "@/lib/services/project";
import { API_CONFIG } from "@/config/api";

const DUMMY_IMG =
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=70";

function fmtDate(s: string | null | undefined, short = false) {
  if (!s) return "";
  const d = new Date(s);
  if (isNaN(d.getTime())) return "";
  return short
    ? `${String(d.getDate()).padStart(2, "0")} ${d.toLocaleString("en-US", { month: "short" })}`
    : `${String(d.getDate()).padStart(2, "0")} ${d.toLocaleString("en-US", { month: "short" })} ${d.getFullYear()}`;
}

function thumb(p: string | null) {
  if (!p) return DUMMY_IMG;
  if (p.startsWith("http")) return p;
  return `${API_CONFIG.baseUrl}/${p}`;
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function inferCategory(
  title: string | null | undefined,
  category: string | null | undefined,
): string | null {
  if (category) return category;
  if (!title) return null;
  const t = title.toLowerCase();
  if (
    t.includes("shop") ||
    t.includes("ecommerce") ||
    t.includes("e-commerce") ||
    t.includes("store")
  )
    return "E-Commerce";
  if (t.includes("laravel")) return "Laravel";
  if (t.includes("react") || t.includes("next")) return "React";
  if (t.includes("vue")) return "Vue";
  if (t.includes("api") || t.includes("backend") || t.includes("rest"))
    return "API";
  if (t.includes("mobile") || t.includes("app") || t.includes("flutter"))
    return "Mobile";
  if (t.includes("blog") || t.includes("cms") || t.includes("portfolio"))
    return "Web";
  if (t.includes("dashboard") || t.includes("admin") || t.includes("panel"))
    return "Dashboard";
  if (t.includes("landing") || t.includes("website") || t.includes("site"))
    return "Web";
  return null;
}

function buildPageNums(cur: number, last: number): (number | "…")[] {
  if (last <= 7) return Array.from({ length: last }, (_, i) => i + 1);
  const out: (number | "…")[] = [1];
  if (cur > 3) out.push("…");
  for (let i = Math.max(2, cur - 1); i <= Math.min(last - 1, cur + 1); i++)
    out.push(i);
  if (cur < last - 2) out.push("…");
  out.push(last);
  return out;
}

function SidebarCard({
  children,
  title,
  dot,
}: {
  children: React.ReactNode;
  title: string;
  dot: string;
}) {
  return (
    <div className="bg-[#0b1426]/80 border border-cyan-500/10 p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
        <span className="font-mono text-[9px] text-slate-600 uppercase tracking-[0.2em]">
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}

export default function AllProjectsPage() {
  const [result, setResult] = useState<PaginatedProjects | null>(null);
  const [page, setPage] = useState(1);
  const [gridLoading, setGridLoad] = useState(true);
  const [pageSwitch, setPageSwitch] = useState(false);
  const [gridError, setGridError] = useState<string | null>(null);

  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [sidebarReady, setSbReady] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [likedMap, setLikedMap] = useState<Record<number, boolean>>({});
  const [likingIds, setLikingIds] = useState<number[]>([]);

  useEffect(() => {
    getPagedProjects(1)
      .then(setResult)
      .catch((e: Error) => setGridError(e.message))
      .finally(() => setGridLoad(false));

    getAllProjects()
      .then((p) => {
        setAllProjects(p);
        setSbReady(true);
      })
      .catch(() => {
        /* sidebar degrades gracefully */
      });

    const stored = JSON.parse(localStorage.getItem('liked_projects') || '[]') as number[];
    const map: Record<number, boolean> = {};
    stored.forEach((id) => { map[id] = true; });
    setLikedMap(map);
  }, []);

  async function handleLike(projectId: number) {
    if (likingIds.includes(projectId) || likedMap[projectId]) return;
    setLikingIds((prev) => [...prev, projectId]);
    try {
      const res = await fetch(
        `${API_CONFIG.baseUrl}/api/submit-project-like/${projectId}`,
        { method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json' } },
      );
      if (res.status === 201 || res.status === 429) {
        setLikedMap((prev) => ({ ...prev, [projectId]: true }));
        const stored = JSON.parse(localStorage.getItem('liked_projects') || '[]') as number[];
        localStorage.setItem('liked_projects', JSON.stringify([...new Set([...stored, projectId])]));
      }
    } catch { /* silent */ }
    finally { setLikingIds((prev) => prev.filter((id) => id !== projectId)); }
  }

  const goToPage = (p: number) => {
    if (p === page || p < 1 || (result && p > result.lastPage)) return;
    setPage(p);
    setPageSwitch(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    getPagedProjects(p)
      .then(setResult)
      .catch((e: Error) => setGridError(e.message))
      .finally(() => setPageSwitch(false));
  };

  const popular = useMemo(() => getPopularProjects(allProjects), [allProjects]);
  const categories = useMemo(
    () => extractProjectCategories(allProjects),
    [allProjects],
  );

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return null;
    return allProjects.filter((p) => {
      const tags = parseTags(p.tags).join(" ").toLowerCase();
      return (
        (p.title || p.name || "").toLowerCase().includes(q) ||
        (p.description ?? "").toLowerCase().includes(q) ||
        (p.category ?? "").toLowerCase().includes(q) ||
        tags.includes(q)
      );
    });
  }, [searchQuery, allProjects]);

  /* ── Skeleton ── */
  if (gridLoading)
    return (
      <main className="min-h-screen bg-[#030014]">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-10 pt-28 pb-20">
          <div className="h-12 w-56 bg-slate-800/50 animate-pulse mb-10" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-72 bg-slate-800/30 animate-pulse border border-slate-700/10"
                  style={{ animationDelay: `${i * 80}ms` }}
                />
              ))}
            </div>
            <div className="lg:col-span-3 space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-16 bg-slate-800/30 animate-pulse"
                  style={{ animationDelay: `${i * 60}ms` }}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    );

  if (gridError)
    return (
      <main className="min-h-screen bg-[#030014] flex items-center justify-center px-6">
        <div className="text-center font-mono space-y-4">
          <div className="text-7xl font-black text-slate-800/50">ERR</div>
          <p className="text-orange-400 text-xs tracking-widest">
            [SYSTEM_ERROR] {gridError}
          </p>
          <p className="text-slate-700 text-[10px]">
            Backend: {API_CONFIG.baseUrl}
          </p>
          <Link href="/">
            <button className="mt-4 px-6 py-2 border border-cyan-500/30 text-cyan-400 text-xs uppercase tracking-widest hover:bg-cyan-500/10 transition-colors">
              &lt; HOME
            </button>
          </Link>
        </div>
      </main>
    );

  const projects = result?.data ?? [];

  return (
    <main className="min-h-screen bg-[#030014] relative overflow-x-hidden">
      <div className="fixed top-0 left-1/4 w-[700px] h-[600px] bg-purple-500/[0.02] rounded-full blur-[200px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-cyan-500/[0.02] rounded-full blur-[200px] pointer-events-none" />

      <div className="relative z-10 max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-10 py-10 pt-24">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 font-mono text-[11px] text-slate-600 mb-8">
          <Link href="/" className="hover:text-cyan-400 transition-colors">
            root@sys:~
          </Link>
          <span className="text-slate-800">/</span>
          <span className="text-cyan-400">projects</span>
          {result && (
            <span className="text-slate-700 ml-2">
              [{result.total}_MODULES]
            </span>
          )}
        </div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-1.5">
            <span className="font-mono text-[9px] text-slate-700 tracking-[0.22em] uppercase">
              // DEPLOYED_MODULE_REGISTRY
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-purple-500/20 to-transparent" />
          </div>
          <h1 className="font-mono font-black text-4xl sm:text-6xl text-white leading-none">
            <span className="text-cyan-500 text-xl sm:text-3xl mr-2 animate-pulse">
              root@sys:~#
            </span>
            ALL<span className="text-purple-400">_</span>PROJECTS
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.85 }}
              className="inline-block w-[3px] h-10 sm:h-14 bg-purple-400 ml-2 align-middle"
            />
          </h1>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative w-100">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-cyan-600 text-xs pointer-events-none select-none">
              &gt;_
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="SEARCH_PROJECTS..."
              className="w-full bg-[#0b1426]/80 border border-cyan-500/20 hover:border-cyan-500/40 focus:border-cyan-400/60 focus:outline-none text-slate-200 font-mono text-sm placeholder:text-slate-700 py-3 pl-10 pr-4 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-300 font-mono text-xs transition-colors"
              >
                [ESC]
              </button>
            )}
          </div>
          {searchResults !== null && (
            <p className="font-mono text-[11px] text-slate-600 mt-2">
              <span className="text-purple-400">{searchResults.length}</span>{" "}
              result{searchResults.length !== 1 ? "s" : ""} for{" "}
              <span className="text-slate-400">&quot;{searchQuery}&quot;</span>
            </p>
          )}
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT: grid + pagination */}
          <div className="lg:col-span-9">
            <AnimatePresence mode="wait">
              <motion.div
                key={searchResults ? `search-${searchQuery}` : page}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: pageSwitch ? 0.4 : 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8"
              >
                {searchResults !== null && searchResults.length === 0 && (
                  <div className="col-span-full text-center py-20 font-mono">
                    <div className="text-5xl text-slate-800/60 mb-4">
                      [ NULL ]
                    </div>
                    <p className="text-slate-600 text-xs tracking-widest">
                      NO_MODULES_FOUND for &quot;{searchQuery}&quot;
                    </p>
                  </div>
                )}
                {(searchResults ?? projects).map((project, i) => {
                  const tags = parseTags(project.tags);
                  const liveUrl =
                    project.link ?? project.project_url ?? project.github_url ?? "";

                  return (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="relative group h-full flex flex-col"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 group-hover:from-cyan-400/25 group-hover:to-purple-400/25 blur-md transition-all duration-500 rounded-sm" />

                      <div
                        className="relative h-full flex flex-col bg-[#0b1426]/90 border border-cyan-500/20 group-hover:border-purple-400/50 p-4 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.12)]"
                        style={{
                          clipPath:
                            "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
                        }}
                      >
                        <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-cyan-500/60 group-hover:border-purple-400/70 m-1.5 z-10 transition-colors" />
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-cyan-500/60 group-hover:border-purple-400/70 m-1.5 z-10 transition-colors" />

                        {/* Header */}
                        <div className="flex items-center justify-between mb-3 border-b border-cyan-500/15 pb-2">
                          <span className="text-[9px] uppercase font-mono tracking-widest text-cyan-500 flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-green-400 animate-pulse" />
                            sys_init
                          </span>
                          {project.category && (
                            <span className="text-[8px] font-mono text-slate-600 bg-slate-800/50 px-1.5 py-0.5 border border-slate-700/40">
                              {project.category.substring(0, 16)}
                            </span>
                          )}
                        </div>

                        {/* Thumbnail */}
                        <div className="relative w-full h-36 mb-3 overflow-hidden border border-cyan-500/15 group-hover:border-purple-400/35 transition-colors">
                          <img
                            src={thumb(project.thumb_image)}
                            alt={project.title || project.name || "project"}
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = DUMMY_IMG;
                            }}
                          />
                          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(6,182,212,0.08)_51%)] bg-[length:100%_4px] pointer-events-none" />
                          {project.is_featured === 1 && (
                            <span className="absolute top-2 right-2 px-1.5 py-0.5 bg-orange-500/85 font-mono text-[8px] text-white uppercase tracking-widest">
                              ★
                            </span>
                          )}
                        </div>

                        <h3 className="font-mono font-bold text-white text-sm mb-2 group-hover:text-purple-300 transition-colors line-clamp-1">
                          {project.title || project.name}
                        </h3>
                        <p className="text-slate-500 text-[11px] font-mono leading-relaxed mb-3 flex-grow border-l border-cyan-500/15 pl-2.5 line-clamp-2">
                          {stripHtml(project.description)}
                        </p>

                        {tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {tags.slice(0, 4).map((t, idx) => (
                              <span
                                key={idx}
                                className="text-[8px] font-mono uppercase bg-cyan-950/40 text-cyan-300 px-1.5 py-0.5 border border-cyan-500/15"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="flex gap-2 mt-auto">
                          <Link
                            href={
                              project.slug ? `/projects/${project.slug}` : "#"
                            }
                            className="flex-1"
                          >
                            <button className="w-full py-1.5 border border-purple-500/35 text-purple-300 font-mono text-[9px] uppercase tracking-widest hover:bg-purple-500/15 transition-all flex items-center gap-1 justify-center">
                              View Details
                            </button>
                          </Link>
                          {liveUrl ? (
                            <Link
                              href={liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1"
                            >
                              <button className="w-full py-1.5 bg-cyan-500/8 border border-cyan-500/30 text-cyan-400 font-mono text-[9px] uppercase tracking-widest hover:bg-cyan-500/20 transition-all flex items-center gap-1 justify-center">
                                &gt; Execute
                              </button>
                            </Link>
                          ) : (
                            <div className="flex-1 py-1.5 border border-slate-700/40 text-slate-600 font-mono text-[9px] uppercase flex items-center justify-center gap-1 cursor-not-allowed">
                              Offline{" "}
                              <span className="w-1 h-1 rounded-full bg-red-900" />
                            </div>
                          )}
                          <button
                            onClick={() => handleLike(project.id)}
                            disabled={likingIds.includes(project.id) || likedMap[project.id]}
                            className={`shrink-0 px-2 py-1.5 border font-mono transition-all disabled:cursor-not-allowed ${
                              likedMap[project.id]
                                ? "bg-rose-500/20 border-rose-500/50 text-rose-400"
                                : "border-slate-700/40 text-slate-600 hover:border-rose-500/40 hover:text-rose-400"
                            }`}
                          >
                            <svg className="w-3 h-3" fill={likedMap[project.id] ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>

            {/* Pagination — hidden when searching */}
            {!searchResults && result && result.lastPage > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-center gap-1.5 flex-wrap"
              >
                <button
                  onClick={() => goToPage(page - 1)}
                  disabled={page === 1 || pageSwitch}
                  className="flex items-center gap-1 px-3 py-2 font-mono text-[10px] border border-slate-700/60 text-slate-500 hover:border-purple-500/40 hover:text-purple-400 disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
                >
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  PREV
                </button>

                {buildPageNums(page, result.lastPage).map((n, i) =>
                  n === "…" ? (
                    <span
                      key={`d${i}`}
                      className="font-mono text-slate-700 px-1 text-xs select-none"
                    >
                      …
                    </span>
                  ) : (
                    <button
                      key={n}
                      onClick={() => goToPage(n as number)}
                      disabled={pageSwitch}
                      className={`w-9 h-9 font-mono text-[11px] border transition-all duration-200 ${
                        page === n
                          ? "bg-purple-500/20 border-purple-400/60 text-purple-300 shadow-[0_0_14px_rgba(168,85,247,0.2)]"
                          : "border-slate-700/50 text-slate-500 hover:border-purple-500/30 hover:text-white disabled:opacity-40"
                      }`}
                    >
                      {n}
                    </button>
                  ),
                )}

                <button
                  onClick={() => goToPage(page + 1)}
                  disabled={page === result.lastPage || pageSwitch}
                  className="flex items-center gap-1 px-3 py-2 font-mono text-[10px] border border-slate-700/60 text-slate-500 hover:border-purple-500/40 hover:text-purple-400 disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
                >
                  NEXT
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </motion.div>
            )}

            {!searchResults && result && result.lastPage > 1 && (
              <p className="text-center font-mono text-[10px] text-slate-700 mt-3">
                Page {result.currentPage} of {result.lastPage} · {result.total}{" "}
                total modules
              </p>
            )}
          </div>

          {/* RIGHT: sticky sidebar */}
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-24 space-y-4">
              {/* Stats */}
              {result && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <SidebarCard
                    title="MODULE_STATS"
                    dot="bg-purple-400 animate-pulse"
                  >
                    <div className="grid grid-cols-2 gap-2.5">
                      {[
                        { l: "TOTAL", v: result.total },
                        { l: "PER_PAGE", v: result.perPage },
                        { l: "PAGES", v: result.lastPage },
                        {
                          l: "CATEGORIES",
                          v: sidebarReady ? categories.length : "—",
                        },
                        { l: "CURR_PAGE", v: result.currentPage },
                        { l: "SHOWING", v: `${result.from}–${result.to}` },
                      ].map((s) => (
                        <div
                          key={s.l}
                          className="bg-black/25 border border-slate-800/60 p-2.5"
                        >
                          <div className="font-mono text-[8px] text-slate-700 uppercase tracking-widest mb-1">
                            {s.l}
                          </div>
                          <div className="font-mono text-xl font-black text-white">
                            {s.v}
                          </div>
                        </div>
                      ))}
                    </div>
                  </SidebarCard>
                </motion.div>
              )}

              {/* Popular */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.22 }}
              >
                <SidebarCard title="FEATURED_MODULES" dot="bg-orange-400">
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
                    <p className="font-mono text-[10px] text-slate-700 text-center py-4">
                      NO_FEATURED_MODULES
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {popular.map((p, i) => {
                        const cat = inferCategory(p.name, p.category ?? null);
                        return (
                          <Link
                            key={p.id}
                            href={p.slug ? `/projects/${p.slug}` : "#"}
                            className="flex gap-3 group"
                          >
                            <div className="w-14 h-14 shrink-0 overflow-hidden border border-cyan-500/10 group-hover:border-purple-400/35 transition-colors">
                              <img
                                src={thumb(p.thumb_image)}
                                alt={p.title || p.name || "project"}
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src =
                                    DUMMY_IMG;
                                }}
                              />
                            </div>
                            <div className="min-w-0 flex flex-col justify-center gap-1">
                              <div className="flex items-center gap-1.5">
                                <span className="font-mono text-[9px] text-orange-600 font-bold">
                                  #{i + 1}{" "}
                                </span>
                                {p.is_featured === 1 && (
                                  <span className="font-mono text-[8px] text-orange-500">
                                    ★
                                  </span>
                                )}
                                {cat && (
                                  <span className="font-mono text-[7px] px-1 py-0.5 bg-cyan-950/50 text-cyan-600 border border-cyan-500/15 uppercase tracking-wide">
                                    {cat}
                                  </span>
                                )}
                              </div>
                              <p className="font-mono text-[11px] text-slate-300 group-hover:text-purple-300 transition-colors line-clamp-2 leading-tight">
                                {p.title || p.name}
                              </p>
                              <span className="font-mono text-[9px] text-slate-700">
                                {fmtDate(p.created_at, true)}
                              </span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </SidebarCard>
              </motion.div>

              {/* Categories */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <SidebarCard title="CATEGORIES" dot="bg-green-400">
                  {!sidebarReady ? (
                    <div className="space-y-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className="h-8 bg-slate-800/40 animate-pulse rounded-sm"
                          style={{ animationDelay: `${i * 50}ms` }}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-0.5 max-h-[260px] overflow-y-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
                      {categories.map(({ type, count }) => (
                        <button
                          key={type}
                          className="w-full flex items-center justify-between px-3 py-2 border border-transparent hover:border-purple-500/20 hover:bg-purple-500/5 transition-all group text-left"
                        >
                          <span className="font-mono text-[11px] text-slate-500 group-hover:text-slate-200 transition-colors truncate flex items-center gap-2 min-w-0">
                            <span className="text-purple-800 shrink-0">
                              &gt;
                            </span>
                            <span className="truncate">
                              {type.substring(0, 26)}
                            </span>
                          </span>
                          <span className="font-mono text-[10px] px-1.5 py-0.5 bg-slate-800/80 text-slate-600 group-hover:bg-purple-500/10 group-hover:text-purple-400 transition-all shrink-0 ml-2">
                            {count}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </SidebarCard>
              </motion.div>

              {/* Back */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.38 }}
              >
                <Link href="/#projects">
                  <div className="group flex items-center gap-3 p-4 border border-slate-700/30 hover:border-purple-500/25 transition-all cursor-pointer">
                    <svg
                      className="w-4 h-4 text-slate-700 group-hover:text-purple-400 group-hover:-translate-x-0.5 transition-all shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                    <span className="font-mono text-[10px] text-slate-600 group-hover:text-purple-400 transition-colors uppercase tracking-widest">
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
