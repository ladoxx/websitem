'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Projects from '@/components/Projects';
import { useTranslation } from '@/context/LanguageContext';
import { ArrowUpRight } from 'lucide-react';

export default function ProjectsPage() {
  const { lang } = useTranslation();

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 sm:pt-40">
        
        {/* Page Hero Header */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider text-slate-700 bg-white border border-slate-200 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
            <span>
              {lang === 'ko'
                ? '포트폴리오 & 주요 작업물'
                : lang === 'en'
                ? 'PORTFOLIO & SELECTED WORKS'
                : 'PORTFOLYO & ÇALIŞMALAR'}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-950 mb-6 leading-tight">
            {lang === 'ko' ? (
              <>
                아이디어에서 탄생한 <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  작동하는 디지털
                </span>{' '}
                경험.
              </>
            ) : lang === 'en' ? (
              <>
                Working Digital <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Experiences
                </span>{' '}
                Born from Ideas.
              </>
            ) : (
              <>
                Fikirlerden Doğan <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Çalışan Dijital
                </span>{' '}
                Deneyimler.
              </>
            )}
          </h1>

          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
            {lang === 'ko'
              ? '생성형 AI 기반 비주얼 프로덕션부터 최신 웹 인터페이스, 안전한 홈랩 및 프라이빗 서버 아키텍처에 이르는 주요 프로젝트 쇼케이스입니다.'
              : lang === 'en'
              ? 'Selected works spanning generative AI visual productions, high-speed modern web interfaces, and secure self-hosted server architectures.'
              : 'Burada yer alan çalışmalar; yapay zekâ destekli görsel kurgulardan, modern web arayüzlerine ve güvenli homelab/sunucu mimarilerine uzanan projelerden seçilmiştir.'}
          </p>
        </div>

        {/* Interactive Projects Component with Tabs & Modals */}
        <Projects />

        {/* Bottom CTA Banner */}
        <section className="py-20 border-t border-slate-200 bg-white text-center">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-extrabold text-slate-950 mb-4">
              {lang === 'ko'
                ? '귀사의 프로젝트도 함께 실현해 보세요'
                : lang === 'en'
                ? 'Let’s Bring Your Project to Life'
                : 'Sizin Projenizi de Hayata Geçirelim'}
            </h2>
            <p className="text-slate-600 text-base mb-8">
              {lang === 'ko'
                ? '유사한 웹사이트, 광고 영상 또는 기업 전용 시스템을 계획하고 계신가요?'
                : lang === 'en'
                ? 'Envisioning a similar website, advertising video, or private internal system for your company?'
                : 'Benzer bir web sitesi, reklam videosu veya şirket içi özel sistem mi hayal ediyorsunuz?'}
            </p>
            <Link
              href="/iletisim"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-semibold tracking-wide studio-btn-primary shadow-sm"
            >
              <span>
                {lang === 'ko'
                  ? '프로젝트 제안 요청하기'
                  : lang === 'en'
                  ? 'Request a Project Proposal'
                  : 'Proje Talebinde Bulunun'}
              </span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
