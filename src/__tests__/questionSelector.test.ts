import { describe, it, expect } from 'vitest';
import { selectGameQuestions, validateQuestionSelection } from '@/utils/questionSelector';
import { Question } from '@/types/game';

describe('Question Selection Algorithm', () => {
  const mockImageId = 'test-img-1';

  const mockQuestions: Question[] = [
    { id: 'q1', image_id: mockImageId, question_text: 'Q1', question_type: 'Question', correct_answer: 'A' },
    { id: 'q2', image_id: mockImageId, question_text: 'Q2', question_type: 'Question', correct_answer: 'B' },
    { id: 'q3', image_id: mockImageId, question_text: 'Q3', question_type: 'Question', correct_answer: 'C' },
    { id: 'q4', image_id: mockImageId, question_text: 'Q4', question_type: 'Question', correct_answer: 'D' },
    { id: 'q5', image_id: mockImageId, question_text: 'Q5', question_type: 'Question', correct_answer: 'A' },
    { id: 'c1', image_id: mockImageId, question_text: 'C1', question_type: 'Challenge', correct_answer: 'PASS' },
    { id: 'c2', image_id: mockImageId, question_text: 'C2', question_type: 'Challenge', correct_answer: 'PASS' },
    { id: 'c3', image_id: mockImageId, question_text: 'C3', question_type: 'Challenge', correct_answer: 'PASS' },
    { id: 'c4', image_id: mockImageId, question_text: 'C4', question_type: 'Challenge', correct_answer: 'PASS' },
  ];

  it('strictly selects exactly 5 questions', () => {
    const selected = selectGameQuestions(mockQuestions, 5, 2);
    expect(selected.length).toBe(5);
  });

  it('strictly enforces a maximum of 2 Challenge type questions across multiple random runs', () => {
    // Run 50 random samplings to verify constraint holds statistically
    for (let i = 0; i < 50; i++) {
      const selected = selectGameQuestions(mockQuestions, 5, 2);
      const challengeCount = selected.filter((q) => q.question_type === 'Challenge').length;
      expect(challengeCount).toBeLessThanOrEqual(2);
      expect(selected.length).toBe(5);
      
      const validation = validateQuestionSelection(selected, 5, 2);
      expect(validation.isValid).toBe(true);
    }
  });

  it('handles pools with only 1 challenge available', () => {
    const poolWithOneChallenge = mockQuestions.filter((q) => q.id !== 'c2' && q.id !== 'c3' && q.id !== 'c4');
    const selected = selectGameQuestions(poolWithOneChallenge, 5, 2);
    const challengeCount = selected.filter((q) => q.question_type === 'Challenge').length;
    expect(challengeCount).toBeLessThanOrEqual(1);
    expect(selected.length).toBe(5);
  });

  it('handles pools with 0 challenges available', () => {
    const poolWithNoChallenges = mockQuestions.filter((q) => q.question_type === 'Question');
    const selected = selectGameQuestions(poolWithNoChallenges, 5, 2);
    const challengeCount = selected.filter((q) => q.question_type === 'Challenge').length;
    expect(challengeCount).toBe(0);
    expect(selected.length).toBe(5);
  });

  it('validates question selections correctly with validateQuestionSelection helper', () => {
    const validSet: Question[] = [
      { id: '1', image_id: 'i', question_text: '1', question_type: 'Question', correct_answer: 'A' },
      { id: '2', image_id: 'i', question_text: '2', question_type: 'Question', correct_answer: 'B' },
      { id: '3', image_id: 'i', question_text: '3', question_type: 'Question', correct_answer: 'C' },
      { id: '4', image_id: 'i', question_text: '4', question_type: 'Challenge', correct_answer: 'PASS' },
      { id: '5', image_id: 'i', question_text: '5', question_type: 'Challenge', correct_answer: 'PASS' },
    ];
    expect(validateQuestionSelection(validSet, 5, 2).isValid).toBe(true);

    const invalidSetTooManyChallenges: Question[] = [
      { id: '1', image_id: 'i', question_text: '1', question_type: 'Question', correct_answer: 'A' },
      { id: '2', image_id: 'i', question_text: '2', question_type: 'Question', correct_answer: 'B' },
      { id: '3', image_id: 'i', question_text: '3', question_type: 'Challenge', correct_answer: 'PASS' },
      { id: '4', image_id: 'i', question_text: '4', question_type: 'Challenge', correct_answer: 'PASS' },
      { id: '5', image_id: 'i', question_text: '5', question_type: 'Challenge', correct_answer: 'PASS' },
    ];
    const invalidResult = validateQuestionSelection(invalidSetTooManyChallenges, 5, 2);
    expect(invalidResult.isValid).toBe(false);
    expect(invalidResult.challengeCount).toBe(3);
  });
});
