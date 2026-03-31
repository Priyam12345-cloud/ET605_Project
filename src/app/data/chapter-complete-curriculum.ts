/**
 * Restructured Grade 7 Data Handling Curriculum
 * Topics: Understanding Data → Collecting Data → Organizing Data → Mean/Range 
 * → Mode → Median → Graphical Representation (Bar Graphs)
 */

import type { Chapter, Subtopic, Concept, Example, ContentBlock } from '../types/domain-model';
import {
  understandingDataEasyQuestions,
  understandingDataMediumQuestions,
  understandingDataHardQuestions,
  collectingDataEasyQuestions,
  collectingDataMediumQuestions,
  organizingDataEasyQuestions,
  organizingDataMediumQuestions,
  meanAndRangeEasyQuestions,
  meanAndRangeMediumQuestions,
  modeEasyQuestions,
  modeMediumQuestions,
  medianEasyQuestions,
  medianMediumQuestions,
  barGraphsEasyQuestions,
  barGraphsMediumQuestions
} from './comprehensive-questions';

const DEFAULT_INTERACTIVE_VIDEO = '/Videos/Recording 2026-03-30 122143.mp4';

const buildInteractiveVideo = (id: string, title: string, content: string): ContentBlock => ({
  id,
  type: 'video',
  title,
  content,
  duration: 180,
  metadata: {
    videoUrl: DEFAULT_INTERACTIVE_VIDEO,
    interactiveComponent: 'shared-video-player'
  }
});

const understandingDataExamples: Example[] = [
  {
    id: 'ex-understand-data-1',
    title: 'Daily Temperature Tracker',
    context: 'A class records the temperature for five days to understand weather patterns.',
    problem: 'Read this data: Mon 30°C, Tue 32°C, Wed 31°C, Thu 33°C, Fri 29°C. Is this qualitative or quantitative?',
    solution: 'This is quantitative data because temperatures are numerical measurements.',
    steps: [
      'Identify the values listed in the data.',
      'Check whether the values are numbers or categories.',
      'Since all values are numbers with units (°C), classify as quantitative data.'
    ],
    relatedConcepts: ['understand-data']
  }
];

const collectingDataExamples: Example[] = [
  {
    id: 'ex-collect-data-1',
    title: 'Favorite Fruit Survey',
    context: 'Riya wants to know the most popular fruit in Grade 7.',
    problem: 'Should Riya ask every student, only close friends, or guess based on her preference?',
    solution: 'She should ask every student in the target group for unbiased primary data.',
    steps: [
      'Define the target group (Grade 7 students).',
      'Create one clear survey question.',
      'Collect responses from the full group instead of a small biased sample.'
    ],
    relatedConcepts: ['collecting-data']
  }
];

const organizingDataExamples: Example[] = [
  {
    id: 'ex-organizing-data-1',
    title: 'Color Frequency Table',
    context: 'Students pick badge colors for house teams.',
    problem: 'Raw list: Red, Blue, Red, Green, Red, Blue, Green, Red. Build a frequency table.',
    solution: 'Red: 4, Blue: 2, Green: 2. Total frequency = 8.',
    steps: [
      'Write each unique category once.',
      'Count occurrences using tally marks.',
      'Convert tallies to final frequencies and verify total count.'
    ],
    relatedConcepts: ['organizing-data']
  }
];

const meanRangeExamples: Example[] = [
  {
    id: 'ex-mean-range-1',
    title: 'Quiz Score Analysis',
    context: 'A student gets scores 10, 15, 20, 25.',
    problem: 'Find both mean and range.',
    solution: 'Mean = (10+15+20+25)/4 = 17.5, Range = 25-10 = 15.',
    steps: [
      'Add all scores to find the total.',
      'Divide by number of scores for mean.',
      'Subtract smallest value from largest for range.'
    ],
    relatedConcepts: ['mean-and-range']
  }
];

const modeExamples: Example[] = [
  {
    id: 'ex-mode-1',
    title: 'Most Sold Snack',
    context: 'The canteen sold: chips, juice, chips, sandwich, chips, juice.',
    problem: 'Which item is the mode?',
    solution: 'Chips is the mode because it appears 3 times, more than others.',
    steps: [
      'List each unique item.',
      'Count frequency of each item.',
      'Pick the item with highest count.'
    ],
    relatedConcepts: ['mode']
  }
];

