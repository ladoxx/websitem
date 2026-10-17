'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { useTranslation } from '@/context/LanguageContext';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const { t, lang } = useTranslation();
  const [contactEmail, setContactEmail] = useState('iletisim@fmkal.com');

  const navLinks = [
    { label: t.nav.home, href: '/' },
    { label: t.nav.services, href: '/hizmetler' },
    { label: t.nav.projects, href: '/projeler' },
    { label: t.nav.caseStudies, href: '/web-siteleri' },
    { label: t.nav.about, href: '/hakkimda' },
    { label: t.nav.contact, href: '/iletisim' },
  ];

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.contactEmail) {
          setContactEmail(data.contactEmail);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <footer className="border-t border-slate-200 bg-[#f8fafc] relative overflow-hidden text-slate-600">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Brand Info with Original Black Logo */}
          <div className="md:col-span-5 space-y-4">
            <Link
              href="/"
              onClick={() => {
                if (pathname === '/') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="inline-block"
            >
              <Image
                src="/logo-black-horizontal.png"
                alt="FMKAL Logo"
                width={150}
                height={28}
                className="h-6 w-auto object-contain"
              />
            </Link>

            <p className="text-xs sm:text-sm text-slate-500 max-w-sm leading-relaxed font-normal">
              {t.footer.tagline}
            </p>

            {/* System Status */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono text-slate-700 bg-white border border-slate-200 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{t.footer.status}</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-950">
              {t.footer.navTitle}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => {
                      if (pathname === link.href) {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className="inline-flex items-center gap-1.5 py-0.5 text-slate-700 hover:text-blue-600 active:text-blue-700 font-medium transition-colors group"
                  >
                    <span className="underline decoration-slate-300 underline-offset-4 group-hover:decoration-blue-600 transition-colors">
                      {link.label}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-blue-600/80 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Channels */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-950">
              {t.footer.contactTitle}
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              {lang === 'en'
                ? 'Reach out directly for project inquiries, technical questions, or collaborations.'
                : lang === 'ko'
                ? '프로젝트 제안, 기술 문의 또는 협업을 위해 언제든 직접 연락해 주세요.'
                : 'Her türlü proje teklifi, teknik soru veya iş birliği için doğrudan ulaşabilirsiniz.'}
            </p>
            <div className="pt-2">
              <a
                href={`mailto:${contactEmail}`}
                className="text-xs font-mono text-blue-600 hover:text-blue-700 font-semibold transition-colors block underline underline-offset-4"
              >
                {contactEmail}
              </a>
              <span className="text-xs text-slate-400 mt-1 block">
                {t.footer.location}
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-10 mt-12 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {currentYear} FMKAL (Furkan Mert Kalyon). {t.footer.rights}
          </p>

          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/gizlilik-politikasi" className="hover:text-slate-950 transition-colors underline">
              {t.footer.privacy}
            </Link>
            <span>•</span>
            <Link href="/kullanim-kosullari" className="hover:text-slate-950 transition-colors underline">
              {t.footer.terms}
            </Link>
            <span>•</span>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-1.5 text-slate-900 hover:text-blue-600 transition-colors font-medium ml-1 cursor-pointer"
              aria-label="Başa Dön"
            >
              <span>{t.footer.backToTop}</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
