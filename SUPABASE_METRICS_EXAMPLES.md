# Supabase: Exact Metrics Captured

## 📊 Real-World Data Capture Examples

This document shows exactly what data gets stored in Supabase for each student action.

---

## Example 1: Student Attempts Question (Gets it Wrong)

### What Happens
- Student reads: "What is the mean of 2, 4, 6?"
- Student answers: "5" (incorrect, should be 4)
- UI shows red X
- React Context updates immediately
- Supabase records asynchronously

### Data Captured

**interactions table** (1 new row):
```sql
INSERT INTO interactions VALUES (
  id: "uuid-123",
  learner_id: "student-456",
  concept_id: "central-tendency",
  question_id: "q-mean-01",
  action: "question_attempt",
  response: "5",
  is_correct: false,
  response_time: 8234,           -- ⏱️ Time: 8.2 seconds
  hints_used: 0,                  -- 💡 No hints yet
  attempt_number: 1,              -- 📊 First attempt
  error_type: "calculation",      -- ❌ Wrong calculation
  created_at: "2025-01-15T10:30:45Z"
);
```

**error_patterns table** (new or updated row):
```sql
INSERT INTO error_patterns VALUES (
  learner_id: "student-456",
  concept_id: "central-tendency",
  error_type: "calculation",
  frequency: 1,                   -- ❌ First occurrence
  context: "Mean of 3 numbers",
  last_occurrence: "2025-01-15T10:30:45Z"
);
-- OR if already exists: UPDATE frequency = frequency + 1
```

**React Context State** (updates immediately in browser):
```javascript
{
  conceptMasteryMap: {
    "central-tendency": {
      attempt_count: 1,
      correct_count: 0,
      accuracy_percentage: 0,
      masteryProbability: 0.15,  // Down (wrong answer)
      confidentScore: 0.3
    }
  }
}
```

---

## Example 2: Student Requests Hint

### What Happens
- Student sees feedback "Try again"
- Student clicks "Need Help?" button
- Hint displays: "Add all numbers and divide by count"
- React Context updates
- Supabase records the hint

### Data Captured

**interactions table** (1 new row):
```sql
INSERT INTO interactions VALUES (
  id: "uuid-124",
  learner_id: "student-456",
  concept_id: "central-tendency",
  question_id: "q-mean-01",
  action: "hint_requested",
  response: null,
  is_correct: null,
  response_time: 4200,            -- ⏱️ 4.2 seconds from attempt to hint
  hints_used: 1,                  -- 💡 First hint used
  attempt_number: 1,              -- 📊 Still first attempt
  error_type: null,
  created_at: "2025-01-15T10:35:20Z"
);
```

**React Context State**:
```javascript
{
  conceptMasteryMap: {
    "central-tendency": {
      hintDependency: 0.5,        // 50% dependent on hints
      hintsUsedTotal: 1
    }
  }
}
```

---

## Example 3: Student Retries Question (Gets it Right)

### What Happens
- Student re-reads hint
- Student recalculates: (2+4+6)/3 = 4
- Student answers: "4" (correct!)
- UI shows green checkmark
- Progress updated

### Data Captured

**interactions table** (1 new row):
```sql
INSERT INTO interactions VALUES (
  id: "uuid-125",
  learner_id: "student-456",
  concept_id: "central-tendency",
  question_id: "q-mean-01",
  action: "question_attempt",
  response: "4",
  is_correct: true,               -- ✅ Correct!
  response_time: 12500,           -- ⏱️ 12.5 seconds (more thinking time)
  hints_used: 1,                  -- 💡 Uses 1 hint
  attempt_number: 2,              -- 📊 Second attempt
  error_type: null,               -- ❌ No error
  created_at: "2025-01-15T10:40:30Z"
);
```

**concept_mastery table** (update existing row):
```sql
UPDATE concept_mastery SET
  attempt_count: 2,               -- 📊 2 attempts total
  correct_count: 1,               -- ✅ 1 correct
  avg_response_time: 10367,       -- ⏱️ Average: (8234 + 12500) / 2
  hint_dependency: 0.5,           -- 💡 50% (1 hint in 2 attempts)
  mastery_probability: 0.52,      -- 🎯 BKT formula says 52% mastery
  mastery_level: "novice",        -- Not yet proficient
  last_attempt: "2025-01-15T10:40:30Z"
WHERE learner_id = "student-456" AND concept_id = "central-tendency";
```

