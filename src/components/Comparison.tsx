'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { X, Check, ArrowRight, ShieldCheck, Zap, UserCheck, Sparkles } from 'lucide-react';
import { useTranslation } from '@/context/LanguageContext';

export default function Comparison() {
  const { t } = useTranslation();

  return (
    <section className="py-24 sm:py-32 relative bg-slate-50/60 border-b border-slate-200/80 overflow-hidden">
      {/* Background Aura Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] aura-glow-blue pointer-events-none opacity-40 blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-blue-700 bg-blue-50 border border-blue-200/80 mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>{t.comparison.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 mb-4">
            {t.comparison.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            {t.comparison.subtitle}
          </p>
        </motion.div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch relative">
          
          {/* Traditional Agencies Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl p-7 sm:p-9 bg-white/70 backdrop-blur-sm border border-slate-200 shadow-2xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-200">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block mb-1">
                    Eski Nesil Model
                  </span>
                  <h3 className="text-2xl font-bold text-slate-700">
                    {t.comparison.traditionalTitle}
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-mono text-sm font-bold">
                  VS
                </div>
              </div>

              <ul className="space-y-4">
                {t.comparison.traditionalPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3.5 text-sm text-slate-500">
                    <div className="w-5 h-5 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center shrink-0 mt-0.5 text-rose-500">
                      <X className="w-3 h-3 stroke-[2.5]" />
                    </div>
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <span className="text-xs text-slate-400 font-mono">
                Sonuç: Yüksek maliyet, yavaş tempo, hantal yapılar.
              </span>
            </div>
          </motion.div>

          {/* FMKAL Independent Studio Card (Highlighted) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl p-7 sm:p-9 bg-white border-2 border-blue-600 shadow-xl shadow-blue-500/5 flex flex-col justify-between relative overflow-hidden group"
          >
            {/* Top Accent Ribbon */}
            <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-mono uppercase tracking-widest font-bold px-4 py-1 rounded-bl-xl shadow-xs">
              Önerilen Model
            </div>

            <div>
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-blue-600 font-semibold block mb-1">
                    Modern Mühendislik & Prodüksiyon
                  </span>
                  <h3 className="text-2xl font-bold text-slate-950">
                    {t.comparison.fmkalTitle}
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                  <Zap className="w-5 h-5 fill-current" />
                </div>
              </div>

              <ul className="space-y-4">
                {t.comparison.fmkalPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3.5 text-sm text-slate-800 font-medium">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5 text-emerald-600">
                      <Check className="w-3 h-3 stroke-[2.5]" />
                    </div>
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom Action Area */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>%100 Bağımsız & Çevik</span>
              </div>
              <Link
                href="/iletisim"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold studio-btn-primary shadow-xs"
              >
                <span>{t.nav.cta}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
