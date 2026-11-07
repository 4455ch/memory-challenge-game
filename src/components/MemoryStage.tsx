'use client';

import React, { useEffect, useState } from 'react';
import { GameImage } from '@/types/game';
import { useCountdownTimer } from '@/hooks/useCountdownTimer';
import { Eye, ArrowRight, ShieldAlert, AlertCircle } from 'lucide-react';
import { FireworkBurst, FerrisWheelGraphic } from './TempleFairGraphics';

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
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 relative">
      {/* Decorative Sparkle Fireworks in corner */}
      <div className="absolute -top-1 right-2 sm:right-6 opacity-60 pointer-events-none">
        <FireworkBurst size={44} />
      </div>

      {/* Clean HUD Header with Temple Fair Touch */}
      <div className="bg-white rounded-2xl border border-[#DCCEB5] p-5 sm:p-6 mb-6 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#FFF7DB] border border-[#E0D5C1] rounded-xl flex items-center justify-center shrink-0 p-1">
            <FerrisWheelGraphic size={36} />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-xs sm:text-sm font-bold px-3 py-1 bg-[#FFF2D1] text-[#7A4B17] rounded-full border border-[#E3C37B]">
                ด่านที่ 1: จดจำภาพ
              </span>
              <span className="text-xs sm:text-sm font-medium px-3 py-1 bg-[#FAF7F0] text-slate-700 rounded-full border border-[#E8DEC8]">
                ระดับ: {image.difficulty === 'Easy' ? 'ง่าย' : image.difficulty === 'Medium' ? 'ปานกลาง' : 'ยาก'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#381F0D]">
              {image.title}
            </h2>
          </div>
        </div>

        {/* 60s Digital Countdown & Skip Button */}
        <div className="flex items-center gap-5">
          <div className="text-right">
            <span className="text-xs sm:text-sm font-medium text-slate-500 block">
              เวลาจดจำภาพ
            </span>
            <div
              className={`text-3xl sm:text-4xl font-mono font-extrabold tracking-tight ${
                isUrgent ? 'text-[#C2272D] animate-pulse' : 'text-[#381F0D]'
              }`}
            >
              {timeLeft < 10 ? `0${timeLeft}` : timeLeft}s
            </div>
          </div>

          <button
            onClick={onTimeExpired}
            className="px-5 py-3 rounded-xl bg-[#381F0D] hover:bg-[#201005] text-[#FFF9E6] font-bold text-sm sm:text-base flex items-center gap-2 shadow-sm transition-all"
            title="ข้ามไปตอบคำถามทันทีหากจดจำได้ครบแล้ว"
          >
            <span>พร้อมแล้ว</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Modern Sleek Progress Bar */}
      <div className="w-full bg-[#E5DCCB] rounded-full h-2.5 mb-6 overflow-hidden">
        <div
          className={`h-full transition-all duration-1000 ease-linear rounded-full ${
            isUrgent ? 'bg-[#C2272D]' : 'bg-[#F59E0B]'
          }`}
          style={{ width: `${100 - percentage}%` }}
        />
      </div>

      {/* Image Container with Elegant Vintage Frame - Showing Full Image without Cropping */}
      <div className="relative rounded-2xl border-2 border-[#D4C5AB] bg-[#F7F4EB] shadow-md overflow-hidden min-h-[360px] sm:min-h-[500px] flex items-center justify-center p-2 sm:p-3">
        {!imageLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#FAF7F0] z-20 gap-3">
            <div className="w-8 h-8 border-3 border-[#C2272D] border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-medium text-slate-700">กำลังโหลดภาพ...</p>
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
          className={`w-auto h-auto max-w-full max-h-[72vh] object-contain mx-auto rounded-lg transition-opacity duration-200 select-none pointer-events-none ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {imageError && (
          <div className="absolute bottom-4 left-4 right-4 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3 text-sm text-amber-900 z-30 shadow-md">
            <AlertCircle className="w-5 h-5 shrink-0 text-amber-700" />
            <span className="font-medium">รายละเอียดภาพสำรอง: {image.description}</span>
          </div>
        )}
      </div>

      {/* Helper Bar Placed OUTSIDE the Image to Avoid Covering Any Corner or Detail */}
      <div className="mt-3 flex flex-col sm:flex-row items-center justify-between gap-2 px-2 text-xs sm:text-sm text-slate-600">
        <div className="flex items-center gap-2 font-medium text-[#7A4B17]">
          <ShieldAlert className="w-4 h-4 text-[#D97706] shrink-0" />
          <span>จดจำรายละเอียดทั้งหมดในภาพ (ภาพจะถูกซ่อนทันทีเมื่อเวลาหมด)</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-400">
          <Eye className="w-4 h-4 text-slate-400" />
          <span>แสดงภาพเต็มสัดส่วน 100% ไม่ถูกตัดขอบ</span>
        </div>
      </div>
    </div>
  );
};
