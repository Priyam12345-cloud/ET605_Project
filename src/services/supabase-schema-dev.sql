-- ============================================================================
-- Supabase Database Schema for Data Handling ITS (Development - No RLS)
-- Run this in Supabase SQL Editor to create all tables WITHOUT Row Level Security
-- This version is for development/testing. Remove RLS policies before running.
-- ============================================================================

-- Disable existing RLS if tables already exist
ALTER TABLE IF EXISTS learners DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS concept_mastery DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS interactions DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS assessment_attempts DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS error_patterns DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS session_logs DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS remediation_actions DISABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Learners can read own data" ON learners;
DROP POLICY IF EXISTS "Learners can read own mastery" ON concept_mastery;
DROP POLICY IF EXISTS "Learners can read own interactions" ON interactions;
DROP POLICY IF EXISTS "Learners can read own assessments" ON assessment_attempts;
DROP POLICY IF EXISTS "Learners can read own error patterns" ON error_patterns;
DROP POLICY IF EXISTS "Learners can read own sessions" ON session_logs;
DROP POLICY IF EXISTS "Learners can read own remediation" ON remediation_actions;
DROP POLICY IF EXISTS "Learners can insert own interactions" ON interactions;
DROP POLICY IF EXISTS "Learners can insert own assessments" ON assessment_attempts;
DROP POLICY IF EXISTS "Learners can insert own mastery" ON concept_mastery;
DROP POLICY IF EXISTS "Learners can update own mastery" ON concept_mastery;

-- ============================================================================
-- Tables (Same Structure)
-- ============================================================================

-- Ensure tables exist
CREATE TABLE IF NOT EXISTS learners (
  id VARCHAR(255) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  grade INTEGER DEFAULT 7,
  created_at TIMESTAMP DEFAULT NOW(),
  last_active TIMESTAMP DEFAULT NOW(),
  total_time_spent INTEGER DEFAULT 0,
  sessions_completed INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}'::JSONB
);

CREATE TABLE IF NOT EXISTS concept_mastery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  learner_id VARCHAR(255) NOT NULL REFERENCES learners(id) ON DELETE CASCADE,
  concept_id VARCHAR(255) NOT NULL,
  mastery_probability FLOAT DEFAULT 0.0,
  attempt_count INTEGER DEFAULT 0,
  correct_count INTEGER DEFAULT 0,
  avg_response_time INTEGER DEFAULT 0,
  hint_dependency FLOAT DEFAULT 0.0,
  mastery_level VARCHAR(50) DEFAULT 'novice',
  confidence_score FLOAT DEFAULT 0.5,
  last_attempt TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(learner_id, concept_id)
);

CREATE TABLE IF NOT EXISTS interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  learner_id VARCHAR(255) NOT NULL REFERENCES learners(id) ON DELETE CASCADE,
  concept_id VARCHAR(255) NOT NULL,
  question_id VARCHAR(255),
  action VARCHAR(50) NOT NULL,
  response TEXT,
  is_correct BOOLEAN,
  response_time INTEGER,
  hints_used INTEGER DEFAULT 0,
  attempt_number INTEGER DEFAULT 1,
  error_type VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS assessment_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  learner_id VARCHAR(255) NOT NULL REFERENCES learners(id) ON DELETE CASCADE,
  concept_id VARCHAR(255) NOT NULL,
  total_questions INTEGER NOT NULL,
  correct_answers INTEGER NOT NULL,
  accuracy FLOAT DEFAULT 0.0,
  avg_response_time INTEGER DEFAULT 0,
  hints_used INTEGER DEFAULT 0,
  total_time INTEGER DEFAULT 0,
  mastery_gain FLOAT DEFAULT 0.0,
  started_at TIMESTAMP NOT NULL,
  completed_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS error_patterns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  learner_id VARCHAR(255) NOT NULL REFERENCES learners(id) ON DELETE CASCADE,
  concept_id VARCHAR(255) NOT NULL,
  error_type VARCHAR(50) NOT NULL,
  frequency INTEGER DEFAULT 1,
  last_occurrence TIMESTAMP DEFAULT NOW(),
  context TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS session_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  learner_id VARCHAR(255) NOT NULL REFERENCES learners(id) ON DELETE CASCADE,
  session_start TIMESTAMP NOT NULL,
  session_end TIMESTAMP,
  concepts_covered TEXT[],
  questions_attempted INTEGER DEFAULT 0,
  correct_answers INTEGER DEFAULT 0,
  hints_used INTEGER DEFAULT 0,
  avg_response_time INTEGER DEFAULT 0,
  total_duration INTEGER DEFAULT 0,
  engagement_score FLOAT DEFAULT 0.5,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS remediation_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  learner_id VARCHAR(255) NOT NULL REFERENCES learners(id) ON DELETE CASCADE,
  concept_id VARCHAR(255) NOT NULL,
  reason TEXT NOT NULL,
  recommended_content VARCHAR(255),
  difficulty VARCHAR(50) DEFAULT 'easy',
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

