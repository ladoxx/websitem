'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import { useTranslation } from '@/context/LanguageContext';

const FAQS_BY_LANG = {
  tr: [
    {
      q: 'Tipik bir web projesi ne kadar sürede tamamlanır?',
      a: 'Landing page ve kurumsal web siteleri genellikle 1 ila 3 hafta içerisinde tasarım, geliştirme, test ve canlıya alma aşamalarıyla tamamlanır.',
    },
    {
      q: 'Yapay zekâ reklam videoları hangi platformlara uygun teslim edilir?',
      a: 'İhtiyacınıza göre Instagram Reels, TikTok, YouTube Shorts için dikey (9:16) veya web sitesi ve sinematik sunumlar için yatay (16:9) 4K formatta teslim edilir.',
    },
    {
      q: 'Özel bulut ve altyapı kurulumlarında sunucu kime ait olur?',
      a: 'Tüm donanım, sunucu ve veriler %100 size ait olur. Docker ve Cloudflare Zero Trust tünelleri şirketinizin kendi altyapısında izole şekilde kurulur.',
    },
  ],
  en: [
    {
      q: 'How long does a typical web project take to complete?',
      a: 'Landing pages and corporate websites are typically completed within 1 to 3 weeks, covering design, engineering, testing, and production deployment.',
    },
    {
      q: 'Which formats and platforms are supported for AI commercial videos?',
      a: 'Deliverables are tailored to your channels: vertical (9:16) for Instagram Reels, TikTok, and YouTube Shorts, or widescreen (16:9) 4K HDR for websites and cinema presentations.',
    },
    {
      q: 'Who owns the server and data in private cloud setups?',
      a: '100% of the hardware, server, and data belong to you. Docker containers and Cloudflare Zero Trust tunnels are deployed in isolation within your own infrastructure.',
    },
  ],
  ko: [
    {
      q: '일반적인 웹사이트 프로젝트는 제작 기간이 얼마나 걸리나요?',
      a: '랜딩 페이지 및 기업용 웹사이트는 기획, 디자인, 개발, 테스트 및 배포까지 통상 1~3주 내에 완료됩니다.',
    },
    {
      q: 'AI 광고 영상은 어떤 플랫폼 및 해상도 포맷으로 제공되나요?',
      a: '필요에 따라 인스타그램 릴스, 틱톡, 유튜브 쇼츠용 세로형(9:16) 또는 웹사이트 및 시네마틱 프레젠테이션용 가로형(16:9) 4K 포맷으로 납품됩니다.',
    },
    {
      q: '프라이빗 클라우드 및 인프라 구축 시 서버와 데이터 소유권은 누구에게 있나요?',
      a: '모든 하드웨어, 서버 및 데이터의 소유권은 100% 귀사에 있습니다. Docker 및 Cloudflare Zero Trust 터널은 귀사의 자체 인프라 내에 안전하게 격리되어 구축됩니다.',
    },
  ],
};

export default function ContactPage() {
  const { lang } = useTranslation();
  const faqs = FAQS_BY_LANG[lang] || FAQS_BY_LANG.tr;

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <Navbar />
      <main className="flex-1 pt-32 sm:pt-40">
        
        {/* Page Hero Header */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider text-slate-700 bg-white border border-slate-200 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
            <span>
              {lang === 'ko'
                ? '문의하기 & 프로젝트 시작'
                : lang === 'en'
                ? 'CONTACT & START A PROJECT'
                : 'İLETİŞİM & PROJE BAŞLATMA'}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-950 mb-6 leading-tight">
            {lang === 'ko' ? (
              <>
                새로운 프로젝트를 <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  시작할 준비가
                </span>{' '}
                되셨나요?
              </>
            ) : lang === 'en' ? (
              <>
                Ready to <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Launch a New
                </span>{' '}
                Project?
              </>
            ) : (
              <>
                Yeni Bir Proje <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Başlatmaya
                </span>{' '}
                Hazır mısınız?
              </>
            )}
          </h1>

          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
            {lang === 'ko'
              ? '구상 중인 웹사이트, 광고 영상 또는 인프라 아이디어를 아래 양식으로 공유해 주세요. 24시간 이내에 구체적인 로드맵과 함께 답변드리겠습니다.'
              : lang === 'en'
              ? 'Share your website, advertising video, or infrastructure vision via the form below; I will get back to you within 24 hours with a tailored roadmap.'
              : 'Aklınızdaki web sitesi, reklam videosu veya altyapı fikrini aşağıdaki form üzerinden paylaşın; en geç 24 saat içinde detaylı bir yol haritasıyla dönüş yapayım.'}
          </p>
        </div>

        {/* Contact Component with Form */}
        <Contact />

        {/* Sıkça Sorulan Sorular (FAQ) */}
        <section className="py-20 bg-slate-50 border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 mb-2">
                {lang === 'ko'
                  ? '자주 묻는 질문 (FAQ)'
                  : lang === 'en'
                  ? 'Frequently Asked Questions'
                  : 'Sıkça Sorulan Sorular'}
              </h2>
              <p className="text-slate-600 text-sm">
                {lang === 'ko'
                  ? '프로젝트 진행 과정에 대해 자주 문의하시는 핵심 사항들입니다.'
                  : lang === 'en'
                  ? 'Essential details about our collaboration and project delivery workflow.'
                  : 'Birlikte çalışma süreci hakkında merak edilen temel detaylar.'}
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="studio-card p-6 rounded-2xl bg-white">
                  <h3 className="text-base font-bold text-slate-950 mb-2">
                    {faq.q}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
