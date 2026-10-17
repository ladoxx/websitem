'use client';

import { motion } from 'framer-motion';
import { Play, Sparkles, ShieldCheck, Server, Globe, Check } from 'lucide-react';

/* Visual 01: Modern Web Architecture & PageSpeed */
export function WebVisual() {
  return (
    <div className="w-full h-44 rounded-xl bg-gradient-to-br from-blue-50/90 via-slate-50/50 to-indigo-50/80 border border-slate-200/70 p-3.5 flex flex-col justify-between relative overflow-hidden group/visual">
      {/* Background Soft Aura Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/15 rounded-full blur-2xl pointer-events-none" />

      {/* Mini Browser Frame with subtle float */}
      <div className="w-full bg-white rounded-lg border border-slate-200/80 shadow-xs p-2.5 space-y-2 relative overflow-hidden animate-float-slow">
        {/* Browser Top Bar */}
        <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-400" />
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <div className="px-2.5 py-0.5 rounded-full bg-slate-50 border border-slate-100 text-[9px] font-mono text-slate-500">
            fmkal.com/web
          </div>
          <div className="flex items-center gap-1 text-[9px] font-mono text-blue-600 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
            <span>Next.js 15</span>
          </div>
        </div>

        {/* Animated Wireframe Hero Content */}
        <div className="space-y-1.5 pt-0.5">
          <div className="flex items-center gap-2">
            <div className="h-2 w-1/3 rounded-full bg-blue-500/80 animate-pulse" />
            <div className="h-2 w-1/4 rounded-full bg-blue-100" />
          </div>
          <div className="h-1.5 w-4/5 rounded-full bg-slate-200/80 overflow-hidden relative">
            <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-blue-500/60 to-transparent animate-scan-slide" />
          </div>
          <div className="h-1.5 w-3/5 rounded-full bg-slate-100" />
        </div>
      </div>

      {/* Floating Metrics Badge */}
      <div className="self-center bg-white/95 backdrop-blur-md border border-slate-200 shadow-sm px-3 py-1.5 rounded-full flex items-center gap-2 text-[10px] font-mono text-slate-700 animate-soft-pulse">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="font-semibold text-emerald-600">100/100 PageSpeed</span>
        <span className="text-slate-300">|</span>
        <span className="text-slate-500">&lt;50ms TTFB</span>
      </div>
    </div>
  );
}

/* Visual 02: Cinematic 4K & AI Video Production */
export function VideoVisual() {
  return (
    <div className="w-full h-44 rounded-xl bg-gradient-to-br from-purple-50/90 via-slate-50/50 to-pink-50/80 border border-slate-200/70 p-3.5 flex flex-col justify-between relative overflow-hidden group/visual">
      {/* Background Soft Purple Aura */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-400/15 rounded-full blur-2xl pointer-events-none" />

      {/* Top Header Pills */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 border border-purple-200/80 shadow-2xs text-[9px] font-mono font-semibold text-purple-700">
          <Sparkles className="w-2.5 h-2.5 text-purple-600 animate-pulse" />
          <span>4K HDR 60FPS</span>
        </div>
        <div className="px-2 py-0.5 rounded-md bg-white/80 border border-slate-200/70 text-[9px] font-mono text-slate-500 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
          <span>REC 00:45</span>
        </div>
      </div>

      {/* Center Cinematic Play Indicator */}
      <div className="flex items-center justify-center my-auto">
        <div className="w-12 h-12 rounded-full bg-white shadow-md border border-purple-200 flex items-center justify-center text-purple-600 relative cursor-pointer animate-soft-pulse">
          <div className="absolute inset-0 rounded-full bg-purple-400/20 animate-ping" />
          <Play className="w-5 h-5 ml-0.5 fill-purple-600 text-purple-600 relative z-10" />
        </div>
      </div>

      {/* Animated Clean Equalizer Waveform */}
      <div className="bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-2xs rounded-lg px-3 py-1.5 flex items-center justify-between">
        <span className="text-[10px] font-mono text-slate-600 font-medium">Dolby 5.1 / Master</span>
        <div className="flex items-end gap-1 h-4">
          <span className="w-1 bg-purple-500 rounded-full animate-wave-1" />
          <span className="w-1 bg-purple-400 rounded-full animate-wave-2" />
          <span className="w-1 bg-indigo-400 rounded-full animate-wave-3" />
          <span className="w-1 bg-purple-500 rounded-full animate-wave-4" />
          <span className="w-1 bg-purple-400 rounded-full animate-wave-5" />
          <span className="w-1 bg-indigo-500 rounded-full animate-wave-6" />
          <span className="w-1 bg-purple-500 rounded-full animate-wave-7" />
          <span className="w-1 bg-purple-400 rounded-full animate-wave-8" />
        </div>
      </div>
    </div>
  );
}

/* Visual 03: Cloud, Docker & Zero Trust Infrastructure */
export function CloudVisual() {
  return (
    <div className="w-full h-44 rounded-xl bg-gradient-to-br from-emerald-50/90 via-slate-50/50 to-cyan-50/80 border border-slate-200/70 p-3.5 flex flex-col justify-between relative overflow-hidden group/visual">
      {/* Background Soft Emerald Aura */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/15 rounded-full blur-2xl pointer-events-none" />

      {/* Top Header Status */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 border border-emerald-200/80 shadow-2xs text-[9px] font-mono font-semibold text-emerald-700">
          <ShieldCheck className="w-3 h-3 text-emerald-600" />
          <span>Zero Trust Tüneli</span>
        </div>
        <div className="flex items-center gap-1 text-[9px] font-mono text-slate-500">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>99.99% SLA</span>
        </div>
      </div>

      {/* Center Topology: Client -> Cloudflare -> Docker */}
      <div className="flex items-center justify-between px-2 my-auto">
        {/* Node 1: User / Edge */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 shadow-2xs flex items-center justify-center text-slate-700 animate-float-slow">
            <Globe className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-[9px] font-mono text-slate-500">Global Edge</span>
        </div>

        {/* Connection Line with Animated Data Packet */}
        <div className="flex-1 px-2 flex items-center justify-center relative">
          <div className="w-full h-0.5 bg-gradient-to-r from-blue-300 via-emerald-400 to-emerald-500 relative overflow-hidden rounded-full">
            <div className="w-1/3 h-full bg-white shadow-sm rounded-full animate-scan-slide" />
          </div>
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-md border border-white absolute animate-packet-travel" />
        </div>

        {/* Node 2: Secure Server / Docker */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 shadow-2xs flex items-center justify-center text-slate-700 animate-float-delayed">
            <Server className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-[9px] font-mono text-slate-500">Docker Homelab</span>
        </div>
      </div>

      {/* Floating Security Badge */}
      <div className="bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-2xs rounded-lg px-3 py-1.5 flex items-center justify-between text-[10px] font-mono text-slate-600">
        <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
          <Check className="w-3 h-3 text-emerald-600" />
          Sıfır Port Açık
        </span>
        <span className="text-slate-400">14ms RTT</span>
      </div>
    </div>
  );
}

