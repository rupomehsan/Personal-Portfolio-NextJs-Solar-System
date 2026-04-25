"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  getAllMarketplaces,
  extractMarketplaceCategories,
  parseTags,
  type Marketplace,
} from "@/lib/services/marketplace";
import { API_CONFIG } from "@/config/api";
import { getComments, postComment, type Comment, type CommentInput } from "@/lib/services/comment";
import { useRef } from "react";

/* ─── helpers ─────────────────────────────────────────────────────────────── */
const DUMMY_IMG =
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80";

function fmtDate(s: string | null | undefined, short = false) {
  if (!s) return "—";
  const d = new Date(s);
  if (isNaN(d.getTime())) return s;
  return short
    ? `${String(d.getDate()).padStart(2, "0")} ${d.toLocaleString("en-US", { month: "short" })}`
    : d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function thumb(p: string | null) {
  if (!p) return DUMMY_IMG;
  if (p.startsWith("http")) return p;
  return `${API_CONFIG.baseUrl}/storage/${p}`;
}

function toHTML(content: string | null): string {
  if (!content) return "";
  if (/<[a-z][\s\S]*>/i.test(content)) return content;
  return content
    .split(/\n{2,}/)
    .filter(Boolean)
    .map((p) => `<p>${p.replace(/\n/g, "<br>")}</p>`)
    .join("");
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════════════════════ */
/* ─── comment avatar ─────────────────────────────────────────────────────── */
function Avatar({ name }: { name: string }) {
  const colors = ["#0e7490", "#b45309", "#065f46", "#7c3aed", "#be123c"];
  const color  = colors[name.charCodeAt(0) % colors.length];
  return (
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-sm text-white shrink-0"
      style={{ background: color }}
    >
      {name.charAt(0).toUpperCase()}
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
      <Avatar name={comment.name} />
      <div className="flex-1 min-w-0">
        <div className="bg-[#0d1a2d]/80 border border-cyan-500/10 p-4">
          <div className="flex items-baseline gap-3 mb-2 flex-wrap">
            <span className="font-mono font-bold text-sm text-white">{comment.name}</span>
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

        {/* Inline reply form */}
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

        {/* Nested replies */}
        {(comment.replies ?? []).length > 0 && (
          <div className="mt-2 ml-4 pl-4 border-l border-cyan-500/10 space-y-2">
            {comment.replies!.map((r) => (
              <div key={r.id} className="flex gap-2.5">
                <Avatar name={r.name} />
                <div className="flex-1 bg-[#0d1a2d]/60 border border-slate-800/50 p-3">
                  <div className="flex items-baseline gap-3 mb-1.5 flex-wrap">
                    <span className="font-mono font-bold text-xs text-slate-200">{r.name}</span>
                    <span className="font-mono text-[9px] text-slate-700">{fmtDate(r.created_at)}</span>
                  </div>
                  <p className="font-mono text-slate-500 text-[11px] leading-relaxed">{r.comment}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── comments section ───────────────────────────────────────────────────── */
function CommentsSection({ blogId }: { blogId: number }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading]   = useState(true);
  const [form, setForm]         = useState({ name: "", email: "", comment: "" });
  const [busy, setBusy]         = useState(false);
  const [err, setErr]           = useState("");
  const [ok, setOk]             = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    getComments(blogId).then(setComments).finally(() => setLoading(false));
  }, [blogId]);

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
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
        <h2 className="font-mono font-bold text-white text-lg uppercase tracking-widest">
          COMMENTS
          {!loading && (
            <span className="ml-3 text-slate-600 text-sm">[ {comments.length} ]</span>
          )}
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/20 to-transparent" />
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center gap-3 font-mono text-[11px] text-slate-600 py-6">
          <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
            className="inline-block w-3 h-3 border border-t-cyan-500 border-cyan-500/20 rounded-full" />
          LOADING_COMMENTS...
        </div>
      )}

      {/* Comment list */}
      {!loading && (
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
      )}

      {/* Add comment form */}
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


export default function MarketplaceDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const [marketplace, setMarketplace]         = useState<Marketplace | null>(null);
  const [related, setRelated]         = useState<Marketplace[]>([]);
  const [categories, setCategories]   = useState<{ type: string; count: number }[]>([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState<string | null>(null);
  const [readProgress, setProgress]   = useState(0);

  useEffect(() => {
    getAllMarketplaces()
      .then((all) => {
        const found = all.find((p) => p.slug === slug);
        if (!found) throw new Error(`Marketplace "${slug}" not found`);
        setMarketplace(found);
        setCategories(extractMarketplaceCategories(all));
        setRelated(
          all
            .filter((p) => p.slug !== slug)
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
            .slice(0, 5)
        );
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

  const tags       = parseTags(marketplace?.tags ?? null);
  const techStack  = marketplace?.technology
    ? marketplace.technology.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  /* ── Loading ── */
  if (loading) return (
    <main className="min-h-screen bg-[#030014] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 font-mono text-purple-400">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
          className="w-10 h-10 border-2 border-purple-500/20 border-t-purple-400 rounded-full"
        />
        <span className="text-xs tracking-widest animate-pulse">LOADING_PRODUCT...</span>
      </div>
    </main>
  );

  /* ── Error ── */
  if (error || !marketplace) return (
    <main className="min-h-screen bg-[#030014] flex items-center justify-center px-6">
      <div className="text-center font-mono space-y-4">
        <div className="text-7xl font-black text-slate-800/60">404</div>
        <div className="text-purple-400 text-sm tracking-widest">[PRODUCT_NOT_FOUND]</div>
        <p className="text-slate-600 text-xs max-w-xs">{error ?? "The requested marketplace does not exist."}</p>
        <Link href="/marketplace">
          <button className="mt-4 px-6 py-2 border border-purple-500/40 text-purple-400 text-xs uppercase tracking-widest hover:bg-purple-500/10 transition-colors">
            &lt; RETURN_TO_PRODUCTS
          </button>
        </Link>
      </div>
    </main>
  );

  /* ── Marketplace detail ── */
  return (
    <main className="min-h-screen bg-[#030014] relative overflow-x-hidden">

      {/* Reading progress */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-slate-900/80">
        <div
          className="h-full bg-gradient-to-r from-purple-500 via-purple-400 to-cyan-400 transition-all duration-100"
          style={{ width: `${readProgress}%` }}
        />
      </div>

      {/* Background glows */}
      <div className="fixed top-0 left-1/3 w-[700px] h-[500px] bg-purple-500/[0.025] rounded-full blur-[180px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[500px] bg-cyan-500/[0.025] rounded-full blur-[180px] pointer-events-none" />

      {/* ── Hero image ── */}
      <div className="relative w-full h-[38vh] sm:h-[48vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-[#030014] z-10" />
        <div className="absolute inset-0 bg-purple-900/15 mix-blend-color z-[5]" />
        <img
          src={thumb(marketplace.thumbnail_image)}
          alt={marketplace.title || marketplace.name || "Marketplace"}
          className="w-full h-full object-cover"
          onError={(e) => { (e.target as HTMLImageElement).src = DUMMY_IMG; }}
        />

        {/* Breadcrumb inside hero */}
        <div className="absolute top-24 left-0 right-0 z-20 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 font-mono text-[11px] text-slate-400"
          >
            <Link href="/" className="hover:text-purple-400 transition-colors">root@sys:~</Link>
            <span className="text-slate-700">/</span>
            <Link href="/marketplace" className="hover:text-purple-400 transition-colors">marketplace</Link>
            <span className="text-slate-700">/</span>
            <span className="text-purple-400 truncate max-w-[200px] sm:max-w-none">{marketplace.slug}</span>
          </motion.div>
        </div>
      </div>

      {/* ── Main wrapper ── */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10 -mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* ════ LEFT: article ════ */}
          <article className="lg:col-span-8 min-w-0">

            {/* Title block */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {marketplace.category && (
                  <span className="px-3 py-1 bg-purple-950/60 border border-purple-500/25 text-purple-300 font-mono text-[9px] uppercase tracking-widest">
                    [{marketplace.category.substring(0, 30)}]
                  </span>
                )}
                {marketplace.is_featured === 1 && (
                  <span className="px-3 py-1 bg-cyan-500/15 border border-cyan-500/35 text-cyan-300 font-mono text-[9px] uppercase tracking-widest">
                    ★ FEATURED
                  </span>
                )}
                <span className="flex items-center gap-1 px-3 py-1 bg-green-950/40 border border-green-500/20 text-green-400 font-mono text-[9px] uppercase tracking-widest">
                  <span className="w-1 h-1 bg-green-400 rounded-full animate-pulse" />
                  {marketplace.status}
                </span>
              </div>

              <h1 className="font-mono font-black text-2xl sm:text-3xl md:text-4xl text-white leading-tight mb-5">
                {marketplace.title || marketplace.name}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs text-slate-600 pb-5 border-b border-slate-800/60">
                {marketplace.start_date && (
                  <span className="flex items-center gap-1.5">
                    <svg className="w-3 h-3 text-purple-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    START: {fmtDate(marketplace.start_date)}
                  </span>
                )}
                {marketplace.end_date && (
                  <span className="flex items-center gap-1.5">
                    <svg className="w-3 h-3 text-purple-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    END: {fmtDate(marketplace.end_date)}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <span className="text-slate-700">#</span>
                  <span className="text-slate-700">ID:{marketplace.id}</span>
                </span>
              </div>
            </motion.div>

            {/* Description lead */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="font-mono text-slate-300 text-sm sm:text-[15px] leading-relaxed border-l-2 border-purple-500/35 pl-5 mb-10 italic"
            >
              {marketplace.description}
            </motion.p>

            {/* Tech stack */}
            {techStack.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-10 p-5 bg-[#0d0a1e]/70 border border-purple-500/12"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-[9px] text-slate-700 uppercase tracking-[0.2em]">// TECH_STACK</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-purple-500/20 to-transparent" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-purple-950/40 border border-purple-500/20 text-purple-300 font-mono text-[10px] uppercase tracking-wider hover:border-purple-400/40 hover:text-purple-200 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Content */}
            {marketplace.content && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-mono text-[9px] text-slate-700 uppercase tracking-[0.2em]">// CONTENT</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-purple-500/20 to-transparent" />
                </div>
                <div
                  className="marketplace-content font-mono text-slate-400 text-[13px] leading-[1.95]"
                  dangerouslySetInnerHTML={{ __html: toHTML(marketplace.content) }}
                />
              </motion.div>
            )}

            {/* Tags */}
            {tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-10 pt-8 border-t border-slate-800/40"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-[9px] text-slate-700 uppercase tracking-[0.2em]">// TAGS</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-purple-500/15 to-transparent" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((t, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-[#0d0a1e]/60 border border-slate-800 text-slate-500 font-mono text-[10px] uppercase tracking-wider hover:border-purple-500/25 hover:text-purple-400 transition-colors cursor-default"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            <CommentsSection blogId={marketplace.id} />

            {/* Marketplace links */}
            {(marketplace.marketplace_url || marketplace.github_url) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-10 pt-8 border-t border-slate-800/40"
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-mono text-[9px] text-slate-700 uppercase tracking-[0.2em]">// PROJECT_LINKS</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-purple-500/15 to-transparent" />
                </div>
                <div className="flex flex-wrap gap-3">
                  {marketplace.marketplace_url && (
                    <a
                      href={marketplace.marketplace_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 bg-purple-500/10 border border-purple-500/30 text-purple-300 font-mono text-xs uppercase tracking-widest hover:bg-purple-500/20 hover:border-purple-400/50 transition-all"
                      style={{ clipPath: "polygon(6px 0,100% 0,100% calc(100% - 6px),calc(100% - 6px) 100%,0 100%,0 6px)" }}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      LIVE_DEMO
                    </a>
                  )}
                  {marketplace.github_url && (
                    <a
                      href={marketplace.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 bg-slate-900/60 border border-slate-700/50 text-slate-300 font-mono text-xs uppercase tracking-widest hover:bg-slate-800/60 hover:border-slate-500/60 hover:text-white transition-all"
                      style={{ clipPath: "polygon(6px 0,100% 0,100% calc(100% - 6px),calc(100% - 6px) 100%,0 100%,0 6px)" }}
                    >
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      SOURCE_CODE
                    </a>
                  )}
                </div>
              </motion.div>
            )}

            {/* Bottom nav */}
            <div className="mt-12 pt-6 border-t border-slate-800/40 flex items-center justify-between">
              <Link href="/marketplace">
                <button className="group flex items-center gap-2 font-mono text-xs text-slate-600 hover:text-purple-400 transition-colors uppercase tracking-widest">
                  <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  BACK_TO_PRODUCTS
                </button>
              </Link>
              <span className="font-mono text-[10px] text-slate-700">{readProgress}% READ</span>
            </div>
          </article>

          {/* ════ RIGHT: sidebar ════ */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-24 space-y-5">

              {/* Purchase Box */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-gradient-to-br from-green-500/10 to-emerald-900/40 p-[2px] rounded-2xl shadow-[0_0_40px_rgba(34,197,94,0.15)] relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-green-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <div className="bg-[#030014]/95 backdrop-blur-xl rounded-[14px] p-6 relative z-10 border border-green-500/20">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                    <span className="font-mono text-[10px] text-green-400 uppercase tracking-[0.2em] font-bold">Lifetime Access</span>
                  </div>
                  
                  <div className="mb-6 pb-6 border-b border-green-500/20">
                    <div className="flex items-end gap-2 mb-2">
                       <span className="text-4xl text-white font-black leading-none">$99.00</span>
                       <span className="text-slate-400 text-sm mb-1 font-mono">USD</span>
                    </div>
                    <p className="text-slate-400 text-xs font-mono leading-relaxed mt-3">
                      Includes full source code, comprehensive documentation, and lifetime free updates for this product.
                    </p>
                  </div>

                  <ul className="space-y-3 mb-8 font-mono text-[10px] text-slate-300">
                    <li className="flex items-center gap-2.5">
                      <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                      Instant Digital Download
                    </li>
                    <li className="flex items-center gap-2.5">
                      <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                      Commercial Use License
                    </li>
                    <li className="flex items-center gap-2.5">
                      <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                      6 Months Technical Support
                    </li>
                  </ul>

                  <Link href={`/marketplace/${marketplace.slug}/checkout`}>
                    <button className="w-full relative py-4 px-6 bg-green-500 text-black font-bold uppercase tracking-widest text-xs rounded-xl overflow-hidden group/buy shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-all">
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/buy:translate-y-0 transition-transform duration-300 ease-out" />
                      <span className="relative flex items-center justify-center gap-3">
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Secure Checkout
                      </span>
                    </button>
                  </Link>
                </div>
              </motion.div>


              {/* Marketplace meta */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-[#0d0a1e]/70 border border-purple-500/12 p-5"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" />
                  <span className="font-mono text-[9px] text-slate-600 uppercase tracking-widest">PRODUCT_METADATA</span>
                </div>
                <ul className="space-y-3">
                  {[
                    { k: "STATUS",    v: marketplace.status.toUpperCase() },
                    { k: "CATEGORY",  v: marketplace.category ?? "—" },
                    { k: "START",     v: fmtDate(marketplace.start_date) },
                    { k: "END",       v: fmtDate(marketplace.end_date) },
                    { k: "CREATED",   v: fmtDate(marketplace.created_at) },
                    { k: "MOD_ID",    v: `#${marketplace.id}` },
                  ].map(({ k, v }) => (
                    <li key={k} className="flex items-start justify-between gap-2">
                      <span className="font-mono text-[9px] text-slate-700 uppercase tracking-widest shrink-0">{k}</span>
                      <span className="font-mono text-[11px] text-slate-300 text-right truncate ml-2">{v}</span>
                    </li>
                  ))}
                </ul>

                {/* Quick links inside metadata */}
                {(marketplace.marketplace_url || marketplace.github_url) && (
                  <div className="mt-4 pt-4 border-t border-purple-500/10 space-y-2">
                    {marketplace.marketplace_url && (
                      <a
                        href={marketplace.marketplace_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 font-mono text-[10px] text-purple-500 hover:text-purple-300 transition-colors"
                      >
                        <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        LIVE_PREVIEW
                      </a>
                    )}
                    {marketplace.github_url && (
                      <a
                        href={marketplace.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 font-mono text-[10px] text-slate-500 hover:text-slate-200 transition-colors"
                      >
                        <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        GITHUB_REPO
                      </a>
                    )}
                  </div>
                )}
              </motion.div>

              {/* Tech stack sidebar */}
              {techStack.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 }}
                  className="bg-[#0d0a1e]/70 border border-purple-500/12 p-5"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                    <span className="font-mono text-[9px] text-slate-600 uppercase tracking-widest">TECH_STACK</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-purple-950/40 border border-purple-500/20 text-purple-400 font-mono text-[9px] uppercase"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Related marketplace */}
              {related.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-[#0d0a1e]/70 border border-purple-500/12 p-5"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
                    <span className="font-mono text-[9px] text-slate-600 uppercase tracking-widest">RELATED_PRODUCTS</span>
                  </div>
                  <div className="space-y-3">
                    {related.map((p) => (
                      <Link key={p.id} href={`/marketplace/${p.slug}`} className="flex gap-3 group">
                        <div className="w-14 h-14 shrink-0 overflow-hidden border border-purple-500/10 group-hover:border-orange-400/30 transition-colors">
                          <img
                            src={thumb(p.thumbnail_image)}
                            alt={p.title || p.name || "Marketplace"}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                            onError={(e) => { (e.target as HTMLImageElement).src = DUMMY_IMG; }}
                          />
                        </div>
                        <div className="min-w-0 flex flex-col justify-center">
                          <p className="font-mono text-xs text-white group-hover:text-purple-300 transition-colors line-clamp-2 leading-snug mb-1">
                            {p.title || p.name}
                          </p>
                          <span className="font-mono text-[9px] text-slate-700">{fmtDate(p.created_at, true)}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Categories */}
              {categories.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-[#0d0a1e]/70 border border-purple-500/12 p-5"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                    <span className="font-mono text-[9px] text-slate-600 uppercase tracking-widest">CATEGORIES</span>
                  </div>
                  <div className="space-y-0.5 max-h-[260px] overflow-y-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
                    {categories.map(({ type, count }) => (
                      <Link
                        key={type}
                        href={`/marketplace?category=${encodeURIComponent(type)}`}
                        className="flex items-center justify-between px-3 py-2 border border-transparent hover:border-purple-500/20 hover:bg-purple-500/5 transition-all group"
                      >
                        <span className="font-mono text-[11px] text-slate-500 group-hover:text-slate-200 transition-colors truncate flex items-center gap-2 min-w-0">
                          <span className="text-purple-800 shrink-0">&gt;</span>
                          <span className="truncate">{type.substring(0, 26)}</span>
                        </span>
                        <span className="font-mono text-[10px] px-1.5 py-0.5 bg-slate-800/80 text-slate-600 group-hover:bg-purple-500/10 group-hover:text-purple-400 transition-all shrink-0 ml-2">
                          {count}
                        </span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Tags sidebar */}
              {tags.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-[#0d0a1e]/70 border border-purple-500/12 p-5"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-1.5 h-1.5 bg-slate-600 rounded-full" />
                    <span className="font-mono text-[9px] text-slate-600 uppercase tracking-widest">TAGS</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map((t, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-slate-900/60 border border-slate-800 text-slate-600 font-mono text-[9px] uppercase"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Back link */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 }}
              >
                <Link href="/marketplace"
                  className="flex items-center justify-center gap-2 w-full py-3 border border-purple-500/15 text-slate-600 font-mono text-[10px] uppercase tracking-widest hover:border-purple-500/30 hover:text-purple-400 transition-all"
                >
                  &lt; ALL_PRODUCTS
                </Link>
              </motion.div>
            </div>
          </aside>
        </div>
      </div>

      {/* Marketplace prose styles */}
      <style>{`
        .marketplace-content h1,.marketplace-content h2,.marketplace-content h3,.marketplace-content h4{color:#e2e8f0;font-weight:700;margin:1.6em 0 .5em;line-height:1.3}
        .marketplace-content h1{font-size:1.5rem}.marketplace-content h2{font-size:1.25rem;border-left:2px solid rgba(168,85,247,.35);padding-left:.75rem}.marketplace-content h3{font-size:1.05rem;color:#c4b5fd}
        .marketplace-content p{margin:.75em 0}.marketplace-content a{color:#a78bfa;text-decoration:underline;text-underline-offset:3px}.marketplace-content a:hover{color:#22d3ee}
        .marketplace-content code{background:rgba(168,85,247,.07);border:1px solid rgba(168,85,247,.12);padding:.1em .4em;font-size:.85em;color:#c4b5fd}
        .marketplace-content pre{background:#0d0a1e;border:1px solid rgba(168,85,247,.18);padding:1.2rem;overflow-x:auto;margin:1.2em 0;border-radius:0}
        .marketplace-content pre code{background:none;border:none;padding:0;color:#94a3b8}
        .marketplace-content blockquote{border-left:3px solid rgba(168,85,247,.45);padding-left:1rem;color:#94a3b8;font-style:italic;margin:1.2em 0}
        .marketplace-content ul{list-style:none;padding-left:0}.marketplace-content ul li::before{content:"> ";color:#a78bfa}
        .marketplace-content ol{padding-left:1.2rem;counter-reset:li}.marketplace-content ol li{counter-increment:li;list-style:none}
        .marketplace-content ol li::before{content:counter(li)". ";color:#22d3ee}
        .marketplace-content img{max-width:100%;border:1px solid rgba(168,85,247,.12)}.marketplace-content strong{color:#e2e8f0}.marketplace-content hr{border-color:rgba(168,85,247,.08);margin:2em 0}
        .marketplace-content table{width:100%;border-collapse:collapse;font-size:.85em}
        .marketplace-content th{background:rgba(168,85,247,.07);color:#c4b5fd;padding:.5em .75em;border:1px solid rgba(168,85,247,.12);text-align:left}
        .marketplace-content td{padding:.5em .75em;border:1px solid rgba(30,41,59,.7)}
      `}</style>
    </main>
  );
}