**React Context State**:
```javascript
{
  conceptMasteryMap: {
    "central-tendency": {
      attemptCount: 2,
      correctCount: 1,
      accuracy_percentage: 50,    -- ✅ 50% now
      masteryProbability: 0.52,   -- Improved!
      avgResponseTime: 10367,     -- ⏱️ More consistent
      hintDependency: 0.5,        -- 💡 Still using hints
      masteryLevel: "novice"
    }
  }
}
```

---

## Example 4: Complete Full Assessment (5 Questions)

### Assessment Session
```
Time: 2025-01-15 10:45:00 - 11:12:00 (27 minutes)

Q1: Mean (Correct, 8 sec, 0 hints) ✅
Q2: Median (Wrong first, 1 hint, Correct 15 sec) ✅ (1 hint)
Q3: Mode (Correct, 6 sec, 0 hints) ✅
Q4: Range (Wrong, wrong, correct on 3rd try, 2 hints, 30 sec) ✅ (2 hints)
Q5: Mean+Median (Correct, 9 sec, 0 hints) ✅
```

### Data Captured

**interactions table** (10 new rows):
```
Q1_attempt: is_correct=true, response_time=8000, hints_used=0
Q2_attempt_1: is_correct=false, response_time=12000, hints_used=0, error_type="calculation"
Q2_hint: action="hint_requested", response_time=4000, hints_used=1
Q2_attempt_2: is_correct=true, response_time=15000, hints_used=1
Q3_attempt: is_correct=true, response_time=6000, hints_used=0
Q4_attempt_1: is_correct=false, response_time=18000, hints_used=0, error_type="conceptual"
Q4_hint_1: action="hint_requested", response_time=5000, hints_used=1
Q4_attempt_2: is_correct=false, response_time=16000, hints_used=1, error_type="calculation"
Q4_hint_2: action="hint_requested", response_time=3000, hints_used=2
Q4_attempt_3: is_correct=true, response_time=30000, hints_used=2
... (Q5 attempt)
```

**assessment_attempts table** (1 new row):
```sql
INSERT INTO assessment_attempts VALUES (
  learner_id: "student-456",
  concept_id: "central-tendency",
  total_questions: 5,             -- 📊 5 questions
  correct_answers: 5,             -- ✅ All correct eventually
  accuracy: 1.0,                  -- ✅ 100% by end
  avg_response_time: 14400,       -- ⏱️ Average: 14.4 sec
  hints_used: 3,                  -- 💡 3 hints total
  total_time: 1620000,            -- ⏱️ 27 minutes = 1620 seconds
  mastery_gain: 0.28,             -- 🎯 Increased 0.52 → 0.80
  started_at: "2025-01-15T10:45:00Z",
  completed_at: "2025-01-15T11:12:00Z"
);
```

**concept_mastery table** (updated after assessment):
```sql
UPDATE concept_mastery SET
  attempt_count: 12,              -- 📊 12 total attempts
  correct_count: 10,              -- ✅ 10 correct eventually
  avg_response_time: 11250,       -- ⏱️ Average across all attempts
  hint_dependency: 0.25,          -- 💡 3 hints / 12 attempts
  mastery_probability: 0.80,      -- 🎯  80% mastery (proficient!)
  mastery_level: "proficient",    -- 🏆 Reached proficiency
  confidence_score: 0.85,
  last_attempt: "2025-01-15T11:12:00Z"
WHERE learner_id = "student-456" AND concept_id = "central-tendency";
```

**error_patterns table**:
```
Two errors recorded:
1. error_type: "calculation" → frequency: 2 (happened in Q2, Q4)
2. error_type: "conceptual" → frequency: 1 (happened in Q4)
```

**session_logs table** (1 new row):
```sql
INSERT INTO session_logs VALUES (
  learner_id: "student-456",
  session_start: "2025-01-15T10:45:00Z",
  session_end: "2025-01-15T11:12:00Z",
  concepts_covered: ["central-tendency"],
  questions_attempted: 8,         -- 📊 8 attempts (with retries)
  correct_answers: 5,             -- ✅ 5 final correct
  hints_used: 3,                  -- 💡 3 hints
  avg_response_time: 14400,       -- ⏱️ Average
  total_duration: 1620,           -- ⏱️ 27 minutes
  engagement_score: 0.87          -- 📈 High engagement (persisted)
);
```

---

## Metrics Summary After One Assessment

### Time Metrics ⏱️
```
response_time per question: 6,000 - 30,000 ms
avg_response_time: 11,250 ms (11.2 sec)
assessment total_time: 1,620,000 ms (27 min)
session duration: 27 minutes
```

