import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { LandingStage } from '@/components/LandingStage';
import { ResultStage } from '@/components/ResultStage';
import { QuestionStage } from '@/components/QuestionStage';
import { GameImage, GameSession, Question, RewardClaim, SessionAnswer } from '@/types/game';

describe('Game UI Component Tests', () => {
  it('renders LandingStage and allows selecting difficulty and starting game', () => {
    const onStartMock = vi.fn();
    render(<LandingStage onStartGame={onStartMock} isLoading={false} />);

    expect(screen.getByText(/Choose Difficulty Level/i)).toBeInTheDocument();
    expect(screen.getByText('Easy')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
    expect(screen.getByText('Hard')).toBeInTheDocument();

    // Switch to Hard Mode
    fireEvent.click(screen.getByText('Hard'));

    // Submit form
    const startButton = screen.getByRole('button', { name: /Start Hard Memory Challenge/i });
    fireEvent.click(startButton);

    expect(onStartMock).toHaveBeenCalledWith('Hard', 'Player 1');
  });

  it('renders QuestionStage for Challenge type with Staff PASS / FAIL buttons', async () => {
    const mockQuestions: Question[] = [
      {
        id: 'q-chal-1',
        image_id: 'img-1',
        question_text: 'Staff Challenge: Say the word BACKWARDS in 5 seconds!',
        question_type: 'Challenge',
        options: null,
        correct_answer: 'PASS',
        challenge_criteria: 'Player speaks backwards within 5s',
      },
    ];

    const onAllCompleted = vi.fn();
    const onRecordAnswer = vi.fn().mockResolvedValue({
      id: 'ans-1',
      session_id: 'sess-1',
      question_id: 'q-chal-1',
      user_answer: 'PASS',
      is_correct: true,
      is_timeout: false,
      time_spent_seconds: 5,
    } as SessionAnswer);

    render(
      <QuestionStage
        questions={mockQuestions}
        sessionId="sess-1"
        onAllCompleted={onAllCompleted}
        onRecordAnswer={onRecordAnswer}
        questionSeconds={30}
      />
    );

    // Verify Staff buttons are present
    const passButton = screen.getByRole('button', { name: /Staff: PASS/i });
    const failButton = screen.getByRole('button', { name: /Staff: FAIL/i });
    expect(passButton).toBeInTheDocument();
    expect(failButton).toBeInTheDocument();

    // Click Staff PASS inside act
    await act(async () => {
      fireEvent.click(passButton);
    });

    expect(onRecordAnswer).toHaveBeenCalledWith(
      expect.objectContaining({
        user_answer: 'PASS',
        is_correct: true,
        is_timeout: false,
      })
    );
  });

  it('renders ResultStage and confirms reward claim in database', async () => {
    const mockSession: GameSession = {
      id: 'sess-1',
      player_name: 'Player 1',
      difficulty: 'Easy',
      image_id: 'img-1',
      total_score: 5,
      status: 'completed',
      started_at: new Date().toISOString(),
    };

    const mockImage: GameImage = {
      id: 'img-1',
      title: 'Cozy Bakery',
      image_url: 'https://example.com/test.jpg',
      difficulty: 'Easy',
    };

    const mockQuestions: Question[] = [
      { id: '1', image_id: 'img-1', question_text: 'Q1', question_type: 'Question', correct_answer: 'A' },
      { id: '2', image_id: 'img-1', question_text: 'Q2', question_type: 'Question', correct_answer: 'B' },
      { id: '3', image_id: 'img-1', question_text: 'Q3', question_type: 'Question', correct_answer: 'C' },
      { id: '4', image_id: 'img-1', question_text: 'Q4', question_type: 'Question', correct_answer: 'D' },
      { id: '5', image_id: 'img-1', question_text: 'Q5', question_type: 'Question', correct_answer: 'A' },
    ];

    const mockAnswers: SessionAnswer[] = mockQuestions.map((q) => ({
      id: `ans-${q.id}`,
      session_id: 'sess-1',
      question_id: q.id,
      user_answer: q.correct_answer,
      is_correct: true,
      is_timeout: false,
      time_spent_seconds: 4,
    }));

    const mockClaim: RewardClaim = {
      id: 'claim-123',
      session_id: 'sess-1',
      reward_tier: 'Diamond',
      claim_status: 'pending',
      claim_code: 'CLM-ABCD-1234',
      created_at: new Date().toISOString(),
    };

    const onConfirmClaim = vi.fn().mockResolvedValue({
      ...mockClaim,
      claim_status: 'claimed',
      claimed_at: new Date().toISOString(),
    });

    render(
      <ResultStage
        session={mockSession}
        image={mockImage}
        questions={mockQuestions}
        answers={mockAnswers}
        initialClaim={mockClaim}
        onConfirmClaim={onConfirmClaim}
        onPlayAgain={vi.fn()}
      />
    );

    // Verify 5 out of 5 score & Diamond Grand Champion displayed
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText(/Diamond Grand Champion/i)).toBeInTheDocument();
    expect(screen.getByText(/CLM-ABCD-1234/i)).toBeInTheDocument();

    // Find and click Confirm Claim button
    const claimButton = screen.getByRole('button', { name: /Confirm Claim Reward/i });
    await act(async () => {
      fireEvent.click(claimButton);
    });

    expect(onConfirmClaim).toHaveBeenCalledWith('claim-123');

    await waitFor(() => {
      expect(screen.getByText(/Reward Claim Confirmed/i)).toBeInTheDocument();
    });
  });
});
