'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Eye, Globe, ExternalLink, Star } from 'lucide-react';
import { PROJECTS, Project } from '@/data/projects';
import { useTranslation } from '@/context/LanguageContext';

interface ProjectsProps {
  onlyFeatured?: boolean;
}

export default function Projects({ onlyFeatured = false }: ProjectsProps) {
  const [activeCategory, setActiveCategory] = useState<string>('Tümü');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectsList, setProjectsList] = useState<Project[]>(PROJECTS);
  const { lang, t } = useTranslation();

  // Sync and load dynamic projects from SQLite
  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => {
        if (data.projects && Array.isArray(data.projects) && data.projects.length > 0) {
          const dynamicProjects: Project[] = data.projects.map((dp: any) => {
            const category: Project['category'] =
              dp.type === 'Video' ? 'AI Video' : dp.type === 'SaaS Uygulaması' ? 'Bulut & Sistem' : 'Web Geliştirme';
            return {
              id: dp.id,
              title: dp.title,
              titleI18n: {
                tr: dp.titleI18n?.tr || dp.title_tr || dp.title,
                en: dp.titleI18n?.en || dp.title_en || dp.title,
                ko: dp.titleI18n?.ko || dp.title_ko || dp.title,
              },
              category,
              isDemonstration: !dp.liveUrl,
              tagline: dp.client ? `${dp.client} // ${dp.metrics || dp.year}` : dp.title,
              taglineI18n: {
                tr: dp.client ? `${dp.client} // ${dp.metrics || dp.year}` : dp.title,
                en: dp.client ? `${dp.client} // ${dp.metrics || dp.year}` : dp.title,
                ko: dp.client ? `${dp.client} // ${dp.metrics || dp.year}` : dp.title,
              },
              description: typeof dp.description === 'string' ? dp.description : dp.description?.tr || '',
              descriptionI18n: {
                tr: typeof dp.description === 'string' ? dp.description : dp.description?.tr || '',
                en: typeof dp.description === 'string' ? dp.description : dp.description?.en || '',
                ko: typeof dp.description === 'string' ? dp.description : dp.description?.ko || '',
              },
              techStack: dp.tags || [],
              image: dp.thumbnail,
              demoUrl: dp.liveUrl || undefined,
              videoUrl: dp.videoUrl || undefined,
              client: dp.client,
              isFeatured: Boolean(dp.isFeatured),
            };
          });

          if (onlyFeatured) {
            const featuredOnly = dynamicProjects.filter((p) => p.isFeatured);
            setProjectsList(featuredOnly.length > 0 ? featuredOnly : dynamicProjects);
          } else {
            setProjectsList(dynamicProjects);
          }
        }
      })
      .catch(() => {});
  }, [onlyFeatured]);

  const cleanDomain = (url?: string) => {
    if (!url) return '';
    try {
      const parsed = new URL(url);
      return parsed.hostname.replace('www.', '');
    } catch {
      return url.replace(/^https?:\/\//, '').split('/')[0];
    }
  };

  const categories = [
    { key: 'Tümü', label: t.projects.all },
    { key: 'Web Geliştirme', label: lang === 'ko' ? '웹 개발' : lang === 'en' ? 'Web Development' : 'Web Geliştirme' },
    { key: 'AI Video', label: lang === 'ko' ? 'AI 비디오' : lang === 'en' ? 'AI Video' : 'AI Video' },
    { key: 'Bulut & Sistem', label: lang === 'ko' ? '클라우드 & 시스템' : lang === 'en' ? 'Cloud & Systems' : 'Bulut & Sistem' },
  ];

  const getCategoryLabel = (catKey: Project['category']) => {
    const found = categories.find((c) => c.key === catKey);
    return found ? found.label : catKey;
  };

  const liveSiteLabel =
    lang === 'ko' ? '라이브 웹사이트 방문' : lang === 'en' ? 'Visit Live Website' : 'Canlı Web Sitesini Aç';

  const filteredProjects =
    activeCategory === 'Tümü'
      ? projectsList
      : projectsList.filter((p) => p.category === activeCategory);

  return (
    <section id="projeler" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background Subtle Aura & Dots */}
      <div className="absolute inset-0 bg-studio-dots pointer-events-none opacity-25" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[350px] aura-glow-blue pointer-events-none opacity-20 blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-slate-700 bg-white border border-slate-200 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              <span>{t.projects.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 mb-4">
              {t.projects.title}
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              {t.projects.subtitle}
            </p>
          </div>

          {/* Animated Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <motion.button
                key={cat.key}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                  activeCategory === cat.key
                    ? 'bg-slate-950 text-white font-semibold shadow-xs'
                    : 'bg-white text-slate-600 hover:text-slate-950 border border-slate-200 hover:border-slate-300'
                }`}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Animated Project Cards Grid */}
        <motion.div layout className="space-y-10">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const isReversed = index % 2 === 1;
              const localizedTitle = project.titleI18n?.[lang] || project.title;
              const localizedTagline = project.taglineI18n?.[lang] || project.tagline;
              const localizedDesc = project.descriptionI18n?.[lang] || project.description;

              return (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.96, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ y: -4 }}
                  className={`studio-card rounded-3xl p-6 sm:p-9 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                    isReversed ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Visual Preview Side */}
                  <div className={`lg:col-span-7 relative group overflow-hidden rounded-2xl ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-100 border border-slate-200/80">
                      <Image
                        src={project.image}
                        alt={localizedTitle}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-106"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 700px"
                      />

                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-20 pointer-events-none">
                        {project.demoUrl ? (
                          <div className="bg-emerald-600/95 text-white backdrop-blur-xs px-3 py-1 rounded-full text-[11px] font-mono font-bold flex items-center gap-1.5 shadow-md">
                            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                            <span>{t.projects.liveBadge}</span>
                          </div>
                        ) : project.isDemonstration ? (
                          <div className="bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full text-[11px] font-mono tracking-wider text-slate-700 border border-slate-200/90 shadow-xs">
                            {t.projects.demoBadge}
                          </div>
                        ) : null}

                        {project.isFeatured && (
                          <div className="bg-amber-500 text-white backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-mono font-bold flex items-center gap-1 shadow-md">
                            <Star className="w-3 h-3 fill-white" />
                            <span>{t.projects.featuredBadge}</span>
                          </div>
                        )}
                      </div>

                      {/* Interactive Hover / Tap Actions on Image */}
                      {project.demoUrl ? (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute inset-0 flex items-end justify-end p-3 sm:p-0 sm:items-center sm:justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity bg-gradient-to-t from-slate-950/60 via-transparent to-transparent sm:bg-slate-950/40 sm:backdrop-blur-2xs cursor-pointer z-10"
                          aria-label={localizedTitle}
                        >
                          <motion.span
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-full text-xs font-bold text-slate-950 bg-white/95 backdrop-blur-md shadow-xl"
                          >
                            <Globe className="w-4 h-4 text-blue-600" />
                            <span>{liveSiteLabel}</span>
                            <ArrowUpRight className="w-4 h-4 text-slate-700" />
                          </motion.span>
                        </a>
                      ) : (
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="absolute inset-0 flex items-end justify-end p-3 sm:p-0 sm:items-center sm:justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity bg-gradient-to-t from-slate-950/40 via-transparent to-transparent sm:bg-slate-950/30 sm:backdrop-blur-2xs cursor-pointer z-10"
                          aria-label={localizedTitle}
                        >
                          <motion.span
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 sm:px-5 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-semibold text-slate-950 bg-white/95 backdrop-blur-md shadow-md"
                          >
                            <Eye className="w-3.5 h-3.5 text-blue-600 sm:text-slate-950" />
                            {t.projects.inspect}
                          </motion.span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className={`lg:col-span-5 flex flex-col justify-between ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-600">
                          {getCategoryLabel(project.category)}
                        </span>
                        {project.client && (
                          <span className="text-xs font-mono text-slate-400">
                            • {project.client}
                          </span>
                        )}
                      </div>

                      <h3 className="text-2xl font-bold text-slate-950 mb-2">
                        {project.demoUrl ? (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-600 transition-colors inline-flex items-center gap-2 group/t"
                          >
                            <span>{localizedTitle}</span>
                            <ArrowUpRight className="w-5 h-5 text-blue-600 opacity-60 group-hover/t:opacity-100 group-hover/t:translate-x-0.5 group-hover/t:-translate-y-0.5 transition-all" />
                          </a>
                        ) : (
                          localizedTitle
                        )}
                      </h3>

                      <p className="text-xs font-mono text-slate-500 mb-4">
                        {localizedTagline}
                      </p>

                      <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                        {localizedDesc}
                      </p>

                      {/* Tech Badges with hover pop */}
                      <div className="flex flex-wrap gap-1.5 mb-8">
                        {project.techStack.map((tech) => (
                          <motion.span
                            key={tech}
                            whileHover={{ scale: 1.06, y: -1 }}
                            className="px-2.5 py-1 rounded-md text-xs font-mono text-slate-600 bg-slate-50 border border-slate-200 cursor-default"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex flex-wrap items-center gap-3">
                        {project.demoUrl ? (
                          <>
                            <a
                              href={project.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 px-5 py-2.5 rounded-full transition-all shadow-md hover:shadow-blue-500/25 group/link"
                            >
                              <Globe className="w-4 h-4 text-blue-100" />
                              <span>{liveSiteLabel}</span>
                              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                            </a>
                            <a
                              href={project.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-mono text-slate-500 hover:text-blue-600 transition-colors inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200/90 px-3 py-1.5 rounded-full"
                            >
                              <span>{cleanDomain(project.demoUrl)}</span>
                              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                            </a>
                          </>
                        ) : (
                          <button
                            onClick={() => setSelectedProject(project)}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer group/link"
                          >
                            <span>{t.projects.caseStudy}</span>
                            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                          </button>
                        )}
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors cursor-pointer px-2 py-1"
                        >
                          {t.projects.inspect}
                        </button>
                      </div>
                      <Link
                        href="/iletisim"
                        className="text-xs text-slate-500 hover:text-slate-900 transition-colors hidden sm:inline-block"
                      >
                        {t.projects.requestSimilar}
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* View All Projects & Case Studies Link (Links to /vaka-analizleri) */}
        <div className="mt-12 text-center">
          <Link
            href="/vaka-analizleri"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-700 hover:text-blue-600 transition-colors"
          >
            <span>{t.projects.viewAll}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Project Detail Modal with Spring Animation */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                className="bg-white max-w-2xl w-full rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xl relative max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                  <div>
                    <span className="text-xs font-mono text-blue-600 uppercase tracking-widest font-semibold">
                      {getCategoryLabel(selectedProject.category)}
                    </span>
                    <h3 className="text-xl font-bold text-slate-950 mt-1">
                      {selectedProject.titleI18n?.[lang] || selectedProject.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                    aria-label={t.projects.close}
                  >
                    ✕
                  </button>
                </div>

                <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-6 border border-slate-200">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.titleI18n?.[lang] || selectedProject.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {selectedProject.descriptionI18n?.[lang] || selectedProject.description}
                </p>

                <div className="mb-6">
                  <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 font-semibold">
                    {t.projects.techUsed}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md text-xs font-mono text-slate-700 bg-slate-100 border border-slate-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100">
                  {selectedProject.demoUrl && (
                    <a
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold bg-blue-600 text-white hover:bg-blue-500 transition-all shadow-md group/mbtn"
                    >
                      <Globe className="w-4 h-4 text-blue-100" />
                      <span>{liveSiteLabel} ({cleanDomain(selectedProject.demoUrl)})</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/mbtn:translate-x-0.5 group-hover/mbtn:-translate-y-0.5" />
                    </a>
                  )}
                  <Link
                    href="/iletisim"
                    onClick={() => setSelectedProject(null)}
                    className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-full text-xs font-semibold studio-btn-primary shadow-xs"
                  >
                    <span>{t.projects.modalCta}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-5 py-2.5 rounded-full text-xs font-medium text-slate-600 hover:text-slate-900 studio-btn-secondary cursor-pointer"
                  >
                    {t.projects.close}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
