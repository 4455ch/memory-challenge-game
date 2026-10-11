'use client';

import React, { useState } from 'react';
import { Difficulty } from '@/types/game';
import { Compass, Flame, Zap, Play, Clock, HelpCircle, Check, Sparkles } from 'lucide-react';

interface LandingStageProps {
  onStartGame: (difficulty: Difficulty, playerName: string) => void;
  isLoading?: boolean;
}

const DIFFICULTY_CONFIG: Record<
  Difficulty,
  {
    title: string;
    subtitle: string;
    stars: string;
    accentColor: string;
    bgAccent: string;
    textColor: string;
    icon: React.ElementType;
    description: string;
    rules: string[];
  }
> = {
  Easy: {
    title: 'EASY',
    subtitle: 'STAGE 1: NOVICE',
    stars: '★☆☆',
    accentColor: 'border-retro-green',
    bgAccent: 'bg-retro-green text-black',
    textColor: 'text-retro-green',
    icon: Compass,
    description: 'Crisp morning scenes with obvious items and beginner-friendly observation questions.',
    rules: ['Clear items & primary colors', 'Hands-free active poses', 'Full 60s memory window'],
  },
  Medium: {
    title: 'MEDIUM',
    subtitle: 'STAGE 2: DETECTIVE',
    stars: '★★☆',
    accentColor: 'border-retro-amber',
    bgAccent: 'bg-retro-amber text-black',
    textColor: 'text-retro-amber',
    icon: Flame,
    description: 'Detailed study desks & artisan cafes with intricate props, riddles, and tactile details.',
    rules: ['Fine prop placement & materials', 'Mystery riddles & timing', 'Requires keen observation'],
  },
  Hard: {
    title: 'HARD',
    subtitle: 'STAGE 3: EXPERT',
    stars: '★★★',
    accentColor: 'border-retro-red',
    bgAccent: 'bg-retro-red text-white',
    textColor: 'text-retro-red',
    icon: Zap,
    description: 'Complex neon night alleys and towering libraries with dense textures & reflex prompts.',
    rules: ['High visual density & reflections', 'Strict reflex freeze challenges', 'Maximum challenge for masters'],
  },
};

export const LandingStage: React.FC<LandingStageProps> = ({
  onStartGame,
  isLoading = false,
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('Easy');
  const [playerName, setPlayerName] = useState<string>('Player 1');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartGame(selectedDifficulty, playerName.trim() || 'Player 1');
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* 90s Arcade Marquee Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-black border-2 border-black text-retro-green text-[10px] font-pixel shadow-hard-sm mb-4">
          <Clock className="w-3.5 h-3.5" /> 60s MEMORY • 30s RAPID ROUNDS
        </div>

        <h2 className="font-pixel text-2xl sm:text-4xl text-white tracking-wider mb-4 leading-relaxed">
          MEMORY & <span className="text-retro-green">CHALLENGE</span>
        </h2>

        <p className="text-slate-300 font-sans max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Observe a 16-bit detailed scene for exactly 60 seconds before it disappears. Then conquer 5 sequential questions and staff physical challenges to claim your rank!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Player Tag Input */}
        <div className="max-w-md mx-auto">
          <label className="block font-pixel text-[11px] text-retro-cyan uppercase tracking-wider mb-2 text-center">
            PLAYER 1 NICKNAME
          </label>
          <div className="relative">
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="ENTER ALIAS..."
              maxLength={24}
              className="w-full px-4 py-3 bg-[#141923] border-2 border-black focus:border-retro-green text-white font-pixel text-xs text-center shadow-hard placeholder-slate-600 focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* 16-bit Difficulty Selection */}
        <div>
          <div className="text-center mb-4">
            <span className="font-pixel text-[11px] text-slate-300 uppercase tracking-wider">
              [ CHOOSE DIFFICULTY LEVEL ]
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {(['Easy', 'Medium', 'Hard'] as Difficulty[]).map((diff) => {
              const cfg = DIFFICULTY_CONFIG[diff];
              const Icon = cfg.icon;
              const isSelected = selectedDifficulty === diff;

              return (
                <button
                  type="button"
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`relative p-5 text-left border-2 border-black transition-all duration-100 ${
                    isSelected
                      ? `bg-[#1c2331] shadow-hard-lg ring-2 ring-retro-green -translate-x-1 -translate-y-1`
                      : `bg-[#141923] hover:bg-[#1a202c] shadow-hard opacity-90 hover:opacity-100`
                  }`}
                >
                  {/* Selected Indicator */}
                  {isSelected && (
                    <div className="absolute top-3 right-3 bg-retro-green text-black px-1.5 py-0.5 border border-black font-pixel text-[9px] font-bold flex items-center gap-1 shadow-hard-sm">
                      <Check className="w-3 h-3 stroke-[3]" /> READY
                    </div>
                  )}

                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 border-2 border-black ${cfg.bgAccent} shadow-hard-sm`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-pixel text-base text-white">{diff}</h3>
                      <p className={`font-pixel text-[9px] ${cfg.textColor} mt-0.5`}>
                        {cfg.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="font-pixel text-xs text-retro-amber mb-3">
                    {cfg.stars}
                  </div>

                  <p className="text-xs text-slate-300 font-sans mb-4 leading-relaxed line-clamp-2">
                    {cfg.description}
                  </p>

                  <ul className="space-y-1.5 pt-3 border-t-2 border-black">
                    {cfg.rules.map((rule, i) => (
                      <li key={i} className="text-[12px] text-slate-400 font-sans flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-retro-green border border-black shrink-0" />
                        {rule}
                      </li>
                    ))}
                  </ul>
                </button>
              );
            })}
          </div>
        </div>

        {/* 90s Mission Rules Blueprint Card */}
        <div className="retro-panel p-5 max-w-2xl mx-auto">
          <h4 className="font-pixel text-[11px] text-retro-amber uppercase tracking-wider mb-3 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-retro-amber" /> MISSION BRIEFING & GAME RULES
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans text-slate-300">
            <div className="bg-black/60 p-3 border border-black shadow-hard-sm">
              <span className="font-pixel text-[10px] text-retro-green block mb-1">01. 60s MEMORY</span>
              <span>The picture unmounts completely when timer reaches 0. No re-peeking.</span>
            </div>
            <div className="bg-black/60 p-3 border border-black shadow-hard-sm">
              <span className="font-pixel text-[10px] text-retro-cyan block mb-1">02. 5 QUESTIONS</span>
              <span>Enforces strictly maximum of 2 active Staff Physical Challenges.</span>
            </div>
            <div className="bg-black/60 p-3 border border-black shadow-hard-sm">
              <span className="font-pixel text-[10px] text-retro-red block mb-1">03. 30s DEADLINE</span>
              <span>Strict 30s per question. Auto-fails (0 pts) and advances at 0s.</span>
            </div>
            <div className="bg-black/60 p-3 border border-black shadow-hard-sm">
              <span className="font-pixel text-[10px] text-retro-amber block mb-1">04. CLAIM PRIZE</span>
              <span>Unlock Diamond or Gold tier and confirm claim code in database.</span>
            </div>
          </div>
        </div>

        {/* Big Retro Action Button */}
        <div className="text-center pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="retro-btn inline-flex items-center justify-center gap-3 px-8 py-4 bg-retro-green hover:bg-emerald-400 text-black font-pixel text-xs sm:text-sm tracking-wider uppercase font-black disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent animate-spin" />
                LOADING CARTRIDGE...
              </span>
            ) : (
              <>
                <Play className="w-4 h-4 fill-black text-black" />
                START {selectedDifficulty.toUpperCase()} MEMORY CHALLENGE
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
