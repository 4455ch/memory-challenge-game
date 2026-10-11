import { RewardTierInfo, SessionAnswer } from '@/types/game';

export const REWARD_TIERS: Record<string, RewardTierInfo> = {
  Diamond: {
    tier: 'Diamond',
    title: 'Diamond Grand Champion',
    description: 'Flawless photographic memory! Claim the VIP Grand Mystery Box & Trophy Badge.',
    badgeColor: 'from-cyan-400 to-blue-600',
    iconName: 'Sparkles',
    minScore: 5,
  },
  Gold: {
    tier: 'Gold',
    title: 'Gold Tier Victor',
    description: 'Outstanding observational skills! Claim the Gold Mystery Reward Pack.',
    badgeColor: 'from-amber-400 to-yellow-600',
    iconName: 'Trophy',
    minScore: 4,
  },
  Silver: {
    tier: 'Silver',
    title: 'Silver Tier Achiever',
    description: 'Sharp attention to detail! Claim your Silver Gift Voucher.',
    badgeColor: 'from-slate-300 to-slate-500',
    iconName: 'Medal',
    minScore: 3,
  },
  Bronze: {
    tier: 'Bronze',
    title: 'Bronze Tier Explorer',
    description: 'Good effort! Claim your Bronze Souvenir Badge and collectible stamp.',
    badgeColor: 'from-amber-600 to-amber-800',
    iconName: 'Award',
    minScore: 1,
  },
  Participant: {
    tier: 'Participant',
    title: 'Challenge Participant',
    description: 'Thank you for playing! Practice sharpens the mind—try another round!',
    badgeColor: 'from-gray-500 to-gray-700',
    iconName: 'Target',
    minScore: 0,
  },
};

/**
 * Calculates total score from submitted answers (0 to 5)
 */
export function calculateScore(answers: SessionAnswer[]): number {
  if (!answers || !Array.isArray(answers)) return 0;
  return answers.reduce((total, answer) => (answer.is_correct ? total + 1 : total), 0);
}

/**
 * Returns the corresponding RewardTierInfo based on the player's total score (0 to 5)
 */
export function getRewardTier(score: number): RewardTierInfo {
  if (score >= 5) return REWARD_TIERS.Diamond;
  if (score === 4) return REWARD_TIERS.Gold;
  if (score === 3) return REWARD_TIERS.Silver;
  if (score >= 1) return REWARD_TIERS.Bronze;
  return REWARD_TIERS.Participant;
}

/**
 * Generates an uppercase alphanumeric claim code
 * Format: CLM-XXXX-XXXX
 */
export function generateClaimCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const segment = (len: number) =>
    Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `CLM-${segment(4)}-${segment(4)}`;
}
