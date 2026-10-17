'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Compass, Code, Rocket } from 'lucide-react';
import { useTranslation } from '@/context/LanguageContext';

export default function HowItWorks() {
  const { t } = useTranslation();
  const icons = [MessageSquare, Compass, Code, Rocket];

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden">
      {/* Background Subtle Aura & Dots */}
      <div className="absolute inset-0 bg-studio-dots pointer-events-none opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] aura-glow-purple pointer-events-none opacity-25 blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-slate-700 bg-white border border-slate-200 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
            <span>{t.howItWorks.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 mb-4">
            {t.howItWorks.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            {t.howItWorks.subtitle}
          </p>
        </motion.div>

        {/* Desktop Horizontal Timeline / Mobile Vertical Timeline with Staggered Motion */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          
          {/* Horizontal connecting line on desktop */}
          <div className="hidden md:block absolute top-1/2 left-[12%] right-[12%] h-[1px] bg-gradient-to-r from-blue-600/20 via-indigo-600/40 to-blue-600/20 -translate-y-10 z-0" />

          {t.howItWorks.steps.map((item, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                whileHover={{ y: -6 }}
                className="relative z-10 studio-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between group cursor-default"
              >
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-mono font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {item.step}
                    </span>
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 6 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                      className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 group-hover:bg-white group-hover:border-slate-300 flex items-center justify-center text-slate-700 group-hover:text-blue-600 transition-colors shadow-2xs"
                    >
                      <Icon className="w-4 h-4" />
                    </motion.div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-950 mb-2 group-hover:text-blue-900 transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom Step Indicator */}
                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-mono tracking-widest uppercase text-slate-400 group-hover:text-blue-600 font-semibold transition-colors">
                    {t.howItWorks.stepLabel} 0{idx + 1}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-slate-300 group-hover:bg-blue-600 group-hover:scale-125 transition-all" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
