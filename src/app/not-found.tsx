import Link from 'next/link';
import Image from 'next/image';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      <div className="absolute w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10 max-w-md mx-auto glass-panel p-8 sm:p-10 rounded-2xl border border-white/10 shadow-2xl">
        <div className="flex justify-center mb-6">
          <Image
            src="/logo-horizontal.png"
            alt="FMKAL Logo"
            width={180}
            height={34}
            className="h-8 w-auto object-contain filter drop-shadow-[0_0_12px_rgba(0,242,254,0.3)]"
          />
        </div>

        <span className="inline-block px-3 py-1 rounded-full text-xs font-mono tracking-widest text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 mb-4">
          HATA: 404 // SAYFA BULUNAMADI
        </span>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
          Sinyal Kayboldu.
        </h1>

        <p className="text-slate-400 text-sm sm:text-base mb-8 leading-relaxed">
          Aradığınız dijital koordinat mevcut değil veya taşınmış olabilir. Ana merkeze dönerek keşfe devam edebilirsiniz.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 text-slate-950 font-semibold text-sm hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)]"
          >
            <Home className="w-4 h-4" />
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </main>
  );
}