const medianExamples: Example[] = [
  {
    id: 'ex-median-1',
    title: 'Middle Height Value',
    context: 'Heights (cm): 150, 140, 160, 155, 145.',
    problem: 'Find the median height.',
    solution: 'Sorted list: 140, 145, 150, 155, 160. Median = 150.',
    steps: [
      'Arrange values in ascending order.',
      'Find the middle position.',
      'Read the value at the middle position.'
    ],
    relatedConcepts: ['median']
  }
];

const barGraphExamples: Example[] = [
  {
    id: 'ex-bar-graph-1',
    title: 'Library Books Borrowed',
    context: 'A bar graph compares books borrowed: Monday 20, Tuesday 30, Wednesday 25.',
    problem: 'Which day had the highest borrowing and what is the difference from Monday?',
    solution: 'Tuesday is highest with 30 books; difference from Monday is 10 books.',
    steps: [
      'Read bar heights for each day.',
      'Identify the largest bar (Tuesday).',
      'Subtract Monday from Tuesday to find difference (30 - 20 = 10).'
    ],
    visualization: 'bar-graph-illustration',
    relatedConcepts: ['bar-graphs']
  }
];

// Concept 1: UNDERSTANDING DATA
const conceptUnderstandingData: Concept = {
  id: 'understand-data',
  name: 'Understanding Data',
  description: 'Learn what data is, types of data, and how to classify information',
  learningObjectives: [
    'Understand what data means',
    'Distinguish qualitative vs quantitative data',
    'Identify discrete vs continuous data',
    'Understand the difference between data and information'
  ],
  prerequisites: [],
  difficulty: 'easy',
  estimatedTime: 30,
  theory: [
    {
      id: 'understand-data-theory-1',
      type: 'text',
      title: 'What is Data?',
      content: `
        <div class="space-y-4">
          <h3 class="text-2xl font-bold">Understanding Data</h3>
          <p class="text-lg">Data is a collection of facts, figures, or information. It's the raw material we collect and analyze.</p>
          
          <div class="bg-blue-50 p-4 rounded-lg">
            <h4 class="font-semibold mb-2">Examples of Data:</h4>
            <ul class="list-disc list-inside space-y-1">
              <li>Your height: 160 cm</li>
              <li>Student marks: 85, 90, 78</li>
              <li>Favorite colors: Red, Blue, Green</li>
              <li>Temperature readings: 25°C, 26°C, 27°C</li>
            </ul>
          </div>
          
          <h4 class="font-semibold mt-4">Two Types of Data:</h4>
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-green-50 p-3 rounded">
              <p class="font-semibold text-green-700">Qualitative Data</p>
              <p class="text-sm">Descriptions: Colors, feelings, opinions</p>
              <p class="text-xs mt-2">Example: "Red, Blue, Happy"</p>
            </div>
            <div class="bg-orange-50 p-3 rounded">
              <p class="font-semibold text-orange-700">Quantitative Data</p>
              <p class="text-sm">Numbers: Counts, measurements</p>
              <p class="text-xs mt-2">Example: 5, 160 cm, 85%</p>
            </div>
          </div>
        </div>
      `,
      duration: 180
    }
  ],
  examples: understandingDataExamples,
  interactiveActivities: [
    buildInteractiveVideo(
      'understand-data-video-1',
      'Interactive Session: Understanding Data',
      'Watch this guided interactive explanation to revise how data is identified in real life.'
    )
  ],
  assessmentQuestions: [
    ...understandingDataEasyQuestions,
    ...understandingDataMediumQuestions,
    ...understandingDataHardQuestions.slice(0, 1)
  ],
  practiceQuestions: [],
  remedialContent: [],
  masteryThreshold: 0.7,
  minCorrectAnswers: 4,
  maxHintUsage: 3
};

