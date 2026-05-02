"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  getAllBlogs,
  getBlogBySlug,
  getBlogCategories,
  resolveStorageUrl,
  type Blog,
  type BlogCategory,
} from "@/lib/services/blog";
import {
  postComment,
  type Comment,
  type CommentInput,
} from "@/lib/services/comment";
import { API_CONFIG } from "@/config/api";

/* ─── helpers ─────────────────────────────────────────────────────────────── */
const DUMMY_IMG =
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80";

function fmtDate(s: string, short = false) {
  const d = new Date(s);
  if (isNaN(d.getTime())) return s;
  return short
    ? `${String(d.getDate()).padStart(2, "0")} ${d.toLocaleString("en-US", { month: "short" })}`
    : d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function thumb(p: string | null) {
  const url = resolveStorageUrl(p);
  return url || DUMMY_IMG;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function parseImages(raw: string[] | string | null): string[] {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  try { return JSON.parse(raw) as string[]; } catch { return []; }
}

function parseTags(raw: string | null): string[] {
  if (!raw) return [];
  try { return JSON.parse(raw) as string[]; } catch { /**/ }
  return raw.split(",").map((t) => t.trim()).filter(Boolean);
}

function toHTML(content: string): string {
  if (/<[a-z][\s\S]*>/i.test(content)) return content;
  return content
    .split(/\n{2,}/)
    .filter(Boolean)
    .map((p) => `<p>${p.replace(/\n/g, "<br>")}</p>`)
    .join("");
}

/* ─── comment avatar ─────────────────────────────────────────────────────── */
function Avatar({ name }: { name: string | null | undefined }) {
  const colors = ["#0e7490", "#b45309", "#065f46", "#7c3aed", "#be123c"];
  const displayName = (name || "U").trim();
  const color  = colors[displayName.charCodeAt(0) % colors.length];
  return (
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-sm text-white shrink-0"
      style={{ background: color }}
    >
      {displayName.charAt(0).toUpperCase()}
    </div>
  );
}

/* ─── single comment ─────────────────────────────────────────────────────── */
function CommentItem({
  comment,
  blogId,
  onReplyPosted,
}: {
  comment: Comment;
  blogId: number;
  onReplyPosted: (parent: number, c: Comment) => void;
}) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", comment: "" });
  const [busy, setBusy] = useState(false);
  const [err, setErr]   = useState("");
  const [ok, setOk]     = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.comment.trim()) { setErr("Name and message are required."); return; }
    setBusy(true); setErr("");
    try {
      const input: CommentInput = { blog_id: blogId, parent_id: comment.id, ...form };
      const c = await postComment(input);
      onReplyPosted(comment.id, c);
      setOk(true); setOpen(false); setForm({ name: "", email: "", comment: "" });
    } catch (e: unknown) {
      setErr((e as Error).message ?? "Failed to post reply.");
    } finally { setBusy(false); }
  }

  return (
    <div className="flex gap-3">
      <Avatar name={comment.user?.name ?? comment.name} />
      <div className="flex-1 min-w-0">
        <div className="bg-[#0d1a2d]/80 border border-cyan-500/10 p-4">
          <div className="flex items-baseline gap-3 mb-2 flex-wrap">
            <span className="font-mono font-bold text-sm text-white">{comment.user?.name ?? comment.name}</span>
            <span className="font-mono text-[10px] text-slate-600">{fmtDate(comment.created_at)}</span>
            {ok && <span className="font-mono text-[9px] text-green-500 tracking-widest">✓ REPLY_SENT</span>}
          </div>
          <p className="font-mono text-slate-400 text-xs leading-relaxed">{comment.comment}</p>
          <button
            onClick={() => { setOpen((v) => !v); setErr(""); }}
            className="mt-3 font-mono text-[10px] text-cyan-700 hover:text-cyan-400 transition-colors uppercase tracking-widest flex items-center gap-1"
          >
            <span className="text-orange-500">&gt;</span> {open ? "CANCEL" : "REPLY"}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={submit}
              className="overflow-hidden"
            >
              <div className="bg-[#0b1220]/70 border border-cyan-500/10 border-t-0 p-4 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="NAME *" className="bg-black/30 border border-slate-700/60 text-white placeholder-slate-700 font-mono text-xs px-3 py-2 outline-none focus:border-cyan-500/40 w-full" />
                  <input value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder="EMAIL (optional)" className="bg-black/30 border border-slate-700/60 text-white placeholder-slate-700 font-mono text-xs px-3 py-2 outline-none focus:border-cyan-500/40 w-full" />
                </div>
                <textarea value={form.comment} onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
                  rows={3} placeholder="REPLY_MESSAGE *" className="w-full bg-black/30 border border-slate-700/60 text-white placeholder-slate-700 font-mono text-xs px-3 py-2 outline-none focus:border-cyan-500/40 resize-none" />
                {err && <p className="font-mono text-[10px] text-orange-400">[ERROR] {err}</p>}
                <button type="submit" disabled={busy}
                  className="px-5 py-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-[11px] uppercase tracking-widest hover:bg-cyan-500/20 disabled:opacity-40 transition-colors flex items-center gap-2">
                  {busy && <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.7, ease: "linear" }} className="inline-block w-3 h-3 border border-t-cyan-400 border-cyan-500/20 rounded-full" />}
                  {busy ? "POSTING..." : "POST_REPLY"}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {(comment.replies ?? []).length > 0 && (
          <div className="mt-2 ml-4 pl-4 border-l border-cyan-500/10 space-y-2">
            {comment.replies!.map((r) => {
              const isAdmin = !!r.user_id;
              return (
                <div key={r.id} className="flex gap-2.5">
                  {isAdmin ? (
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-gradient-to-br from-cyan-500/30 to-orange-500/20 border border-cyan-400/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                      <svg className="w-4 h-4 text-cyan-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                      </svg>
                    </div>
                  ) : (
                    <Avatar name={r.name} />
                  )}
                  <div className={`flex-1 p-3 ${isAdmin
                    ? "bg-cyan-950/30 border border-cyan-500/25 shadow-[0_0_12px_rgba(6,182,212,0.07)]"
                    : "bg-[#0d1a2d]/60 border border-slate-800/50"
                  }`}>
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      {isAdmin ? (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-cyan-500/15 border border-cyan-400/40 font-mono font-black text-[10px] text-cyan-300 tracking-[0.15em] uppercase">
                          <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse shrink-0" />
                          ADMIN
                          <span className="text-orange-400">_</span>
                          <svg className="w-2.5 h-2.5 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                          </svg>
                        </span>
                      ) : (
                        <span className="font-mono font-bold text-xs text-slate-200">{r.name}</span>
                      )}
                      <span className="font-mono text-[9px] text-slate-700">{fmtDate(r.created_at)}</span>
                    </div>
                    <p className={`font-mono text-[11px] leading-relaxed ${isAdmin ? "text-cyan-100/70" : "text-slate-500"}`}>
                      {r.comment}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── comments section ───────────────────────────────────────────────────── */
function CommentsSection({ blogId, initialComments = [] }: { blogId: number; initialComments?: Comment[] }) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [form, setForm]         = useState({ name: "", email: "", comment: "" });
  const [busy, setBusy]         = useState(false);
  const [err, setErr]           = useState("");
  const [ok, setOk]             = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  function addReply(parentId: number, reply: Comment) {
    setComments((prev) =>
      prev.map((c) =>
        c.id === parentId ? { ...c, replies: [...(c.replies ?? []), reply] } : c
      )
    );
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.comment.trim()) { setErr("Name and message are required."); return; }
    setBusy(true); setErr("");
    try {
      const input: CommentInput = { blog_id: blogId, parent_id: null, ...form };
      const c = await postComment(input);
      setComments((prev) => [c, ...prev]);
      setOk(true); setForm({ name: "", email: "", comment: "" });
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    } catch (e: unknown) {
      setErr((e as Error).message ?? "Failed to post comment.");
    } finally { setBusy(false); }
  }

  return (
    <div className="mt-14 pt-10 border-t border-slate-800/60">
      <div className="flex items-center gap-3 mb-8">
        <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
        <h2 className="font-mono font-bold text-white text-lg uppercase tracking-widest">
          COMMENTS
          <span className="ml-3 text-slate-600 text-sm">[ {comments.length} ]</span>
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/20 to-transparent" />
      </div>

      <div className="space-y-5 mb-12">
        {comments.length === 0 ? (
          <div className="py-10 text-center font-mono text-slate-700 border border-slate-800/40 text-xs tracking-widest">
            NO_COMMENTS_YET — BE_THE_FIRST
          </div>
        ) : (
          comments.map((c) => (
            <CommentItem key={c.id} comment={c} blogId={blogId} onReplyPosted={addReply} />
          ))
        )}
      </div>

      <div className="bg-[#0b1426]/60 border border-cyan-500/10 p-6">
        <div className="flex items-center gap-2 mb-5">
          <span className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
          <span className="font-mono text-[10px] text-slate-600 uppercase tracking-widest">POST_A_COMMENT</span>
        </div>

        {ok && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="mb-4 px-4 py-3 bg-green-500/10 border border-green-500/25 font-mono text-xs text-green-400 tracking-wider">
            ✓ COMMENT_SUBMITTED — It may appear after moderation.
          </motion.div>
        )}

        <form ref={formRef} onSubmit={submit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-mono text-[9px] text-slate-700 uppercase tracking-widest block mb-1.5">NAME *</label>
              <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Your name" className="w-full bg-black/30 border border-slate-700/60 focus:border-cyan-500/40 text-white placeholder-slate-700 font-mono text-xs px-3 py-2.5 outline-none transition-colors" />
            </div>
            <div>
              <label className="font-mono text-[9px] text-slate-700 uppercase tracking-widest block mb-1.5">EMAIL (optional)</label>
              <input type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="your@email.com" className="w-full bg-black/30 border border-slate-700/60 focus:border-cyan-500/40 text-white placeholder-slate-700 font-mono text-xs px-3 py-2.5 outline-none transition-colors" />
            </div>
          </div>
          <div>
            <label className="font-mono text-[9px] text-slate-700 uppercase tracking-widest block mb-1.5">MESSAGE *</label>
            <textarea value={form.comment} onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
              rows={4} placeholder="Share your thoughts..." className="w-full bg-black/30 border border-slate-700/60 focus:border-cyan-500/40 text-white placeholder-slate-700 font-mono text-xs px-3 py-2.5 outline-none resize-none transition-colors" />
          </div>
          {err && <p className="font-mono text-[10px] text-orange-400">[ERROR] {err}</p>}
          <button type="submit" disabled={busy}
            className="px-8 py-2.5 bg-transparent border border-orange-500/40 text-orange-300 font-mono text-xs uppercase tracking-widest hover:bg-orange-500/10 hover:border-orange-400/60 disabled:opacity-40 transition-all flex items-center gap-2"
            style={{ clipPath: "polygon(6px 0,100% 0,100% calc(100% - 6px),calc(100% - 6px) 100%,0 100%,0 6px)" }}>
            {busy && <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.7, ease: "linear" }} className="inline-block w-3 h-3 border border-t-orange-400 border-orange-500/20 rounded-full" />}
            {busy ? "ENCRYPTING..." : "> SUBMIT_COMMENT"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════════════════════ */
export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const [blog, setBlog]               = useState<Blog | null>(null);
  const [recent, setRecent]           = useState<Blog[]>([]);
  const [categories, setCategories]   = useState<BlogCategory[]>([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState<string | null>(null);
  const [readProgress, setProgress]   = useState(0);
  const [liked, setLiked]             = useState(false);
  const [liking, setLiking]           = useState(false);
  const [likeCount, setLikeCount]     = useState(0);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  useEffect(() => {
    // Fetch the blog directly by slug — includes total_likes & total_views
    getBlogBySlug(slug)
      .then((found) => {
        setBlog(found);
        setLikeCount(found.total_likes ?? 0);
        const stored = JSON.parse(localStorage.getItem("liked_blogs") || "[]") as number[];
        setLiked(stored.includes(found.id));

        // Load sidebar data independently (non-blocking)
        getBlogCategories().then(setCategories).catch(() => {});
        getAllBlogs()
          .then((all) => {
            setRecent(
              all
                .filter((b) => b.slug !== slug)
                .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                .slice(0, 5)
            );
          })
          .catch(() => { /* sidebar degrades silently */ });
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    const el = document.documentElement;
    const onScroll = () => {
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? Math.round((el.scrollTop / total) * 100) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightboxIdx(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIdx]);

  async function handleLike() {
    if (!blog || liking || liked) return;
    setLiking(true);
    try {
      const res = await fetch(`${API_CONFIG.endpoints.blogs.like}/${blog.id}`, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
      });
      if (res.status === 201 || res.status === 429) {
        setLiked(true);
        if (res.status === 201) setLikeCount((c) => c + 1);
        const stored = JSON.parse(localStorage.getItem("liked_blogs") || "[]") as number[];
        localStorage.setItem("liked_blogs", JSON.stringify([...new Set([...stored, blog.id])]));
      }
    } catch { /* silent */ } finally {
      setLiking(false);
    }
  }

  const tags    = parseTags(blog?.tags ?? null);
  const gallery = parseImages(blog?.images ?? null).map((p) => resolveStorageUrl(p) || DUMMY_IMG);

  /* ── Loading ── */
  if (loading) return (
    <main className="min-h-screen bg-[#030014] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 font-mono text-cyan-400">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
          className="w-10 h-10 border-2 border-cyan-500/20 border-t-cyan-400 rounded-full" />
        <span className="text-xs tracking-widest animate-pulse">DECRYPTING_LOG...</span>
      </div>
    </main>
  );

  /* ── Error ── */
  if (error || !blog) return (
    <main className="min-h-screen bg-[#030014] flex items-center justify-center px-6">
      <div className="text-center font-mono space-y-4">
        <div className="text-7xl font-black text-slate-800/60">404</div>
        <div className="text-orange-400 text-sm tracking-widest">[LOG_NOT_FOUND]</div>
        <p className="text-slate-600 text-xs max-w-xs">{error ?? "The requested log entry does not exist."}</p>
        <Link href="/blogs">
          <button className="mt-4 px-6 py-2 border border-cyan-500/40 text-cyan-400 text-xs uppercase tracking-widest hover:bg-cyan-500/10 transition-colors">
            &lt; RETURN_TO_ARCHIVE
          </button>
        </Link>
      </div>
    </main>
  );

  /* ── Blog detail ── */
  return (
    <main className="min-h-screen bg-[#030014] relative overflow-x-hidden">

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightboxIdx(null)}
        >
          <button
            className="absolute top-4 right-5 font-mono text-slate-400 hover:text-white text-xl transition-colors z-10"
            onClick={() => setLightboxIdx(null)}
          >
            ✕
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-slate-700 text-slate-400 hover:text-white hover:border-cyan-400 transition-all font-mono z-10"
            onClick={(e) => { e.stopPropagation(); setLightboxIdx((lightboxIdx - 1 + gallery.length) % gallery.length); }}
          >
            ‹
          </button>
          <img
            src={gallery[lightboxIdx]}
            alt={`Gallery ${lightboxIdx + 1}`}
            className="max-w-full max-h-[85vh] object-contain border border-cyan-500/20"
            onClick={(e) => e.stopPropagation()}
            onError={(e) => { (e.target as HTMLImageElement).src = DUMMY_IMG; }}
          />
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-slate-700 text-slate-400 hover:text-white hover:border-cyan-400 transition-all font-mono z-10"
            onClick={(e) => { e.stopPropagation(); setLightboxIdx((lightboxIdx + 1) % gallery.length); }}
          >
            ›
          </button>
          <span className="absolute bottom-4 font-mono text-[10px] text-slate-600">
            {lightboxIdx + 1} / {gallery.length}
          </span>
        </div>
      )}

      {/* Reading progress */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-slate-900/80">
        <div className="h-full bg-gradient-to-r from-cyan-500 via-cyan-400 to-orange-400 transition-all duration-100" style={{ width: `${readProgress}%` }} />
      </div>

      <div className="fixed top-0 left-1/3 w-[700px] h-[500px] bg-cyan-500/[0.025] rounded-full blur-[180px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[500px] bg-orange-500/[0.025] rounded-full blur-[180px] pointer-events-none" />

      {/* ── Hero thumbnail ── */}
      <div className="relative w-full h-[38vh] sm:h-[48vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-[#030014] z-10" />
        <div className="absolute inset-0 bg-cyan-900/15 mix-blend-color z-[5]" />
        <img src={thumb(blog.thumbnail_image)} alt={blog.title}
          className="w-full h-full object-cover"
          onError={(e) => { (e.target as HTMLImageElement).src = DUMMY_IMG; }} />

       
      </div>

      {/* ── Main wrapper ── */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10 -mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* ════ LEFT: article + comments ════ */}
          <article className="lg:col-span-8 min-w-0">

            {/* Title block */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {categories.find((c) => c.id === blog.blog_category_id) && (
                  <span className="px-3 py-1 bg-cyan-950/60 border border-cyan-500/25 text-cyan-300 font-mono text-[9px] uppercase tracking-widest">
                    [{categories.find((c) => c.id === blog.blog_category_id)!.title.substring(0, 30)}]
                  </span>
                )}
                {blog.is_featured === 1 && (
                  <span className="px-3 py-1 bg-orange-500/15 border border-orange-500/35 text-orange-300 font-mono text-[9px] uppercase tracking-widest">★ FEATURED</span>
                )}
                <span className="flex items-center gap-1 px-3 py-1 bg-green-950/40 border border-green-500/20 text-green-400 font-mono text-[9px] uppercase tracking-widest">
                  <span className="w-1 h-1 bg-green-400 rounded-full animate-pulse" />{blog.status}
                </span>
              </div>

              <h1 className="font-mono font-black text-2xl sm:text-3xl md:text-4xl text-white leading-tight mb-5">
                {blog.title}
              </h1>

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-slate-600 pb-5 border-b border-slate-800/60">
                <span className="flex items-center gap-1.5">
                  <svg className="w-3 h-3 text-cyan-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  {fmtDate(blog.publish_date || blog.created_at)}
                </span>
                {(blog.reading_time ?? 0) > 0 && (blog.reading_time ?? 0) <= 300 && (
                  <span className="flex items-center gap-1.5">
                    <svg className="w-3 h-3 text-cyan-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {blog.reading_time} min read
                  </span>
                )}
                <span className="flex items-center gap-1.5 text-[11px]">
                  <span className="text-slate-700">#ID:{blog.id}</span>
                </span>
                {/* Like button */}
                <button
                  onClick={handleLike}
                  disabled={liking || liked}
                  className={`ml-auto flex items-center gap-1.5 px-3 py-1.5 border font-mono text-[10px] uppercase tracking-widest transition-all disabled:cursor-not-allowed ${
                    liked
                      ? "bg-rose-500/20 border-rose-500/60 text-rose-400 shadow-[0_0_12px_rgba(244,63,94,0.25)]"
                      : "bg-slate-900/40 border-slate-700/50 text-slate-500 hover:border-rose-500/40 hover:text-rose-400"
                  }`}
                >
                  <svg className="w-3.5 h-3.5" fill={liked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {liking ? "..." : liked ? "LIKED" : "LIKE"}
                  {likeCount > 0 && <span className="opacity-60">[{likeCount}]</span>}
                </button>
              </div>
            </motion.div>

            {/* Description + vertical image strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="flex gap-0 mb-10"
            >
              {/* Left: vertical image strip */}
              {gallery.length > 0 && (
                <div className="flex flex-col gap-2 w-[80px] sm:w-[96px] shrink-0 pr-4 border-r border-cyan-500/25 mr-5">
                  <span className="font-mono text-[8px] text-slate-700 uppercase tracking-widest mb-1">
                    {gallery.length} IMG
                  </span>
                  {gallery.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => setLightboxIdx(i)}
                      className="w-full aspect-video overflow-hidden border border-cyan-500/20 hover:border-cyan-400/60 transition-colors group relative"
                    >
                      <img
                        src={src}
                        alt={`Screenshot ${i + 1}`}
                        className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                        onError={(e) => { (e.target as HTMLImageElement).src = DUMMY_IMG; }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </button>
                  ))}
                </div>
              )}
              {/* Right: description */}
              {blog.description && (
                <p className="flex-1 font-mono text-slate-300 text-sm sm:text-[15px] leading-relaxed italic">
                  {stripHtml(blog.description)}
                </p>
              )}
            </motion.div>

           

            {/* Tags */}
            {tags.length > 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                className="mt-10 pt-8 border-t border-slate-800/40">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-[9px] text-slate-700 uppercase tracking-[0.2em]">// TAGS</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/15 to-transparent" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((t, i) => (
                    <span key={i} className="px-3 py-1 bg-[#0b1426]/60 border border-slate-800 text-slate-500 font-mono text-[10px] uppercase tracking-wider hover:border-cyan-500/25 hover:text-cyan-500 transition-colors cursor-default">
                      #{t}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Video */}
            {blog.video_link?.startsWith("http") && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                className="mt-6 p-4 bg-[#0b1426]/60 border border-cyan-500/12 flex items-center gap-3">
                <svg className="w-5 h-5 text-cyan-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <a href={blog.video_link} target="_blank" rel="noopener noreferrer"
                  className="font-mono text-xs text-cyan-500 hover:text-orange-400 transition-colors">
                  PLAY_VIDEO_LOG
                </a>
              </motion.div>
            )}

            {/* Comments */}
            <CommentsSection blogId={blog.id} initialComments={blog.comments ?? []} />

            {/* Bottom nav */}
            <div className="my-10 pt-6 border-t border-slate-800/40 flex items-center justify-between">
              <Link href="/blogs">
                <button className="group flex items-center gap-2 font-mono text-xs text-slate-600 hover:text-cyan-400 transition-colors uppercase tracking-widest">
                  <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                  BACK_TO_ARCHIVE
                </button>
              </Link>
              <span className="font-mono text-[10px] text-slate-700">{readProgress}% READ</span>
            </div>
          </article>

          {/* ════ RIGHT: sidebar ════ */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-24 space-y-5">

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                className="bg-[#0b1426]/70 border border-slate-800/60 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                  <span className="font-mono text-[9px] text-slate-600 uppercase tracking-widest">LOG_METADATA</span>
                </div>
                <ul className="space-y-3">
                  {[
                    { k: "PUBLISHED",   v: fmtDate(blog.publish_date || blog.created_at) },
                    { k: "UPDATED",     v: fmtDate(blog.updated_at) },
                    { k: "TOTAL_LIKES", v: String(likeCount) },
                    { k: "TOTAL_VIEWS", v: String(blog.total_views ?? 0) },
                    (blog.reading_time ?? 0) > 0 && (blog.reading_time ?? 0) <= 300
                      ? { k: "READ_TIME", v: `${blog.reading_time} min` }
                      : null,
                  ].filter(Boolean).map((item) => (
                    <li key={item!.k} className="flex items-start justify-between gap-2">
                      <span className="font-mono text-[9px] text-slate-700 uppercase tracking-widest shrink-0">{item!.k}</span>
                      <span className="font-mono text-[11px] text-slate-300 text-right">{item!.v}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {recent.length > 0 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                  className="bg-[#0b1426]/70 border border-slate-800/60 p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
                    <span className="font-mono text-[9px] text-slate-600 uppercase tracking-widest">RECENT_LOGS</span>
                  </div>
                  <div className="space-y-3">
                    {recent.map((b) => (
                      <Link key={b.id} href={`/blogs/${b.slug}`} className="flex gap-3 group">
                        <div className="w-14 h-14 shrink-0 overflow-hidden border border-cyan-500/10 group-hover:border-orange-400/30 transition-colors">
                          <img src={thumb(b.thumbnail_image)} alt={b.title}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                            onError={(e) => { (e.target as HTMLImageElement).src = DUMMY_IMG; }} />
                        </div>
                        <div className="min-w-0 flex flex-col justify-center">
                          <p className="font-mono text-xs text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug mb-1">
                            {b.title}
                          </p>
                          <span className="font-mono text-[9px] text-slate-700">{fmtDate(b.created_at, true)}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}

              {categories.length > 0 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
                  className="bg-[#0b1426]/70 border border-slate-800/60 p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                    <span className="font-mono text-[9px] text-slate-600 uppercase tracking-widest">CATEGORIES</span>
                  </div>
                  <div className="space-y-0.5 max-h-[260px] overflow-y-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
                    {categories.map((cat) => (
                      <Link key={cat.id} href={`/blogs?category_id=${cat.id}`}
                        className="flex items-center justify-between px-3 py-2 border border-transparent hover:border-cyan-500/20 hover:bg-cyan-500/5 transition-all group">
                        <span className="font-mono text-[11px] text-slate-500 group-hover:text-slate-200 transition-colors truncate flex items-center gap-2 min-w-0">
                          <span className="text-cyan-800 shrink-0">&gt;</span>
                          <span className="truncate">{cat.title.substring(0, 26)}</span>
                        </span>
                        <span className="font-mono text-[10px] px-1.5 py-0.5 bg-slate-800/80 text-slate-600 group-hover:bg-cyan-500/10 group-hover:text-cyan-500 transition-all shrink-0 ml-2">
                          {cat.blog_count}
                        </span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}

              {tags.length > 0 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
                  className="bg-[#0b1426]/70 border border-slate-800/60 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-1.5 h-1.5 bg-slate-600 rounded-full" />
                    <span className="font-mono text-[9px] text-slate-600 uppercase tracking-widest">TAGS</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map((t, i) => (
                      <span key={i} className="px-2 py-0.5 bg-slate-900/60 border border-slate-800 text-slate-600 font-mono text-[9px] uppercase">
                        #{t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 }}
              >
                <Link
                  href="/blogs"
                  className="flex items-center justify-center gap-2 w-full py-3 border border-purple-500/15 text-slate-600 font-mono text-[10px] uppercase tracking-widest hover:border-purple-500/30 hover:text-purple-400 transition-all"
                >
                  &lt; ALL_BLOGS
                </Link>
              </motion.div>
            </div>
          </aside>
        </div>
      </div>

      {/* Blog prose styles */}
      <style>{`
        .blog-content h1,.blog-content h2,.blog-content h3,.blog-content h4{color:#e2e8f0;font-weight:700;margin:1.6em 0 .5em;line-height:1.3}
        .blog-content h1{font-size:1.5rem}.blog-content h2{font-size:1.25rem;border-left:2px solid rgba(6,182,212,.35);padding-left:.75rem}.blog-content h3{font-size:1.05rem;color:#67e8f9}
        .blog-content p{margin:.75em 0}.blog-content a{color:#22d3ee;text-decoration:underline;text-underline-offset:3px}.blog-content a:hover{color:#fb923c}
        .blog-content code{background:rgba(6,182,212,.07);border:1px solid rgba(6,182,212,.12);padding:.1em .4em;font-size:.85em;color:#67e8f9}
        .blog-content pre{background:#0b1426;border:1px solid rgba(6,182,212,.18);padding:1.2rem;overflow-x:auto;margin:1.2em 0;border-radius:0}
        .blog-content pre code{background:none;border:none;padding:0;color:#94a3b8}
        .blog-content blockquote{border-left:3px solid rgba(249,115,22,.45);padding-left:1rem;color:#94a3b8;font-style:italic;margin:1.2em 0}
        .blog-content ul{list-style:none;padding-left:0}.blog-content ul li::before{content:"> ";color:#22d3ee}
        .blog-content ol{padding-left:1.2rem;counter-reset:li}.blog-content ol li{counter-increment:li;list-style:none}
        .blog-content ol li::before{content:counter(li)". ";color:#fb923c}
        .blog-content img{max-width:100%;border:1px solid rgba(6,182,212,.12)}.blog-content strong{color:#e2e8f0}.blog-content hr{border-color:rgba(6,182,212,.08);margin:2em 0}
        .blog-content table{width:100%;border-collapse:collapse;font-size:.85em}
        .blog-content th{background:rgba(6,182,212,.07);color:#67e8f9;padding:.5em .75em;border:1px solid rgba(6,182,212,.12);text-align:left}
        .blog-content td{padding:.5em .75em;border:1px solid rgba(30,41,59,.7)}
      `}</style>
    </main>
  );
}