### Error Metrics ❌
```
error_patterns recorded: 2 types
  - "calculation": 2 occurrences
  - "conceptual": 1 occurrence
errors by concept: central-tendency = 3 errors in 12 attempts
```

### Accuracy Metrics ✅
```
correct_answers: 5 / 5 (100% in assessment)
attempt accuracy: 10 / 12 (83.3% with retries)
accuracy per question: 80-100% range
per-attempt accuracy: 50% (first try) → 100% (after hints)
```

### Hint Usage 💡
```
total hints used: 3
hints per question: 0-2
hint_dependency: 0.25 (25% dependent)
questions needing hints: 2 out of 5
progression: Q1→Q3→Q5 need no help; Q2→Q4 need help
```

### Mastery Tracking 🎯
```
mastery_probability: 0.52 → 0.80 (28% gain)
masteryLevel: novice → proficient (progressed!)
confidence_score: 0.3 → 0.85
consecutive_correct: 3 at end (Q3, Q4_final, Q5)
```

---

## 📈 What Pedagogical Service Will See

After this one assessment, the pedagogical service can query:

```sql
-- Check mastery
SELECT mastery_probability FROM concept_mastery 
WHERE learner_id = "student-456" AND concept_id = "central-tendency"
-- Result: 0.80 (80% → probably ready to advance)

-- Check error patterns
SELECT error_type, frequency FROM error_patterns
WHERE learner_id = "student-456" AND concept_id = "central-tendency"
-- Results: 
--   calculation: 2 (need remediation on calculations)
--   conceptual: 1 (mostly conceptually sound)

-- Check hint dependency
SELECT hint_dependency FROM concept_mastery
WHERE learner_id = "student-456" AND concept_id = "central-tendency"
-- Result: 0.25 (25% → lower dependency, good sign)

-- Check response time trend
SELECT avg(response_time) FROM interactions
WHERE learner_id = "student-456" 
  AND concept_id = "central-tendency"
  AND action = "question_attempt"
-- Result: 11,250 ms (consistently 11+ seconds, okay speed)

-- Find struggling areas
SELECT error_type, MAX(frequency) as common_error
FROM error_patterns
WHERE learner_id = "student-456"
GROUP BY concept_id, error_type
-- Result: "calculation" errors are most frequent → recommend calculation examples
```

---

## 🎯 Decision Support

With all this data, pedagogical service can decide:

| Decision | Based On | Example |
|----------|----------|---------|
| Advance to next concept | mastery_probability ≥ 0.70 | 0.80 ✅ → Advance |
| Provide remediation | error_type frequency > threshold | "calculation" × 2 ✅ → Show examples |
| Adjust hint strategy | hint_dependency trend | 0.25 (low) ✅ → Reduce hints next time |
| Offer practice | accuracy < 0.6 | N/A (this student ≥ 0.8) |
| Take break | response_time increasing | Stable 11s ✅ → Can continue |
| Celebrate progress | mastery_gain > 0.15 | 0.28 gain ✅ → Show achievement |

---

## 💾 Storage Estimate

One student, one concept, one assessment:
```
interactions table: 10 rows × 200 bytes = 2 KB
error_patterns table: 2 rows × 150 bytes = 300 bytes
concept_mastery table: 1 row × 300 bytes = 300 bytes
assessment_attempts table: 1 row × 250 bytes = 250 bytes
session_logs table: 1 row × 200 bytes = 200 bytes
────────────────────────────────────────────────
Total per session: ~3.3 KB

Per student per concept (20 assessments) = 66 KB
Per concept (100 students) = 6.6 MB
All 8+ concepts (100 students) = ~53 MB
```

**Supabase free tier:** 500 MB → ~7,500 student-assessments before needing upgrade

---

## ✅ Verification

After day 1 with Supabase integrated:

Check Supabase Table Editor:

1. **learners table** → 1 row (your profile)
2. **interactions table** → 8-10 rows (your attempts + hints)
3. **assessment_attempts table** → 1 row (your assessment summary)
4. **concept_mastery table** → 1 row (your scores)
5. **error_patterns table** → 0-2 rows (if you made mistakes)
6. **session_logs table** → 1 row (your session duration)

**Exact match?** Integration successful! 🎉

---

## Next Steps

1. Create Supabase project (see SUPABASE_SETUP.md)
2. Run SQL schema
3. Integrate LearnerContext (see SUPABASE_INTEGRATION_GUIDE.md)
4. Complete one assessment
5. Check these tables → Should match examples above ✅
