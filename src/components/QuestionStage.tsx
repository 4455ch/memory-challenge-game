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
  ChevronRight,
  Sparkles
} from 'lucide-react';

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
    <div className="w-full max-w-3xl mx-auto px-4 py-6">
      {/* 90s Retro Arcade HUD */}
      <div className="retro-panel p-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="font-pixel text-[10px] px-2.5 py-1 bg-black text-retro-cyan border-2 border-black shadow-hard-sm">
              ROUND {currentIndex + 1}/05
            </span>
            {isChallenge ? (
              <span className="font-pixel text-[10px] px-2.5 py-1 bg-retro-amber text-black border-2 border-black shadow-hard-sm flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-black" /> STAFF CHALLENGE
              </span>
            ) : (
              <span className="font-pixel text-[10px] px-2.5 py-1 bg-[#232a35] text-slate-300 border-2 border-black shadow-hard-sm">
                OBSERVATION
              </span>
            )}
          </div>

          {/* 30-Second Retro Digital Clock */}
          <div className="flex items-center gap-2">
            <Clock className={`w-4 h-4 ${isUrgent ? 'text-retro-red animate-spin' : 'text-slate-400'}`} />
            <div className={`font-pixel text-xl sm:text-2xl px-2.5 py-0.5 bg-black border-2 border-black shadow-hard-sm ${
              isUrgent ? 'text-retro-red animate-pulse' : 'text-retro-green'
            }`}>
              {timeLeft < 10 ? `0${timeLeft}` : timeLeft}s
            </div>
          </div>
        </div>

        {/* 5-Step 16-Bit Energy Bars */}
        <div className="grid grid-cols-5 gap-2 h-2.5 w-full bg-black p-0.5 border border-black">
          {questions.map((_, idx) => (
            <div
              key={idx}
              className={`h-full transition-all duration-200 ${
                idx < currentIndex
                  ? 'bg-retro-green'
                  : idx === currentIndex
                  ? 'bg-retro-cyan'
                  : 'bg-slate-800'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Question Neo-Brutalist Card */}
      <div className="retro-panel-elevated p-6 sm:p-8 relative overflow-hidden">
        {/* Urgent Alert Stripe */}
        {isUrgent && (
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-retro-red animate-pulse" />
        )}

        {/* 16-bit Outcome Popup Modal */}
        {feedback?.show && (
          <div className="absolute inset-0 bg-[#0d1017]/95 border-2 border-black z-30 flex flex-col items-center justify-center p-6 text-center">
            {feedback.isTimeout ? (
              <>
                <div className="w-14 h-14 bg-retro-red border-2 border-black shadow-hard flex items-center justify-center text-white mb-3">
                  <AlertTriangle className="w-8 h-8 stroke-[2.5]" />
                </div>
                <h3 className="font-pixel text-lg sm:text-xl text-retro-red mb-2">TIME EXPIRED!</h3>
                <p className="font-sans text-xs text-slate-300">Strict 30s deadline elapsed. 0 points awarded.</p>
              </>
            ) : feedback.isCorrect ? (
              <>
                <div className="w-14 h-14 bg-retro-green border-2 border-black shadow-hard flex items-center justify-center text-black mb-3">
                  <CheckCircle className="w-8 h-8 stroke-[2.5]" />
                </div>
                <h3 className="font-pixel text-lg sm:text-xl text-retro-green mb-2">
                  {isChallenge ? 'CHALLENGE PASSED!' : 'EXCELLENT!'}
                </h3>
                <p className="font-pixel text-xs text-retro-green">+1 POINT EARNED</p>
              </>
            ) : (
              <>
                <div className="w-14 h-14 bg-retro-red border-2 border-black shadow-hard flex items-center justify-center text-white mb-3">
                  <XCircle className="w-8 h-8 stroke-[2.5]" />
                </div>
                <h3 className="font-pixel text-lg sm:text-xl text-retro-red mb-2">
                  {isChallenge ? 'CHALLENGE FAILED' : 'INCORRECT CHOICE'}
                </h3>
                <p className="font-sans text-xs text-slate-400">
                  {isChallenge ? '0 points awarded.' : `Correct: ${currentQuestion.correct_answer}`}
                </p>
              </>
            )}
          </div>
        )}

        {/* Question Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-pixel text-slate-400 mb-2">
            {isChallenge ? (
              <span className="text-retro-amber flex items-center gap-1.5">
                <Flame className="w-4 h-4 fill-retro-amber" /> PHYSICAL / REFLEX CHALLENGE
              </span>
            ) : (
              <span className="text-retro-cyan flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4" /> OBSERVATION QUESTION
              </span>
            )}
          </div>

          <h2 className="text-lg sm:text-xl font-bold font-sans text-white leading-relaxed">
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
                  className="retro-btn w-full p-4 bg-[#141923] hover:bg-retro-cyan hover:text-black text-left text-slate-100 flex items-center justify-between group disabled:pointer-events-none"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="w-8 h-8 bg-black text-white group-hover:bg-black group-hover:text-retro-cyan border-2 border-black font-pixel text-xs font-bold flex items-center justify-center shadow-hard-sm">
                      {letter}
                    </span>
                    <span className="text-sm font-sans font-medium">
                      {option}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-black group-hover:translate-x-1 transition-transform" />
                </button>
              );
            })}
          </div>
        )}

        {/* MODE B: CHALLENGE TYPE (Staff Pass / Fail Controls) */}
        {isChallenge && (
          <div className="space-y-6 pt-2">
            {/* Criteria Box */}
            <div className="p-4 bg-black border-2 border-retro-amber shadow-hard-sm">
              <h4 className="font-pixel text-[10px] text-retro-amber mb-2 flex items-center gap-1.5 uppercase">
                <ShieldCheck className="w-4 h-4" /> STAFF EVALUATION CRITERIA
              </h4>
              <p className="text-sm font-sans leading-relaxed text-amber-200">
                {currentQuestion.challenge_criteria ||
                  'Verify player completes the challenge within the allotted time.'}
              </p>
            </div>

            {/* Staff Judgment Controls */}
            <div className="p-5 bg-[#141923] border-2 border-black shadow-hard text-center">
              <span className="font-pixel text-[10px] text-slate-300 block mb-2 uppercase">
                STAFF / MARSHAL ASSESSMENT
              </span>
              <p className="text-xs font-sans text-slate-400 mb-4 max-w-md mx-auto">
                Did the challenger successfully fulfill the physical or verbal challenge according to the criteria above?
              </p>

              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                {/* Staff FAIL Button */}
                <button
                  onClick={() => handleAnswer('FAIL', false)}
                  disabled={isSubmitting}
                  className="retro-btn py-3.5 px-4 bg-retro-red hover:bg-rose-600 text-white font-pixel text-[10px] flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <XCircle className="w-4 h-4 stroke-[3]" />
                  Staff: FAIL (0 Pts)
                </button>

                {/* Staff PASS Button */}
                <button
                  onClick={() => handleAnswer('PASS', false)}
                  disabled={isSubmitting}
                  className="retro-btn py-3.5 px-4 bg-retro-green hover:bg-emerald-400 text-black font-pixel text-[10px] font-black flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <CheckCircle className="w-4 h-4 stroke-[3]" />
                  Staff: PASS (+1 Pt)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Retro Arcade Footer */}
      <div className="mt-4 text-center">
        <p className="font-pixel text-[9px] text-slate-500">
          STRICT 30.0s CLOCK • AUTO-ADVANCES ON TIMEOUT
        </p>
      </div>
    </div>
  );
};
