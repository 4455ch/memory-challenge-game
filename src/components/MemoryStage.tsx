'use client';

import React, { useEffect, useState } from 'react';
import { GameImage } from '@/types/game';
import { useCountdownTimer } from '@/hooks/useCountdownTimer';
import { Eye, ArrowRight, ShieldAlert, Sparkles, AlertCircle } from 'lucide-react';

interface MemoryStageProps {
  image: GameImage;
  onTimeExpired: () => void;
  memorizationSeconds?: number; // Defaults to 60
}

export const MemoryStage: React.FC<MemoryStageProps> = ({
  image,
  onTimeExpired,
  memorizationSeconds = 60,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const { timeLeft, isRunning, start } = useCountdownTimer({
    initialSeconds: memorizationSeconds,
    onExpire: onTimeExpired,
    autoStart: false,
  });

  // Start timer once image has loaded
  useEffect(() => {
    if (imageLoaded) {
      start(memorizationSeconds);
    }
  }, [imageLoaded, memorizationSeconds, start]);

  // Fallback timer if image fails to load or takes too long
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      if (!imageLoaded) {
        setImageLoaded(true);
      }
    }, 3000);
    return () => clearTimeout(safetyTimer);
  }, [imageLoaded]);

  const percentage = ((memorizationSeconds - timeLeft) / memorizationSeconds) * 100;
  const isUrgent = timeLeft <= 15;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 animate-scale-in">
      {/* Top Header & Countdown */}
      <div className="glass-panel-elevated rounded-2xl p-5 mb-6 border border-slate-700/60 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
            <Eye className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Phase 1: Memorization
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Difficulty: {image.difficulty}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white mt-0.5">
              {image.title}
            </h2>
          </div>
        </div>

        {/* 60s Countdown Timer Display */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
              Time Remaining
            </span>
            <div className={`text-3xl sm:text-4xl font-black font-mono tracking-tight flex items-center justify-end gap-1 ${
              isUrgent ? 'text-rose-400 animate-pulse' : 'text-cyan-300'
            }`}>
              <span>00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</span>
            </div>
          </div>

          {/* Quick proceed button */}
          <button
            onClick={onTimeExpired}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs font-semibold text-slate-200 hover:text-white transition-all shadow-md group"
            title="Skip waiting if you are already ready"
          >
            <span>Ready Now</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Dynamic Progress Bar */}
      <div className="w-full bg-slate-900 rounded-full h-2 mb-6 overflow-hidden border border-slate-800">
        <div
          className={`h-full transition-all duration-1000 ease-linear rounded-full ${
            isUrgent
              ? 'bg-gradient-to-r from-amber-500 to-rose-500'
              : 'bg-gradient-to-r from-emerald-500 via-cyan-500 to-indigo-500'
          }`}
          style={{ width: `${100 - percentage}%` }}
        />
      </div>

      {/* Image Container (Strictly destroyed/unmounted when phase ends) */}
      <div className="relative rounded-2xl overflow-hidden border-2 border-slate-700/80 bg-slate-950 shadow-2xl group min-h-[360px] sm:min-h-[480px] flex items-center justify-center">
        {!imageLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/90 z-20 gap-3">
            <div className="w-8 h-8 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-slate-300 font-medium">Loading high-resolution memory scene...</p>
          </div>
        )}

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.image_url}
          alt={image.title}
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setImageError(true);
            setImageLoaded(true);
          }}
          className={`w-full max-h-[580px] object-cover transition-opacity duration-300 select-none pointer-events-none ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {imageError && (
          <div className="absolute bottom-4 left-4 right-4 bg-slate-900/95 border border-amber-500/40 p-3 rounded-xl flex items-center gap-2 text-xs text-amber-300 z-30">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
            <span>Image CDN preview cached. Visual scene: {image.description}</span>
          </div>
        )}

        {/* Warning banner watermark */}
        <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-[11px] text-slate-400 flex items-center gap-1.5 pointer-events-none">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
          <span>Image disappears strictly after 60s</span>
        </div>
      </div>

      {/* Guidance Note */}
      <div className="mt-4 text-center">
        <p className="text-xs text-slate-400 flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          Pay close attention to textures, colors, numbers, materials, and relative placements.
        </p>
      </div>
    </div>
  );
};
