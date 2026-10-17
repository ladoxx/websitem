'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useTranslation } from '@/context/LanguageContext';
import { SHOWCASE_PROJECTS, ShowcaseProject, ShowcaseType } from '@/data/showcaseWebsites';
import {
  ExternalLink,
  Play,
  Pause,
  Volume2,
  VolumeX,
  X,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  Globe,
  Film,
  Cpu,
  Monitor,
  Maximize2,
} from 'lucide-react';

export default function WebsitesAndVideosPage() {
  const { lang } = useTranslation();
  const [projectsList, setProjectsList] = useState<ShowcaseProject[]>(SHOWCASE_PROJECTS);
  const [activeCategory, setActiveCategory] = useState<string>('Tümü');
  const [activeVideoModal, setActiveVideoModal] = useState<ShowcaseProject | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [muted, setMuted] = useState<boolean>(true);

  // Fetch dynamic projects from SQLite
  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => {
        if (data.projects && Array.isArray(data.projects) && data.projects.length > 0) {
          setProjectsList(data.projects);
        }
      })
      .catch((err) => console.error('Failed to fetch projects from SQLite:', err));
  }, []);

  const totalCount = projectsList.length;
  const webCount = projectsList.filter((p) => p.type === 'Web Sitesi').length;
  const videoCount = projectsList.filter((p) => p.type === 'Video').length;
  const saasCount = projectsList.filter((p) => p.type === 'SaaS Uygulaması').length;

  // Category Tabs based on dynamic counts
  const categories: { key: string; label: string; count: number }[] = [
    {
      key: 'Tümü',
      label: lang === 'ko' ? '전체' : lang === 'en' ? 'All Projects' : 'Tüm Projeler',
      count: totalCount,
    },
    {
      key: 'Web Sitesi',
      label: lang === 'ko' ? '웹사이트' : lang === 'en' ? 'Websites' : 'Web Siteleri',
      count: webCount,
    },
    {
      key: 'Video',
      label: lang === 'ko' ? '영상 & 프로덕션' : lang === 'en' ? 'Videos & Commercials' : 'Video & Prodüksiyon',
      count: videoCount,
    },
    {
      key: 'SaaS Uygulaması',
      label: lang === 'ko' ? 'SaaS 애플리케이션' : lang === 'en' ? 'SaaS Applications' : 'SaaS Uygulaması',
      count: saasCount,
    },
  ];

  const filtered =
    activeCategory === 'Tümü'
      ? projectsList
      : projectsList.filter((item) => item.type === activeCategory);

  const toggleInlinePlay = (id: string) => {
    setPlayingId((prev) => (prev === id ? null : id));
  };

  const getTypeBadge = (type: ShowcaseType) => {
    switch (type) {
      case 'Web Sitesi':
        return {
          icon: Globe,
          bg: 'bg-blue-50 text-blue-700 border-blue-200/80',
          dot: 'bg-blue-600',
          label: lang === 'ko' ? '웹사이트' : lang === 'en' ? 'Website' : 'Web Sitesi',
        };
      case 'Video':
        return {
          icon: Film,
          bg: 'bg-purple-50 text-purple-700 border-purple-200/80',
          dot: 'bg-purple-600',
          label: lang === 'ko' ? '영상 프로덕션' : lang === 'en' ? 'Video Production' : 'Video Prodüksiyon',
        };
      case 'SaaS Uygulaması':
        return {
          icon: Cpu,
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
          dot: 'bg-emerald-600',
          label: lang === 'ko' ? 'SaaS 플랫폼' : lang === 'en' ? 'SaaS App' : 'SaaS Uygulaması',
        };
    }
  };

  const getLocalizedTitle = (item: ShowcaseProject) => {
    const titleMap: Record<string, { en: string; ko: string }> = {
      'vanguard-ai-commercial': {
        en: 'Cinematic AI Brand Commercial Film',
        ko: '시네마틱 AI 브랜드 광고 필름',
      },
      'cyberpulse-product-video': {
        en: 'Dynamic Tech Product Launch & 3D Motion Ad',
        ko: '다이내믹 테크 제품 런칭 & 3D 모션 광고',
      },
      'nexus-global-holding-web': {
        en: 'Global Investment & Holding Corporate Website',
        ko: '글로벌 투자 & 지주사 기업 웹사이트',
      },
      'atelier-lux-ecommerce-web': {
        en: 'Luxury & Minimalist E-Commerce Experience',
        ko: '럭셔리 & 미니멀리스트 이커머스 플랫폼',
      },
      'aurora-ai-saas-platform': {
        en: 'Aurora AI — Video Engine & GPU Management SaaS',
        ko: 'Aurora AI — 비디오 엔진 & GPU 관리 SaaS 플랫폼',
      },
    };
    if (lang !== 'tr' && titleMap[item.id]) {
      return titleMap[item.id][lang];
    }
    return item.title;
  };

  const getLocalizedText = (val?: string) => {
    if (!val || lang === 'tr') return val;
    const textMap: Record<string, { en: string; ko: string }> = {
      '2.4x Etkileşim Artışı': { en: '2.4x Engagement Boost', ko: '2.4배 참여율 증가' },
      '%38 Dönüşüm Artışı': { en: '+38% Conversion Lift', ko: '전환율 38% 향상' },
      '<50ms API Gecikmesi': { en: '<50ms API Latency', ko: '<50ms API 지연율' },
      '0.4s İlk Boyama (FCP)': { en: '0.4s First Paint (FCP)', ko: '0.4초 초기 렌더링 (FCP)' },
      'Gerçek Zamanlı WebSocket': { en: 'Real-Time WebSocket', ko: '실시간 WebSocket' },
    };
    return textMap[val]?.[lang] || val;
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 sm:pt-40 pb-24 overflow-hidden relative">
        {/* Background Atmospheric Lighting & Grid Dots */}
        <div className="absolute inset-0 bg-studio-dots pointer-events-none opacity-30" />
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] aura-glow-blue pointer-events-none opacity-30 blur-3xl" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[400px] aura-glow-purple pointer-events-none opacity-25 blur-3xl" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider text-blue-700 bg-blue-50 border border-blue-200/80 mb-6 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>
                {lang === 'ko'
                  ? '웹사이트 & 비디오 쇼케이스 (5대 프로젝트)'
                  : lang === 'en'
                  ? 'SHOWCASE: WEBSITES, VIDEOS & SAAS'
                  : 'YAPILAN WEB SİTELERİ & VİDEOLAR'}
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-950 mb-6 leading-tight">
              {lang === 'ko' ? '살아 숨쉬는' : lang === 'en' ? 'Living, Breathing' : 'Yaşayan ve Çalışan'}{' '}
              <br />
              <span className="animate-shimmer-text inline-block">
                {lang === 'ko' ? '웹사이트 & 비디오 경험' : lang === 'en' ? 'Websites & Video Reels' : 'Web Siteleri & Videolar'}
              </span>.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed font-normal">
              {lang === 'ko'
                ? '직접 기획하고 제작한 2개의 비디오 프로젝트, 2개의 웹사이트, 1개의 SaaS 웹 애플리케이션 쇼케이스입니다. 모든 프로젝트의 비디오 데모를 시청하거나 라이브 사이트를 방문하세요.'
                : lang === 'en'
                ? 'Curated showcase of 2 cinematic videos, 2 modern production websites, and 1 enterprise SaaS web application. Every project features an interactive video walkthrough.'
                : 'Sıfırdan tasarlayıp hayata geçirdiğim 2 reklam videosu, 2 modern web sitesi ve 1 SaaS platformu. Tüm projelerin videolarını doğrudan izleyebilir veya canlı siteleri ziyaret edebilirsiniz.'}
            </p>
          </motion.div>

          {/* Category Filter Pills (with exact counts) */}
          <div className="flex flex-wrap gap-2.5 mb-12">
            {categories.map((cat) => (
              <motion.button
                key={cat.key}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveCategory(cat.key)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === cat.key
                    ? 'bg-slate-950 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:text-slate-950 border border-slate-200/90 shadow-2xs hover:border-slate-300'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    activeCategory === cat.key
                      ? 'bg-slate-800 text-slate-200'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {cat.count}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Interactive Project Showcase Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {filtered.map((item, index) => {
              const isPlaying = playingId === item.id;
              const badge = getTypeBadge(item.type);
              const BadgeIcon = badge.icon;

              return (
                <motion.article
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="studio-card rounded-2xl bg-white border border-slate-200/90 overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300"
                >
                  <div>
                    {/* Top Device / Window Header */}
                    <div className="px-4 py-3 bg-slate-100/70 border-b border-slate-200/80 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80 sm:bg-slate-300 group-hover:bg-rose-400 transition-colors" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80 sm:bg-slate-300 group-hover:bg-amber-400 transition-colors" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 sm:bg-slate-300 group-hover:bg-emerald-400 transition-colors" />
                      </div>

                      {/* Project Type Badge */}
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-mono font-semibold ${badge.bg}`}>
                        <BadgeIcon className="w-3 h-3" />
                        <span>{badge.label}</span>
                      </div>

                      {/* Resolution or Metrics pill */}
                      <div className="text-[10px] font-mono text-slate-500 font-medium bg-white px-2 py-0.5 rounded border border-slate-200/80">
                        {getLocalizedText(item.duration || item.resolution || item.metrics)}
                      </div>
                    </div>

                    {/* MEDIA VIEWPORT: Video Player ONLY for Video works, Screenshot & Live Link for Web & SaaS */}
                    {item.type === 'Video' ? (
                      /* VIDEO PLAYER VIEWPORT (For Video Projects) */
                      <div className="relative aspect-video w-full bg-slate-950 overflow-hidden group/media">
                        {isPlaying && item.videoUrl ? (
                          <video
                            src={item.videoUrl}
                            autoPlay
                            loop
                            muted={muted}
                            playsInline
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Image
                            src={item.thumbnail}
                            alt={getLocalizedTitle(item)}
                            fill
                            className="object-cover transition-transform duration-500 group-hover/media:scale-105"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        )}

                        {/* Video Player Floating Overlay */}
                        <div className="absolute inset-0 bg-slate-950/30 group-hover/media:bg-slate-950/20 transition-all flex items-center justify-center">
                          <motion.button
                            animate={{ scale: isPlaying ? 1 : [1, 1.08, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => toggleInlinePlay(item.id)}
                            className="w-14 h-14 rounded-full bg-white/95 backdrop-blur-md shadow-xl border border-white flex items-center justify-center text-slate-950 hover:text-purple-600 transition-colors cursor-pointer"
                            aria-label={isPlaying ? 'Pause' : 'Play'}
                          >
                            {isPlaying ? (
                              <Pause className="w-6 h-6 fill-current" />
                            ) : (
                              <Play className="w-6 h-6 fill-current ml-1 text-purple-600" />
                            )}
                          </motion.button>

                          {/* Sound Toggle (active when playing) */}
                          {isPlaying && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setMuted(!muted);
                              }}
                              className="absolute bottom-3 right-3 p-2 rounded-full bg-black/60 text-white backdrop-blur-sm hover:bg-black/80 transition-colors cursor-pointer"
                              aria-label={muted ? 'Unmute' : 'Mute'}
                            >
                              {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                            </button>
                          )}

                          {/* Fullscreen Theater Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveVideoModal(item);
                            }}
                            className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-black/60 text-white backdrop-blur-sm text-[10px] font-mono hover:bg-black/80 transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <Maximize2 className="w-3 h-3" />
                            <span>{lang === 'ko' ? '전체화면' : lang === 'en' ? 'Fullscreen' : 'Tam Ekran'}</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* WEBSITE & SAAS VIEWPORT (No Video Player - Direct Live Website Link) */
                      <a
                        href={item.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block relative aspect-video w-full bg-slate-100 overflow-hidden group/media cursor-pointer"
                      >
                        <Image
                          src={item.thumbnail}
                          alt={getLocalizedTitle(item)}
                          fill
                          className="object-cover transition-transform duration-500 group-hover/media:scale-105"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />

                        {/* Interactive Click to Visit Overlay (Always visible on mobile bottom-right, centered on desktop hover) */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent sm:bg-slate-950/20 sm:group-hover/media:bg-slate-950/45 opacity-100 sm:opacity-0 sm:group-hover/media:opacity-100 transition-all flex items-end justify-end p-3 sm:p-0 sm:items-center sm:justify-center">
                          <motion.span
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.96 }}
                            className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/95 backdrop-blur-md text-slate-950 text-[11px] sm:text-xs font-bold shadow-lg inline-flex items-center gap-1.5 transition-transform"
                          >
                            <span>
                              {item.type === 'SaaS Uygulaması'
                                ? (lang === 'ko' ? '라이브 SaaS 앱 방문' : lang === 'en' ? 'Open Live SaaS App' : 'Canlı SaaS Uygulamasını Aç')
                                : (lang === 'ko' ? '라이브 웹사이트 방문' : lang === 'en' ? 'Visit Live Website' : 'Canlı Web Sitesini Ziyaret Et')}
                            </span>
                            <ExternalLink className="w-3.5 h-3.5 text-blue-600 sm:text-slate-950" />
                          </motion.span>
                        </div>
                      </a>
                    )}

                    {/* Card Body */}
                    <div className="p-6 sm:p-7">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-600">
                          {item.client} &bull; {item.year}
                        </span>
                        {item.metrics && (
                          <span className="text-[11px] font-mono font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                            {getLocalizedText(item.metrics)}
                          </span>
                        )}
                      </div>

                      <h2 className="text-xl font-bold text-slate-950 mb-3 group-hover:text-blue-900 transition-colors leading-snug">
                        {getLocalizedTitle(item)}
                      </h2>

                      <p className="text-sm text-slate-600 leading-relaxed mb-5 font-normal">
                        {item.description[lang] || item.description.tr}
                      </p>

                      {/* Highlights */}
                      <div className="pt-4 border-t border-slate-100 space-y-2 mb-6">
                        {(item.highlights[lang] || item.highlights.tr).map((high, hIdx) => (
                          <div key={hIdx} className="flex items-center gap-2 text-xs text-slate-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                            <span>{high}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech / Tools Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200/80 text-[10px] font-mono text-slate-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="px-6 sm:px-7 py-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between">
                    {item.type === 'Video' ? (
                      /* Video Project Actions: Fullscreen Video Player */
                      <>
                        <div className="flex items-center gap-2 text-xs text-purple-700 font-mono font-semibold">
                          <Film className="w-3.5 h-3.5 text-purple-600" />
                          <span>
                            {lang === 'ko'
                              ? '4K 비디오 프로덕션'
                              : lang === 'en'
                              ? '4K Video Production'
                              : '4K Video Prodüksiyon'}
                          </span>
                        </div>
                        <button
                          onClick={() => setActiveVideoModal(item)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-purple-600 text-white hover:bg-purple-700 transition-colors shadow-2xs cursor-pointer"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>{lang === 'ko' ? '비디오 전체화면' : lang === 'en' ? 'Watch Fullscreen' : 'Videoyu İzle'}</span>
                        </button>
                      </>
                    ) : (
                      /* Website & SaaS Actions: Direct Website Link Only */
                      <>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                          <Globe className="w-3.5 h-3.5 text-blue-600" />
                          <span>{item.client.toLowerCase().replace(/\s+/g, '')}.com</span>
                        </div>
                        <a
                          href={item.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold text-white bg-slate-950 hover:bg-blue-600 transition-colors shadow-xs group/link"
                        >
                          <span>
                            {item.type === 'SaaS Uygulaması'
                              ? (lang === 'ko' ? '라이브 SaaS 앱 실행' : lang === 'en' ? 'Open SaaS Demo' : 'Canlı SaaS Uygulamasını Aç')
                              : (lang === 'ko' ? '라이브 웹사이트 방문' : lang === 'en' ? 'Visit Live Website' : 'Canlı Web Sitesini Ziyaret Et')}
                          </span>
                          <ExternalLink className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                        </a>
                      </>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* Bottom Proposal CTA */}
          <section className="mt-24 pt-16 border-t border-slate-200/80 text-center">
            <div className="max-w-2xl mx-auto">
              <span className="text-xs font-mono uppercase tracking-wider text-blue-600 font-semibold mb-2 block">
                {lang === 'ko'
                  ? '새 프로젝트 시작하기'
                  : lang === 'en'
                  ? 'START A NEW PROJECT'
                  : 'YENİ PROJE BAŞLATIN'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mb-4 tracking-tight">
                {lang === 'ko'
                  ? '귀사의 브랜드를 위한 맞춤형 웹사이트 & 영상을 제작해 드립니다'
                  : lang === 'en'
                  ? 'Let’s Build a Purpose-Built Website or Video for Your Brand'
                  : 'Sizin Markanız İçin de Böyle Bir Web Sitesi veya Video Yapalım'}
              </h2>
              <p className="text-slate-600 text-base mb-8 font-normal leading-relaxed">
                {lang === 'ko'
                  ? 'Next.js 15 기반 초고속 웹사이트, 4K AI 시네마틱 영상, 또는 견고한 SaaS 애플리케이션으로 비즈니스를 한 단계 끌어올리세요.'
                  : lang === 'en'
                  ? 'Elevate your brand with Next.js 15 websites, 4K AI cinematic commercials, or robust SaaS web applications.'
                  : 'İster yüksek hızlı kurumsal web sitesi, ister yapay zekâ destekli 4K reklam videosu veya özel bir SaaS uygulaması... Fikrinizi hayata geçirelim.'}
              </p>
              <Link
                href="/iletisim"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-semibold tracking-wide studio-btn-primary shadow-sm"
              >
                <span>{lang === 'ko' ? '프로젝트 제안 요청하기' : lang === 'en' ? 'Start Your Project' : 'Proje Talebini Başlatın'}</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </section>

        </div>
      </main>

      {/* Cinematic Fullscreen Video Theater Modal */}
      <AnimatePresence>
        {activeVideoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveVideoModal(null)}
              className="absolute inset-0 bg-slate-950/85 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 z-10 flex flex-col"
            >
              {/* Modal Header */}
              <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between text-white">
                <div>
                  <h3 className="text-base font-bold text-white leading-tight">
                    {getLocalizedTitle(activeVideoModal)}
                  </h3>
                  <p className="text-xs font-mono text-blue-400">
                    {activeVideoModal.client} &bull; {getTypeBadge(activeVideoModal.type).label}
                  </p>
                </div>
                <button
                  onClick={() => setActiveVideoModal(null)}
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Video Player */}
              <div className="relative aspect-video w-full bg-black">
                {activeVideoModal.videoUrl && (
                  <video
                    src={activeVideoModal.videoUrl}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain"
                  />
                )}
              </div>

              {/* Modal Footer with Actions */}
              <div className="px-6 py-4 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {activeVideoModal.tags.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {activeVideoModal.liveUrl && (
                    <a
                      href={activeVideoModal.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-white text-slate-950 hover:bg-slate-200 transition-colors w-full sm:w-auto"
                    >
                      <span>
                        {activeVideoModal.type === 'SaaS Uygulaması'
                          ? (lang === 'ko' ? '라이브 앱 열기' : lang === 'en' ? 'Open Live App' : 'Canlı Uygulamayı Aç')
                          : (lang === 'ko' ? '라이브 사이트 열기' : lang === 'en' ? 'Open Live Site' : 'Canlı Siteyi Aç')}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <Link
                    href="/iletisim"
                    onClick={() => setActiveVideoModal(null)}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-blue-600 text-white hover:bg-blue-500 transition-colors w-full sm:w-auto"
                  >
                    <span>
                      {lang === 'ko' ? '유사 프로젝트 의뢰' : lang === 'en' ? 'Request Similar Project' : 'Benzer Proje İste'}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}
