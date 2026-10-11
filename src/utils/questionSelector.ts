import { Question } from '@/types/game';

/**
 * Shuffles an array using Fisher-Yates algorithm
 */
export function shuffleArray<T>(array: T[]): T[] {
  const cloned = [...array];
  for (let i = cloned.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
  }
  return cloned;
}

/**
 * Selects 5 random questions related to an image, strictly ensuring
 * a MAXIMUM of 2 'Challenge' type questions.
 *
 * @param allQuestions List of questions available for the image
 * @param totalCount Target number of questions (defaults to 5)
 * @param maxChallenges Maximum number of challenge questions allowed (defaults to 2)
 */
export function selectGameQuestions(
  allQuestions: Question[],
  totalCount: number = 5,
  maxChallenges: number = 2
): Question[] {
  if (!allQuestions || allQuestions.length === 0) {
    return [];
  }

  const challenges = shuffleArray(
    allQuestions.filter((q) => q.question_type === 'Challenge')
  );
  const standardQuestions = shuffleArray(
    allQuestions.filter((q) => q.question_type === 'Question')
  );

  // We want at most maxChallenges (2)
  // Determine how many challenges we can take:
  // Randomly take 0, 1, or 2 challenges, capped by what's available and maxChallenges
  const availableChallenges = Math.min(challenges.length, maxChallenges);
  // We can pick a random count between 1 and availableChallenges if available, or just up to availableChallenges
  // Ensure we leave enough spots for standard questions if possible
  const desiredChallenges = Math.min(
    availableChallenges,
    Math.max(0, totalCount - standardQuestions.length > 0 ? totalCount - standardQuestions.length : Math.floor(Math.random() * (availableChallenges + 1)))
  );

  const selectedChallenges = challenges.slice(0, Math.min(desiredChallenges, maxChallenges));

  // Remaining needed slots to reach totalCount
  const remainingNeeded = totalCount - selectedChallenges.length;
  const selectedStandard = standardQuestions.slice(0, remainingNeeded);

  let combined = [...selectedChallenges, ...selectedStandard];

  // In the rare scenario where standard questions were fewer than needed,
  // we can only add remaining challenges IF it does not exceed maxChallenges
  if (combined.length < totalCount && selectedChallenges.length < maxChallenges) {
    const extraChallengesAllowed = maxChallenges - selectedChallenges.length;
    const extraChallenges = challenges.slice(
      selectedChallenges.length,
      selectedChallenges.length + extraChallengesAllowed
    );
    combined.push(...extraChallenges);
  }

  // Shuffle the final selected 5 questions so challenges appear at random positions
  return shuffleArray(combined.slice(0, totalCount));
}

/**
 * Validates that a selected question set strictly adheres to the game rules:
 * - Exactly 5 questions (or totalCount)
 * - Maximum of 2 'Challenge' questions
 */
export function validateQuestionSelection(
  questions: Question[],
  expectedTotal: number = 5,
  maxChallenges: number = 2
): { isValid: boolean; challengeCount: number; standardCount: number; error?: string } {
  const challengeCount = questions.filter((q) => q.question_type === 'Challenge').length;
  const standardCount = questions.filter((q) => q.question_type === 'Question').length;

  if (questions.length !== expectedTotal) {
    return {
      isValid: false,
      challengeCount,
      standardCount,
      error: `Expected ${expectedTotal} questions, but got ${questions.length}`,
    };
  }

  if (challengeCount > maxChallenges) {
    return {
      isValid: false,
      challengeCount,
      standardCount,
      error: `Challenge count (${challengeCount}) exceeds maximum allowed of ${maxChallenges}`,
    };
  }

  return { isValid: true, challengeCount, standardCount };
}
