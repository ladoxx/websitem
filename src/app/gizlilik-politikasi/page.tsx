'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useTranslation } from '@/context/LanguageContext';
import { Shield } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const { lang } = useTranslation();

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 sm:pt-40 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider text-slate-700 bg-white border border-slate-200 mb-6">
            <Shield className="w-3.5 h-3.5 text-blue-600" />
            <span>
              {lang === 'ko'
                ? '법적 고지 & 개인정보 보안'
                : lang === 'en'
                ? 'LEGAL & DATA PRIVACY'
                : 'YASAL & GÜVENLİK'}
            </span>
          </div>

          {lang === 'tr' && (
            <article className="prose prose-slate max-w-none studio-card p-8 sm:p-12 rounded-3xl bg-white">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mb-2">
                Gizlilik Politikası
              </h1>
              <p className="text-xs font-mono text-slate-400 mb-8">
                Son Güncelleme: 15 Ekim 2026 // KVKK & GDPR Uyumlu
              </p>

              <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
                <section>
                  <h2 className="text-lg font-bold text-slate-950 mb-2">1. Genel Bakış ve Kapsam</h2>
                  <p>
                    FMKAL (Furkan Mert Kalyon) olarak, web sitemizi (fmkal.com) ziyaret eden kullanıcılarımızın ve bizimle iletişime geçen iş ortaklarımızın kişisel verilerinin gizliliğine ve güvenliğine en üst düzeyde önem veriyoruz. Bu politika; 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK), Avrupa Birliği Genel Veri Koruma Tüzüğü (GDPR) ve ilgili uluslararası mevzuatlara uygun olarak hazırlanmıştır.
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-bold text-slate-950 mb-2">2. Toplanan Veriler ve Toplanma Yöntemi</h2>
                  <p>
                    Web sitemiz üzerinden yalnızca sizin açık rızanız ve iradenizle sağladığınız veriler toplanır:
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li><strong>İletişim Formu:</strong> Adınız, şirket adınız, e-posta adresiniz ve paylaştığınız proje detayları.</li>
                    <li><strong>Teknik Veriler:</strong> Güvenlik ve performans amacıyla anonimleştirilmiş IP adresi, coğrafi bölge (ülke düzeyi) ve tarayıcı dili bilgisi.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-lg font-bold text-slate-950 mb-2">3. Verilerin Kullanım Amaçları</h2>
                  <p>
                    Toplanan kişisel bilgileriniz yalnızca şu amaçlarla işlenir:
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>İlettiğiniz proje tekliflerine ve mesajlara yanıt vermek,</li>
                    <li>Talep ettiğiniz web, video veya altyapı hizmetlerini planlamak ve sunmak,</li>
                    <li>Web sitesinin teknik güvenliğini, performansını ve dil uyumluluğunu sağlamak.</li>
                  </ul>
                  <p className="mt-2">
                    Verileriniz <strong>asla</strong> üçüncü taraflara satılmaz, kiralanmaz veya pazarlama amaçlı paylaşılmaz.
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-bold text-slate-950 mb-2">4. Veri Saklama ve Güvenlik</h2>
                  <p>
                    Verileriniz Cloudflare Zero Trust ve izole Docker sunucu mimarimiz dahilinde yüksek şifreleme standartlarıyla korunmaktadır. Verileriniz, yasal saklama süreleri veya iş ilişkisinin devamı haricinde talep etmeniz halinde sistemlerimizden derhal silinir.
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-bold text-slate-950 mb-2">5. Haklarınız ve İletişim</h2>
                  <p>
                    KVKK'nın 11. maddesi ve GDPR uyarınca; verilerinizin işlenip işlenmediğini öğrenme, düzeltilmesini veya silinmesini talep etme hakkına sahipsiniz. Tüm talepleriniz için doğrudan <a href="mailto:iletisim@fmkal.com" className="text-blue-600 font-semibold underline">iletisim@fmkal.com</a> adresi üzerinden bizimle iletişime geçebilirsiniz.
                  </p>
                </section>
              </div>
            </article>
          )}

          {lang === 'en' && (
            <article className="prose prose-slate max-w-none studio-card p-8 sm:p-12 rounded-3xl bg-white">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mb-2">
                Privacy Policy
              </h1>
              <p className="text-xs font-mono text-slate-400 mb-8">
                Last Updated: October 15, 2026 // GDPR & International Standards
              </p>

              <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
                <section>
                  <h2 className="text-lg font-bold text-slate-950 mb-2">1. Overview & Scope</h2>
                  <p>
                    FMKAL (Furkan Mert Kalyon) values your privacy and is committed to protecting your personal data. This privacy statement explains how we collect, use, and protect your information when visiting fmkal.com or communicating with us for digital services.
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-bold text-slate-950 mb-2">2. Information We Collect</h2>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li><strong>Inquiries & Contact:</strong> Name, organization name, email address, and project brief submitted through our proposal forms.</li>
                    <li><strong>Technical Telemetry:</strong> Anonymized country-level location and browser language preferences strictly used to display localized content.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-lg font-bold text-slate-950 mb-2">3. Purpose of Processing</h2>
                  <p>
                    Your information is processed solely to respond to project inquiries, prepare technical estimates, and deliver requested digital design or infrastructure services. We never sell, lease, or distribute your information to third-party advertisers.
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-bold text-slate-950 mb-2">4. Data Security & Sovereignty</h2>
                  <p>
                    Our digital services run behind enterprise-grade Cloudflare tunnels and encrypted containerized environments. You retain the right to request deletion or inspection of your information at any time.
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-bold text-slate-950 mb-2">5. Contact</h2>
                  <p>
                    For inquiries or data rights requests, email <a href="mailto:iletisim@fmkal.com" className="text-blue-600 font-semibold underline">iletisim@fmkal.com</a>.
                  </p>
                </section>
              </div>
            </article>
          )}

          {lang === 'ko' && (
            <article className="prose prose-slate max-w-none studio-card p-8 sm:p-12 rounded-3xl bg-white">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mb-2">
                개인정보 처리방침
              </h1>
              <p className="text-xs font-mono text-slate-400 mb-8">
                최종 수정일: 2026년 10월 15일 // 개인정보보호법(PIPA) 준수
              </p>

              <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
                <section>
                  <h2 className="text-lg font-bold text-slate-950 mb-2">1. 개요 및 목적</h2>
                  <p>
                    FMKAL(Furkan Mert Kalyon)은 이용자의 개인정보를 소중히 보호하며, 관련 법령을 철저히 준수합니다. 본 방침은 fmkal.com을 이용하시는 고객의 개인정보가 어떤 용도와 방식으로 안전하게 관리되는지 안내합니다.
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-bold text-slate-950 mb-2">2. 수집하는 개인정보 항목</h2>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li><strong>문의 접수 시:</strong> 성함, 회사명, 이메일 주소, 프로젝트 요구사항 및 세부 내용.</li>
                    <li><strong>서비스 이용 시:</strong> 브라우저 언어 설정 및 국가 수준의 IP 위치 정보(자동 언어 최적화 목적).</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-lg font-bold text-slate-950 mb-2">3. 개인정보의 이용 목적</h2>
                  <p>
                    수집된 정보는 프로젝트 견적 제공, 고객 상담 및 디지털 서비스 개발 목적으로만 한정하여 사용되며, 제3자에게 판매하거나 마케팅 용도로 무단 제공되지 않습니다.
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-bold text-slate-950 mb-2">4. 개인정보의 파기 및 보안</h2>
                  <p>
                    수집된 개인정보는 목적 달성 후 안전하게 파기되며, Cloudflare 보안 터널 및 암호화된 독립 서버 환경을 통해 보호됩니다.
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-bold text-slate-950 mb-2">5. 문의처</h2>
                  <p>
                    개인정보 관련 문의는 <a href="mailto:iletisim@fmkal.com" className="text-blue-600 font-semibold underline">iletisim@fmkal.com</a>으로 연락 주시기 바랍니다.
                  </p>
                </section>
              </div>
            </article>
          )}

        </div>
      </main>
      <Footer />
    </>
  );
}
