export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type QuestionType = 'Question' | 'Challenge';

export interface GameImage {
  id: string;
  title: string;
  image_url: string;
  difficulty: Difficulty;
  description?: string;
  created_at?: string;
}

export interface Question {
  id: string;
  image_id: string;
  question_text: string;
  question_type: QuestionType;
  options?: string[] | null;
  correct_answer: string;
  challenge_criteria?: string | null;
  created_at?: string;
}

export interface GameSession {
  id: string;
  player_name: string;
  difficulty: Difficulty;
  image_id: string;
  total_score: number;
  status: 'in_progress' | 'completed' | 'abandoned';
  started_at: string;
  completed_at?: string | null;
}

export interface SessionAnswer {
  id: string;
  session_id: string;
  question_id: string;
  user_answer: string | null;
  is_correct: boolean;
  is_timeout: boolean;
  time_spent_seconds: number;
  created_at?: string;
}

export interface RewardTierInfo {
  tier: 'Diamond' | 'Gold' | 'Silver' | 'Bronze' | 'Participant';
  title: string;
  description: string;
  badgeColor: string;
  iconName: string;
  minScore: number;
}

export interface RewardClaim {
  id: string;
  session_id: string;
  reward_tier: string;
  claim_status: 'pending' | 'claimed';
  claim_code: string;
  claimed_at?: string | null;
  created_at: string;
}

export type GameStage = 
  | 'difficulty_select' 
  | 'memorizing_image' 
  | 'answering_questions' 
  | 'results';