// Concept 2: COLLECTING DATA
const conceptCollectingData: Concept = {
  id: 'collecting-data',
  name: 'Collecting Data',
  description: 'Learn methods of data collection including surveys, observation, and primary vs secondary data',
  learningObjectives: [
    'Understand primary and secondary data',
    'Design effective survey questions',
    'Learn observation methods',
    'Understand data collection best practices'
  ],
  prerequisites: ['understand-data'],
  difficulty: 'easy',
  estimatedTime: 40,
  theory: [
    {
      id: 'collect-data-theory-1',
      type: 'text',
      title: 'Methods of Data Collection',
      content: `
        <div class="space-y-4">
          <h3 class="text-2xl font-bold">How Do We Collect Data?</h3>
          
          <div class="bg-blue-50 p-4 rounded-lg">
            <h4 class="font-semibold mb-3">Primary Data: Collected by YOU</h4>
            <p class="mb-2">Data you gather directly from the source</p>
            <ul class="list-disc list-inside space-y-1 text-sm">
              <li><strong>Survey:</strong> Ask people questions</li>
              <li><strong>Observation:</strong> Watch and record</li>
              <li><strong>Experiment:</strong> Test and measure</li>
              <li><strong>Interview:</strong> Ask detailed questions</li>
            </ul>
          </div>

          <div class="bg-green-50 p-4 rounded-lg">
            <h4 class="font-semibold mb-3">Secondary Data: Collected by OTHERS</h4>
            <p class="mb-2">Data already collected and published</p>
            <ul class="list-disc list-inside space-y-1 text-sm">
              <li>From books or websites</li>
              <li>From newspapers or reports</li>
              <li>From previous studies</li>
              <li>From government databases</li>
            </ul>
          </div>

          <div class="bg-yellow-50 p-4 rounded-lg">
            <h4 class="font-semibold mb-3">Designing Good Survey Questions</h4>
            <div class="space-y-2 text-sm">
              <div>✓ Be clear and specific</div>
              <div>✓ Avoid leading questions (bias)</div>
              <div>✓ Provide clear answer options</div>
              <div>✗ Don't ask "Don't you think X is best?"</div>
              <div>✗ Don't use confusing language</div>
            </div>
          </div>
        </div>
      `,
      duration: 240
    }
  ],
  examples: collectingDataExamples,
  interactiveActivities: [
    buildInteractiveVideo(
      'collecting-data-video-1',
      'Interactive Session: Collecting Data',
      'Use this video to practice designing fair survey questions and identifying primary vs secondary data.'
    )
  ],
  assessmentQuestions: [
    ...collectingDataEasyQuestions,
    ...collectingDataMediumQuestions
  ],
  practiceQuestions: [],
  remedialContent: [],
  masteryThreshold: 0.7,
  minCorrectAnswers: 3,
  maxHintUsage: 3
};

// Concept 3: ORGANIZING DATA
const conceptOrganizingData: Concept = {
  id: 'organizing-data',
  name: 'Organizing Data',
  description: 'Learn to organize raw data using frequency tables and tally marks',
  learningObjectives: [
    'Understand tally marks and their significance',
    'Create frequency tables from raw data',
    'Calculate total frequency',
    'Interpret frequency tables'
  ],
  prerequisites: ['collecting-data'],
  difficulty: 'easy',
  estimatedTime: 35,
  theory: [
    {
      id: 'organize-data-theory-1',
      type: 'text',
      title: 'Tally Marks and Frequency Tables',
      content: `
        <div class="space-y-4">
          <h3 class="text-2xl font-bold">Organizing Data</h3>
          <p>Raw data is messy. We use tally marks and frequency tables to organize it.</p>

          <div class="bg-blue-50 p-4 rounded-lg">
            <h4 class="font-semibold mb-3">Tally Marks System</h4>
            <div class="space-y-2 font-mono text-lg">
              <div>| = 1</div>
              <div>|| = 2</div>
              <div>||| = 3</div>
              <div>|||| = 4</div>
              <div>||||/ = 5 (cross mark = 5)</div>
              <div>||||/ || = 7 (5 + 2)</div>
            </div>
            <p class="mt-3 text-sm">Each mark = one count. Five marks = one group with a cross.</p>
          </div>

          <div class="bg-green-50 p-4 rounded-lg">
            <h4 class="font-semibold mb-3">Frequency Table</h4>
            <table class="w-full text-sm border-collapse">
              <thead>
                <tr class="bg-green-100">
                  <th class="border p-2 text-left">Item</th>
                  <th class="border p-2 text-left">Tally Marks</th>
                  <th class="border p-2 text-left">Frequency</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-t">
                  <td class="border p-2">Red</td>
                  <td class="border p-2">||||/ |||</td>
                  <td class="border p-2 font-bold">8</td>
                </tr>
                <tr class="border-t">
                  <td class="border p-2">Blue</td>
                  <td class="border p-2">||||/</td>
                  <td class="border p-2 font-bold">5</td>
                </tr>
              </tbody>
            </table>
            <p class="mt-2 text-sm"><strong>Frequency</strong> = how many times something appears</p>
          </div>
        </div>
      `,
      duration: 210
    }
  ],
  examples: organizingDataExamples,
  interactiveActivities: [
    buildInteractiveVideo(
      'organizing-data-video-1',
      'Interactive Session: Organizing Data',
      'Practice tally marks and frequency tables with this interactive walkthrough.'
    )
  ],
  assessmentQuestions: [
    ...organizingDataEasyQuestions,
    ...organizingDataMediumQuestions
  ],
  practiceQuestions: [],
  remedialContent: [],
  masteryThreshold: 0.75,
  minCorrectAnswers: 4,
  maxHintUsage: 3
};

