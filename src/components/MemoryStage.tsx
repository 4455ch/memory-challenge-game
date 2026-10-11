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

  // Safety fallback if image CDN takes too long
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
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      {/* 90s Retro HUD Header */}
      <div className="retro-panel-elevated p-4 sm:p-5 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-retro-green text-black border-2 border-black shadow-hard-sm">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-pixel text-[9px] px-2 py-0.5 bg-black text-retro-green border border-black shadow-hard-sm">
                STAGE 01: MEMORIZE
              </span>
              <span className="font-pixel text-[9px] text-retro-amber">
                DIFF: {image.difficulty.toUpperCase()}
              </span>
            </div>
            <h2 className="font-pixel text-sm sm:text-base text-white mt-1">
              {image.title}
            </h2>
          </div>
        </div>

        {/* 60s Digital Pixel Countdown */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="font-pixel text-[9px] text-slate-400 block mb-0.5">
              TIME LEFT
            </span>
            <div className={`font-pixel text-2xl sm:text-3xl tracking-wider px-3 py-1 bg-black border-2 border-black shadow-hard-sm ${
              isUrgent ? 'text-retro-red animate-pulse' : 'text-retro-green'
            }`}>
              {timeLeft < 10 ? `0${timeLeft}` : timeLeft}s
            </div>
          </div>

          {/* Retro Skip Button */}
          <button
            onClick={onTimeExpired}
            className="retro-btn bg-[#232a35] hover:bg-white hover:text-black text-white text-[10px] font-pixel px-3.5 py-3 flex items-center gap-1.5"
            title="Skip waiting if you are already ready"
          >
            <span>READY</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 90s Segmented Retro Progress Bar */}
      <div className="w-full bg-black border-2 border-black shadow-hard-sm h-3 mb-6 p-0.5 flex">
        <div
          className={`h-full transition-all duration-1000 ease-linear ${
            isUrgent ? 'bg-retro-red' : 'bg-retro-green'
          }`}
          style={{ width: `${100 - percentage}%` }}
        />
      </div>

      {/* Image Frame (Hard 2px Black Border + Hard Drop Shadow) */}
      <div className="relative border-2 border-black bg-black shadow-hard-lg min-h-[360px] sm:min-h-[480px] flex items-center justify-center overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#141923] z-20 gap-3">
            <div className="w-7 h-7 border-4 border-retro-green border-t-transparent animate-spin" />
            <p className="font-pixel text-[10px] text-retro-green">DECOMPRESSING SCENE DATA...</p>
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
          className={`w-full max-h-[580px] object-cover transition-opacity duration-200 select-none pointer-events-none ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {imageError && (
          <div className="absolute bottom-4 left-4 right-4 bg-black border-2 border-retro-amber p-3 flex items-center gap-2 text-xs font-sans text-retro-amber z-30 shadow-hard">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Scene preview fallback cached. Detail: {image.description}</span>
          </div>
        )}

        {/* Arcade watermark */}
        <div className="absolute bottom-3 right-3 bg-black border-2 border-black px-2.5 py-1 text-[10px] font-pixel text-retro-red flex items-center gap-1.5 shadow-hard-sm">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>HIDES AT 0s</span>
        </div>
      </div>

      {/* Arcade Hint Bar */}
      <div className="mt-4 text-center">
        <p className="text-xs font-sans text-slate-400 flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-retro-amber" />
          Scrutinize item counts, colors, materials, text signs, and relative locations.
        </p>
      </div>
    </div>
  );
};
