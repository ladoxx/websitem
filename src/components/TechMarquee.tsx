'use client';

const TECH_ITEMS = [
  'Next.js 15 & React 19',
  'Yapay Zekâ Video Prodüksiyonu',
  'TypeScript & Clean Code',
  'Docker & Konteyner Dağıtımı',
  'Cloudflare Zero Trust & Tüneller',
  'Yüksek Dönüşümlü Landing Page',
  'Tailwind CSS & Mikro-Animasyonlar',
  'Kurumsal Web Mimarisi',
  'ComfyUI & Generative AI',
  'Milisaniyelik Sayfa Hızı',
  'Homelab & Bağımsız Bulut',
];

export default function TechMarquee() {
  return (
    <div className="w-full py-6 border-y border-slate-200/80 bg-white/70 backdrop-blur-xs overflow-hidden relative select-none">
      {/* Side gradient masks for smooth fade-in and fade-out */}
      <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[#f8fafc] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#f8fafc] to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee flex items-center gap-8">
        {/* Double the list for seamless infinite loop */}
        {[...TECH_ITEMS, ...TECH_ITEMS].map((item, idx) => (
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
