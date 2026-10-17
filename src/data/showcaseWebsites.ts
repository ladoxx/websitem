export type ShowcaseType = 'Video' | 'Web Sitesi' | 'SaaS Uygulaması';

export interface ShowcaseProject {
  id: string;
  title: string;
  client: string;
  year: string;
  type: ShowcaseType;
  description: {
    tr: string;
    en: string;
    ko: string;
  };
  liveUrl?: string; // Web siteleri ve SaaS için doğrudan canlı web sitesi linki
  videoUrl?: string; // SADECE Video projelerinde video oynatıcı kullanılır
  thumbnail: string; // Ekran görüntüsü veya video kapağı
  tags: string[]; // Teknolojiler / Araçlar
  highlights: {
    tr: string[];
    en: string[];
    ko: string[];
  };
  metrics?: string; // Öne çıkan metrik (örn: "99/100 Hız Skoru", "4K HDR Master")
  duration?: string; // Video süresi (örn: "00:45", "01:10")
  resolution?: string; // Çözünürlük (örn: "4K Cinema 60fps")
}

export const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  // 1. VİDEO PROJESİ (Video Player Var)
  {
    id: 'vanguard-ai-commercial',
    title: 'Cinematic AI Marka Reklam Filmi',
    client: 'Vanguard Automotive',
    year: '2026',
    type: 'Video',
    duration: '00:45',
    resolution: '4K Cinema // 60FPS',
    description: {
      tr: 'Geleneksel stüdyo ve kamera kiralama masrafları olmadan, üretken yapay zekâ (GenAI) ile sıfırdan tasarlanan ve DaVinci Resolve ile renklenen 4K sinematik marka reklamı.',
      en: 'A cinematic 4K brand commercial generated from scratch using generative AI pipelines and graded in DaVinci Resolve without physical studio overhead.',
      ko: '실물 촬영 세트 대여 없이 생성형 AI 파이프라인으로 제작하고 DaVinci Resolve로 색보정된 4K 시네마틱 브랜드 광고 영상.',
    },
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-sky-in-a-sunset-26070-large.mp4',
    thumbnail: '/assets/fmkal_design_alt1_studio_png_1792050145467.jpg',
    tags: ['Midjourney v6', 'Runway Gen-3', 'DaVinci Resolve Studio', 'ComfyUI', 'Dolby 5.1 SFX'],
    highlights: {
      tr: ['%70 Daha Düşük Prodüksiyon Maliyeti', '4K Yüksek Çözünürlüklü Master', 'Özel Ses Tasarımı & Miksaj'],
      en: ['70% Lower Production Overhead', '4K HDR Master Output', 'Bespoke SFX & Audio Mastering'],
      ko: ['제작 비용 70% 절감', '4K HDR 마스터 출력', '맞춤형 사운드 디자인 & 믹싱'],
    },
    metrics: '4K Cinema // AI Master',
  },

  // 2. VİDEO PROJESİ (Video Player Var)
  {
    id: 'cyberpulse-product-video',
    title: 'Dynamic Tech Ürün Tanıtım & 3D Motion Reklamı',
    client: 'CyberPulse Audio',
    year: '2025',
    type: 'Video',
    duration: '01:10',
    resolution: '4K HDR // 60FPS',
    description: {
      tr: 'Teknoloji ürün lansmanı için hazırlanan, dinamik kamera hareketleri, 3D parça patlatma animasyonları ve ritmik kurgu içeren yüksek tempolu ürün tanıtım videosu.',
      en: 'A high-energy product launch commercial featuring dynamic camera sweeps, 3D exploded part animations, and rhythmic soundtrack editing.',
      ko: '다이내믹한 카메라 무빙과 3D 부품 분해도 애니메이션, 감각적인 비트 매칭이 돋보이는 테크 신제품 런칭 홍보 영상.',
    },
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-with-graphs-31911-large.mp4',
    thumbnail: '/assets/fmkal_ui_showcase_png_1792038188349.jpg',
    tags: ['3D Motion Design', 'After Effects', 'Premiere Pro', 'AI Video Upscaling', 'Sound Design'],
    highlights: {
      tr: ['Sosyal Medyada 2.4 Kat Etkileşim', '9:16 Dikey & 16:9 Yatay Format', 'Mikro Ritim & SFX Senkronu'],
      en: ['2.4x Higher Social Engagement', '9:16 Vertical & 16:9 Widescreen', 'Micro-Rhythm SFX Sync'],
      ko: ['소셜 미디어 반응 2.4배 향상', '9:16 숏폼 & 16:9 와이드 지원', '정밀한 사운드 싱크 구현'],
    },
    metrics: '2.4x Etkileşim Artışı',
  },

  // 3. WEB SİTESİ PROJESİ (Sadece Web Sitesi Linki Var - Video Player Yok)
  {
    id: 'nexus-global-holding-web',
    title: 'Global Yatırım & Holding Kurumsal Web Sitesi',
    client: 'Nexus Global Ventures',
    year: '2026',
    type: 'Web Sitesi',
    resolution: 'Sub-80ms TTFB',
    description: {
      tr: 'Uluslararası yatırımcılara hitap eden, 3 dilli, interaktif 3D veri küresi ve anlık hisse/portföy grafikleri içeren kurumsal prestij web sitesi.',
      en: 'A multilingual corporate investor portal featuring an interactive 3D globe, sub-100ms speeds, and dynamic portfolio showcases.',
      ko: '인터랙티브 3D 지구본과 초고속 100ms 미만 로딩 속도, 3개국어 다국어 지원을 갖춘 글로벌 지주사 기업 웹사이트.',
    },
    liveUrl: 'https://fmkal.com',
    thumbnail: '/assets/fmkal_design_alt2_modern_ui_png_1792050167377.jpg',
    tags: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Three.js 3D', 'i18n 3 Dil'],
    highlights: {
      tr: ['99/100 Google PageSpeed Skoru', 'İngilizce, Korece, Türkçe Dil Altyapısı', 'Mobil ve Tablette Akıcı UX'],
      en: ['99/100 Google PageSpeed Score', 'TR, EN, KO Localization', 'Ultra-Fluid Mobile & Tablet UX'],
      ko: ['99/100 구글 페이지스피드 점수', '한국어, 영어, 튀르키예어 지원', '모바일 최적화 완벽 지원'],
    },
    metrics: '99/100 PageSpeed',
  },

  // 4. WEB SİTESİ PROJESİ (Sadece Web Sitesi Linki Var - Video Player Yok)
  {
    id: 'atelier-lux-ecommerce-web',
    title: 'Lüks & Minimalist E-Ticaret Deneyimi',
    client: 'Atelier Minimalist',
    year: '2026',
    type: 'Web Sitesi',
    resolution: '0.4s İlk Boyama (FCP)',
    description: {
      tr: 'Yüksek dönüşüm oranına sahip, 3D ürün etkileşimli, anlık filtreleme ve Apple Pay tek tıkla ödeme altyapısına sahip lüks moda e-ticaret platformu.',
      en: 'A high-converting luxury fashion e-commerce storefront with 3D product inspection and sub-second checkout integration.',
      ko: '3D 제품 인터랙션과 초고속 필터링, 원클릭 간편 결제 시스템을 갖춘 프리미엄 럭셔리 이커머스 웹사이트.',
    },
    liveUrl: 'https://fmkal.com',
    thumbnail: '/assets/fmkal_design_alt2_modern_ui_png_1792050167377.jpg',
    tags: ['Next.js 15', 'Stripe API', 'Tailwind CSS', 'Framer Motion', 'Edge Caching'],
    highlights: {
      tr: ['Sepet Terk Oranında %38 Düşüş', 'Çoklu Para Birimi & Otomatik Kargo', 'Apple Pay & Kredi Kartı Ödeme'],
      en: ['38% Lower Cart Abandonment', 'Dynamic Multi-Currency & Shipping', 'Apple Pay & Credit Card Flow'],
      ko: ['장바구니 이탈률 38% 감소', '다중 통화 및 자동 배송비 계산', '원클릭 간편 결제 연동'],
    },
    metrics: '%38 Dönüşüm Artışı',
  },

  // 5. SAAS UYGULAMASI PROJESİ (Sadece Uygulama Linki Var - Video Player Yok)
  {
    id: 'aurora-ai-saas-platform',
    title: 'Aurora AI — Video Engine & GPU Yönetim SaaS Platformu',
    client: 'Aurora AI Cloud',
    year: '2026',
    type: 'SaaS Uygulaması',
    resolution: 'Gerçek Zamanlı WebSocket',
    description: {
      tr: 'Kullanıcıların tek tıkla metinden 4K video üretebildiği, gerçek zamanlı GPU kuyruk izleme, rol tabanlı takım yönetimi ve API anahtar paneli sunan tam teşekküllü SaaS web uygulaması.',
      en: 'A production-grade AI SaaS web application providing real-time GPU compute queue tracking, prompt-to-4K video synthesis, team permissions, and API key management.',
      ko: '텍스트에서 4K 영상을 생성하고 실시간 GPU 큐 모니터링, 팀 권한 관리 및 API 콘솔을 제공하는 엔터프라이즈 AI SaaS 웹 애플리케이션.',
    },
    liveUrl: 'https://fmkal.com',
    thumbnail: '/assets/fmkal_ui_showcase_png_1792038188349.jpg',
    tags: ['React 19', 'Next.js App Router', 'WebSockets', 'Tailwind CSS', 'Docker Homelab', 'PostgreSQL'],
    highlights: {
      tr: ['Canlı WebSocket GPU İlerlemesi', 'Çift Tema (Karanlık/Aydınlık)', 'Sıfır Port Açık Zero-Trust Tünel'],
      en: ['Live WebSocket GPU Progress', 'Dark & Light Dynamic Modes', 'Zero Open Ports Cloudflare Tunnel'],
      ko: ['실시간 WebSocket GPU 모니터링', '다크/라이트 테마 지원', '외부 포트 0개의 제로 트러스트 보안'],
    },
    metrics: '<50ms API Gecikmesi',
  },
];
