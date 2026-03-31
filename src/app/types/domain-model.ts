/**
 * Domain Model Type Definitions
 * Complete structure for Grade 7 Data Handling content
 */

// Content types for multi-modal learning
export type ContentType = 
  | 'text' 
  | 'video' 
  | 'interactive' 
  | 'example' 
  | 'story' 
  | 'game' 
  | 'simulation'
  | 'visualization';

// Question types for assessment
export type QuestionType = 
  | 'multiple-choice' 
  | 'subjective'
  | 'short-answer'
  | 'fill-in-blank' 
  | 'drag-drop' 
  | 'interactive-graph'
  | 'calculation'
  | 'interpretation';

// Difficulty levels
export type DifficultyLevel = 'easy' | 'medium' | 'hard';

// Hint structure with progressive disclosure
export interface Hint {
  level: number; // 1-3, increasing specificity
  content: string;
  type: 'conceptual' | 'procedural' | 'example';
}

// Learning content block
export interface ContentBlock {
  id: string;
  type: ContentType;
  title: string;
  content: string; // Can be HTML, markdown, or component reference
  duration: number; // estimated time in seconds
  metadata?: {
    videoUrl?: string;
    interactiveComponent?: string;
    imageUrl?: string;
    codeExample?: string;
  };
}

// Example with story-based context
export interface Example {
  id: string;
  title: string;
  context: string; // Story or real-world scenario
  problem: string;
  solution: string;
  steps: string[];
  visualization?: string; // Reference to chart or diagram
  relatedConcepts: string[];
}

// Assessment question
export interface Question {
  id: string;
  conceptId: string;
  type: QuestionType;
  difficulty: DifficultyLevel;
  question: string;
  options?: string[]; // For MCQ
  correctAnswer: string | string[];
  explanation: string;
  hints: Hint[];
  commonErrors: {
    error: string;
    feedback: string;
    remediation: string; // Link to remedial content
  }[];
  estimatedTime: number; // in seconds
  prerequisiteQuestions?: string[]; // Questions that should be mastered first
  metadata?: {
    requiredData?: any;
    chartType?: string;
    interactiveComponent?: string;
  };
}

// Concept definition
export interface Concept {
  id: string;
  name: string;
  description: string;
  learningObjectives: string[];
  prerequisites: string[]; // IDs of prerequisite concepts
  difficulty: DifficultyLevel;
  estimatedTime: number; // minutes to master
  
  // Multi-modal content
  theory: ContentBlock[];
  examples: Example[];
  interactiveActivities: ContentBlock[];
  
  // Assessment
  assessmentQuestions: Question[];
  practiceQuestions: Question[];
  
  // Remedial support
  remedialContent: ContentBlock[];
  
  // Mastery criteria
  masteryThreshold: number; // 0-1, minimum mastery to advance
  minCorrectAnswers: number;
  maxHintUsage: number; // Max hints before requiring remediation
}

// Subtopic (contains 3-4 concepts)
export interface Subtopic {
  id: string;
  name: string;
  description: string;
  order: number;
  concepts: Concept[];
  introduction: ContentBlock[];
  summary: ContentBlock[];
  cumulativeAssessment?: Question[];
  estimatedTime: number; // total minutes
}

// Chapter (contains 5+ subtopics)
export interface Chapter {
  id: string;
  title: string;
  description: string;
  gradeLevel: number;
  learningOutcomes: string[];
  subtopics: Subtopic[];
  
  // Chapter-level content
  introduction: ContentBlock[];
  realWorldApplications: Example[];
  
  // Final assessment
  finalAssessment: Question[];
  
  // Metadata
  totalEstimatedTime: number; // minutes for complete chapter
  prerequisites: string[]; // Knowledge students should have
}

// Complete domain model
export interface DomainModel {
  subject: string;
  gradeLevel: number;
  chapters: Chapter[];
  glossary: {
    term: string;
    definition: string;
    examples: string[];
  }[];
}

// Progress tracking
export interface ConceptProgress {
  conceptId: string;
  status: 'not-started' | 'in-progress' | 'completed' | 'mastered';
  startedAt?: number;
  completedAt?: number;
  timeSpent: number;
  questionsAttempted: number;
  questionsCorrect: number;
  hintsUsed: number;
  masteryScore: number;
}

export interface SubtopicProgress {
  subtopicId: string;
  status: 'locked' | 'available' | 'in-progress' | 'completed';
  conceptProgress: ConceptProgress[];
  overallMastery: number;
}

export interface ChapterProgress {
  chapterId: string;
  subtopicProgress: SubtopicProgress[];
  overallCompletion: number;
  startedAt?: number;
  estimatedCompletion?: number;
}