// Concept 4: MEAN & RANGE
const conceptMeanAndRange: Concept = {
  id: 'mean-and-range',
  name: 'Mean and Range',
  description: 'Learn to calculate and interpret mean (average) and range',
  learningObjectives: [
    'Calculate the mean/average of numbers',
    'Understand what mean represents',
    'Calculate range',
    'Interpret mean and range in context'
  ],
  prerequisites: ['organizing-data'],
  difficulty: 'medium',
  estimatedTime: 40,
  theory: [
    {
      id: 'mean-range-theory-1',
      type: 'text',
      title: 'Mean (Average) and Range',
      content: `
        <div class="space-y-4">
          <h3 class="text-2xl font-bold">Representative Values: Mean & Range</h3>

          <div class="bg-blue-50 p-4 rounded-lg">
            <h4 class="font-semibold mb-3">What is MEAN (Average)?</h4>
            <p class="mb-3">Mean = (Sum of all values) ÷ (Number of values)</p>
            <div class="bg-white p-3 rounded border-l-4 border-blue-500">
              <p class="font-mono mb-2">Example: Scores 10, 20, 30</p>
              <p>Sum = 10 + 20 + 30 = 60</p>
              <p>Count = 3</p>
              <p class="font-bold text-blue-600">Mean = 60 ÷ 3 = 20</p>
            </div>
          </div>

          <div class="bg-green-50 p-4 rounded-lg">
            <h4 class="font-semibold mb-3">What is RANGE?</h4>
            <p class="mb-3">Range = Highest value - Lowest value</p>
            <p class="text-sm mb-3">Range shows how spread out the data is.</p>
            <div class="bg-white p-3 rounded border-l-4 border-green-500">
              <p class="font-mono mb-2">Example: 10, 15, 25, 35</p>
              <p>Highest = 35</p>
              <p>Lowest = 10</p>
              <p class="font-bold text-green-600">Range = 35 - 10 = 25</p>
            </div>
          </div>

          <div class="bg-yellow-50 p-4 rounded-lg">
            <h4 class="font-semibold mb-3">Why Are They Useful?</h4>
            <ul class="list-disc list-inside space-y-1 text-sm">
              <li><strong>Mean:</strong> Represents typical/average value</li>
              <li><strong>Range:</strong> Shows variation in data</li>
              <li>Together they give a good picture of the data</li>
            </ul>
          </div>
        </div>
      `,
      duration: 240
    }
  ],
  examples: meanRangeExamples,
  interactiveActivities: [
    buildInteractiveVideo(
      'mean-range-video-1',
      'Interactive Session: Mean and Range',
      'Follow this guided exercise to compute mean and range step-by-step.'
    )
  ],
  assessmentQuestions: [
    ...meanAndRangeEasyQuestions,
    ...meanAndRangeMediumQuestions
  ],
  practiceQuestions: [],
  remedialContent: [],
  masteryThreshold: 0.75,
  minCorrectAnswers: 4,
  maxHintUsage: 3
};

