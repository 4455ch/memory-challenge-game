'use client';

import React, { useState } from 'react';
import { Difficulty } from '@/types/game';
import { Flame, Compass, Zap, Play, Trophy, Clock, HelpCircle, CheckCircle2 } from 'lucide-react';

interface LandingStageProps {
  onStartGame: (difficulty: Difficulty, playerName: string) => void;
  isLoading?: boolean;
}

const DIFFICULTY_CONFIG: Record<
  Difficulty,
  {
    title: string;
    subtitle: string;
    color: string;
    borderColor: string;
    hoverBorder: string;
    badgeBg: string;
    icon: React.ElementType;
    description: string;
    perks: string[];
  }
> = {
  Easy: {
    title: 'Easy Mode',
    subtitle: 'Warm-up Observation',
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/30',
    hoverBorder: 'hover:border-emerald-500',
    badgeBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    icon: Compass,
    description: 'Crisp morning scenes with obvious items and beginner-friendly observation questions.',
    perks: ['Straightforward items & colors', 'Fun interactive gestures', 'Generous 60s memory window'],
  },
  Medium: {
    title: 'Medium Mode',
    subtitle: 'Analytical Detective',
    color: 'text-amber-400',
    borderColor: 'border-amber-500/30',
    hoverBorder: 'hover:border-amber-500',
    badgeBg: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    icon: Flame,
    description: 'Detailed workstations & artisan cafes with intricate props, riddles, and tactile details.',
    perks: ['Fine prop placement & materials', 'Detective riddles & timing', 'Requires keen visual recall'],
  },
  Hard: {
    title: 'Hard Mode',
    subtitle: 'Cyberpunk Master',
    color: 'text-rose-400',
    borderColor: 'border-rose-500/30',
    hoverBorder: 'hover:border-rose-500',
    badgeBg: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
    icon: Zap,
    description: 'Complex neon night alleys and towering baroque libraries with dense textures & reflex prompts.',
    perks: ['High visual density & reflections', 'Strict reflex freeze challenges', 'Maximum challenge for masters'],
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
    <div className="w-full max-w-4xl mx-auto px-4 py-8 animate-scale-in">
      {/* Hero Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-4 tracking-wide uppercase">
          <Clock className="w-3.5 h-3.5" /> 60s Image Memorization • 30s Rapid Challenge
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-3">
          Master Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">Photographic Memory</span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Examine a high-detail scene for exactly 60 seconds before it disappears. Then conquer 5 sequential questions and staff challenges to claim your tier reward!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Player Name Input */}
        <div className="max-w-md mx-auto">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 text-center">
            Player Alias / Name
          </label>
          <div className="relative">
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Enter your challenger nickname..."
              maxLength={24}
              className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 text-white placeholder-slate-500 text-center font-medium transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Difficulty Selection */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-4 text-center">
            Choose Difficulty Level
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(['Easy', 'Medium', 'Hard'] as Difficulty[]).map((diff) => {
              const cfg = DIFFICULTY_CONFIG[diff];
              const Icon = cfg.icon;
              const isSelected = selectedDifficulty === diff;

              return (
                <button
                  type="button"
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`relative p-5 rounded-2xl text-left transition-all duration-200 border ${
                    isSelected
                      ? `bg-slate-800/90 ${cfg.borderColor} ring-2 ring-indigo-500/50 shadow-xl shadow-indigo-950/40 -translate-y-1`
                      : `bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/40 ${cfg.hoverBorder}`
                  }`}
                >
                  {/* Selected check badge */}
                  {isSelected && (
                    <div className="absolute top-4 right-4 text-indigo-400">
                      <CheckCircle2 className="w-5 h-5 fill-indigo-500/20" />
                    </div>
                  )}

                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2.5 rounded-xl border ${cfg.badgeBg}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className={`font-bold text-lg text-white`}>{diff}</h3>
                      <p className={`text-xs ${cfg.color} font-medium`}>{cfg.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 mb-4 line-clamp-2">
                    {cfg.description}
                  </p>

                  <ul className="space-y-1.5 pt-3 border-t border-slate-800">
                    {cfg.perks.map((perk, i) => (
                      <li key={i} className="text-[11px] text-slate-400 flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-slate-500" />
                        {perk}
                      </li>
                    ))}
                  </ul>
                </button>
              );
            })}
          </div>
        </div>

        {/* Game Rules Card */}
        <div className="glass-panel rounded-2xl p-5 border border-slate-800/80 max-w-2xl mx-auto">
          <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-indigo-400" /> Challenge Blueprint & Protocol
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
            <div className="flex items-start gap-2 bg-slate-900/40 p-2.5 rounded-xl border border-slate-800">
              <span className="font-bold text-indigo-400">1.</span>
              <span><strong>60s Memorization:</strong> Picture hides strictly at 0s. Zero re-peeks allowed.</span>
            </div>
            <div className="flex items-start gap-2 bg-slate-900/40 p-2.5 rounded-xl border border-slate-800">
              <span className="font-bold text-indigo-400">2.</span>
              <span><strong>5 Rapid Questions:</strong> Strictly maximum of 2 active Staff Challenges.</span>
            </div>
            <div className="flex items-start gap-2 bg-slate-900/40 p-2.5 rounded-xl border border-slate-800">
              <span className="font-bold text-indigo-400">3.</span>
              <span><strong>30s Countdown:</strong> Auto-fails (0 pts) and advances instantly at 0s.</span>
            </div>
            <div className="flex items-start gap-2 bg-slate-900/40 p-2.5 rounded-xl border border-slate-800">
              <span className="font-bold text-indigo-400">4.</span>
              <span><strong>Claim Reward:</strong> Unlock Diamond, Gold, or Silver tier & confirm in database.</span>
            </div>
          </div>
        </div>

        {/* Start Game Button */}
        <div className="text-center pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-base shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Initializing Database Session...
              </span>
            ) : (
              <>
                <Play className="w-5 h-5 fill-white" />
                Start {selectedDifficulty} Memory Challenge
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
