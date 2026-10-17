'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, Sparkles, MapPin, Code2, Video, Globe2, Radio } from 'lucide-react';
import Image from 'next/image';
import { useTranslation } from '@/context/LanguageContext';

export default function About() {
  const { t, lang } = useTranslation();
  const icons = [Sparkles, Cpu, ShieldCheck];

  const techBadges = [
    'Next.js 15',
    'TypeScript',
    'Tailwind CSS',
    'Docker',
    'Cloudflare Zero Trust',
    lang === 'ko' ? 'AI 비디오 프로덕션' : lang === 'en' ? 'AI Video Production' : 'AI Video Prodüksiyonu',
    'Linux Homelab',
  ];

  return (
    <section id="hakkimda" className="py-24 sm:py-32 relative bg-white border-y border-slate-200/80 overflow-hidden">
      {/* Background Subtle Dot Pattern */}
      <div className="absolute inset-0 bg-studio-dots pointer-events-none opacity-30" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="studio-card rounded-3xl p-8 sm:p-12 lg:p-14 relative overflow-hidden bg-gradient-to-b from-white to-slate-50/50"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Manifesto & Principles */}
            <div className="lg:col-span-7">
              {/* Section Tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-slate-700 bg-slate-100 border border-slate-200 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                <span>{t.about.badge}</span>
              </div>

              {/* Headline */}
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 mb-6 leading-tight">
                {t.about.title}
              </h2>

              {/* Core Personal Statement */}
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal mb-8">
                {t.about.manifesto}
              </p>

              {/* 3 Core Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-200/80">
                {t.about.principles.map((p, idx) => {
                  const Icon = icons[idx % icons.length];
                  return (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -3 }}
                      className="p-3.5 rounded-xl bg-white/70 border border-slate-200/60 shadow-2xs space-y-2 cursor-default"
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-900">
                        <Icon className="w-4 h-4 text-blue-600" />
                      </div>
                      <h3 className="text-xs font-bold text-slate-950">{p.title}</h3>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        {p.desc}
                      </p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Interactive Technology Stack Tags */}
              <div className="mt-8 pt-6 border-t border-slate-200/80 flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-slate-500 mr-2">{t.about.techLabel}</span>
                {techBadges.map((badge) => (
                  <motion.span
                    key={badge}
                    whileHover={{ scale: 1.05, y: -1 }}
                    className="px-2.5 py-1 rounded-full text-xs font-mono text-slate-700 bg-white border border-slate-200 shadow-2xs hover:border-slate-400 hover:text-slate-950 transition-colors"
                  >
                    {badge}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Right Column: Studio Engineering Passport Card */}
            <div className="lg:col-span-5 flex justify-center">
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-sm rounded-2xl bg-white border border-slate-200/90 shadow-xl shadow-slate-200/50 p-6 relative overflow-hidden"
              >
                {/* Subtle top aura */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

                {/* Identity Header */}
                <div className="flex items-center gap-4 pb-5 border-b border-slate-100">
                  <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-slate-800 p-2 flex items-center justify-center shrink-0 shadow-sm">
                    <Image
                      src="/logo-icon.png"
                      alt="FMKAL Studio"
                      width={44}
                      height={44}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-950">Furkan Mert Kalyon</h3>
                    <p className="text-xs font-mono text-blue-600">
                      {lang === 'ko'
                        ? '독립 디지털 엔지니어 & 크리에이터'
                        : lang === 'en'
                        ? 'Independent Digital Engineer & Creator'
                        : 'Bağımsız Dijital Mühendis & Kreatör'}
                    </p>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>
                        {lang === 'ko'
                          ? '이스탄불 / 서울 (글로벌)'
                          : lang === 'en'
                          ? 'Istanbul / Seoul (Global)'
                          : 'İstanbul / Seul (Global)'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Studio Stats / Telemetry specs */}
                <div className="py-4 space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <Code2 className="w-3.5 h-3.5 text-blue-600" />
                      <span>
                        {lang === 'ko'
                          ? '소프트웨어 아키텍처'
                          : lang === 'en'
                          ? 'Software Architecture'
                          : 'Yazılım Mimarisi'}
                      </span>
                    </span>
                    <span className="font-mono font-medium text-slate-900">Next.js 15 &bull; TS</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <Video className="w-3.5 h-3.5 text-purple-600" />
                      <span>
                        {lang === 'ko'
                          ? '비디오 & 프로덕션'
                          : lang === 'en'
                          ? 'Video & Production'
                          : 'Video & Prodüksiyon'}
                      </span>
                    </span>
                    <span className="font-mono font-medium text-slate-900">4K HDR &bull; GenAI</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <Cpu className="w-3.5 h-3.5 text-emerald-600" />
                      <span>
                        {lang === 'ko'
                          ? '인프라 보안'
                          : lang === 'en'
                          ? 'Infrastructure Security'
                          : 'Altyapı Güvenliği'}
                      </span>
                    </span>
                    <span className="font-mono font-medium text-slate-900">Docker &bull; Zero Trust</span>
                  </div>
                </div>

                {/* Live Status Pill */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-600">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>
                      {lang === 'ko'
                        ? '신규 프로젝트 의뢰 가능'
                        : lang === 'en'
                        ? 'Available for New Projects'
                        : 'Yeni Projelere Açık'}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">FMKAL // 2026</span>
                </div>
              </motion.div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
