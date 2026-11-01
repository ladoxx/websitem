'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Sparkles,
  ArrowUpRight,
  Globe,
  Film,
  Cpu,
  Star,
  Play,
  X,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { ShowcaseProject, ShowcaseType } from '@/data/showcaseWebsites';
import { useTranslation } from '@/context/LanguageContext';

export default function FeaturedProducts() {
  const { lang, t } = useTranslation();
  const [featuredProjects, setFeaturedProjects] = useState<ShowcaseProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeVideoModal, setActiveVideoModal] = useState<ShowcaseProject | null>(null);
  const [videoMuted, setVideoMuted] = useState(true);

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => {
        if (data.projects && Array.isArray(data.projects)) {
          // Filter projects that are explicitly marked as featured
          const featured = data.projects.filter((p: ShowcaseProject) => p.isFeatured);
          if (featured.length > 0) {
            setFeaturedProjects(featured);
          } else {
            // Fallback: Pick projects with liveUrl or the top showcase projects
            const withLive = data.projects.filter((p: ShowcaseProject) => Boolean(p.liveUrl));
            setFeaturedProjects(withLive.length > 0 ? withLive : data.projects.slice(0, 3));
          }
        }
      })
      .catch((err) => console.error('Failed to load featured products:', err))
      .finally(() => setLoading(false));
  }, []);

  if (!loading && featuredProjects.length === 0) {
    return null;
  }

  const getLocalizedTitle = (item: ShowcaseProject) => item.title;
  const getLocalizedDesc = (item: ShowcaseProject) => {
    if (typeof item.description === 'string') return item.description;
    return item.description?.[lang] || item.description?.tr || '';
  };
  const getLocalizedHighlights = (item: ShowcaseProject) => {
    return item.highlights?.[lang] || item.highlights?.tr || [];
  };

  const getCleanDomain = (url?: string) => {
    if (!url) return '';
    try {
      const parsed = new URL(url);
      return parsed.hostname.replace('www.', '');
    } catch {
      return url.replace(/^https?:\/\//, '').split('/')[0];
    }
  };

  return (
    <section id="one-cikan-urunler" className="py-20 sm:py-28 relative overflow-hidden bg-slate-950 text-white">
      {/* Background glow & subtle patterns */}
      <div className="absolute inset-0 bg-studio-dots pointer-events-none opacity-20 invert" />
      <div className="absolute top-0 left-1/4 w-[600px] h-[350px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[350px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/30 mb-4 backdrop-blur-md">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{t.featuredProducts?.badge || 'ÖNE ÇIKAN ÇALIŞMALAR & CANLI SİTELER'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
              {t.featuredProducts?.title || 'Öne Çıkan Ürünler & Web Siteleri'}
            </h2>

            <p className="text-base sm:text-lg text-slate-300">
              {t.featuredProducts?.subtitle || 'Geliştirdiğim ve şu an aktif olarak yayında olan web siteleri ve dijital ürünleri doğrudan ziyaret edin.'}
            </p>
          </div>

          <Link
            href="/web-siteleri"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-slate-300 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 px-4 py-2.5 rounded-full transition-all group self-start md:self-auto shrink-0"
          >
            <span>{t.featuredProducts?.viewAllWorks || 'Tüm Çalışmaları İncele →'}</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-blue-400" />
          </Link>
        </motion.div>

        {/* Featured Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {featuredProjects.map((project, idx) => {
            const domain = getCleanDomain(project.liveUrl);
            const isWebOrSaas = project.type === 'Web Sitesi' || project.type === 'SaaS Uygulaması';
            const highlights = getLocalizedHighlights(project);

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-2xl backdrop-blur-xl"
              >
                {/* Visual Preview / Screenshot */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                  <Image
                    src={project.thumbnail}
                    alt={getLocalizedTitle(project)}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90" />

                  {/* Badges Overlay */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
                    {/* Live indicator or Video badge */}
                    {project.liveUrl ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-emerald-500/90 text-white shadow-lg backdrop-blur-md">
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                        <span>{t.featuredProducts?.liveBadge || 'Canlı Yayında'}</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-purple-500/90 text-white shadow-lg backdrop-blur-md">
                        <Film className="w-3.5 h-3.5" />
                        <span>4K Video</span>
                      </span>
                    )}

                    {/* Metric badge */}
                    {project.metrics && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-slate-950/80 text-amber-300 border border-amber-500/30 backdrop-blur-md">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        <span>{project.metrics}</span>
                      </span>
                    )}
                  </div>

                  {/* If video, play button overlay */}
                  {project.videoUrl && (
                    <button
                      onClick={() => setActiveVideoModal(project)}
                      className="absolute inset-0 flex items-center justify-center bg-slate-950/30 group-hover:bg-slate-950/50 transition-colors cursor-pointer"
                      aria-label="Videoyu Oynat"
                    >
                      <span className="w-16 h-16 rounded-full bg-white/95 text-slate-950 flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110">
                        <Play className="w-6 h-6 fill-slate-950 ml-1" />
                      </span>
                    </button>
                  )}
                </div>

                {/* Content Box */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Client & Category */}
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                      <span className="font-mono font-semibold uppercase tracking-wider text-blue-400">
                        {project.client}
                      </span>
                      <span className="font-mono text-slate-500">{project.year}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                      {getLocalizedTitle(project)}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-slate-400 leading-relaxed mb-6 font-normal">
                      {getLocalizedDesc(project)}
                    </p>

                    {/* Highlights bullet points */}
                    {highlights.length > 0 && (
                      <div className="space-y-1.5 mb-6">
                        {highlights.slice(0, 3).map((h, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-slate-300 font-mono">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md text-[11px] font-mono text-slate-300 bg-slate-800/80 border border-slate-700/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* BOTTOM ACTION BUTTONS */}
                  <div className="pt-5 border-t border-slate-800/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {project.liveUrl ? (
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full justify-between">
                        {/* Primary Big Visit Live Button */}
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 px-5 py-3 rounded-xl transition-all shadow-lg hover:shadow-blue-500/25 group/btn"
                        >
                          <Globe className="w-4 h-4 text-blue-100" />
                          <span>{t.featuredProducts?.visitLive || 'Canlı Web Sitesini Ziyaret Et'}</span>
                          <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                        </a>

                        {/* Visible domain link */}
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-mono text-slate-400 hover:text-blue-400 transition-colors inline-flex items-center gap-1 self-start sm:self-auto"
                        >
                          <span>{domain}</span>
                          <ExternalLink className="w-3 h-3 text-slate-500" />
                        </a>
                      </div>
                    ) : project.videoUrl ? (
                      <button
                        onClick={() => setActiveVideoModal(project)}
                        className="inline-flex items-center justify-center gap-2 text-xs font-bold text-slate-950 bg-white hover:bg-slate-200 px-5 py-3 rounded-xl transition-all shadow-md group/vbtn cursor-pointer w-full sm:w-auto"
                      >
                        <Play className="w-4 h-4 fill-slate-950 text-slate-950" />
                        <span>{t.featuredProducts?.watchVideo || 'Tanıtım Videosunu İzle'}</span>
                      </button>
                    ) : (
                      <Link
                        href="/web-siteleri"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white"
                      >
                        <span>Detaylı İncele</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Video Preview Modal */}
      <AnimatePresence>
        {activeVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveVideoModal(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl relative"
            >
              <div className="relative aspect-video w-full bg-black">
                <video
                  src={activeVideoModal.videoUrl}
                  autoPlay
                  controls
                  muted={videoMuted}
                  playsInline
                  className="w-full h-full object-contain"
                />

                <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
                  <button
                    onClick={() => setVideoMuted(!videoMuted)}
                    className="w-9 h-9 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black/90 transition-colors"
                  >
                    {videoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => setActiveVideoModal(null)}
                    className="w-9 h-9 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black/90 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-6 flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-bold text-white">{activeVideoModal.title}</h4>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">{activeVideoModal.client} • {activeVideoModal.resolution}</p>
                </div>
                {activeVideoModal.liveUrl && (
                  <a
                    href={activeVideoModal.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all"
                  >
                    <span>Canlı Web Sitesini Aç</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