// Concept 5: MODE
const conceptMode: Concept = {
  id: 'mode',
  name: 'Mode',
  description: 'Learn to find and interpret the mode (most frequently occurring value)',
  learningObjectives: [
    'Understand what mode is',
    'Find mode from data sets',
    'Understand unimodal and bimodal data',
    'Use mode to make decisions'
  ],
  prerequisites: ['mean-and-range'],
  difficulty: 'medium',
  estimatedTime: 30,
  theory: [
    {
      id: 'mode-theory-1',
      type: 'text',
      title: 'Mode: The Most Frequent Value',
      content: `
        <div class="space-y-4">
          <h3 class="text-2xl font-bold">What is MODE?</h3>
          <p class="text-lg font-semibold text-blue-600">Mode = Most frequently occurring value</p>

          <div class="bg-blue-50 p-4 rounded-lg">
            <h4 class="font-semibold mb-3">Finding Mode</h4>
            <div class="space-y-3 text-sm">
              <div class="bg-white p-3 rounded border-l-4 border-blue-500">
                <p class="font-semibold mb-2">Example 1: Numbers 5, 6, 6, 7, 6</p>
                <p>Count: 5→1 time, 6→3 times, 7→1 time</p>
                <p class="font-bold text-blue-600">6 appears most! Mode = 6</p>
              </div>
              
              <div class="bg-white p-3 rounded border-l-4 border-green-500">
                <p class="font-semibold mb-2">Example 2: Colors Red, Blue, Red, Green, Red, Blue</p>
                <p>Red→3 times, Blue→2 times, Green→1 time</p>
                <p class="font-bold text-green-600">Red appears most! Mode = Red</p>
              </div>
            </div>
          </div>

          <div class="bg-green-50 p-4 rounded-lg">
            <h4 class="font-semibold mb-3">Special Cases</h4>
            <div class="space-y-2 text-sm">
              <div><strong>Unimodal:</strong> One value appears most (Example: 6)</div>
              <div><strong>Bimodal:</strong> Two values tie for most frequent</div>
              <div><strong>No Mode:</strong> All values appear same number of times</div>
            </div>
          </div>

          <div class="bg-yellow-50 p-4 rounded-lg">
            <h4 class="font-semibold mb-3">Why Mode is Useful</h4>
            <ul class="list-disc list-inside space-y-1 text-sm">
              <li>Find most popular choice</li>
              <li>Common value in a group</li>
              <li>Works with any type of data (not just numbers!)</li>
            </ul>
          </div>
        </div>
      `,
      duration: 180
    }
  ],
  examples: modeExamples,
  interactiveActivities: [
    buildInteractiveVideo(
      'mode-video-1',
      'Interactive Session: Mode',
      'Watch and practice finding the most frequent value in different data sets.'
    )
  ],
  assessmentQuestions: [
    ...modeEasyQuestions,
    ...modeMediumQuestions
  ],
  practiceQuestions: [],
  remedialContent: [],
  masteryThreshold: 0.75,
  minCorrectAnswers: 3,
  maxHintUsage: 3
};

