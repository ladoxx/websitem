'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, ChevronDown, Radio, Cpu, ShieldCheck } from 'lucide-react';
import DigitalGlobe from './DigitalGlobe';
import { useTranslation } from '@/context/LanguageContext';

export default function Hero() {
  const [count, setCount] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    let start = 0;
    const end = 100;
    const duration = 1500;
    const stepTime = 15;
    const totalSteps = duration / stepTime;
    const increment = end / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] pt-32 sm:pt-40 pb-16 flex flex-col justify-between overflow-hidden"
    >
      {/* Background Architectural Dots & Aura Lighting */}
      <div className="absolute inset-0 bg-studio-dots pointer-events-none opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] aura-glow-blue pointer-events-none opacity-45 blur-3xl" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[550px] h-[400px] aura-glow-purple pointer-events-none opacity-35 blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Text & CTAs with Staggered Motion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start text-left z-10"
          >
            
            {/* Introductory Label */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider text-slate-700 bg-white border border-slate-200/90 shadow-2xs mb-6 hover:border-slate-300 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              <span>{t.hero.badge}</span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-950 leading-[1.08] mb-6">
              {t.hero.title1} <br />
              <span className="animate-shimmer-text inline-block">
                {t.hero.titleHighlight}
              </span>{' '}
              {t.hero.title2}
            </h1>

            {/* Supporting Text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="text-base sm:text-lg text-slate-600 max-w-xl font-normal leading-relaxed mb-8"
            >
              {t.hero.desc}
            </motion.p>

            {/* Action CTA Buttons with Spring Hover */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto"
            >
              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto"
              >
                <Link
                  href="/iletisim"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-xs font-semibold tracking-wide studio-btn-primary shadow-sm"
                >
                  <span>{t.hero.ctaPrimary}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto"
              >
                <Link
                  href="/hizmetler"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-xs font-semibold tracking-wide studio-btn-secondary"
                >
                  <span>{t.hero.ctaSecondary}</span>
                  <ChevronDown className="w-4 h-4 text-slate-500" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Animated Trust Metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-12 pt-8 border-t border-slate-200/80 grid grid-cols-3 gap-6 w-full max-w-md"
            >
              <div className="group cursor-default">
                <p className="text-2xl sm:text-3xl font-bold font-mono text-slate-950 group-hover:text-blue-600 transition-colors">
                  %{count}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">{t.hero.statCode}</p>
              </div>
              <div className="group cursor-default">
                <p className="text-2xl sm:text-3xl font-bold font-mono text-slate-950 group-hover:text-purple-600 transition-colors">
                  4K / AI
                </p>
                <p className="text-xs text-slate-500 mt-0.5">{t.hero.statQuality}</p>
              </div>
              <div className="group cursor-default">
                <p className="text-2xl sm:text-3xl font-bold font-mono text-blue-600 group-hover:text-slate-950 transition-colors">
                  &lt;100ms
                </p>
                <p className="text-xs text-slate-500 mt-0.5">{t.hero.statSpeed}</p>
              </div>
            </motion.div>

          </motion.div>

          {/* Right Column: Refined 3D Studio Globe with Motion Entrance & Telemetry */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-center justify-center z-10"
          >
            <DigitalGlobe />

            {/* Live Studio Telemetry Dock */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-6 w-full max-w-sm rounded-xl bg-white/90 backdrop-blur-md border border-slate-200 shadow-sm p-3.5 space-y-2 text-[11px] font-mono"
            >
              <div className="flex items-center justify-between text-slate-700">
                <span className="flex items-center gap-1.5 text-slate-500">
                  <Radio className="w-3.5 h-3.5 text-blue-600" />
                  <span>AĞ BAĞLANTISI</span>
                </span>
                <span className="text-blue-600 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {t.telemetry.network}
                </span>
              </div>

              <div className="flex items-center justify-between text-slate-700 pt-1.5 border-t border-slate-100">
                <span className="flex items-center gap-1.5 text-slate-500">
                  <Cpu className="w-3.5 h-3.5 text-purple-600" />
                  <span>MOTOR</span>
                </span>
                <span className="text-slate-800 font-medium">
                  {t.telemetry.engine}
                </span>
              </div>

              <div className="flex items-center justify-between text-slate-700 pt-1.5 border-t border-slate-100">
                <span className="flex items-center gap-1.5 text-slate-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>GÜVENLİK</span>
                </span>
                <span className="text-emerald-600 font-semibold">
                  {t.telemetry.security}
                </span>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Elegant Animated Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="flex justify-center mt-12 mb-2"
      >
        <Link
          href="/hizmetler"
          className="flex flex-col items-center gap-2 text-slate-400 hover:text-slate-700 transition-colors group focus:outline-none"
          aria-label={t.hero.scroll}
        >
          <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400 group-hover:text-slate-600">
            {t.hero.scroll}
          </span>
          <div className="w-5 h-8 rounded-full border border-slate-300 group-hover:border-slate-500 flex justify-center p-1 transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-900 animate-bounce" />
          </div>
        </Link>
      </motion.div>
    </section>
  );
}
