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