// Concept 6: MEDIAN
const conceptMedian: Concept = {
  id: 'median',
  name: 'Median',
  description: 'Learn to find and interpret the median (middle value)',
  learningObjectives: [
    'Understand what median is',
    'Find median from odd number of values',
    'Find median from even number of values',
    'Compare median with mean and mode'
  ],
  prerequisites: ['mode'],
  difficulty: 'medium',
  estimatedTime: 35,
  theory: [
    {
      id: 'median-theory-1',
      type: 'text',
      title: 'Median: The Middle Value',
      content: `
        <div class="space-y-4">
          <h3 class="text-2xl font-bold">What is MEDIAN?</h3>
          <p class="text-lg font-semibold text-blue-600">Median = Middle value when arranged in order</p>
          <p class="text-sm text-gray-600">Remember: "Median" sounds like "middle-an"</p>

          <div class="bg-blue-50 p-4 rounded-lg">
            <h4 class="font-semibold mb-3">Finding Median: Odd Number of Values</h4>
            <div class="bg-white p-3 rounded border-l-4 border-blue-500 text-sm">
              <p class="font-semibold mb-2">Example: 3, 1, 4, 5, 2</p>
              <p class="mb-2"><strong>Step 1:</strong> Arrange in order: 1, 2, 3, 4, 5</p>
              <p class="mb-2"><strong>Step 2:</strong> Find middle: 1, 2, (3), 4, 5</p>
              <p class="font-bold text-blue-600">Median = 3</p>
            </div>
          </div>

          <div class="bg-green-50 p-4 rounded-lg">
            <h4 class="font-semibold mb-3">Finding Median: Even Number of Values</h4>
            <div class="bg-white p-3 rounded border-l-4 border-green-500 text-sm">
              <p class="font-semibold mb-2">Example: 10, 20</p>
              <p class="mb-2"><strong>Step 1:</strong> Already in order: 10, 20</p>
              <p class="mb-2"><strong>Step 2:</strong> Average the two middle: (10 + 20) ÷ 2 = 15</p>
              <p class="font-bold text-green-600">Median = 15</p>
            </div>
          </div>

          <div class="bg-yellow-50 p-4 rounded-lg">
            <h4 class="font-semibold mb-3">Mean vs Median vs Mode</h4>
            <table class="w-full text-xs border-collapse">
              <tr class="bg-yellow-100">
                <th class="border p-2 text-left">Mean</th>
                <th class="border p-2 text-left">Median</th>
                <th class="border p-2 text-left">Mode</th>
              </tr>
              <tr>
                <td class="border p-2">Average of all</td>
                <td class="border p-2">Middle value</td>
                <td class="border p-2">Most frequent</td>
              </tr>
            </table>
          </div>
        </div>
      `,
      duration: 210
    }
  ],
  examples: medianExamples,
  interactiveActivities: [
    buildInteractiveVideo(
      'median-video-1',
      'Interactive Session: Median',
      'Learn how to arrange data correctly and locate the median for odd and even data sets.'
    )
  ],
  assessmentQuestions: [
    ...medianEasyQuestions,
    ...medianMediumQuestions
  ],
  practiceQuestions: [],
  remedialContent: [],
  masteryThreshold: 0.75,
  minCorrectAnswers: 4,
  maxHintUsage: 3
};

// Concept 7: BAR GRAPHS
const conceptBarGraphs: Concept = {
  id: 'bar-graphs',
  name: 'Graphical Representation - Bar Graphs',
  description: 'Learn to create, read, and interpret bar graphs',
  learningObjectives: [
    'Understand components of a bar graph',
    'Read data from bar graphs',
    'Choose appropriate scales',
    'Create bar graphs from data',
    'Interpret and make conclusions from bar graphs'
  ],
  prerequisites: ['median'],
  difficulty: 'medium',
  estimatedTime: 45,
  theory: [
    {
      id: 'bar-graph-theory-1',
      type: 'text',
      title: 'Understanding Bar Graphs',
      content: `
        <div class="space-y-4">
          <h3 class="text-2xl font-bold">What is a Bar Graph?</h3>
          <p>A bar graph uses bars to represent and compare data values.</p>

          <div class="bg-blue-50 p-4 rounded-lg">
            <h4 class="font-semibold mb-3">Parts of a Bar Graph</h4>
            <div class="space-y-2 text-sm">
              <div class="bg-white p-3 rounded border-l-4 border-blue-500">
                <p><strong>Title:</strong> Name of the graph</p>
              </div>
              <div class="bg-white p-3 rounded border-l-4 border-blue-500">
                <p><strong>X-axis:</strong> Horizontal line (categories)</p>
              </div>
              <div class="bg-white p-3 rounded border-l-4 border-blue-500">
                <p><strong>Y-axis:</strong> Vertical line (values/scale)</p>
              </div>
              <div class="bg-white p-3 rounded border-l-4 border-blue-500">
                <p><strong>Bars:</strong> Heights show data values</p>
              </div>
              <div class="bg-white p-3 rounded border-l-4 border-blue-500">
                <p><strong>Scale:</strong> Numbers on Y-axis to read values</p>
              </div>
            </div>
          </div>

          <div class="bg-green-50 p-4 rounded-lg">
            <h4 class="font-semibold mb-3">Reading a Bar Graph</h4>
            <div class="space-y-2 text-sm">
              <p>1. Find the bar for your category</p>
              <p>2. Trace from the top to the Y-axis</p>
              <p>3. Read the number</p>
            </div>
          </div>

          <div class="bg-yellow-50 p-4 rounded-lg">
            <h4 class="font-semibold mb-3">Choosing the Right Scale</h4>
            <div class="space-y-2 text-sm">
              <p>✓ Must include your highest value</p>
              <p>✓ Use intervals that are easy (10, 50, 100)</p>
              <p>✓ Bars should fit nicely (not too tiny, not too huge)</p>
            </div>
          </div>
        </div>
      `,
      duration: 270
    }
  ],
  examples: barGraphExamples,
  interactiveActivities: [
    buildInteractiveVideo(
      'bar-graphs-video-1',
      'Interactive Session: Bar Graphs',
      'Use this visual session to read scales, compare bars, and interpret graphs accurately.'
    )
  ],
  assessmentQuestions: [
    ...barGraphsEasyQuestions,
    ...barGraphsMediumQuestions
  ],
  practiceQuestions: [],
  remedialContent: [],
  masteryThreshold: 0.75,
  minCorrectAnswers: 3,
  maxHintUsage: 3
};

