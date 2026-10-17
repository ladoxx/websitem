'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TechMarquee from '@/components/TechMarquee';
import Services from '@/components/Services';
import Comparison from '@/components/Comparison';
import { useTranslation } from '@/context/LanguageContext';
import { CheckCircle2, ArrowUpRight, Zap, ShieldCheck, Sparkles } from 'lucide-react';

export default function ServicesPage() {
  const { lang } = useTranslation();

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 sm:pt-40">
        
        {/* Page Hero Header */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider text-slate-700 bg-white border border-slate-200 mb-6 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
            <span>
              {lang === 'ko'
                ? '전문 기술 & 서비스 영역'
                : lang === 'en'
                ? 'EXPERTISE & DIGITAL SERVICES'
                : 'UZMANLIK ALANLARI & HİZMETLER'}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-950 mb-6 leading-tight">
            {lang === 'ko' ? (
              <>
                귀사의 브랜드를 위한 <br />
                <span className="animate-shimmer-text inline-block">
                  목적 지향적
                </span>{' '}
                디지털 솔루션.
              </>
            ) : lang === 'en' ? (
              <>
                Purpose-Built <br />
                <span className="animate-shimmer-text inline-block">
                  Digital Solutions
                </span>{' '}
                for Your Brand.
              </>
            ) : (
              <>
                Markanız İçin <br />
                <span className="animate-shimmer-text inline-block">
                  Amaca Yönelik
                </span>{' '}
                Dijital Çözümler.
              </>
            )}
          </h1>

          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed font-normal">
            {lang === 'ko'
              ? '단순히 디자인이나 코드만 작성하는 것이 아닙니다. 비즈니스를 성장시키고 비용을 절감하며 디지털 환경에서 브랜드를 강력하게 만드는 완전한 디지털 시스템을 구축합니다.'
              : lang === 'en'
              ? 'I don’t just write code or design screens; I engineer complete digital ecosystems that scale your business, reduce operational overhead, and position your brand ahead.'
              : 'Yalnızca tasarım veya kod üretmiyorum; işinizi büyüten, maliyetlerinizi düşüren ve markanızı dijital dünyada güçlü kılan eksiksiz dijital sistemler kuruyorum.'}
          </p>
        </div>

        <TechMarquee />

        {/* Core Services Component with Clean Light Visuals */}
        <Services />

        {/* Engineering Standards & Quality Checklist */}
        <section className="py-24 bg-slate-50/70 border-b border-slate-200/80 relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-2xl mb-14">
              <span className="text-xs font-mono uppercase tracking-wider text-blue-600 font-semibold mb-2 block">
                {lang === 'ko'
                  ? '품질 & 엔지니어링 표준'
                  : lang === 'en'
                  ? 'QUALITY & ENGINEERING STANDARDS'
                  : 'KALİTE & MÜHENDİSLİK STANDARTLARI'}
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 mb-3">
                {lang === 'ko'
                  ? '모든 프로젝트에 적용되는 핵심 기술 기준'
                  : lang === 'en'
                  ? 'Core Standards Delivered in Every Project'
                  : 'Teslim Ettiğim Her Projedeki Temel Standartlar'}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                {lang === 'ko'
                  ? '제가 개발하는 모든 디지털 제품에서 타협 없이 적용하는 3가지 엔지니어링 원칙입니다.'
                  : lang === 'en'
                  ? 'Three uncompromising engineering pillars applied across every digital product I deliver:'
                  : 'Geliştirdiğim her dijital üründe tavizsiz uyguladığım 3 temel mühendislik ilkesi:'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Pillar 1 */}
              <div className="studio-card p-7 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 border border-blue-100">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-950 mb-2">
                    {lang === 'ko'
                      ? '초고속 성능 & 페이지 속도'
                      : lang === 'en'
                      ? 'Performance & Page Speed'
                      : 'Performans & Sayfa Hızı'}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                    {lang === 'ko'
                      ? '무거운 템플릿 대신 Next.js, React, Tailwind로 처음부터 설계하여 Google PageSpeed 95점 이상을 달성하는 초고속 웹사이트.'
                      : lang === 'en'
                      ? 'Custom-engineered from scratch with Next.js, React, and Tailwind instead of bloated templates—scoring 95+ on Google PageSpeed.'
                      : 'Şablon sistemler yerine Next.js, React ve Tailwind ile sıfırdan kodlanan, Google PageSpeed testlerinde 95+ alan ultra hızlı sayfalar.'}
                  </p>
                </div>
                <ul className="text-xs text-slate-600 space-y-2.5 border-t border-slate-100 pt-5">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>
                      {lang === 'ko'
                        ? '모바일 퍼스트 (Mobile-First) 반응형 설계'
                        : lang === 'en'
                        ? 'Mobile-First Responsive Architecture'
                        : 'Mobil Öncelikli (Mobile First) Tasarım'}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>
                      {lang === 'ko'
                        ? '시맨틱 HTML & 구글·네이버 완벽 SEO'
                        : lang === 'en'
                        ? 'Semantic HTML & Full SEO Infrastructure'
                        : 'Semantik HTML & Tam SEO Altyapısı'}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>
                      {lang === 'ko'
                        ? '전환율 및 비즈니스 성과 중심 UX 설계'
                        : lang === 'en'
                        ? 'Conversion & Sales-Focused UX Flow'
                        : 'Dönüşüm ve Satış Odaklı UX Mimarisi'}
                    </span>
                  </li>
                </ul>
              </div>

              {/* Pillar 2 */}
              <div className="studio-card p-7 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-5 border border-purple-100">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-950 mb-2">
                    {lang === 'ko'
                      ? '최신 AI 비디오 프로덕션'
                      : lang === 'en'
                      ? 'Modern Production & GenAI'
                      : 'Modern Prodüksiyon & AI'}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                    {lang === 'ko'
                      ? '전통적인 스튜디오 대여나 촬영 장비 비용 없이 생성형 AI 파이프라인으로 제작되는 4K 시네마틱 광고 및 소셜 미디어 영상.'
                      : lang === 'en'
                      ? '4K cinematic commercials and social media reels produced with generative AI pipelines—without traditional studio or camera rental overhead.'
                      : 'Geleneksel stüdyo ve kamera masraflarına girmeden, yapay zekâ ile üretilmiş 4K sinematik reklam ve sosyal medya içerikleri.'}
                  </p>
                </div>
                <ul className="text-xs text-slate-600 space-y-2.5 border-t border-slate-100 pt-5">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                    <span>
                      {lang === 'ko'
                        ? '9:16 릴스/숏폼 & 16:9 와이드 시네마 포맷'
                        : lang === 'en'
                        ? '9:16 Vertical Reels/TikTok & 16:9 Cinema'
                        : '9:16 Dikey Reels/TikTok & 16:9 Sinema'}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                    <span>
                      {lang === 'ko'
                        ? '초고화질 4K HDR 마스터 렌더링'
                        : lang === 'en'
                        ? 'High-Resolution 4K HDR Master Render'
                        : 'Yüksek Çözünürlüklü 4K HDR Render'}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                    <span>
                      {lang === 'ko'
                        ? '빠른 피드백 반영 및 유연한 편집 프로세스'
                        : lang === 'en'
                        ? 'Fast Revisions & Agile Editing Workflow'
                        : 'Hızlı Revizyon & Esnek Kurgu Süreci'}
                    </span>
                  </li>
                </ul>
              </div>

              {/* Pillar 3 */}
              <div className="studio-card p-7 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 border border-emerald-100">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-950 mb-2">
                    {lang === 'ko'
                      ? '프라이빗 클라우드 & DevOps'
                      : lang === 'en'
                      ? 'Secure Cloud & DevOps'
                      : 'Güvenli Bulut & DevOps'}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                    {lang === 'ko'
                      ? '외부 포트를 전혀 열지 않고 Docker 컨테이너와 Cloudflare 보안 터널로 기업 데이터를 완벽히 격리하는 독립 서버 인프라.'
                      : lang === 'en'
                      ? 'Isolated server infrastructures built with Docker and Cloudflare tunnels with zero open ports—keeping your company data 100% private.'
                      : 'Şirketinizin verilerini dışarıya sızdırmayan, Docker ve Cloudflare tünelleriyle sıfır port açarak izole edilen sunucu altyapıları.'}
                  </p>
                </div>
                <ul className="text-xs text-slate-600 space-y-2.5 border-t border-slate-100 pt-5">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>
                      {lang === 'ko'
                        ? 'Docker 컨테이너 완벽 격리'
                        : lang === 'en'
                        ? 'Docker Container Isolation'
                        : 'Docker Konteyner İzolasyonu'}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>
                      {lang === 'ko'
                        ? 'Cloudflare Zero Trust 네트워크 보안'
                        : lang === 'en'
                        ? 'Cloudflare Zero Trust Security'
                        : 'Cloudflare Zero Trust Güvenliği'}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>
                      {lang === 'ko'
                        ? '사내 전용 프라이빗 스토리지 (Nextcloud)'
                        : lang === 'en'
                        ? 'Self-Hosted Enterprise Storage (Nextcloud)'
                        : 'Şirket İçi Dosya Depolama (Nextcloud)'}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Comparison Section */}
        <Comparison />

        {/* Bottom CTA Banner */}
        <section className="py-24 text-center bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mb-4 tracking-tight">
              {lang === 'ko'
                ? '프로젝트에 가장 적합한 솔루션을 함께 설계해 보세요'
                : lang === 'en'
                ? 'Let’s Define the Right Solution for Your Project'
                : 'Projeniz İçin Doğru Hizmeti Belirleyelim'}
            </h2>
            <p className="text-slate-600 text-base mb-8 max-w-xl mx-auto">
              {lang === 'ko'
                ? '아이디어와 비즈니스 목표를 공유해 주시면 가장 효율적인 디지털 로드맵을 제안해 드립니다.'
                : lang === 'en'
                ? 'Share your idea or technical requirements, and let’s map out the most effective digital roadmap together.'
                : 'Aklınızdaki fikri veya ihtiyacınızı paylaşın, en verimli dijital yol haritasını birlikte çizelim.'}
            </p>
            <Link
              href="/iletisim"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-semibold tracking-wide studio-btn-primary shadow-sm"
            >
              <span>
                {lang === 'ko'
                  ? '지금 바로 문의하기'
                  : lang === 'en'
                  ? 'Get in Touch Now'
                  : 'Hemen İletişime Geçin'}
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
