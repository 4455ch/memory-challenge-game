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
  Award,
  ChevronRight
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

  // Function to proceed to the next question or complete stage
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

  // Handle submit answer (either chosen by player, staff judged, or timeout)
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
          // Staff evaluated: PASS awards 1 point, FAIL awards 0
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

      // Show instant visual transition feedback
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

        // Allow 1.2s to display outcome before auto-advancing
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

  // Auto-fail callback when timer hits 0
  const handleTimeout = useCallback(() => {
    handleAnswer(null, true);
  }, [handleAnswer]);

  const { timeLeft, start, reset } = useCountdownTimer({
    initialSeconds: questionSeconds,
    onExpire: handleTimeout,
    autoStart: true,
  });

  // Reset and restart 30s timer whenever question index changes
  useEffect(() => {
    reset(questionSeconds);
    start(questionSeconds);
    questionStartTimeRef.current = Date.now();
  }, [currentIndex, questionSeconds, reset, start]);

  const isUrgent = timeLeft <= 8;
  const isChallenge = currentQuestion.question_type === 'Challenge';

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6 animate-scale-in">
      {/* Question Progress & Timer Bar */}
      <div className="glass-panel-elevated rounded-2xl p-4 sm:p-5 mb-6 border border-slate-700/80">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Question {currentIndex + 1} of {questions.length}
            </span>
            {isChallenge ? (
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5" /> Staff Challenge
              </span>
            ) : (
              <span className="text-xs font-medium uppercase tracking-wider px-2 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                Multiple Choice
              </span>
            )}
          </div>

          {/* Strict 30-Second Countdown */}
          <div className="flex items-center gap-2">
            <Clock className={`w-4 h-4 ${isUrgent ? 'text-rose-400 animate-spin' : 'text-slate-400'}`} />
            <div className={`font-mono text-2xl font-black ${
              isUrgent ? 'text-rose-400 animate-pulse' : 'text-cyan-300'
            }`}>
              {timeLeft < 10 ? `0${timeLeft}` : timeLeft}s
            </div>
          </div>
        </div>

        {/* 5-Step Segmented Progress Bar */}
        <div className="grid grid-cols-5 gap-1.5 h-1.5 w-full">
          {questions.map((_, idx) => (
            <div
              key={idx}
              className={`rounded-full transition-all duration-300 ${
                idx < currentIndex
                  ? 'bg-indigo-500'
                  : idx === currentIndex
                  ? 'bg-cyan-400 shadow-sm shadow-cyan-400/50'
                  : 'bg-slate-800'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Question Card */}
      <div className="glass-panel-elevated rounded-3xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl relative overflow-hidden">
        {/* Urgent alert ring if time running out */}
        {isUrgent && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-rose-500 animate-pulse" />
        )}

        {/* Feedback Overlay upon selection or timeout */}
        {feedback?.show && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md z-20 flex flex-col items-center justify-center p-6 text-center animate-scale-in">
            {feedback.isTimeout ? (
              <>
                <div className="w-16 h-16 rounded-full bg-rose-500/20 border-2 border-rose-500/50 flex items-center justify-center text-rose-400 mb-3 animate-bounce">
                  <AlertTriangle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-rose-300 mb-1">Time Expired!</h3>
                <p className="text-sm text-slate-400">Strict 30s deadline elapsed. 0 points awarded.</p>
              </>
            ) : feedback.isCorrect ? (
              <>
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500/50 flex items-center justify-center text-emerald-400 mb-3 animate-scale-in">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-emerald-300 mb-1">
                  {isChallenge ? 'Challenge Passed!' : 'Correct Answer!'}
                </h3>
                <p className="text-sm text-emerald-400/80 font-medium">+1 Point Earned</p>
              </>
            ) : (
              <>
                <div className="w-16 h-16 rounded-full bg-rose-500/20 border-2 border-rose-500/50 flex items-center justify-center text-rose-400 mb-3 animate-scale-in">
                  <XCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-rose-300 mb-1">
                  {isChallenge ? 'Challenge Failed' : 'Incorrect Choice'}
                </h3>
                <p className="text-sm text-slate-400">
                  {isChallenge ? '0 points awarded.' : `Correct: ${currentQuestion.correct_answer}`}
                </p>
              </>
            )}
          </div>
        )}

        {/* Prompt Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-medium mb-2">
            {isChallenge ? (
              <span className="text-amber-400 flex items-center gap-1">
                <Flame className="w-4 h-4" /> Physical / Reflex Challenge Prompt
              </span>
            ) : (
              <span className="text-indigo-400 flex items-center gap-1">
                <HelpCircle className="w-4 h-4" /> Memory Observation Question
              </span>
            )}
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
            {currentQuestion.question_text}
          </h2>
        </div>

        {/* RENDER MODE A: STANDARD QUESTION (Multiple Choice) */}
        {!isChallenge && currentQuestion.options && (
          <div className="grid grid-cols-1 gap-3.5">
            {currentQuestion.options.map((option, idx) => {
              const optionLetters = ['A', 'B', 'C', 'D'];
              const letter = optionLetters[idx] || String(idx + 1);

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option, false)}
                  disabled={isSubmitting}
                  className="w-full p-4 rounded-xl text-left bg-slate-900/70 hover:bg-slate-800/80 border border-slate-700/80 hover:border-indigo-500/60 transition-all duration-150 flex items-center justify-between group active:scale-[0.99] disabled:pointer-events-none"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="w-8 h-8 rounded-lg bg-slate-800 group-hover:bg-indigo-600 border border-slate-700 group-hover:border-indigo-400 flex items-center justify-center font-bold text-sm text-slate-300 group-hover:text-white transition-colors">
                      {letter}
                    </span>
                    <span className="text-sm sm:text-base font-medium text-slate-200 group-hover:text-white">
                      {option}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                </button>
              );
            })}
          </div>
        )}

        {/* RENDER MODE B: CHALLENGE TYPE (Staff Pass / Fail Controls) */}
        {isChallenge && (
          <div className="space-y-6 pt-2">
            {/* Criteria Box */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> Staff Evaluation Criteria
              </h4>
              <p className="text-sm leading-relaxed text-amber-200/90 font-medium">
                {currentQuestion.challenge_criteria ||
                  'Verify player completes the challenge within the allotted time.'}
              </p>
            </div>

            {/* Staff Judgment Controls */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-700 text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                Staff / Game Marshal Assessment
              </span>
              <p className="text-xs text-slate-400 mb-4 max-w-md mx-auto">
                Did the challenger successfully fulfill the physical or verbal challenge according to the criteria above?
              </p>

              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                {/* Staff FAIL Button */}
                <button
                  onClick={() => handleAnswer('FAIL', false)}
                  disabled={isSubmitting}
                  className="py-3.5 px-4 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/40 hover:border-rose-500 text-rose-300 font-bold text-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-rose-950/40"
                >
                  <XCircle className="w-5 h-5 text-rose-400" />
                  Staff: FAIL (0 Pts)
                </button>

                {/* Staff PASS Button */}
                <button
                  onClick={() => handleAnswer('PASS', false)}
                  disabled={isSubmitting}
                  className="py-3.5 px-4 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 hover:border-emerald-500 text-emerald-300 font-bold text-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-emerald-950/40"
                >
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  Staff: PASS (+1 Pt)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Instructions */}
      <div className="mt-4 text-center">
        <p className="text-xs text-slate-500">
          Strict 30.0s time limit per question • Immediate auto-advance upon timeout
        </p>
      </div>
    </div>
  );
};
