
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getAllMarketplaces, type Marketplace } from "@/lib/services/marketplace";
import { API_CONFIG } from "@/config/api";

const DUMMY_IMG = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80";

function thumb(path: string | null): string {
  if (!path) return DUMMY_IMG;
  if (path.startsWith("http")) return path;
  return `${API_CONFIG.baseUrl}/${path}`;
}

export default function CheckoutPage() {
  const { slug } = useParams<{ slug: string }>();
  const [complete, setComplete] = useState(false);
  const [marketplace, setMarketplace] = useState<Marketplace | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    trx_number: "",
  });

  useEffect(() => {
    getAllMarketplaces()
      .then((all) => {
        const found = all.find((p) => p.slug === slug);
        if (found) setMarketplace(found);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  async function handleCheckoutSubmit() {
    if (!marketplace) return;
    setSubmitting(true);
    try {
      const payload = {
        digital_product_id: marketplace.id,
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        phone: form.phone,
        trx_number: form.trx_number,
       
        payment_status: "pending",
      };

      const res = await fetch(
        `${API_CONFIG.baseUrl}/api/submit-digital-product-order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (res.ok || res.status === 201) {
        setComplete(true);
      } else {
        alert("Order submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
      return (
        <main className="min-h-screen bg-[#030014] flex items-center justify-center font-mono">
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-10 h-10 border-2 border-green-500/20 border-t-green-400 rounded-full" />
        </main>
      );
  }

  const productName = marketplace?.title || marketplace?.name || slug;

  return (
    <main className="min-h-screen bg-[#030014] flex flex-col items-center py-24 px-4 relative overflow-x-hidden font-mono">
      <div className="fixed top-0 left-1/4 w-[600px] h-[500px] bg-green-500/[0.03] rounded-full blur-[180px] pointer-events-none" />
      
      {!complete ? (
      <div className="w-full max-w-[800px] z-10 space-y-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <h1 className="text-3xl text-green-400 font-bold tracking-widest uppercase mb-4 drop-shadow-[0_0_15px_rgba(34,197,94,0.4)]">Secure Checkout</h1>
            <p className="text-green-500/60 text-sm">Review your product and complete your transaction.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="bg-[#0b1426]/80 backdrop-blur-xl border border-green-500/30 p-1 shadow-[0_0_30px_rgba(34,197,94,0.05)] rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-green-500/50 to-transparent left-0" />
            
            <div className="bg-[#0b1426] rounded-xl p-8 rounded-t-xl relative z-10">
                <div className="flex flex-col sm:flex-row gap-6 mb-8 border-b border-green-500/20 pb-6">
                    <div className="w-full sm:w-[150px] h-[100px] shrink-0 rounded-lg overflow-hidden border border-green-500/20">
                        <img src={marketplace ? thumb(marketplace.thumbnail_image) : DUMMY_IMG} alt={productName} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col justify-center flex-1">
                        <div className="flex items-center gap-2 mb-2">
                             <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                             <span className="text-[10px] text-green-400 uppercase tracking-widest">Digital Product</span>
                        </div>
                       <h2 className="text-white font-bold tracking-widest text-xl uppercase font-sans line-clamp-2 leading-snug">{productName}</h2>
                       <p className="text-[10px] text-slate-500 mt-2 uppercase tracking-widest">Lifetime License + Free Updates</p>
                    </div>
                    <div className="flex items-center sm:items-start shrink-0">
                        <span className="text-green-400 text-2xl font-bold font-sans">$99.00</span>
                    </div>
                </div>

                <form className="space-y-6" onSubmit={async (e) => { e.preventDefault(); await handleCheckoutSubmit(); }}>
                    <div className="space-y-4">
                        <h3 className="text-green-400/80 border-l-2 border-green-500/50 pl-3 tracking-widest text-sm uppercase mb-4 border-b border-slate-800 pb-2">Billing Information</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input required placeholder="First Name" value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })} className="bg-black/50 border border-slate-800 rounded-md text-white p-3 text-sm focus:border-green-500/50 outline-none font-sans" />
                            <input required placeholder="Last Name" value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })} className="bg-black/50 border border-slate-800 rounded-md text-white p-3 text-sm focus:border-green-500/50 outline-none font-sans" />
                        </div>
                        <input required type="email" placeholder="Email Address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full bg-black/50 border border-slate-800 rounded-md text-white p-3 text-sm focus:border-green-500/50 outline-none font-sans" />
                        <input required type="tel" placeholder="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full bg-black/50 border border-slate-800 rounded-md text-white p-3 text-sm focus:border-green-500/50 outline-none font-sans" />
                    </div>

                    <div className="space-y-4 pt-6">
                        <h3 className="text-green-400/80 border-l-2 border-green-500/50 pl-3 tracking-widest text-sm uppercase mb-4 border-b border-slate-800 pb-2">Transaction ID</h3>
                        <input required placeholder="Transaction ID (e.g., TRX-20260502-001)" value={form.trx_number} onChange={(e) => setForm({ ...form, trx_number: e.target.value })} className="w-full bg-black/50 border border-slate-800 rounded-md text-white p-3 text-sm focus:border-green-500/50 outline-none font-sans" />
                    </div>

                    <button type="submit" disabled={submitting} className="w-full mt-8 py-4 rounded-xl bg-green-500 hover:bg-green-400 disabled:bg-green-500/50 disabled:cursor-not-allowed text-black font-bold uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] flex justify-center items-center gap-3">
                        {submitting ? (
                          <>
                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                            Complete Order
                          </>
                        )}
                    </button>
                    
                    <p className="text-center font-mono text-[9px] text-slate-600 mt-4 uppercase flex items-center justify-center gap-2">
                        <svg className="w-3 h-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                        256-bit SSL Encrypted Secure Checkout
                    </p>
                </form>
            </div>
        </motion.div>
      </div> ) : (

      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-[600px] mt-20 z-10 bg-[#0b1426]/90 backdrop-blur-xl border border-green-500/40 p-10 text-center shadow-[0_0_50px_rgba(34,197,94,0.1)] rounded-3xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-green-500/5 to-transparent pointer-events-none" />
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
            <svg className="w-10 h-10 text-green-400 drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
        </div>
        <h2 className="text-2xl text-white font-bold tracking-[0.3em] mb-4 text-shadow-md">  
             SUCCESSFULLY ORDERED PLACED
        </h2>
        <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-[400px] mx-auto font-sans">
            Thank you for interest to  purchasing <span className="text-green-400 font-bold">{productName}</span>. <br/><br/>You will receive an email shortly with your download instructions and license key.
        </p>
        <Link href="/marketplace">
            <button className="px-8 py-3 bg-green-500/10 border border-green-500/40 rounded-xl text-green-400 uppercase tracking-widest hover:bg-green-500/20 hover:text-green-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all text-xs font-bold font-mono">
                Return to Products
            </button>
        </Link>
      </motion.div>
      )}
    </main>
  );
}
