'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import About from '@/components/About';
import HowItWorks from '@/components/HowItWorks';
import { useTranslation } from '@/context/LanguageContext';
import { ArrowUpRight } from 'lucide-react';

export default function AboutPage() {
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
                ? '스튜디오 정체성 & 비전'
                : lang === 'en'
                ? 'IDENTITY & VISION'
                : 'KİMLİK & VİZYON'}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-950 mb-6 leading-tight">
            {lang === 'ko' ? (
              <>
                디자인과 엔지니어링을 <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  하나로 결합한
                </span>{' '}
                독립 스튜디오.
              </>
            ) : lang === 'en' ? (
              <>
                A Studio Uniting <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Design &amp; Engineering
                </span>{' '}
                Under One Roof.
              </>
            ) : (
              <>
                Tasarım ve Mühendisliği <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Aynı Çatıda
                </span>{' '}
                Buluşturan Stüdyo.
              </>
            )}
          </h1>

          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
            {lang === 'ko'
              ? 'FMKAL은 아이디어를 미학적이고 기능적이며 지속 가능한 디지털 솔루션으로 구현하기 위해 Furkan Mert Kalyon이 설립한 독립 엔지니어링 스튜디오입니다.'
              : lang === 'en'
              ? 'FMKAL is an independent digital studio founded by Furkan Mert Kalyon with the mission of transforming ideas into aesthetic, functional, and long-lasting digital solutions.'
              : 'FMKAL, fikirleri estetik, işlevsel ve uzun ömürlü dijital çözümlere dönüştürme hedefiyle Furkan Mert Kalyon tarafından kurulmuş bağımsız bir stüdyodur.'}
          </p>
        </div>

        {/* About Component */}
        <About />

        {/* Process Component */}
        <HowItWorks />

        {/* Bottom CTA Banner */}
        <section className="py-20 border-t border-slate-200 bg-white text-center">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-extrabold text-slate-950 mb-4">
              {lang === 'ko'
                ? '함께 프로젝트를 시작해 보세요'
                : lang === 'en'
                ? 'Let’s Work Together'
                : 'Birlikte Çalışalım'}
            </h2>
            <p className="text-slate-600 text-base mb-8">
              {lang === 'ko'
                ? '새로운 프로젝트를 시작하거나 기존 디지털 역량을 강화하고 싶다면 언제든 문의해 주세요.'
                : lang === 'en'
                ? 'Get in touch to launch a new project or elevate your existing digital presence.'
                : 'Yeni bir projeye başlamak veya mevcut dijital varlığınızı güçlendirmek için iletişime geçin.'}
            </p>
            <Link
              href="/iletisim"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-semibold tracking-wide studio-btn-primary shadow-sm"
            >
              <span>
                {lang === 'ko'
                  ? '문의 및 프로젝트 시작'
                  : lang === 'en'
                  ? 'Connect & Get Started'
                  : 'Tanışalım & Başlayalım'}
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
