# ET605 Project

An Intelligent Tutoring System for Grade 7 Data Handling with adaptive assessments, learner analytics, and Supabase-backed progress storage.

## Demo Video

- https://drive.google.com/file/d/1ObPCPm8UNPsxkHJHzMiT6lMn2Kz2N4w-/view?usp=drive_link

## Hosted Site
- https://et-605-project-chi.vercel.app/

## Screenshots

![Welcome Screen](Images/Screenshot%202026-03-31%20113140.png)
![Dashboard](Images/Screenshot%202026-03-31%20113342.png)
![Learning Path](Images/Screenshot%202026-03-31%20163059.png)
![Assessment](Images/Screenshot%202026-03-31%20163113.png)
![Analytics](\Images\Screenshot 2026-03-31 163113.png)

## What This Project Includes

- Concept learning modules aligned to Grade 7 data handling topics
- Adaptive assessment flow with progressive hints and feedback
- Learner progress tracking across concepts and attempts
- Gamification with points, levels, and badges
- Supabase integration for storing interactions and mastery data

## Tech Stack

- React 18 + TypeScript
- Vite for build and development
- Tailwind CSS + Radix UI components
- Supabase (database + client SDK)

## Getting Started

1. Install dependencies:
	npm install
2. Add environment variables in `.env.local`:
	VITE_SUPABASE_URL=your_supabase_project_url
	VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
3. Start development server:
	npm run dev
4. Build production bundle:
	npm run build

## Deploy on Vercel

1. Go to https://vercel.com/new
2. Import `Priyam12345-cloud/ET605_Project`
3. Set environment variables in Vercel project settings:
	- `VITE_SUPABASE_URL`
	- `VITE_SUPABASE_ANON_KEY`
4. Click Deploy

Vercel configuration is included in `vercel.json` with SPA rewrites enabled.

## Supabase Setup

1. Open your Supabase project.
2. Run the SQL schema from `src/services/supabase-schema-dev.sql` (or `src/services/supabase-schema.sql`).
3. Verify tables like `learners`, `interactions`, and `concept_mastery` are created.

## Project Structure

- `src/app/pages`: Main screens (Dashboard, Learning Path, Assessment, Analytics)
- `src/app/services`: Adaptive logic, learner model, BKT, gamification services
- `src/app/context`: Auth and learner state management
- `src/services`: Supabase client, service layer, and SQL schemas

## Status

This repository is ready for demo and further classroom-focused improvements.
