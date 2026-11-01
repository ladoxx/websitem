'use client';

import { useTranslation } from '@/context/LanguageContext';

const TECH_ITEMS_BY_LANG = {
  tr: [
    'Next.js 15 & React 19',
    'Yapay Zekâ Video Prodüksiyonu',
    'TypeScript & Temiz Kod',
    'Docker & Konteyner Dağıtımı',
    'Cloudflare Zero Trust & Tüneller',
    'Yüksek Dönüşümlü Landing Page',
    'Tailwind CSS & Mikro-Animasyonlar',
    'Kurumsal Web Mimarisi',
    'ComfyUI & Üretken Yapay Zekâ',
    'Milisaniyelik Sayfa Hızı',
    'Homelab & Bağımsız Bulut',
  ],
  en: [
    'Next.js 15 & React 19',
    'Generative AI Video Production',
    'TypeScript & Clean Architecture',
    'Docker & Container Deployment',
    'Cloudflare Zero Trust & Tunnels',
    'High-Converting Landing Pages',
    'Tailwind CSS & Micro-Animations',
    'Enterprise Web Architecture',
    'ComfyUI & Generative AI',
    'Sub-100ms Page Load Speed',
    'Homelab & Private Cloud',
  ],
  ko: [
    'Next.js 15 & React 19',
    '생성형 AI 비디오 프로덕션',
    'TypeScript & 클린 아키텍처',
    'Docker & 컨테이너 배포',
    'Cloudflare Zero Trust 보안 터널',
    '고전환율 랜딩 페이지 제작',
    'Tailwind CSS & 마이크로 인터랙션',
    '엔터프라이즈 웹 아키텍처',
    'ComfyUI & 생성형 AI',
    '초고속 밀리초 로딩 속도',
    '홈랩 & 프라이빗 클라우드 구축',
  ],
};

export default function TechMarquee() {
  const { lang } = useTranslation();
  const items = TECH_ITEMS_BY_LANG[lang] || TECH_ITEMS_BY_LANG.tr;

  return (
    <div className="w-full py-6 border-y border-slate-200/80 bg-white/70 backdrop-blur-xs overflow-hidden relative select-none">
      {/* Side gradient masks for smooth fade-in and fade-out */}
      <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[#f8fafc] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#f8fafc] to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee flex items-center gap-8">
        {/* Double the list for seamless infinite loop */}
        {[...items, ...items].map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-6 shrink-0 group cursor-default"
          >
            <span className="text-xs sm:text-sm font-mono tracking-wider font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-blue-600 transition-colors" />
          </div>
        ))}
      </div>
    </div>
  );
}
