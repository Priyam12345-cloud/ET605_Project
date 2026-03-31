/**
 * Complete Domain Model for Grade 7 Data Handling
 * Comprehensive content with theory, examples, stories, and assessments
 */

import { DomainModel, ContentBlock } from '../types/domain-model';
import { dataHandlingChapter } from './chapter-complete-curriculum';

// Helper to create content blocks
const createTextContent = (id: string, title: string, content: string, duration: number = 180): ContentBlock => ({
  id,
  type: 'text',
  title,
  content,
  duration
});

const createVideoContent = (id: string, title: string, content: string, videoUrl: string, duration: number = 300): ContentBlock => ({
  id,
  type: 'video',
  title,
  content,
  duration,
  metadata: { videoUrl }
});

const createInteractiveContent = (id: string, title: string, content: string, component: string, duration: number = 420): ContentBlock => ({
  id,
  type: 'interactive',
  title,
  content,
  duration,
  metadata: { interactiveComponent: component }
});

export const domainModel: DomainModel = {
  subject: 'Mathematics - Data Handling',
  gradeLevel: 7,
  chapters: [dataHandlingChapter],
  glossary: [
    {
      term: 'Data',
      definition: 'Collection of facts, figures, or information',
      examples: ['Student marks', 'Height measurements', 'Survey responses']
    },
    {
      term: 'Mean',
      definition: 'Average value calculated by dividing sum by count',
      examples: ['Average score: (80+90+85) ÷ 3 = 85']
    },
    {
      term: 'Median',
      definition: 'Middle value when arranged in order',
      examples: ['In 1,2,3,4,5 - median is 3']
    },
    {
      term: 'Mode',
      definition: 'Value that appears most frequently',
      examples: ['In 1,2,2,3,2 - mode is 2']
    },
    {
      term: 'Range',
      definition: 'Difference between highest and lowest values',
      examples: ['For 10,20,30 - range is 20']
    },
    {
      term: 'Frequency',
      definition: 'Number of times a value appears in data',
      examples: ['Red appears 5 times = frequency 5']
    }
  ]
};