import { describe, it, expect } from 'vitest';
import { calculateScore, getRewardTier, generateClaimCode, REWARD_TIERS } from '@/utils/scoreCalculator';
import { SessionAnswer } from '@/types/game';

describe('Score and Reward Tier Logic', () => {
  it('calculates score of 0 when all answers are incorrect or timed out', () => {
    const answers: SessionAnswer[] = [
      { id: '1', session_id: 's', question_id: 'q1', user_answer: null, is_correct: false, is_timeout: true, time_spent_seconds: 30 },
      { id: '2', session_id: 's', question_id: 'q2', user_answer: 'Wrong', is_correct: false, is_timeout: false, time_spent_seconds: 12 },
      { id: '3', session_id: 's', question_id: 'q3', user_answer: null, is_correct: false, is_timeout: true, time_spent_seconds: 30 },
      { id: '4', session_id: 's', question_id: 'q4', user_answer: 'FAIL', is_correct: false, is_timeout: false, time_spent_seconds: 8 },
      { id: '5', session_id: 's', question_id: 'q5', user_answer: 'Wrong2', is_correct: false, is_timeout: false, time_spent_seconds: 15 },
    ];
    expect(calculateScore(answers)).toBe(0);
  });

  it('calculates perfect score of 5 when all answers are correct', () => {
    const answers: SessionAnswer[] = [
      { id: '1', session_id: 's', question_id: 'q1', user_answer: 'Correct1', is_correct: true, is_timeout: false, time_spent_seconds: 5 },
      { id: '2', session_id: 's', question_id: 'q2', user_answer: 'Correct2', is_correct: true, is_timeout: false, time_spent_seconds: 8 },
      { id: '3', session_id: 's', question_id: 'q3', user_answer: 'PASS', is_correct: true, is_timeout: false, time_spent_seconds: 14 },
      { id: '4', session_id: 's', question_id: 'q4', user_answer: 'Correct4', is_correct: true, is_timeout: false, time_spent_seconds: 7 },
      { id: '5', session_id: 's', question_id: 'q5', user_answer: 'PASS', is_correct: true, is_timeout: false, time_spent_seconds: 10 },
    ];
    expect(calculateScore(answers)).toBe(5);
  });

  it('correctly maps scores to their designated Reward Tiers', () => {
    // Score 5 -> Diamond
    expect(getRewardTier(5).tier).toBe('Diamond');
    expect(getRewardTier(5).title).toBe(REWARD_TIERS.Diamond.title);

    // Score 4 -> Gold
    expect(getRewardTier(4).tier).toBe('Gold');
    expect(getRewardTier(4).title).toBe(REWARD_TIERS.Gold.title);

    // Score 3 -> Silver
    expect(getRewardTier(3).tier).toBe('Silver');
    expect(getRewardTier(3).title).toBe(REWARD_TIERS.Silver.title);

    // Score 2 & 1 -> Bronze
    expect(getRewardTier(2).tier).toBe('Bronze');
    expect(getRewardTier(1).tier).toBe('Bronze');
    expect(getRewardTier(2).title).toBe(REWARD_TIERS.Bronze.title);

    // Score 0 -> Participant
    expect(getRewardTier(0).tier).toBe('Participant');
    expect(getRewardTier(0).title).toBe(REWARD_TIERS.Participant.title);
  });

  it('generates properly formatted claim codes matching CLM-XXXX-XXXX pattern', () => {
    const code = generateClaimCode();
    expect(code).toMatch(/^CLM-[A-Z0-9]{4}-[A-Z0-9]{4}$/);

    // Check randomness across 10 codes
    const codeSet = new Set<string>();
    for (let i = 0; i < 10; i++) {
      codeSet.add(generateClaimCode());
    }
    expect(codeSet.size).toBe(10);
  });
});
