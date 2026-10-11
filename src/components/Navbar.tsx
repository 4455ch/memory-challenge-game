'use client';

import React from 'react';
import { Database, ShieldCheck, Sparkles, Gamepad2, ArrowLeft } from 'lucide-react';
import { isSupabaseConfigured } from '@/lib/supabaseClient';

interface NavbarProps {
  onResetGame?: () => void;
  showReset?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onResetGame, showReset = false }) => {
  return (
    <header className="w-full bg-[#141923] border-b-2 border-black sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Retro Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-retro-green border-2 border-black shadow-hard-sm flex items-center justify-center text-black font-pixel text-base font-black">
            <Gamepad2 className="w-6 h-6 text-black" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-pixel text-xs sm:text-sm text-white tracking-wider">
                MEMO<span className="text-retro-green">CHALLENGE</span>
              </h1>
              <span className="font-pixel text-[9px] bg-retro-amber text-black px-1.5 py-0.5 border border-black shadow-hard-sm font-bold">
                16-BIT
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-sans tracking-wide hidden sm:block mt-0.5">
              Rapid Photographic Recall • Arcade Edition
            </p>
          </div>
        </div>

        {/* Status Badge & Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 bg-black border-2 border-black text-xs font-pixel shadow-hard-sm">
            <Database className="w-3.5 h-3.5 text-retro-green" />
            <span className="text-white text-[10px]">
              {isSupabaseConfigured ? (
                <span className="text-retro-green flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> CLOUD DB
                </span>
              ) : (
                <span className="text-retro-cyan flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> LOCAL MOCK
                </span>
              )}
            </span>
          </div>

          {showReset && onResetGame && (
            <button
              onClick={onResetGame}
              className="retro-btn bg-[#232a35] hover:bg-retro-red hover:text-white text-slate-200 text-[10px] font-pixel px-3 py-1.5 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3 h-3" />
              QUIT
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
