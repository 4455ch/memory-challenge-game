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
  Flame
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

  useEffect(() => {
    if (score >= 3) {
      try {
        confetti({
          particleCount: score >= 5 ? 120 : 60,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (err) {}
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
        return <Sparkles className="w-7 h-7 text-retro-cyan" />;
      case 'Gold':
        return <Trophy className="w-7 h-7 text-retro-amber" />;
      case 'Silver':
        return <Medal className="w-7 h-7 text-slate-300" />;
      case 'Bronze':
        return <Award className="w-7 h-7 text-amber-600" />;
      default:
        return <Target className="w-7 h-7 text-slate-400" />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* 90s Victory Banner Header */}
      <div className="text-center mb-8">
        <span className="font-pixel text-[10px] px-3 py-1 bg-black text-retro-green border-2 border-black shadow-hard-sm uppercase">
          ★ STAGE CLEARED ★
        </span>
        <h2 className="font-pixel text-2xl sm:text-3xl text-white mt-4">
          MISSION RESULTS
        </h2>
        <p className="text-xs font-sans text-slate-400 mt-2">
          SCENE: <strong className="text-white">{image.title}</strong> • MODE: <strong className="text-white">{session.difficulty.toUpperCase()}</strong>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
        {/* Score & Reward Tier Neo-Brutalist Card */}
        <div className="md:col-span-5 retro-panel-elevated p-6 flex flex-col justify-between text-center">
          <div>
            {/* 16-Bit Digital Score Counter */}
            <div className="inline-flex items-center justify-center mb-4">
              <div className="w-28 h-28 bg-black border-2 border-black shadow-hard flex flex-col items-center justify-center">
                <span className="font-pixel text-4xl text-retro-green font-black">
                  {score}
                </span>
                <span className="font-pixel text-[9px] text-slate-400 mt-1 uppercase">
                  OUT OF 5
                </span>
              </div>
            </div>

            {/* Reward Tier Badge */}
            <div className="p-4 bg-black border-2 border-black shadow-hard-sm mb-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                {getTierIcon()}
                <h3 className="font-pixel text-xs sm:text-sm text-white">
                  {rewardTier.title}
                </h3>
              </div>
              <p className="text-xs font-sans text-slate-300 leading-relaxed">
                {rewardTier.description}
              </p>
            </div>
          </div>

          {/* Database Claim Action */}
          <div className="pt-4 border-t-2 border-black">
            {claim && (
              <div className="mb-4 p-3 bg-black border-2 border-black shadow-hard-sm text-left">
                <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                  <span className="flex items-center gap-1 font-pixel text-[10px] text-retro-cyan">
                    <QrCode className="w-3.5 h-3.5" />
                    {claim.claim_code}
                  </span>
                  <span className={`px-2 py-0.5 border border-black font-pixel text-[9px] ${
                    claimSuccess
                      ? 'bg-retro-green text-black font-bold'
                      : 'bg-retro-amber text-black font-bold'
                  }`}>
                    {claimSuccess ? 'CLAIMED' : 'PENDING'}
                  </span>
                </div>
                {claimSuccess && (
                  <p className="text-[11px] font-sans text-retro-green flex items-center gap-1 mt-1 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified in database at {new Date(claim.claimed_at || Date.now()).toLocaleTimeString()}
                  </p>
                )}
              </div>
            )}

            {/* Confirm Claim Button */}
            {!claimSuccess ? (
              <button
                onClick={handleClaim}
                disabled={isClaiming || !claim}
                className="retro-btn w-full py-3.5 px-4 bg-retro-green hover:bg-emerald-400 text-black font-pixel text-xs font-black flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isClaiming ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent animate-spin" />
                    UPDATING DATABASE...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    Confirm Claim Reward
                  </>
                )}
              </button>
            ) : (
              <div className="w-full py-3 px-4 bg-black border-2 border-retro-green text-retro-green font-pixel text-[10px] flex items-center justify-center gap-2 shadow-hard-sm">
                <CheckCircle2 className="w-4 h-4" />
                Reward Claim Confirmed!
              </div>
            )}
          </div>
        </div>

        {/* Detailed Review Breakdown (5 Questions) */}
        <div className="md:col-span-7 retro-panel p-6">
          <h3 className="font-pixel text-[11px] text-slate-300 mb-4 flex items-center gap-2 uppercase">
            ROUND SUMMARY LEDGER (5/5)
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
                  className={`p-3.5 border-2 border-black shadow-hard-sm transition-all ${
                    isCorrect
                      ? 'bg-[#18261e]'
                      : 'bg-[#1c181f]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-pixel text-[10px] text-slate-400">
                        #{idx + 1}
                      </span>
                      {isChallenge ? (
                        <span className="font-pixel text-[9px] px-1.5 py-0.5 bg-retro-amber text-black border border-black flex items-center gap-1 font-bold">
                          <Flame className="w-2.5 h-2.5 fill-black" /> CHALLENGE
                        </span>
                      ) : (
                        <span className="font-pixel text-[9px] px-1.5 py-0.5 bg-black text-slate-400 border border-black">
                          QUESTION
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {ans && (
                        <span className="font-pixel text-[9px] text-slate-400 flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5" /> {ans.time_spent_seconds}s
                        </span>
                      )}
                      <span
                        className={`font-pixel text-[9px] px-2 py-0.5 border border-black flex items-center gap-1 ${
                          isCorrect
                            ? 'bg-retro-green text-black font-bold'
                            : 'bg-retro-red text-white font-bold'
                        }`}
                      >
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="w-3 h-3" /> +1 PT
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3" /> 0 PTS
                          </>
                        )}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs font-sans text-white font-medium mb-1 leading-relaxed">
                    {q.question_text}
                  </p>

                  <div className="text-[11px] font-sans text-slate-400 flex flex-wrap items-center gap-x-3 gap-y-1">
                    {isTimeout ? (
                      <span className="text-retro-red font-semibold font-pixel text-[9px]">TIMED OUT (30s)</span>
                    ) : isChallenge ? (
                      <span>
                        Staff Decision:{' '}
                        <strong className={isCorrect ? 'text-retro-green' : 'text-retro-red'}>
                          {ans?.user_answer || 'N/A'}
                        </strong>
                      </span>
                    ) : (
                      <>
                        <span>
                          Your Choice:{' '}
                          <strong className={isCorrect ? 'text-retro-green' : 'text-retro-red'}>
                            {ans?.user_answer || 'None'}
                          </strong>
                        </span>
                        {!isCorrect && (
                          <span className="text-slate-400">
                            • Answer:{' '}
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

      {/* Play Again Button */}
      <div className="text-center pt-2">
        <button
          onClick={onPlayAgain}
          className="retro-btn inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#232a35] hover:bg-white hover:text-black text-white font-pixel text-xs"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          PLAY ANOTHER ROUND
        </button>
      </div>
    </div>
  );
};
