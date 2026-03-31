# Supabase Setup Guide for Data Handling ITS

## Step 1: Create Supabase Project

1. Go to https://app.supabase.com
2. Click "New Project"
3. Name it: `data-handling-its`
4. Set a strong password
5. Region: Choose closest to your location
6. Click "Create new project" (wait ~2 minutes)

## Step 2: Get API Keys

1. In Supabase dashboard, go to **Settings → API**
2. Copy:
   - `Project URL` → `VITE_SUPABASE_URL`
   - `anon (public)` key → `VITE_SUPABASE_ANON_KEY`
3. Create `.env.local` in project root:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Step 3: Run SQL Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy-paste the SQL from `src/services/supabase-schema.sql`
4. Click "Run"
5. Wait for confirmation ✅

## Step 4: Install Supabase Client

```bash
npm install @supabase/supabase-js
```

## Step 5: Test Connection

Restart dev server:
```bash
npm run dev
```

Open browser console: should see no errors about Supabase.

## That's it! 🎉

Your app will now:
- Store learner progress in Supabase
- Track all interactions (time, errors, accuracy, hints)
- Persist student data across sessions
- Enable multi-device support

---

## What Gets Stored?

| Table | Stores | How Often |
|-------|--------|-----------|
| `learners` | Student profile, auth | On signup |
| `concept_mastery` | BKT scores, mastery levels | After each question |
| `interactions` | Every question attempt, hint, video, example | Real-time |
| `assessment_attempts` | Full assessment results | On assessment end |
| `error_patterns` | Common mistakes by concept | On wrong answer |
| `session_logs` | When student starts/stops | On events |

---

## Monitor in Dashboard

1. Go to Supabase → **Table Editor**
2. View `learners` table → See all students
3. View `interactions` → See every action
4. View `concept_mastery` → See scores

---

## Next Steps

### Analytics (Future):
- Export to BigQuery for ML models
- Build custom dashboards in Superset
- RLS = Row-Level Security for privacy

### Advanced Features:
- Add teacher dashboard (see all student progress)
- Generate PDFs of progress reports
- Email notifications for low performance
- Backup to cloud storage

---

## Troubleshooting

### "Connection refused"?
Check `.env.local` has correct URL and key.

### "Table doesn't exist"?
Re-run the SQL schema (Step 3).

### "Row Level Security error"?
Enable RLS in **Authentication → Policies**. (Pre-configured in schema.)

---

## Support

- Supabase Docs: https://supabase.com/docs
- This app Supabase service: `src/services/supabase-service.ts`
- Questions? Check console for error messages.
