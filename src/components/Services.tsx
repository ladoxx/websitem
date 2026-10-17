'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Layout, Film, Server, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useTranslation } from '@/context/LanguageContext';
import { WebVisual, VideoVisual, CloudVisual } from './ServiceVisuals';

export default function Services() {
  const [mousePos, setMousePos] = useState<{ [key: string]: { x: number; y: number } }>({});
  const { t } = useTranslation();

  const icons = [Layout, Film, Server];
  const accents = ['rgba(37, 99, 235, 0.06)', 'rgba(124, 58, 237, 0.06)', 'rgba(16, 185, 129, 0.06)'];
  const visuals = [WebVisual, VideoVisual, CloudVisual];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos((prev) => ({
      ...prev,
      [id]: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      },
    }));
  };

  return (
    <section id="hizmetler" className="py-24 sm:py-32 relative bg-white border-y border-slate-200/80 overflow-hidden">
      {/* Background Subtle Atmosphere */}
      <div className="absolute inset-0 bg-studio-dots pointer-events-none opacity-25" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Motion Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-slate-700 bg-slate-100 border border-slate-200 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
            <span>{t.services.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 mb-4">
            {t.services.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            {t.services.subtitle}
          </p>
        </motion.div>

        {/* 3 Premium Studio Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {t.services.items.map((service, index) => {
            const glow = accents[index % accents.length];
            const pos = mousePos[service.number] || { x: 0, y: 0 };
            const Visual = visuals[index % visuals.length];

            return (
              <motion.div
                key={service.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -6 }}
                onMouseMove={(e) => handleMouseMove(e, service.number)}
                className="group relative studio-card rounded-2xl flex flex-col justify-between overflow-hidden cursor-default bg-white transition-all duration-300"
                style={{
                  backgroundImage: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, ${glow}, transparent 80%)`,
                }}
              >
                {/* Clean Light-Themed Visual Header */}
                <div className="p-4 sm:p-5 pb-0">
                  <Visual />
                </div>

                {/* Card Body & Details */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Number & Tag Header */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-mono font-bold text-slate-300 group-hover:text-slate-900 transition-colors">
                        {service.number}
                      </span>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-blue-600 font-semibold px-2 py-0.5 rounded-md bg-blue-50/70 border border-blue-100">
                        {service.tag}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-slate-950 mb-2 leading-snug group-hover:text-blue-900 transition-colors">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                      {service.desc}
                    </p>

                    {/* Feature Bullets */}
                    <div className="pt-4 border-t border-slate-100 space-y-2.5 mb-6">
                      {service.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 group-hover:text-slate-900 transition-colors">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card CTA Link */}
                  <div className="pt-4 border-t border-slate-100">
                    <Link
                      href="/hizmetler"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 group-hover:text-blue-600 transition-colors"
                    >
                      <span>{t.services.cardCta}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Services Link */}
        <div className="mt-12 text-center">
          <Link
            href="/hizmetler"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-700 hover:text-blue-600 transition-colors"
          >
            <span>{t.services.allServicesCta}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