// Create subtopic containing all concepts in sequence
const mainSubtopic: Subtopic = {
  id: 'data-handling-main',
  name: 'Complete Data Handling Course',
  description: 'Master all aspects of data handling from understanding to visualization',
  order: 1,
  concepts: [
    conceptUnderstandingData,
    conceptCollectingData,
    conceptOrganizingData,
    conceptMeanAndRange,
    conceptMode,
    conceptMedian,
    conceptBarGraphs
  ],
  introduction: [
    {
      id: 'intro-1',
      type: 'text',
      title: 'Welcome to Data Handling!',
      content: `
        <div class="space-y-4">
          <h2 class="text-2xl font-bold">The Journey of Data Handling</h2>
          <p class="text-lg">In this course, you will learn the complete process of working with data:</p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-blue-50 p-4 rounded-lg">
              <h4 class="font-semibold text-blue-700 mb-2">📚 Understanding</h4>
              <p class="text-sm">Learn what data is and types of data</p>
            </div>
            <div class="bg-green-50 p-4 rounded-lg">
              <h4 class="font-semibold text-green-700 mb-2">🔍 Collecting</h4>
              <p class="text-sm">Methods to gather information</p>
            </div>
            <div class="bg-yellow-50 p-4 rounded-lg">
              <h4 class="font-semibold text-yellow-700 mb-2">📊 Organizing</h4>
              <p class="text-sm">Use tables and charts to organize data</p>
            </div>
            <div class="bg-orange-50 p-4 rounded-lg">
              <h4 class="font-semibold text-orange-700 mb-2">🔢 Analyzing</h4>
              <p class="text-sm">Calculate mean, median, mode, range</p>
            </div>
            <div class="bg-red-50 p-4 rounded-lg">
              <h4 class="font-semibold text-red-700 mb-2">📈 Visualizing</h4>
              <p class="text-sm">Create bar graphs and charts</p>
            </div>
            <div class="bg-purple-50 p-4 rounded-lg">
              <h4 class="font-semibold text-purple-700 mb-2">💡 Interpreting</h4>
              <p class="text-sm">Draw conclusions from data</p>
            </div>
          </div>
        </div>
      `,
      duration: 120
    }
  ],
  summary: [],
  estimatedTime: 255
};

export const dataHandlingChapter: Chapter = {
  id: 'ch-data-handling',
  title: 'Data Handling: Understanding to Visualization',
  description: 'Complete curriculum for Grade 7 Data Handling - from data basics to graphical analysis',
  gradeLevel: 7,
  learningOutcomes: [
    'Understand different types of data and data sources',
    'Collect data effectively through surveys and observation',
    'Organize data using frequency tables',
    'Calculate and interpret representative values',
    'Create and interpret graphical representations'
  ],
  subtopics: [mainSubtopic],
  introduction: [],
  realWorldApplications: [],
  finalAssessment: [],
  totalEstimatedTime: 255,
  prerequisites: []
};
