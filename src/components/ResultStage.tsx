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
import { FireworkBurst, FerrisWheelGraphic } from './TempleFairGraphics';

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
        return <Sparkles className="w-8 h-8 text-[#0284C7]" />;
      case 'Gold':
        return <Trophy className="w-8 h-8 text-[#F59E0B]" />;
      case 'Silver':
        return <Medal className="w-8 h-8 text-slate-500" />;
      case 'Bronze':
        return <Award className="w-8 h-8 text-amber-700" />;
      default:
        return <Target className="w-8 h-8 text-slate-400" />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 relative">
      {/* Celebratory Fireworks in top corners */}
      <div className="absolute top-2 left-4 opacity-75 pointer-events-none">
        <FireworkBurst size={56} />
      </div>
      <div className="absolute top-2 right-4 opacity-75 pointer-events-none">
        <FireworkBurst size={56} />
      </div>

      {/* Header with Temple Fair Festive Banner */}
      <div className="text-center mb-8">
        <span className="text-sm font-bold px-4 py-1.5 bg-[#FFF2D1] text-[#7A4B17] border border-[#E3C37B] rounded-full inline-block mb-3 shadow-sm">
          ★ พิชิตซุ้มภารกิจสำเร็จ ★
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#381F0D]">
          สรุปผลคะแนน "จำให้ MAN"
        </h2>
        <p className="text-sm sm:text-base text-slate-600 mt-2 font-medium">
          ภาพ: <strong className="text-[#381F0D]">{image.title}</strong> • ระดับ:{' '}
          <strong className="text-[#381F0D]">
            {session.difficulty === 'Easy' ? 'ง่าย' : session.difficulty === 'Medium' ? 'ปานกลาง' : 'ยาก'}
          </strong>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
        {/* Left Column: Score, Tier & Reward Voucher Ticket */}
        <div className="md:col-span-5 bg-white rounded-2xl border border-[#DCCEB5] p-6 flex flex-col justify-between text-center shadow-sm">
          <div>
            {/* Score Counter Box */}
            <div className="mb-6 flex flex-col items-center">
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-b from-[#FFFDF5] to-[#FFF2D1] border-2 border-[#E3C37B] flex flex-col items-center justify-center shadow-sm relative">
                <span className="text-6xl font-extrabold text-[#381F0D] tracking-tight leading-none">
                  {score}
                </span>
                <span className="text-xs font-bold text-[#8C5E28] mt-2 uppercase tracking-wide">
                  จาก 5 คะแนน
                </span>
              </div>
            </div>

            {/* Reward Tier Card */}
            <div className="p-5 bg-[#FAF7F0] rounded-2xl border border-[#EAE2D2] mb-6 text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                {getTierIcon()}
                <h3 className="text-lg font-bold text-[#381F0D]">
                  {rewardTier.title}
                </h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {rewardTier.description}
              </p>
            </div>
          </div>

          {/* Database Claim Action / Ticket Voucher */}
          <div className="pt-4 border-t border-[#EFE8D8]">
            {claim && (
              <div className="mb-4 p-4 bg-[#FFFBF0] border border-[#E3C37B] rounded-xl text-left shadow-sm">
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="flex items-center gap-1.5 font-mono text-sm font-bold text-[#1E40AF]">
                    <QrCode className="w-4 h-4" />
                    {claim.claim_code}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      claimSuccess
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-900'
                    }`}
                  >
                    {claimSuccess ? 'รับรางวัลแล้ว' : 'รอรับรางวัล'}
                  </span>
                </div>
                {claimSuccess && (
                  <p className="text-xs font-medium text-emerald-700 flex items-center gap-1.5 mt-1">
                    <ShieldCheck className="w-4 h-4" />
                    บันทึกในฐานข้อมูลเรียบร้อย เมื่อ {new Date(claim.claimed_at || Date.now()).toLocaleTimeString()}
                  </p>
                )}
              </div>
            )}

            {/* Confirm Claim Button */}
            {!claimSuccess ? (
              <button
                onClick={handleClaim}
                disabled={isClaiming || !claim}
                className="w-full py-4 px-4 bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:from-[#D97706] hover:to-[#B45309] text-[#381F0D] font-black text-base rounded-xl flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(245,158,11,0.3)] transition-all disabled:opacity-50"
              >
                {isClaiming ? (
                  <>
                    <span className="w-4 h-4 border-2 border-[#381F0D] border-t-transparent rounded-full animate-spin" />
                    กำลังบันทึกข้อมูล...
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5 stroke-[2.5]" />
                    กดยืนยันรับของรางวัล
                  </>
                )}
              </button>
            ) : (
              <div className="w-full py-3.5 px-4 bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-sm rounded-xl flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                ยืนยันการรับรางวัลสำเร็จ!
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Question Review Breakdown */}
        <div className="md:col-span-7 bg-white rounded-2xl border border-[#DCCEB5] p-6 shadow-sm">
          <h3 className="text-sm font-bold text-[#7A4B17] mb-4 uppercase tracking-wider">
            สรุปผลการตอบคำถามทั้ง 5 ข้อ
          </h3>

          <div className="space-y-3.5">
            {questions.map((q, idx) => {
              const ans = answers.find((a) => a.question_id === q.id) || answers[idx];
              const isCorrect = ans ? ans.is_correct : false;
              const isTimeout = ans ? ans.is_timeout : true;
              const isChallenge = q.question_type === 'Challenge';

              return (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border transition-all ${
                    isCorrect
                      ? 'bg-[#F0FDF4] border-emerald-200'
                      : 'bg-[#FFF1F2] border-rose-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-slate-600">
                        ข้อที่ #{idx + 1}
                      </span>
                      {isChallenge ? (
                        <span className="text-xs px-2 py-0.5 bg-rose-100 text-rose-800 rounded-full flex items-center gap-1 font-semibold">
                          <Flame className="w-3 h-3 fill-rose-600 text-rose-600" /> ภารกิจ STAFF
                        </span>
                      ) : (
                        <span className="text-xs px-2 py-0.5 bg-white text-slate-600 rounded-full font-medium border border-slate-200">
                          คำถามสังเกต
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {ans && (
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {ans.time_spent_seconds} วิ
                        </span>
                      )}
                      <span
                        className={`text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1 font-bold ${
                          isCorrect
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" /> +1 คะแนน
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5" /> 0 คะแนน
                          </>
                        )}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm font-bold text-slate-900 mb-2 leading-relaxed">
                    {q.question_text}
                  </p>

                  <div className="text-xs sm:text-sm text-slate-600 flex flex-wrap items-center gap-x-3 gap-y-1">
                    {isTimeout ? (
                      <span className="text-rose-600 font-bold">หมดเวลา 30 วินาที</span>
                    ) : isChallenge ? (
                      <span>
                        ผลการตัดสินจาก Staff:{' '}
                        <strong className={isCorrect ? 'text-emerald-700 font-bold' : 'text-rose-600 font-bold'}>
                          {ans?.user_answer === 'PASS' ? 'ผ่าน' : ans?.user_answer === 'FAIL' ? 'ไม่ผ่าน' : (ans?.user_answer || '-')}
                        </strong>
                      </span>
                    ) : (
                      <span>
                        คำตอบของคุณ:{' '}
                        <strong className={isCorrect ? 'text-emerald-700 font-bold' : 'text-rose-600 font-bold'}>
                          {ans?.user_answer || 'ไม่ได้เลือก'}
                        </strong>
                      </span>
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
          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#381F0D] hover:bg-[#201005] text-[#FFF9E6] rounded-xl font-bold text-sm sm:text-base shadow-sm transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          เล่นอีกครั้ง / เลือกด่านใหม่
        </button>
      </div>
    </div>
  );
};
