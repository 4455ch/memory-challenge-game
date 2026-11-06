'use client';

import React from 'react';
import { Database, ShieldCheck, Sparkles, ArrowLeft } from 'lucide-react';
import { isSupabaseConfigured } from '@/lib/supabaseClient';
import { FerrisWheelGraphic } from './TempleFairGraphics';

interface NavbarProps {
  onResetGame?: () => void;
  showReset?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onResetGame, showReset = false }) => {
  return (
    <header className="w-full bg-white/90 backdrop-blur-md border-b border-[#e5dccb] sticky top-0 z-50">
      {/* Subtle Warm Accent Top Bar (Crimson & Marigold from poster) */}
      <div className="h-1 w-full bg-gradient-to-r from-[#C2272D] via-[#F59E0B] to-[#10B981]" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand with Temple Fair Ferris Wheel Mascot */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FFF7DB] border border-[#d4c5ab] rounded-xl flex items-center justify-center shadow-sm overflow-hidden p-1">
            <FerrisWheelGraphic size={32} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-extrabold text-[#381F0D] tracking-tight">
                จำให้ <span className="text-[#C2272D]">MAN</span>
              </h1>
              <span className="text-xs bg-[#FFF2D1] text-[#7A4B17] font-bold px-2 py-0.5 rounded-full border border-[#E3C37B]">
                เที่ยวงานวัด
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-medium hidden sm:block">
              เกมประลองความจำภาพถ่าย "จำให้ MAN" • เทศกาลงานวัด
            </p>
          </div>
        </div>

        {/* Status Badge & Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#FAF7F0] border border-[#E0D5C1] rounded-lg text-xs sm:text-sm font-medium text-slate-700">
            <Database className="w-4 h-4 text-amber-700" />
            <span>
              {isSupabaseConfigured ? (
                <span className="text-emerald-700 flex items-center gap-1.5 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> เชื่อมต่อคลาวด์
                </span>
              ) : (
                <span className="text-blue-700 flex items-center gap-1.5 font-semibold">
                  <Sparkles className="w-4 h-4 text-blue-600" /> ข้อมูลจำลองในเครื่อง
                </span>
              )}
            </span>
          </div>

          {showReset && onResetGame && (
            <button
              onClick={onResetGame}
              className="text-xs sm:text-sm font-semibold px-3.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              ออกจากเกม
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
