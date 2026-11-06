import { RewardTierInfo, SessionAnswer } from '@/types/game';

export const REWARD_TIERS: Record<string, RewardTierInfo> = {
  Diamond: {
    tier: 'Diamond',
    title: 'สุดยอดแชมเปียนระดับ Diamond',
    description: 'ความจำภาพถ่ายไร้ที่ติ! รับกล่องของขวัญ VIP และเข็มกลัดเกียรติยศ',
    badgeColor: 'from-cyan-400 to-blue-600',
    iconName: 'Sparkles',
    minScore: 5,
  },
  Gold: {
    tier: 'Gold',
    title: 'ผู้ชนะระดับ Gold',
    description: 'ทักษะการสังเกตยอดเยี่ยมมาก! รับชุดของขวัญพิเศษ Gold',
    badgeColor: 'from-amber-400 to-yellow-600',
    iconName: 'Trophy',
    minScore: 4,
  },
  Silver: {
    tier: 'Silver',
    title: 'ผู้ผ่านเกณฑ์ระดับ Silver',
    description: 'สายตาเฉียบคมและแม่นยำ! รับบัตรของขวัญ Silver',
    badgeColor: 'from-slate-300 to-slate-500',
    iconName: 'Medal',
    minScore: 3,
  },
  Bronze: {
    tier: 'Bronze',
    title: 'นักสำรวจระดับ Bronze',
    description: 'ความพยายามยอดเยี่ยม! รับของที่ระลึกและตราประทับ Bronze',
    badgeColor: 'from-amber-600 to-amber-800',
    iconName: 'Award',
    minScore: 1,
  },
  Participant: {
    tier: 'Participant',
    title: 'ผู้เข้าร่วมกิจกรรม',
    description: 'ขอบคุณที่มาร่วมสนุก! การฝึกฝนบ่อยๆ จะช่วยให้ความจำเฉียบคมขึ้น ลองใหม่อีกรอบนะ!',
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
