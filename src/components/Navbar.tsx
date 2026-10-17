'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight, Globe } from 'lucide-react';
import { useTranslation } from '@/context/LanguageContext';
import { Language } from '@/data/translations';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { lang, setLanguage, t } = useTranslation();

  const NAV_LINKS = [
    { label: t.nav.home, href: '/' },
    { label: t.nav.services, href: '/hizmetler' },
    { label: t.nav.projects, href: '/projeler' },
    { label: t.nav.caseStudies, href: '/web-siteleri' },
    { label: t.nav.about, href: '/hakkimda' },
    { label: t.nav.contact, href: '/iletisim' },
  ];

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'tr', label: 'TR', flag: '🇹🇷' },
    { code: 'en', label: 'EN', flag: '🇬🇧' },
    { code: 'ko', label: '한국어', flag: '🇰🇷' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-3 sm:px-4 pt-3 sm:pt-6 transition-all duration-300">
      <nav
        className={`w-full max-w-6xl rounded-full transition-all duration-300 studio-nav py-2.5 sm:py-3 px-4 sm:px-6 ${
          isScrolled ? 'shadow-md py-2 sm:py-2.5' : ''
        }`}
        aria-label="Ana Navigasyon"
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-slate-900 rounded-lg shrink-0"
          >
            <div className="relative h-6 sm:h-7 w-auto flex items-center">
              <Image
                src="/logo-black-horizontal.png"
                alt="FMKAL — Furkan Mert Kalyon"
                width={140}
                height={26}
                priority
                className="h-5 sm:h-6 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-slate-950 font-semibold bg-slate-100'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right Action: Language Switcher & CTA Button */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Language Selector Pill */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 transition-colors cursor-pointer"
                aria-label="Dil Seçimi"
              >
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                <span className="uppercase">{lang}</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-2xl p-1.5 border border-slate-200 shadow-xl z-50 animate-in fade-in duration-150">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                        lang === l.code
                          ? 'bg-slate-950 text-white font-semibold'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>{l.label}</span>
                      <span className="text-sm">{l.flag}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Primary CTA */}
            <Link
              href="/iletisim"
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full text-xs font-semibold tracking-wide studio-btn-primary shadow-xs shrink-0"
            >
              <span>{t.nav.cta}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Right Controls: Language Pill + Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Quick Mobile Lang Switcher Button */}
            <button
              onClick={() => {
                const nextLang: Language = lang === 'tr' ? 'en' : lang === 'en' ? 'ko' : 'tr';
                setLanguage(nextLang);
              }}
              className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase text-slate-700 bg-slate-100 border border-slate-200"
            >
              {lang}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors"
              aria-label={mobileMenuOpen ? 'Menüyü Kapat' : 'Menüyü Aç'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pt-4 pb-3 border-t border-slate-200 mt-3 flex flex-col gap-1.5 animate-in fade-in duration-200">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive ? 'text-slate-950 bg-slate-100 font-semibold' : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Mobile Language Switcher Row */}
            <div className="flex items-center gap-1.5 pt-2 px-2 border-t border-slate-100 mt-2">
              <span className="text-xs text-slate-400 mr-1 font-mono">Dil / Language:</span>
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLanguage(l.code)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                    lang === l.code
                      ? 'bg-slate-950 text-white'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>

            <Link
              href="/iletisim"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 w-full py-3 rounded-xl text-xs font-semibold tracking-wide studio-btn-primary"
            >
              <span>{t.nav.cta}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
