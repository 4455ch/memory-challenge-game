'use client';

import React from 'react';
import { Brain, Database, ShieldCheck, Sparkles } from 'lucide-react';
import { isSupabaseConfigured } from '@/lib/supabaseClient';

interface NavbarProps {
  onResetGame?: () => void;
  showReset?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onResetGame, showReset = false }) => {
  return (
    <header className="w-full border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-white flex items-center gap-2">
              Memory & Challenge <span className="text-xs bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full border border-indigo-500/30 font-medium">PRO</span>
            </h1>
            <p className="text-xs text-slate-400 hidden sm:block">
              Photographic Observation & Rapid Assessment
            </p>
          </div>
        </div>

        {/* Status & Actions */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium glass-panel border-slate-800">
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-300">
              {isSupabaseConfigured ? (
                <span className="text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Supabase Live
                </span>
              ) : (
                <span className="text-cyan-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Local PostgreSQL Mock
                </span>
              )}
            </span>
          </div>

          {showReset && onResetGame && (
            <button
              onClick={onResetGame}
              className="text-xs px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/60 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              Quit to Menu
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
