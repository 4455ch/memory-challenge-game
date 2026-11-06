'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { LandingStage } from '@/components/LandingStage';
import { MemoryStage } from '@/components/MemoryStage';
import { QuestionStage } from '@/components/QuestionStage';
import { ResultStage } from '@/components/ResultStage';
import { 
  Difficulty, 
  GameImage, 
  GameSession, 
  GameStage, 
  Question, 
  RewardClaim, 
  SessionAnswer 
} from '@/types/game';
import { gameRepository } from '@/services/gameRepository';
import { selectGameQuestions } from '@/utils/questionSelector';
import { calculateScore, getRewardTier } from '@/utils/scoreCalculator';

export default function MemoryGamePage() {
  const [stage, setStage] = useState<GameStage>('difficulty_select');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Game session states
  const [session, setSession] = useState<GameSession | null>(null);
  const [currentImage, setCurrentImage] = useState<GameImage | null>(null);
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [sessionAnswers, setSessionAnswers] = useState<SessionAnswer[]>([]);
  const [rewardClaim, setRewardClaim] = useState<RewardClaim | null>(null);

  /**
   * Phase 1: Start Game from Landing Page
   */
  const handleStartGame = async (difficulty: Difficulty, playerName: string) => {
    setIsLoading(true);
    try {
      // 1. Fetch random image for the selected difficulty
      const image = await gameRepository.fetchRandomImageByDifficulty(difficulty);
      setCurrentImage(image);

      // 2. Create game session in database
      const newSession = await gameRepository.createGameSession({
        difficulty,
        image_id: image.id,
        player_name: playerName,
      });
      setSession(newSession);

      // 3. Fetch questions for this image
      const allQuestions = await gameRepository.fetchQuestionsForImage(image.id);

      // 4. Select exactly 5 questions with strict max 2 challenges constraint
      const fiveQuestions = selectGameQuestions(allQuestions, 5, 2);
      setSelectedQuestions(fiveQuestions);

      setSessionAnswers([]);
      setRewardClaim(null);

      // Transition to 60s memory stage
      setStage('memorizing_image');
    } catch (err) {
      console.error('Failed to initialize game session:', err);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Phase 2: Memorization completed (60s timer expired or early skip)
   * The image will be strictly unmounted from the DOM
   */
  const handleMemoryComplete = () => {
    setStage('answering_questions');
  };

  /**
   * Records individual answer to database
   */
  const handleRecordAnswer = async (
    answerPayload: Omit<SessionAnswer, 'id' | 'created_at'>
  ): Promise<SessionAnswer> => {
    return await gameRepository.recordSessionAnswer(answerPayload);
  };

  /**
   * Phase 3: All 5 questions completed
   */
  const handleQuestionsCompleted = async (answers: SessionAnswer[]) => {
    setSessionAnswers(answers);
    const score = calculateScore(answers);
    const tier = getRewardTier(score);

    if (session) {
      // Complete game session in database
      await gameRepository.completeGameSession(session.id, score);

      // Create pending reward claim in database
      const claim = await gameRepository.createRewardClaim(session.id, tier.tier);
      setRewardClaim(claim);
    }

    setStage('results');
  };

  /**
   * Phase 4: Confirm reward claim in database
   */
  const handleConfirmClaim = async (claimId: string): Promise<RewardClaim> => {
    return await gameRepository.confirmRewardClaim(claimId);
  };

  /**
   * Reset / Play Again
   */
  const handleResetGame = () => {
    setStage('difficulty_select');
    setSession(null);
    setCurrentImage(null);
    setSelectedQuestions([]);
    setSessionAnswers([]);
    setRewardClaim(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-slate-900 font-sans">
      <Navbar
        onResetGame={handleResetGame}
        showReset={stage !== 'difficulty_select'}
      />

      <main className="flex-1 flex flex-col justify-center items-center py-6 sm:py-10">
        {stage === 'difficulty_select' && (
          <LandingStage onStartGame={handleStartGame} isLoading={isLoading} />
        )}

        {/* 
          CRITICAL REQUIREMENT: Show image for 60 seconds, then strictly hide it.
          When stage !== 'memorizing_image', MemoryStage is completely unmounted.
        */}
        {stage === 'memorizing_image' && currentImage && (
          <MemoryStage
            image={currentImage}
            onTimeExpired={handleMemoryComplete}
            memorizationSeconds={60}
          />
        )}

        {stage === 'answering_questions' && session && selectedQuestions.length > 0 && (
          <QuestionStage
            questions={selectedQuestions}
            sessionId={session.id}
            onAllCompleted={handleQuestionsCompleted}
            onRecordAnswer={handleRecordAnswer}
            questionSeconds={30}
          />
        )}

        {stage === 'results' && session && currentImage && (
          <ResultStage
            session={session}
            image={currentImage}
            questions={selectedQuestions}
            answers={sessionAnswers}
            initialClaim={rewardClaim}
            onConfirmClaim={handleConfirmClaim}
            onPlayAgain={handleResetGame}
          />
        )}
      </main>

      <footer className="border-t border-[#E5DCCB] bg-white/80 backdrop-blur-sm py-4 text-center font-sans text-xs sm:text-sm text-[#7A4B17] font-semibold">
        🎪 เกม "จำให้ MAN" เทศกาลเที่ยวงานวัด • จำภาพ 60 วินาที • ตอบคำถาม 30 วินาที 🎡
      </footer>
    </div>
  );
}
