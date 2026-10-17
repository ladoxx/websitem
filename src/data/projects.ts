export interface Project {
  id: string;
  title: string;
  titleI18n: { tr: string; en: string; ko: string };
  category: 'Web Geliştirme' | 'AI Video' | 'Bulut & Sistem';
  isDemonstration: boolean;
  tagline: string;
  taglineI18n: { tr: string; en: string; ko: string };
  description: string;
  descriptionI18n: { tr: string; en: string; ko: string };
  techStack: string[];
  image: string;
  demoUrl?: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'ai-cinematic-reel',
    title: 'Sinematik AI Video & Görsel Tasarım',
    titleI18n: {
      tr: 'Sinematik AI Video & Görsel Tasarım',
      en: 'Cinematic AI Video & Visual Production',
      ko: '시네마틱 AI 비디오 & 비주얼 프로덕션',
    },
    category: 'AI Video',
    isDemonstration: true,
    tagline: 'Yapay Zekâ Destekli Marka Tanıtımı // Konsept Vitrin',
    taglineI18n: {
      tr: 'Yapay Zekâ Destekli Marka Tanıtımı // Konsept Vitrin',
      en: 'AI-Powered Brand Commercial // Concept Showcase',
      ko: '생성형 AI 기반 브랜드 홍보 영상 // 콘셉트 쇼케이스',
    },
    description:
      'Geleneksel prodüksiyon maliyetlerini düşürürken sinematik ışık, kamera açıları ve kurgu gücünü birleştiren yapay zekâ destekli reklam ve tanıtım çalışması.',
    descriptionI18n: {
      tr: 'Geleneksel prodüksiyon maliyetlerini düşürürken sinematik ışık, kamera açıları ve kurgu gücünü birleştiren yapay zekâ destekli reklam ve tanıtım çalışması.',
      en: 'An AI-powered commercial showcase combining cinematic lighting, dynamic camera angles, and precision editing while dramatically reducing traditional production costs.',
      ko: '전통적인 촬영 비용을 대폭 절감하면서 시네마틱 조명, 카메라 앵글, 정밀 편집을 결합한 생성형 AI 광고 프로덕션.',
    },
    techStack: ['Midjourney', 'Runway Gen-3', 'ComfyUI', 'DaVinci Resolve', '4K Upscaling'],
    image: '/assets/fmkal_design_alt1_studio_png_1792050145467.jpg',
  },
  {
    id: 'saas-landing-architecture',
    title: 'Modern Web Deneyimi & Landing Page',
    titleI18n: {
      tr: 'Modern Web Deneyimi & Landing Page',
      en: 'Modern Web Experience & Landing Page',
      ko: '최신 웹 경험 & 고전환 랜딩 페이지',
    },
    category: 'Web Geliştirme',
    isDemonstration: true,
    tagline: 'Yüksek Dönüşümlü Dijital Arayüz // Konsept Vitrin',
    taglineI18n: {
      tr: 'Yüksek Dönüşümlü Dijital Arayüz // Konsept Vitrin',
      en: 'High-Converting Digital Interface // Concept Showcase',
      ko: '전환율 중심 디지털 인터페이스 // 콘셉트 쇼케이스',
    },
    description:
      'Işık hızında açılan, modern tipografi ve glassmorphism detaylarıyla zenginleştirilmiş, mobil öncelikli kurumsal web mimarisi.',
    descriptionI18n: {
      tr: 'Işık hızında açılan, modern tipografi ve glassmorphism detaylarıyla zenginleştirilmiş, mobil öncelikli kurumsal web mimarisi.',
      en: 'A lightning-fast, mobile-first corporate web architecture enriched with modern typography, glassmorphism details, and sub-100ms performance.',
      ko: '초고속 로딩 속도, 세련된 타이포그래피와 글래스모피즘 디테일로 완성된 모바일 퍼스트 기업 웹 아키텍처.',
    },
    techStack: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'SEO Opt.'],
    image: '/assets/fmkal_design_alt2_modern_ui_png_1792050167377.jpg',
    demoUrl: 'https://fmkal.com',
  },
  {
    id: 'homelab-cloud-infrastructure',
    title: 'Özel Bulut & Konteyner Altyapısı',
    titleI18n: {
      tr: 'Özel Bulut & Konteyner Altyapısı',
      en: 'Private Cloud & Container Infrastructure',
      ko: '프라이빗 클라우드 & 컨테이너 인프라',
    },
    category: 'Bulut & Sistem',
    isDemonstration: true,
    tagline: 'Güvenli Yerel Sunucu & Tünelleme // Konsept Vitrin',
    taglineI18n: {
      tr: 'Güvenli Yerel Sunucu & Tünelleme // Konsept Vitrin',
      en: 'Zero-Trust Self-Hosted Server & Tunneling // Concept Showcase',
      ko: '제로 트러스트 자체 호스팅 서버 & 터널링 // 콘셉트 쇼케이스',
    },
    description:
      'Dış dünyaya kapalı port güvenliği, Cloudflare tünelleri ve Docker konteyner izolasyonu ile şirketlere özel bağımsız sunucu mimarisi.',
    descriptionI18n: {
      tr: 'Dış dünyaya kapalı port güvenliği, Cloudflare tünelleri ve Docker konteyner izolasyonu ile şirketlere özel bağımsız sunucu mimarisi.',
      en: 'An independent enterprise server architecture with zero exposed ports, Cloudflare Zero Trust tunnels, and isolated Docker containers.',
      ko: '외부 포트 개방 없이 Cloudflare 보안 터널과 Docker 컨테이너 격리를 통해 구축된 기업 전용 독립 서버 아키텍처.',
    },
    techStack: ['Docker', 'Coolify', 'Cloudflare Zero Trust', 'Reverse Proxy', 'Linux'],
    image: '/assets/fmkal_ui_showcase_png_1792038188349.jpg',
  },
];
