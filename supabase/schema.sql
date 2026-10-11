-- ========================================================================
-- Supabase Schema: Memory & Challenge Game
-- Tables: images, questions, game_sessions, session_answers, reward_claims
-- ========================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. IMAGES TABLE
CREATE TABLE IF NOT EXISTS images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    image_url TEXT NOT NULL,
    difficulty TEXT NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for querying images by difficulty
CREATE INDEX IF NOT EXISTS idx_images_difficulty ON images(difficulty);

-- 2. QUESTIONS TABLE
CREATE TABLE IF NOT EXISTS questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    image_id UUID NOT NULL REFERENCES images(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    question_type TEXT NOT NULL CHECK (question_type IN ('Question', 'Challenge')),
    options JSONB, -- Array of strings for 'Question' type, NULL for 'Challenge'
    correct_answer TEXT NOT NULL, -- Correct option text or 'PASS' for Challenge
    challenge_criteria TEXT, -- Evaluation criteria for Staff / Judge
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for querying questions by image_id and type
CREATE INDEX IF NOT EXISTS idx_questions_image_id ON questions(image_id);
CREATE INDEX IF NOT EXISTS idx_questions_type ON questions(question_type);

-- 3. GAME SESSIONS TABLE
CREATE TABLE IF NOT EXISTS game_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_name TEXT NOT NULL DEFAULT 'Player 1',
    difficulty TEXT NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
    image_id UUID NOT NULL REFERENCES images(id) ON DELETE RESTRICT,
    total_score INTEGER NOT NULL DEFAULT 0 CHECK (total_score >= 0 AND total_score <= 5),
    status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'abandoned')),
    started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    completed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_game_sessions_status ON game_sessions(status);
CREATE INDEX IF NOT EXISTS idx_game_sessions_image ON game_sessions(image_id);

-- 4. SESSION ANSWERS TABLE
CREATE TABLE IF NOT EXISTS session_answers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES game_sessions(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES questions(id) ON DELETE RESTRICT,
    user_answer TEXT, -- NULL if timed out
    is_correct BOOLEAN NOT NULL DEFAULT false,
    is_timeout BOOLEAN NOT NULL DEFAULT false,
    time_spent_seconds NUMERIC(4, 1) NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_session_answers_session ON session_answers(session_id);

-- 5. REWARD CLAIMS TABLE
CREATE TABLE IF NOT EXISTS reward_claims (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL UNIQUE REFERENCES game_sessions(id) ON DELETE CASCADE,
    reward_tier TEXT NOT NULL,
    claim_status TEXT NOT NULL DEFAULT 'pending' CHECK (claim_status IN ('pending', 'claimed')),
    claim_code TEXT NOT NULL UNIQUE,
    claimed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_reward_claims_session ON reward_claims(session_id);
CREATE INDEX IF NOT EXISTS idx_reward_claims_status ON reward_claims(claim_status);

-- Enable RLS and setup public access policies for anonymous demo play
ALTER TABLE images ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE reward_claims ENABLE ROW LEVEL SECURITY;

-- Allow public read access to images & questions
CREATE POLICY "Public read images" ON images FOR SELECT USING (true);
CREATE POLICY "Public read questions" ON questions FOR SELECT USING (true);

-- Allow public access to manage game sessions and answers
CREATE POLICY "Public all game_sessions" ON game_sessions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public all session_answers" ON session_answers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public all reward_claims" ON reward_claims FOR ALL USING (true) WITH CHECK (true);
