'use client';

import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Send, CheckCircle2, AlertCircle, Mail, Sparkles, ArrowUpRight } from 'lucide-react';
import { useTranslation } from '@/context/LanguageContext';

export default function Contact() {
  const { t } = useTranslation();
  const [contactEmail, setContactEmail] = useState('iletisim@fmkal.com');

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

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: t.contact.servicesList[0],
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#0f172a', '#2563eb', '#64748b'],
        });
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Bir hata oluştu. Lütfen tekrar deneyin.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Bağlantı hatası oluştu. Lütfen doğrudan e-posta ile iletişime geçin.');
    }
  };

  return (
    <section id="iletisim" className="py-24 sm:py-32 relative bg-white border-t border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Context & Direct Contact Links */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-slate-700 bg-slate-100 border border-slate-200 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                <span>{t.contact.badge}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 mb-4 leading-tight">
                {t.contact.title}
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-light">
                {t.contact.subtitle}
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-3.5 pt-4 border-t border-slate-200">
              <a
                href={`mailto:${contactEmail}`}
                className="studio-card p-4 rounded-2xl flex items-center justify-between group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-500 block">{t.contact.emailLabel}</span>
                    <span className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {contactEmail}
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <div className="studio-card p-4 rounded-2xl">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-500 block">{t.contact.responseTime}</span>
                    <span className="text-sm font-medium text-slate-700">
                      {t.contact.responseDesc}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              {t.contact.privacyNote}
            </p>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="studio-card rounded-3xl p-6 sm:p-10 shadow-lg relative bg-white">
              
              {status === 'success' ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in duration-200">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-950">{t.contact.successTitle}</h3>
                  <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                    {t.contact.successDesc}
                  </p>
                  <button
                    onClick={() => {
                      setStatus('idle');
                      setFormData({
                        name: '',
                        email: '',
                        service: t.contact.servicesList[0],
                        message: '',
                      });
                    }}
                    className="mt-6 px-6 py-2 rounded-full text-xs font-semibold text-slate-900 border border-slate-300 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    {t.contact.newMsgBtn}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-xs font-mono tracking-wider uppercase text-slate-700 mb-2 font-medium">
                      {t.contact.nameField}
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      placeholder={t.contact.namePlaceholder}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50/70 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors"
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-mono tracking-wider uppercase text-slate-700 mb-2 font-medium">
                      {t.contact.emailField}
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      placeholder="ahmet@sirket.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50/70 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors"
                    />
                  </div>

                  {/* Service Selection (3 Items Only - No Genel Danışmanlık) */}
                  <div>
                    <label className="block text-xs font-mono tracking-wider uppercase text-slate-700 mb-2 font-medium">
                      {t.contact.serviceField}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {t.contact.servicesList.map((svc) => (
                        <button
                          type="button"
                          key={svc}
                          onClick={() => setFormData({ ...formData, service: svc })}
                          className={`px-3.5 py-2.5 rounded-xl text-xs font-medium text-left transition-all border cursor-pointer ${
                            formData.service === svc
                              ? 'bg-slate-950 border-slate-950 text-white font-semibold'
                              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900'
                          }`}
                        >
                          {svc}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-mono tracking-wider uppercase text-slate-700 mb-2 font-medium">
                      {t.contact.messageField}
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      placeholder={t.contact.messagePlaceholder}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50/70 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors resize-none"
                    />
                  </div>

                  {status === 'error' && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-4 rounded-xl text-xs font-semibold tracking-wide studio-btn-primary shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {status === 'loading' ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>{t.contact.submitting}</span>
                      </span>
                    ) : (
                      <>
                        <span>{t.contact.submitBtn}</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