-- ============================================================================
-- Indexes for Performance
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_interactions_learner_concept 
ON interactions(learner_id, concept_id);

CREATE INDEX IF NOT EXISTS idx_interactions_created 
ON interactions(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_concept_mastery_learner 
ON concept_mastery(learner_id);

CREATE INDEX IF NOT EXISTS idx_assessment_attempts_learner 
ON assessment_attempts(learner_id);

CREATE INDEX IF NOT EXISTS idx_session_logs_learner 
ON session_logs(learner_id);

CREATE INDEX IF NOT EXISTS idx_error_patterns_learner_concept 
ON error_patterns(learner_id, concept_id);

-- ============================================================================
-- Views for Analytics (Optional)
-- ============================================================================

CREATE OR REPLACE VIEW learner_progress_summary AS
SELECT 
  l.id,
  l.name,
  l.email,
  COUNT(DISTINCT i.concept_id) as concepts_attempted,
  COUNT(DISTINCT i.question_id) as questions_attempted,
  ROUND(100.0 * COUNT(CASE WHEN i.is_correct THEN 1 END) / 
    NULLIF(COUNT(CASE WHEN i.action = 'question_attempt' THEN 1 END), 0), 2) as overall_accuracy,
  ROUND(AVG(i.response_time)::numeric, 0) as avg_response_time,
  COUNT(CASE WHEN i.action = 'hint_requested' THEN 1 END) as total_hints_used,
  SUM(COALESCE(l.total_time_spent, 0)) as total_time_spent,
  l.last_active,
  l.created_at
FROM learners l
LEFT JOIN interactions i ON l.id = i.learner_id
GROUP BY l.id, l.name, l.email, l.total_time_spent, l.last_active, l.created_at
ORDER BY l.last_active DESC;

CREATE OR REPLACE VIEW concept_performance_by_learner AS
SELECT 
  cm.learner_id,
  cm.concept_id,
  cm.mastery_probability,
  cm.mastery_level,
  cm.attempt_count,
  cm.correct_count,
  ROUND(100.0 * cm.correct_count / NULLIF(cm.attempt_count, 0), 2) as accuracy_percentage,
  cm.hint_dependency,
  cm.confidence_score,
  cm.last_attempt,
  cm.updated_at
FROM concept_mastery cm
ORDER BY cm.learner_id, cm.concept_id;

-- ============================================================================
-- Functions for Auto-Updates
-- ============================================================================

CREATE OR REPLACE FUNCTION update_learner_last_active()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE learners SET last_active = NOW() WHERE id = NEW.learner_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_learner_active_on_interaction ON interactions;
CREATE TRIGGER trigger_update_learner_active_on_interaction
AFTER INSERT ON interactions
FOR EACH ROW
EXECUTE FUNCTION update_learner_last_active();

DROP TRIGGER IF EXISTS trigger_update_learner_active_on_mastery ON concept_mastery;
CREATE TRIGGER trigger_update_learner_active_on_mastery
AFTER UPDATE ON concept_mastery
FOR EACH ROW
EXECUTE FUNCTION update_learner_last_active();
