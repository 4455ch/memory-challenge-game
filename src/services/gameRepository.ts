import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import { Difficulty, GameImage, GameSession, Question, RewardClaim, SessionAnswer } from '@/types/game';
import { DUMMY_IMAGES, DUMMY_QUESTIONS } from '@/data/dummyData';
import { generateClaimCode } from '@/utils/scoreCalculator';

// Local storage keys for mock persistence
const STORAGE_SESSIONS = 'memory_game_sessions';
const STORAGE_ANSWERS = 'memory_game_answers';
const STORAGE_CLAIMS = 'memory_game_claims';

function getStoredItems<T>(key: string): T[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveStoredItems<T>(key: string, items: T[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(items));
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
  }
}

/**
 * Game Repository Layer
 * Bridges Next.js frontend with Supabase PostgreSQL,
 * falling back gracefully to mock storage for local zero-dependency testing.
 */
export const gameRepository = {
  /**
   * Fetches a random image matching the difficulty
   */
  async fetchRandomImageByDifficulty(difficulty: Difficulty): Promise<GameImage> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('images')
          .select('*')
          .eq('difficulty', difficulty);

        if (!error && data && data.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.length);
          return data[randomIndex];
        }
      } catch (err) {
        console.warn('Supabase query failed, using local seed data:', err);
      }
    }

    // Local fallback
    const matching = DUMMY_IMAGES.filter((img) => img.difficulty === difficulty);
    const pool = matching.length > 0 ? matching : DUMMY_IMAGES;
    const randomIndex = Math.floor(Math.random() * pool.length);
    return pool[randomIndex];
  },

  /**
   * Fetches all questions for a given image_id
   */
  async fetchQuestionsForImage(imageId: string): Promise<Question[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('questions')
          .select('*')
          .eq('image_id', imageId);

        if (!error && data && data.length > 0) {
          return data;
        }
      } catch (err) {
        console.warn('Supabase query failed for questions, using local data:', err);
      }
    }

    // Local fallback
    const questions = DUMMY_QUESTIONS.filter((q) => q.image_id === imageId);
    if (questions.length > 0) return questions;

    // If no exact match (e.g., custom ID), return questions matching the first available set
    return DUMMY_QUESTIONS.slice(0, 7);
  },

  /**
   * Creates a new game session
   */
  async createGameSession(params: {
    difficulty: Difficulty;
    image_id: string;
    player_name?: string;
  }): Promise<GameSession> {
    const sessionPayload: GameSession = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `sess-${Date.now()}`,
      player_name: params.player_name || 'Player 1',
      difficulty: params.difficulty,
      image_id: params.image_id,
      total_score: 0,
      status: 'in_progress',
      started_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('game_sessions')
          .insert([sessionPayload])
          .select()
          .single();

        if (!error && data) return data;
      } catch (err) {
        console.warn('Supabase session insert failed, storing locally:', err);
      }
    }

    // Local fallback
    const sessions = getStoredItems<GameSession>(STORAGE_SESSIONS);
    sessions.push(sessionPayload);
    saveStoredItems(STORAGE_SESSIONS, sessions);
    return sessionPayload;
  },

  /**
   * Records an answer in session_answers
   */
  async recordSessionAnswer(answer: Omit<SessionAnswer, 'id' | 'created_at'>): Promise<SessionAnswer> {
    const record: SessionAnswer = {
      ...answer,
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `ans-${Date.now()}`,
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('session_answers')
          .insert([record])
          .select()
          .single();

        if (!error && data) return data;
      } catch (err) {
        console.warn('Supabase answer insert failed, storing locally:', err);
      }
    }

    // Local fallback
    const answers = getStoredItems<SessionAnswer>(STORAGE_ANSWERS);
    answers.push(record);
    saveStoredItems(STORAGE_ANSWERS, answers);
    return record;
  },

  /**
   * Completes a game session with final score
   */
  async completeGameSession(sessionId: string, totalScore: number): Promise<GameSession> {
    const completedAt = new Date().toISOString();

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('game_sessions')
          .update({
            total_score: totalScore,
            status: 'completed',
            completed_at: completedAt,
          })
          .eq('id', sessionId)
          .select()
          .single();

        if (!error && data) return data;
      } catch (err) {
        console.warn('Supabase complete session failed, updating locally:', err);
      }
    }

    // Local fallback
    const sessions = getStoredItems<GameSession>(STORAGE_SESSIONS);
    const index = sessions.findIndex((s) => s.id === sessionId);
    if (index !== -1) {
      sessions[index].total_score = totalScore;
      sessions[index].status = 'completed';
      sessions[index].completed_at = completedAt;
      saveStoredItems(STORAGE_SESSIONS, sessions);
      return sessions[index];
    }

    return {
      id: sessionId,
      player_name: 'Player 1',
      difficulty: 'Easy',
      image_id: 'unknown',
      total_score: totalScore,
      status: 'completed',
      started_at: completedAt,
      completed_at: completedAt,
    };
  },

  /**
   * Creates a pending reward claim for a session
   */
  async createRewardClaim(sessionId: string, rewardTier: string): Promise<RewardClaim> {
    const claimPayload: RewardClaim = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `claim-${Date.now()}`,
      session_id: sessionId,
      reward_tier: rewardTier,
      claim_status: 'pending',
      claim_code: generateClaimCode(),
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('reward_claims')
          .insert([claimPayload])
          .select()
          .single();

        if (!error && data) return data;
      } catch (err) {
        console.warn('Supabase claim insert failed, storing locally:', err);
      }
    }

    // Local fallback
    const claims = getStoredItems<RewardClaim>(STORAGE_CLAIMS);
    claims.push(claimPayload);
    saveStoredItems(STORAGE_CLAIMS, claims);
    return claimPayload;
  },

  /**
   * Confirms a reward claim (sets claim_status to 'claimed' and claimed_at to now)
   */
  async confirmRewardClaim(claimId: string): Promise<RewardClaim> {
    const claimedAt = new Date().toISOString();

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('reward_claims')
          .update({
            claim_status: 'claimed',
            claimed_at: claimedAt,
          })
          .eq('id', claimId)
          .select()
          .single();

        if (!error && data) return data;
      } catch (err) {
        console.warn('Supabase claim update failed, updating locally:', err);
      }
    }

    // Local fallback
    const claims = getStoredItems<RewardClaim>(STORAGE_CLAIMS);
    const index = claims.findIndex((c) => c.id === claimId);
    if (index !== -1) {
      claims[index].claim_status = 'claimed';
      claims[index].claimed_at = claimedAt;
      saveStoredItems(STORAGE_CLAIMS, claims);
      return claims[index];
    }

    return {
      id: claimId,
      session_id: 'unknown',
      reward_tier: 'Participant',
      claim_status: 'claimed',
      claim_code: generateClaimCode(),
      claimed_at: claimedAt,
      created_at: claimedAt,
    };
  },
};
