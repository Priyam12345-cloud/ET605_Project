-- ============================================================================
-- Supabase Database Schema for Data Handling ITS
-- Run this in Supabase SQL Editor to create all tables
-- ============================================================================

-- 1. Learners (Students) Table
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

-- 2. Concept Mastery Table (BKT Scores)
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

-- 3. Interactions Table (All Events: attempts, hints, videos, etc.)
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

-- 4. Assessment Attempts Table (Full Assessment Sessions)
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

-- 5. Error Patterns Table
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

-- 6. Session Logs Table (When student starts/stops)
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

-- 7. Remediation Actions Table
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
-- Row Level Security (RLS) - Learners can only see their own data
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE learners ENABLE ROW LEVEL SECURITY;
ALTER TABLE concept_mastery ENABLE ROW LEVEL SECURITY;
ALTER TABLE interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE error_patterns ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE remediation_actions ENABLE ROW LEVEL SECURITY;

-- Policy: Learners can read their own data
CREATE POLICY "Learners can read own data" ON learners
  FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Learners can read own mastery" ON concept_mastery
  FOR SELECT USING (learner_id = auth.uid());

CREATE POLICY "Learners can read own interactions" ON interactions
  FOR SELECT USING (learner_id = auth.uid());

CREATE POLICY "Learners can read own assessments" ON assessment_attempts
  FOR SELECT USING (learner_id = auth.uid());

CREATE POLICY "Learners can read own error patterns" ON error_patterns
  FOR SELECT USING (learner_id = auth.uid());

CREATE POLICY "Learners can read own sessions" ON session_logs
  FOR SELECT USING (learner_id = auth.uid());

CREATE POLICY "Learners can read own remediation" ON remediation_actions
  FOR SELECT USING (learner_id = auth.uid());

-- Policy: Authenticated users can insert their own records
CREATE POLICY "Learners can insert own interactions" ON interactions
  FOR INSERT WITH CHECK (learner_id = auth.uid());

CREATE POLICY "Learners can insert own assessments" ON assessment_attempts
  FOR INSERT WITH CHECK (learner_id = auth.uid());

CREATE POLICY "Learners can insert own mastery" ON concept_mastery
  FOR INSERT WITH CHECK (learner_id = auth.uid());

CREATE POLICY "Learners can update own mastery" ON concept_mastery
  FOR UPDATE USING (learner_id = auth.uid());

-- ============================================================================
-- Views for Analytics (Optional)
-- ============================================================================

-- View: Student Progress Summary
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

-- View: Concept Performance by Learner
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

-- Function: Update learner's last_active timestamp
CREATE OR REPLACE FUNCTION update_learner_last_active()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE learners SET last_active = NOW() WHERE id = NEW.learner_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: Auto-update last_active on interactions
CREATE TRIGGER trigger_update_learner_active_on_interaction
AFTER INSERT ON interactions
FOR EACH ROW
EXECUTE FUNCTION update_learner_last_active();

-- Trigger: Auto-update last_active on concept_mastery
CREATE TRIGGER trigger_update_learner_active_on_mastery
AFTER UPDATE ON concept_mastery
FOR EACH ROW
EXECUTE FUNCTION update_learner_last_active();

-- ============================================================================
-- Sample Test Data (Optional - for development)
-- ============================================================================

-- Note: Uncomment below to add test data for local development
-- INSERT INTO learners (id, email, name, grade) VALUES
--   ('550e8400-e29b-41d4-a716-446655440000', 'student1@test.com', 'Arjun K', 7),
--   ('550e8400-e29b-41d4-a716-446655440001', 'student2@test.com', 'Priya S', 7);
