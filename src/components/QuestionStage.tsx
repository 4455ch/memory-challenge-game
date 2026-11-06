'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Question, SessionAnswer } from '@/types/game';
import { useCountdownTimer } from '@/hooks/useCountdownTimer';
import { 
  Clock, 
  HelpCircle, 
  Flame, 
  CheckCircle, 
  XCircle, 
  ShieldCheck, 
  AlertTriangle,
  ChevronRight
} from 'lucide-react';
import { FireworkBurst, BalloonStallGraphic } from './TempleFairGraphics';

interface QuestionStageProps {
  questions: Question[];
  sessionId: string;
  onAllCompleted: (answers: SessionAnswer[]) => void;
  onRecordAnswer: (answer: Omit<SessionAnswer, 'id' | 'created_at'>) => Promise<SessionAnswer>;
  questionSeconds?: number; // Defaults to 30
}

export const QuestionStage: React.FC<QuestionStageProps> = ({
  questions,
  sessionId,
  onAllCompleted,
  onRecordAnswer,
  questionSeconds = 30,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<SessionAnswer[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{
    show: boolean;
    isCorrect: boolean;
    isTimeout: boolean;
    selectedText: string | null;
  } | null>(null);

  const currentQuestion = questions[currentIndex];
  const questionStartTimeRef = useRef<number>(Date.now());

  // Advance to next question or complete game
  const advanceToNext = useCallback(
    (newAnswers: SessionAnswer[]) => {
      setFeedback(null);
      setIsSubmitting(false);

      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((prev) => prev + 1);
        questionStartTimeRef.current = Date.now();
      } else {
        onAllCompleted(newAnswers);
      }
    },
    [currentIndex, questions.length, onAllCompleted]
  );

  // Submit answer
  const handleAnswer = useCallback(
    async (userAnswer: string | null, isTimeout: boolean = false) => {
      if (isSubmitting || feedback?.show) return;
      setIsSubmitting(true);

      const timeSpent = Math.min(
        questionSeconds,
        Math.max(1, Math.round(((Date.now() - questionStartTimeRef.current) / 1000) * 10) / 10)
      );

      let isCorrect = false;

      if (!isTimeout && userAnswer !== null) {
        if (currentQuestion.question_type === 'Question') {
          isCorrect = userAnswer === currentQuestion.correct_answer;
        } else if (currentQuestion.question_type === 'Challenge') {
          isCorrect = userAnswer === 'PASS';
        }
      }

      const answerPayload: Omit<SessionAnswer, 'id' | 'created_at'> = {
        session_id: sessionId,
        question_id: currentQuestion.id,
        user_answer: userAnswer,
        is_correct: isCorrect,
        is_timeout: isTimeout,
        time_spent_seconds: timeSpent,
      };

      setFeedback({
        show: true,
        isCorrect,
        isTimeout,
        selectedText: userAnswer,
      });

      try {
        const savedAnswer = await onRecordAnswer(answerPayload);
        const updatedAnswers = [...answers, savedAnswer];
        setAnswers(updatedAnswers);

        setTimeout(() => {
          advanceToNext(updatedAnswers);
        }, 1200);
      } catch (err) {
        console.error('Failed to record answer:', err);
        const fallbackAnswer: SessionAnswer = {
          ...answerPayload,
          id: `ans-${Date.now()}`,
        };
        const updatedAnswers = [...answers, fallbackAnswer];
        setAnswers(updatedAnswers);

        setTimeout(() => {
          advanceToNext(updatedAnswers);
        }, 1200);
      }
    },
    [
      isSubmitting,
      feedback?.show,
      questionSeconds,
      currentQuestion,
      sessionId,
      onRecordAnswer,
      answers,
      advanceToNext,
    ]
  );

  const handleTimeout = useCallback(() => {
    handleAnswer(null, true);
  }, [handleAnswer]);

  const { timeLeft, start, reset } = useCountdownTimer({
    initialSeconds: questionSeconds,
    onExpire: handleTimeout,
    autoStart: true,
  });

  useEffect(() => {
    reset(questionSeconds);
    start(questionSeconds);
    questionStartTimeRef.current = Date.now();
  }, [currentIndex, questionSeconds, reset, start]);

  const isUrgent = timeLeft <= 8;
  const isChallenge = currentQuestion.question_type === 'Challenge';

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-6 relative">
      {/* Subtle Fireworks burst in background */}
      <div className="absolute -top-2 right-2 sm:right-6 opacity-60 pointer-events-none">
        <FireworkBurst size={48} />
      </div>

      {/* Clean HUD with Warm Temple Fair Accents */}
      <div className="bg-white rounded-2xl border border-[#DCCEB5] p-5 mb-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <span className="text-sm font-bold px-3 py-1 bg-[#FFF2D1] text-[#7A4B17] rounded-full border border-[#E3C37B]">
              ข้อที่ {currentIndex + 1} / 05
            </span>
            {isChallenge ? (
              <span className="text-sm font-bold px-3 py-1 bg-[#FEE2E2] text-[#991B1B] rounded-full flex items-center gap-1.5 border border-[#FECACA]">
                <Flame className="w-4 h-4 fill-[#C2272D] text-[#C2272D]" /> ภารกิจ STAFF (ปฏิบัติจริง)
              </span>
            ) : (
              <span className="text-sm font-semibold px-3 py-1 bg-[#FAF7F0] text-slate-700 rounded-full border border-[#E8DEC8]">
                คำถามสังเกตภาพ
              </span>
            )}
          </div>

          {/* 30-Second Countdown Clock */}
          <div className="flex items-center gap-2">
            <Clock className={`w-5 h-5 ${isUrgent ? 'text-[#C2272D] animate-spin' : 'text-slate-400'}`} />
            <div
              className={`text-2xl sm:text-3xl font-mono font-extrabold tracking-tight px-3 py-0.5 rounded-lg border ${
                isUrgent
                  ? 'bg-rose-50 text-[#C2272D] border-rose-200 animate-pulse'
                  : 'bg-[#FAF7F0] text-[#381F0D] border-[#E8DEC8]'
              }`}
            >
              {timeLeft < 10 ? `0${timeLeft}` : timeLeft}s
            </div>
          </div>
        </div>

        {/* 5-Step Clean Progress Bar */}
        <div className="grid grid-cols-5 gap-2 h-2 w-full bg-[#EAE2D2] rounded-full p-0.5 overflow-hidden">
          {questions.map((_, idx) => (
            <div
              key={idx}
              className={`h-full rounded-full transition-all duration-300 ${
                idx < currentIndex
                  ? 'bg-[#10B981]'
                  : idx === currentIndex
                  ? 'bg-[#F59E0B]'
                  : 'bg-[#D4C5AB]'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Question Card with Scalloped Awning Top */}
      <div className="bg-white rounded-2xl border border-[#DCCEB5] p-6 sm:p-8 shadow-sm relative overflow-hidden">
        {/* Urgent Alert Stripe */}
        {isUrgent && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#C2272D] animate-pulse" />
        )}

        {/* Feedback Popup Modal with Festive Temple Fair Gimmick */}
        {feedback?.show && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-30 flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
            {feedback.isTimeout ? (
              <>
                <div className="w-16 h-16 bg-rose-100 text-[#C2272D] rounded-2xl flex items-center justify-center mb-3">
                  <AlertTriangle className="w-9 h-9 stroke-[2.5]" />
                </div>
                <h3 className="text-2xl font-bold text-[#C2272D] mb-2">หมดเวลา!</h3>
                <p className="text-base text-slate-600">เวลา 30 วินาทีหมดลง ไม่ได้รับคะแนนในข้อนี้ (0 คะแนน)</p>
              </>
            ) : feedback.isCorrect ? (
              <>
                <div className="relative mb-3">
                  <div className="w-16 h-16 bg-emerald-100 text-[#065F46] rounded-2xl flex items-center justify-center">
                    <CheckCircle className="w-9 h-9 stroke-[2.5]" />
                  </div>
                  <div className="absolute -top-3 -right-3">
                    <FireworkBurst size={36} />
                  </div>
                </div>
                <h3 className="text-2xl font-extrabold text-[#065F46] mb-2">
                  {isChallenge ? 'ผ่านภารกิจสำเร็จ!' : 'ถูกต้องยอดเยี่ยม!'}
                </h3>
                <p className="text-lg font-bold text-[#065F46]">+1 คะแนน</p>
              </>
            ) : (
              <>
                <div className="w-16 h-16 bg-rose-100 text-[#C2272D] rounded-2xl flex items-center justify-center mb-3">
                  <XCircle className="w-9 h-9 stroke-[2.5]" />
                </div>
                <h3 className="text-2xl font-bold text-[#C2272D] mb-2">
                  {isChallenge ? 'ไม่ผ่านภารกิจ' : 'ตอบไม่ถูกต้อง'}
                </h3>
                <p className="text-base text-slate-600">
                  {isChallenge ? 'ไม่ได้คะแนนในข้อนี้ (0 คะแนน)' : `คำตอบที่ถูกต้องคือ: ${currentQuestion.correct_answer}`}
                </p>
              </>
            )}
          </div>
        )}

        {/* Question Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 mb-2">
            {isChallenge ? (
              <span className="text-[#8C5E28] flex items-center gap-1.5 font-bold">
                <Flame className="w-4 h-4 fill-amber-500 text-amber-600" /> ภารกิจท้าทายร่างกาย / ปฏิบัติจริง
              </span>
            ) : (
              <span className="text-[#1E40AF] flex items-center gap-1.5 font-bold">
                <HelpCircle className="w-4 h-4" /> คำถามวัดความจำและสายตา
              </span>
            )}
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-[#381F0D] leading-relaxed">
            {currentQuestion.question_text}
          </h2>
        </div>

        {/* MODE A: STANDARD QUESTION (Multiple Choice Options) */}
        {!isChallenge && currentQuestion.options && (
          <div className="grid grid-cols-1 gap-3.5">
            {currentQuestion.options.map((option, idx) => {
              const letters = ['A', 'B', 'C', 'D'];
              const letter = letters[idx] || String(idx + 1);

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option, false)}
                  disabled={isSubmitting}
                  className="w-full p-4 sm:p-5 bg-[#FAF7F0] hover:bg-[#FFF2D1] hover:border-[#E3C37B] border-2 border-[#E8DEC8] rounded-xl text-left text-slate-900 flex items-center justify-between group disabled:pointer-events-none transition-all shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-10 h-10 rounded-xl bg-white border border-[#D4C5AB] text-[#381F0D] group-hover:bg-[#F59E0B] group-hover:border-[#B45309] group-hover:text-[#381F0D] font-black text-base flex items-center justify-center shrink-0 shadow-sm transition-colors">
                      {letter}
                    </span>
                    <span className="text-base sm:text-lg font-semibold text-slate-800 leading-snug">
                      {option}
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#381F0D] group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                </button>
              );
            })}
          </div>
        )}

        {/* MODE B: CHALLENGE TYPE (Staff Pass / Fail Controls) */}
        {isChallenge && (
          <div className="space-y-6 pt-2">
            {/* Criteria Box */}
            <div className="p-5 bg-[#FFFBF0] border border-[#E3C37B] rounded-xl shadow-sm">
              <h4 className="text-sm font-bold text-[#7A4B17] mb-2 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#C2272D]" /> เกณฑ์การตัดสินของทีมงาน STAFF
              </h4>
              <p className="text-base font-medium leading-relaxed text-slate-800">
                {currentQuestion.challenge_criteria ||
                  'ตรวจสอบว่าผู้เล่นปฏิบัติภารกิจสำเร็จภายในเวลาที่กำหนด'}
              </p>
            </div>

            {/* Staff Judgment Controls */}
            <div className="p-6 bg-[#FAF7F0] rounded-xl border border-[#E0D5C1] text-center">
              <span className="text-sm font-bold text-[#381F0D] block mb-1">
                แผงควบคุมการตัดสินสำหรับ STAFF
              </span>
              <p className="text-sm text-slate-600 mb-5 max-w-md mx-auto">
                ผู้เล่นปฏิบัติภารกิจถูกต้องตามเกณฑ์ที่ระบุไว้ด้านบนหรือไม่?
              </p>

              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                {/* Staff FAIL Button */}
                <button
                  onClick={() => handleAnswer('FAIL', false)}
                  disabled={isSubmitting}
                  className="py-4 px-4 bg-[#C2272D] hover:bg-[#A32025] text-white font-bold text-sm sm:text-base rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-50"
                >
                  <XCircle className="w-5 h-5" />
                  Staff: ไม่ผ่าน (0 คะแนน)
                </button>

                {/* Staff PASS Button */}
                <button
                  onClick={() => handleAnswer('PASS', false)}
                  disabled={isSubmitting}
                  className="py-4 px-4 bg-[#10B981] hover:bg-[#059669] text-white font-bold text-sm sm:text-base rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-50"
                >
                  <CheckCircle className="w-5 h-5" />
                  Staff: ผ่าน (+1 คะแนน)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer info */}
      <div className="mt-4 text-center">
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          จำกัดเวลาข้อละ 30 วินาที • หากหมดเวลาจะเปลี่ยนข้อโดยอัตโนมัติ
        </p>
      </div>
    </div>
  );
};
