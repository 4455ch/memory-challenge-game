'use client';

import React, { useState, useEffect } from 'react';
import { GameImage, GameSession, Question, RewardClaim, SessionAnswer } from '@/types/game';
import { calculateScore, getRewardTier } from '@/utils/scoreCalculator';
import confetti from 'canvas-confetti';
import {
  Trophy,
  Sparkles,
  Award,
  Medal,
  Target,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  Check,
  ShieldCheck,
  QrCode,
  Flame,
  HelpCircle
} from 'lucide-react';

interface ResultStageProps {
  session: GameSession;
  image: GameImage;
  questions: Question[];
  answers: SessionAnswer[];
  initialClaim?: RewardClaim | null;
  onConfirmClaim: (claimId: string) => Promise<RewardClaim>;
  onPlayAgain: () => void;
}

export const ResultStage: React.FC<ResultStageProps> = ({
  session,
  image,
  questions,
  answers,
  initialClaim,
  onConfirmClaim,
  onPlayAgain,
}) => {
  const score = calculateScore(answers);
  const rewardTier = getRewardTier(score);

  const [claim, setClaim] = useState<RewardClaim | null>(initialClaim || null);
  const [isClaiming, setIsClaiming] = useState<boolean>(false);
  const [claimSuccess, setClaimSuccess] = useState<boolean>(
    initialClaim?.claim_status === 'claimed'
  );

  // Trigger celebration confetti for high tiers
  useEffect(() => {
    if (score >= 3) {
      try {
        confetti({
          particleCount: score >= 5 ? 120 : 60,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (err) {
        // Safe fallback if canvas not available
      }
    }
  }, [score]);

  const handleClaim = async () => {
    if (!claim || claim.claim_status === 'claimed' || isClaiming) return;
    setIsClaiming(true);

    try {
      const updated = await onConfirmClaim(claim.id);
      setClaim(updated);
      setClaimSuccess(true);
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      } catch {}
    } catch (err) {
      console.error('Failed to claim reward:', err);
    } finally {
      setIsClaiming(false);
    }
  };

  const getTierIcon = () => {
    switch (rewardTier.tier) {
      case 'Diamond':
        return <Sparkles className="w-8 h-8 text-cyan-300" />;
      case 'Gold':
        return <Trophy className="w-8 h-8 text-amber-300" />;
      case 'Silver':
        return <Medal className="w-8 h-8 text-slate-200" />;
      case 'Bronze':
        return <Award className="w-8 h-8 text-amber-600" />;
      default:
        return <Target className="w-8 h-8 text-slate-400" />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 animate-scale-in">
      {/* Header Banner */}
      <div className="text-center mb-8">
        <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300">
          Challenge Completed
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
          Memory & Challenge Results
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Scene: <span className="text-slate-200 font-semibold">{image.title}</span> • Mode: <span className="text-slate-200 font-semibold">{session.difficulty}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
        {/* Score & Reward Tier Card */}
        <div className="md:col-span-5 glass-panel-elevated rounded-3xl p-6 sm:p-7 border border-slate-700/80 flex flex-col justify-between text-center relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute -top-16 -right-16 w-44 h-44 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            {/* Score Ring */}
            <div className="relative inline-flex items-center justify-center mb-4">
              <div className="w-28 h-28 rounded-full border-4 border-slate-800 bg-slate-900/80 flex flex-col items-center justify-center shadow-xl">
                <span className="text-4xl font-black text-white font-mono">{score}</span>
                <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                  Out of 5
                </span>
              </div>
            </div>

            {/* Tier Badge */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 mb-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                {getTierIcon()}
                <h3 className="text-xl font-black text-white tracking-wide">
                  {rewardTier.title}
                </h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {rewardTier.description}
              </p>
            </div>
          </div>

          {/* Reward Claim Database Action Section */}
          <div className="pt-4 border-t border-slate-800">
            {claim && (
              <div className="mb-4 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-left">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span className="flex items-center gap-1 font-mono">
                    <QrCode className="w-3.5 h-3.5 text-indigo-400" />
                    {claim.claim_code}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    claimSuccess
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {claimSuccess ? 'Claimed in Database' : 'Pending Confirmation'}
                  </span>
                </div>
                {claimSuccess && (
                  <p className="text-[11px] text-emerald-400/90 flex items-center gap-1 mt-1 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified in Supabase at {new Date(claim.claimed_at || Date.now()).toLocaleTimeString()}
                  </p>
                )}
              </div>
            )}

            {/* The Explicit "Confirm Claim" Button */}
            {!claimSuccess ? (
              <button
                onClick={handleClaim}
                disabled={isClaiming || !claim}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/50 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isClaiming ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Updating Database...
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    Confirm Claim Reward
                  </>
                )}
              </button>
            ) : (
              <div className="w-full py-3 px-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-bold text-xs flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Reward Claim Confirmed & Stored!
              </div>
            )}
          </div>
        </div>

        {/* Detailed Breakdown Review (5 Questions) */}
        <div className="md:col-span-7 glass-panel-elevated rounded-3xl p-6 border border-slate-700/80">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-4 flex items-center gap-2">
            Sequential Performance Breakdown (5/5)
          </h3>

          <div className="space-y-3">
            {questions.map((q, idx) => {
              const ans = answers.find((a) => a.question_id === q.id) || answers[idx];
              const isCorrect = ans ? ans.is_correct : false;
              const isTimeout = ans ? ans.is_timeout : true;
              const isChallenge = q.question_type === 'Challenge';

              return (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    isCorrect
                      ? 'bg-emerald-950/20 border-emerald-800/40'
                      : 'bg-slate-900/60 border-slate-800'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-400">
                        #{idx + 1}
                      </span>
                      {isChallenge ? (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                          <Flame className="w-3 h-3" /> Challenge
                        </span>
                      ) : (
                        <span className="text-[10px] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                          Question
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {ans && (
                        <span className="text-[11px] text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {ans.time_spent_seconds}s
                        </span>
                      )}
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                          isCorrect
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : 'bg-rose-500/20 text-rose-300'
                        }`}
                      >
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> +1 Pt
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5 text-rose-400" /> 0 Pts
                          </>
                        )}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-white font-medium mb-1 line-clamp-2">
                    {q.question_text}
                  </p>

                  <div className="text-[11px] text-slate-400 flex flex-wrap items-center gap-x-3 gap-y-1">
                    {isTimeout ? (
                      <span className="text-rose-400 font-semibold">Timed Out (30s reached)</span>
                    ) : isChallenge ? (
                      <span>
                        Staff Decision:{' '}
                        <strong className={isCorrect ? 'text-emerald-300' : 'text-rose-300'}>
                          {ans?.user_answer || 'N/A'}
                        </strong>
                      </span>
                    ) : (
                      <>
                        <span>
                          Your Answer:{' '}
                          <strong className={isCorrect ? 'text-emerald-300' : 'text-rose-300'}>
                            {ans?.user_answer || 'None'}
                          </strong>
                        </span>
                        {!isCorrect && (
                          <span className="text-slate-400">
                            • Correct:{' '}
                            <strong className="text-slate-200">{q.correct_answer}</strong>
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Play Again Action */}
      <div className="text-center pt-2">
        <button
          onClick={onPlayAgain}
          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-bold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg"
        >
          <RotateCcw className="w-4 h-4" />
          Play Another Round
        </button>
      </div>
    </div>
  );
};
