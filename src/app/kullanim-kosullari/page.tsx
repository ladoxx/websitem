'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useTranslation } from '@/context/LanguageContext';
import { FileText } from 'lucide-react';

export default function TermsOfServicePage() {
  const { lang } = useTranslation();

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 sm:pt-40 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider text-slate-700 bg-white border border-slate-200 mb-6">
            <FileText className="w-3.5 h-3.5 text-blue-600" />
            <span>
              {lang === 'ko'
                ? '서비스 이용약관'
                : lang === 'en'
                ? 'TERMS OF SERVICE'
                : 'HİZMET ŞARTLARI'}
            </span>
          </div>

          {lang === 'tr' && (
            <article className="prose prose-slate max-w-none studio-card p-8 sm:p-12 rounded-3xl bg-white">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mb-2">
                Kullanım Koşulları
              </h1>
              <p className="text-xs font-mono text-slate-400 mb-8">
                Son Güncelleme: 15 Ekim 2026 // Hizmet Standartları
              </p>

              <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
                <section>
                  <h2 className="text-lg font-bold text-slate-950 mb-2">1. Taraflar ve Kabul</h2>
                  <p>
                    Bu web sitesi (fmkal.com) ve FMKAL çatısı altında sunulan web tasarımı, video prodüksiyonu ve bulut altyapı hizmetleri; Furkan Mert Kalyon tarafından yürütülmektedir. Sitemizi ziyaret ederek veya hizmet talebinde bulunarak bu koşulları kabul etmiş sayılırsınız.
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-bold text-slate-950 mb-2">2. Fikri Mülkiyet Hakları</h2>
                  <p>
                    FMKAL markası, logosu, web sitesi arayüz tasarımı, kaynak kodları ve sitede yayınlanan özel içerikler Furkan Mert Kalyon'a aittir ve uluslararası telif hakları ile korunmaktadır. Müşterilerimiz adına geliştirilen özel web siteleri ve teslim edilen video prodüksiyon çalışmalarının kullanım hakları, proje bedeli ödendikten sonra müşteriye devredilir.
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-bold text-slate-950 mb-2">3. Proje Geliştirme ve Teslim Şartları</h2>
                  <p>
                    Tüm projeler başlangıçta karşılıklı mutabakata varılan "Kapsam Belgesi" doğrultusunda yürütülür. Anlaşma dışında talep edilen ek özellikler veya büyük mimari değişiklikler ek süre ve bütçelendirmeye tabi olabilir.
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-bold text-slate-950 mb-2">4. Sorumluluk Sınırı</h2>
                  <p>
                    FMKAL, sunulan web sitelerinin ve sistemlerin en yüksek performans ve güvenlik standartlarında çalışması için azami özeni gösterir. Ancak üçüncü taraf servis sağlayıcılarından (örneğin internet servis sağlayıcıları, üçüncü parti API'lar veya bulut tünelleri) kaynaklanan kesintilerden doğrudan sorumlu tutulamaz.
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-bold text-slate-950 mb-2">5. İletişim</h2>
                  <p>
                    Hizmet koşullarımızla ilgili her türlü soru için <a href="mailto:iletisim@fmkal.com" className="text-blue-600 font-semibold underline">iletisim@fmkal.com</a> adresinden bize ulaşabilirsiniz.
                  </p>
                </section>
              </div>
            </article>
          )}

          {lang === 'en' && (
            <article className="prose prose-slate max-w-none studio-card p-8 sm:p-12 rounded-3xl bg-white">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mb-2">
                Terms of Service
              </h1>
              <p className="text-xs font-mono text-slate-400 mb-8">
                Last Updated: October 15, 2026 // Service Standards
              </p>

              <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
                <section>
                  <h2 className="text-lg font-bold text-slate-950 mb-2">1. Agreement to Terms</h2>
                  <p>
                    By accessing fmkal.com and commissioning web development, video production, or infrastructure engineering services, you agree to be bound by these Terms of Service provided by Furkan Mert Kalyon (FMKAL).
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-bold text-slate-950 mb-2">2. Intellectual Property</h2>
                  <p>
                    The FMKAL brand, identity, proprietary website architecture, and media are the exclusive property of Furkan Mert Kalyon. Deliverables produced specifically for clients are transferred upon final project completion and invoice settlement.
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-bold text-slate-950 mb-2">3. Scope & Milestones</h2>
                  <p>
                    Work is executed according to agreed project specifications. Additional requirements outside initial scope will be evaluated and estimated transparently.
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-bold text-slate-950 mb-2">4. Warranties & Disclaimers</h2>
                  <p>
                    Services are delivered adhering to modern engineering excellence. Liability is strictly limited to the professional fee contracted for the specific deliverable.
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-bold text-slate-950 mb-2">5. Inquiries</h2>
                  <p>
                    For contractual inquiries, contact <a href="mailto:iletisim@fmkal.com" className="text-blue-600 font-semibold underline">iletisim@fmkal.com</a>.
                  </p>
                </section>
              </div>
            </article>
          )}

          {lang === 'ko' && (
            <article className="prose prose-slate max-w-none studio-card p-8 sm:p-12 rounded-3xl bg-white">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mb-2">
                이용약관
              </h1>
              <p className="text-xs font-mono text-slate-400 mb-8">
                최종 수정일: 2026년 10월 15일 // 서비스 운영 기준
              </p>

              <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
                <section>
                  <h2 className="text-lg font-bold text-slate-950 mb-2">1. 약관의 적용</h2>
                  <p>
                    본 약관은 Furkan Mert Kalyon(FMKAL)이 운영하는 웹사이트(fmkal.com) 및 제공하는 디지털 솔루션(웹 개발, 영상 제작, 인프라 구축)을 이용하는 모든 고객에게 적용됩니다.
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-bold text-slate-950 mb-2">2. 지식재산권</h2>
                  <p>
                    FMKAL의 상표, 로고 및 고유 소스 코드는 FMKAL의 자산입니다. 고객 의뢰로 개발된 맞춤형 프로젝트 산출물의 권리는 대금 완납 후 고객에게 양도됩니다.
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-bold text-slate-950 mb-2">3. 프로젝트 진행 및 납품 기준</h2>
                  <p>
                    모든 작업은 사전 협의된 프로젝트 범위에 따라 성실히 진행되며, 추가 기능 요건은 상호 협의를 거쳐 투명하게 반영됩니다.
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-bold text-slate-950 mb-2">4. 책임의 한계</h2>
                  <p>
                    최신 기술 표준에 따라 안정적인 서비스를 제공하며, 통제 불가능한 외부 호스팅이나 제3자 서비스 장애에 대해서는 관련 법률 한도 내에서 면책됩니다.
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-bold text-slate-950 mb-2">5. 고객 지원</h2>
                  <p>
                    약관 문의는 <a href="mailto:iletisim@fmkal.com" className="text-blue-600 font-semibold underline">iletisim@fmkal.com</a>으로 접수해 주시기 바랍니다.
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
