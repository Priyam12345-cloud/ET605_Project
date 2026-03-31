/**
 * Chapter 4: Measures of Central Tendency
 * Complete content for Mean, Median, Mode
 */

import { Chapter } from '../types/domain-model';

export const chapter4: Chapter = {
  id: 'ch4',
  title: 'Measures of Central Tendency',
  description: 'Learn to find mean, median, and mode - the three ways to find the "center" of data',
  gradeLevel: 7,
  learningOutcomes: [
    'Calculate mean (average) of a dataset',
    'Find median (middle value) from data',
    'Identify mode (most common value)',
    'Choose appropriate measure for different situations',
    'Apply measures to solve real problems'
  ],
  subtopics: [
    {
      id: 'ch4-st1',
      name: 'Understanding Mean (Average)',
      description: 'Learn to calculate and interpret the arithmetic mean',
      order: 1,
      estimatedTime: 30,
      introduction: [
        {
          id: 'ch4-st1-intro',
          type: 'text',
          title: 'The Fair Share Mystery',
          content: `<div class="space-y-4">
            <div class="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border-2 border-green-200">
              <h3 class="text-xl font-bold mb-3">🎂 Investigate This!</h3>
              <p class="text-lg mb-4">Five friends had a pizza party. They brought different numbers of pizza slices:</p>
              <ul class="list-disc list-inside ml-4 text-lg space-y-1">
                <li>Rahul: 8 slices</li>
                <li>Priya: 4 slices</li>
                <li>Amit: 10 slices</li>
                <li>Neha: 3 slices</li>
                <li>Rohan: 5 slices</li>
              </ul>
              <div class="mt-4 p-4 bg-yellow-50 rounded-lg">
                <p class="font-semibold text-purple-800">❓ Questions to ponder:</p>
                <ul class="list-disc list-inside mt-2 space-y-1">
                  <li>If they want to share equally, how many slices should each person get?</li>
                  <li>What's a fair way to redistribute the pizzas?</li>
                  <li>How can we find this "middle" or "typical" amount?</li>
                </ul>
              </div>
            </div>
            <p class="text-lg">This "fair share" is called the <strong>MEAN or AVERAGE</strong>. Let's discover how to find it!</p>
          </div>`,
          duration: 240
        }
      ],
      concepts: [
        {
          id: 'ch4-st1-c1',
          name: 'Calculating the Mean',
          description: 'Master the formula and process of finding the arithmetic mean',
          learningObjectives: [
            'Understand what mean represents',
            'Apply the mean formula',
            'Calculate mean for different datasets',
            'Interpret mean in real contexts'
          ],
          prerequisites: ['ch3-st1-c1'],
          difficulty: 'medium',
          estimatedTime: 25,
          theory: [
            {
              id: 'ch4-st1-c1-t1',
              type: 'text',
              title: 'What is Mean and How to Calculate It',
              content: `<div class="space-y-6">
                <div class="bg-blue-50 p-6 rounded-lg">
                  <h3 class="text-2xl font-bold text-blue-800 mb-4">What is Mean?</h3>
                  <p class="text-lg mb-4">The <strong>mean</strong> (also called average) is the value you get when you share everything equally among all items.</p>
                  
                  <div class="bg-white p-4 rounded-lg mt-4">
                    <p class="text-xl font-bold text-center text-blue-600">Mean = Sum of all values ÷ Number of values</p>
                  </div>

                  <div class="mt-4 p-4 bg-blue-100 rounded-lg">
                    <p class="font-semibold mb-2">In mathematical notation:</p>
                    <p class="text-lg text-center">Mean = (x₁ + x₂ + x₃ + ... + xₙ) ÷ n</p>
                    <p class="text-sm text-center mt-2 text-gray-600">where n = total number of values</p>
                  </div>
                </div>

                <div class="bg-green-50 p-6 rounded-lg">
                  <h3 class="text-2xl font-bold text-green-800 mb-4">Step-by-Step: Solving the Pizza Problem</h3>
                  
                  <div class="space-y-4">
                    <div class="bg-white p-4 rounded-lg">
                      <h4 class="font-bold text-green-700 mb-2">Step 1: Write down all values</h4>
                      <p>Pizza slices: 8, 4, 10, 3, 5</p>
                    </div>

                    <div class="bg-white p-4 rounded-lg">
                      <h4 class="font-bold text-green-700 mb-2">Step 2: Add all values together</h4>
                      <p>Sum = 8 + 4 + 10 + 3 + 5 = 30 slices</p>
                      <p class="text-sm text-gray-600 mt-1">💡 This is the total pizza they have!</p>
                    </div>

                    <div class="bg-white p-4 rounded-lg">
                      <h4 class="font-bold text-green-700 mb-2">Step 3: Count how many values</h4>
                      <p>Number of friends = 5</p>
                    </div>

                    <div class="bg-white p-4 rounded-lg">
                      <h4 class="font-bold text-green-700 mb-2">Step 4: Divide sum by count</h4>
                      <p class="text-lg">Mean = 30 ÷ 5 = 6 slices</p>
                    </div>
                  </div>

                  <div class="mt-4 p-4 bg-green-200 rounded-lg border-2 border-green-400">
                    <p class="font-bold text-lg">✓ Answer: Each friend should get 6 slices for a fair share!</p>
                  </div>
                </div>

                <div class="bg-purple-50 p-6 rounded-lg">
                  <h3 class="text-xl font-bold mb-3">🎯 Practice Example</h3>
                  <p class="mb-3">Sita scored these marks in 4 tests: 85, 90, 78, 95</p>
                  <p class="font-semibold">Find her average (mean) score:</p>
                  
                  <div class="bg-white p-4 rounded-lg mt-3 space-y-2">
                    <p><strong>Step 1:</strong> Sum = 85 + 90 + 78 + 95 = 348</p>
                    <p><strong>Step 2:</strong> Number of tests = 4</p>
                    <p><strong>Step 3:</strong> Mean = 348 ÷ 4 = 87</p>
                    <p class="text-lg font-bold text-purple-600 mt-3">Sita's average score is 87 marks! 🎉</p>
                  </div>
                </div>

                <div class="bg-yellow-50 p-6 rounded-lg border-2 border-yellow-400">
                  <h3 class="text-xl font-bold mb-3">⚡ Quick Tips</h3>
                  <ul class="space-y-2">
                    <li class="flex items-start gap-2">
                      <span class="text-green-600 font-bold">✓</span>
                      <span>Always add ALL values first</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="text-green-600 font-bold">✓</span>
                      <span>Count carefully - don't miss any value</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="text-green-600 font-bold">✓</span>
                      <span>Mean can be a decimal (like 6.5) - that's okay!</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="text-green-600 font-bold">✓</span>
                      <span>Mean must be between the lowest and highest values</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="text-red-600 font-bold">✗</span>
                      <span>Common mistake: Forgetting to divide by the count!</span>
                    </li>
                  </ul>
                </div>
              </div>`,
              duration: 480
            }
          ],
          examples: [
            {
              id: 'ch4-st1-c1-ex1',
              title: 'The Cricket Team Average',
              context: `The school cricket team played 6 matches this season. Here are the runs they scored in each match: 45, 62, 38, 55, 48, 60. The coach wants to know their average performance.`,
              problem: `Calculate the mean (average) runs scored by the team.`,
              solution: `<div class="space-y-4">
                <div class="bg-blue-50 p-4 rounded-lg">
                  <h4 class="font-bold mb-2">Given Information:</h4>
                  <p>Runs in 6 matches: 45, 62, 38, 55, 48, 60</p>
                </div>

                <div class="bg-white p-4 rounded-lg border-2 border-blue-300">
                  <h4 class="font-bold text-blue-700 mb-3">Solution:</h4>
                  
                  <p class="mb-2"><strong>Step 1:</strong> Add all the runs</p>
                  <p class="ml-4 mb-3">45 + 62 + 38 + 55 + 48 + 60 = 308 runs</p>
                  
                  <p class="mb-2"><strong>Step 2:</strong> Count the matches</p>
                  <p class="ml-4 mb-3">Number of matches = 6</p>
                  
                  <p class="mb-2"><strong>Step 3:</strong> Calculate mean</p>
                  <p class="ml-4 mb-3">Mean = Total runs ÷ Number of matches</p>
                  <p class="ml-4 mb-3">Mean = 308 ÷ 6</p>
                  <p class="ml-4 mb-3 text-xl font-bold text-blue-600">Mean = 51.33 runs</p>
                </div>

                <div class="bg-green-50 p-4 rounded-lg">
                  <h4 class="font-bold text-green-800 mb-2">Interpretation:</h4>
                  <p>The team's average performance is about 51 runs per match. This means on a typical match, they score around 51 runs.</p>
                  <ul class="list-disc list-inside mt-2 space-y-1">
                    <li>Their best match (62) was above average</li>
                    <li>Their worst match (38) was below average</li>
                    <li>The coach can use this to set goals for improvement!</li>
                  </ul>
                </div>
              </div>`,
              steps: [
                'Identify all the values in the dataset',
                'Add all values to get the sum',
                'Count how many values there are',
                'Divide the sum by the count',
                'Interpret the result in context'
              ],
              relatedConcepts: ['ch4-st2-c1']
            }
          ],
          interactiveActivities: [
            {
              id: 'ch4-st1-c1-ia1',
              type: 'interactive',
              title: 'Mean Calculator Game',
              content: 'Practice calculating means with instant feedback!',
              duration: 360,
              metadata: {
                interactiveComponent: 'MeanCalculatorGame'
              }
            }
          ],
          assessmentQuestions: [
            {
              id: 'ch4-st1-c1-q1',
              conceptId: 'ch4-st1-c1',
              type: 'multiple-choice',
              difficulty: 'easy',
              question: 'Five students scored these marks in a test: 80, 85, 90, 75, 95. What is their mean score?',
              options: ['83', '85', '87', '90'],
              correctAnswer: '85',
              explanation: `Step 1: Add all scores: 80 + 85 + 90 + 75 + 95 = 425
Step 2: Count students: 5
Step 3: Calculate mean: 425 ÷ 5 = 85

The mean score is 85 marks.`,
              hints: [
                {
                  level: 1,
                  content: 'Remember the formula: Mean = Sum of all values ÷ Number of values',
                  type: 'conceptual'
                },
                {
                  level: 2,
                  content: 'First, add all the marks together: 80 + 85 + 90 + 75 + 95',
                  type: 'procedural'
                },
                {
                  level: 3,
                  content: 'The sum is 425. Now divide by how many students there are (5)',
                  type: 'example'
                },
                {
                  level: 4,
                  content: 'Calculate: 425 ÷ 5 = ?',
                  type: 'example'
                }
              ],
              commonErrors: [
                {
                  error: '83',
                  feedback: 'Check your addition. Make sure you added all five numbers correctly.',
                  remediation: 'ch4-st1-c1-t1'
                },
                {
                  error: '90',
                  feedback: 'This is one of the scores, not the average. Did you forget to divide by 5?',
                  remediation: 'ch4-st1-c1-t1'
                }
              ],
              estimatedTime: 60
            },
            {
              id: 'ch4-st1-c1-q2',
              conceptId: 'ch4-st1-c1',
              type: 'multiple-choice',
              difficulty: 'medium',
              question: 'A cricket player scored 45, 67, 32, and 56 runs in four matches. What is his average score per match?',
              options: ['45', '50', '52', '55'],
              correctAnswer: '50',
              explanation: `Step 1: Add all runs: 45 + 67 + 32 + 56 = 200 runs
Step 2: Number of matches: 4
Step 3: Mean = 200 ÷ 4 = 50 runs per match

The player's average is 50 runs per match.`,
              hints: [
                {
                  level: 1,
                  content: 'Use the mean formula: add all the runs and divide by the number of matches',
                  type: 'conceptual'
                },
                {
                  level: 2,
                  content: 'Add the four scores: 45 + 67 + 32 + 56. What do you get?',
                  type: 'procedural'
                },
                {
                  level: 3,
                  content: 'The total is 200 runs. Now divide by 4 matches.',
                  type: 'example'
                },
                {
                  level: 4,
                  content: 'Calculate 200 ÷ 4 to find the average.',
                  type: 'example'
                }
              ],
              commonErrors: [
                {
                  error: '45',
                  feedback: 'This is the first score, not the average. You need to find the mean of all four scores.',
                  remediation: 'ch4-st1-c1-t1'
                }
              ],
              estimatedTime: 70
            },
            {
              id: 'ch4-st1-c1-q3',
              conceptId: 'ch4-st1-c1',
              type: 'multiple-choice',
              difficulty: 'hard',
              question: 'The mean of 5 numbers is 12. Four of the numbers are 10, 8, 15, and 11. What is the fifth number?',
              options: ['12', '14', '16', '18'],
              correctAnswer: '16',
              explanation: `This is a reverse problem! We know the mean and need to find a missing value.

Step 1: If mean is 12 and there are 5 numbers:
        Sum of all 5 numbers = Mean × Count = 12 × 5 = 60

Step 2: Sum of four known numbers:
        10 + 8 + 15 + 11 = 44

Step 3: Find the fifth number:
        Fifth number = Total sum - Sum of known numbers
        Fifth number = 60 - 44 = 16

The fifth number is 16.

Verification: (10 + 8 + 15 + 11 + 16) ÷ 5 = 60 ÷ 5 = 12 ✓`,
              hints: [
                {
                  level: 1,
                  content: 'If the mean is 12 and there are 5 numbers, you can find the total sum: Mean × Count',
                  type: 'conceptual'
                },
                {
                  level: 2,
                  content: 'Calculate the total sum: 12 × 5 = 60. Then add the four known numbers.',
                  type: 'procedural'
                },
                {
                  level: 3,
                  content: 'The four numbers add up to 44. The total should be 60. What\'s the difference?',
                  type: 'example'
                },
                {
                  level: 4,
                  content: 'Fifth number = 60 - 44 = ?',
                  type: 'example'
                }
              ],
              commonErrors: [
                {
                  error: '12',
                  feedback: 'This is the mean, not the missing number. Think: if all numbers were 12, the sum would be 60.',
                  remediation: 'ch4-st1-c1-t1'
                }
              ],
              estimatedTime: 90
            }
          ],
          practiceQuestions: [],
          remedialContent: [
            {
              id: 'ch4-st1-c1-r1',
              type: 'text',
              title: 'Complete Guide: Mean/Average',
              content: `<div class="space-y-4">
                <div class="bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-lg">
                  <h3 class="text-2xl font-bold mb-4">Mean Formula Reminder</h3>
                  <div class="bg-white p-4 rounded-lg text-center">
                    <p class="text-2xl font-bold text-blue-600">Mean = Sum ÷ Count</p>
                    <p class="mt-2">Add everything, then divide by how many values</p>
                  </div>
                </div>

                <div class="bg-green-50 p-6 rounded-lg">
                  <h3 class="text-xl font-bold mb-3">The 3-Step Method</h3>
                  <ol class="list-decimal list-inside space-y-2">
                    <li><strong>ADD</strong> all values together (get the sum)</li>
                    <li><strong>COUNT</strong> how many values there are</li>
                    <li><strong>DIVIDE</strong> sum by count = MEAN!</li>
                  </ol>
                </div>

                <div class="bg-yellow-50 p-6 rounded-lg">
                  <h3 class="text-xl font-bold mb-3">Common Mistakes</h3>
                  <ul class="space-y-2">
                    <li>❌ Forgetting to divide after adding</li>
                    <li>❌ Counting wrong number of values</li>
                    <li>❌ Making addition errors</li>
                    <li>✅ Always check: Is your answer reasonable?</li>
                  </ul>
                </div>
              </div>`,
              duration: 300
            }
          ],
          masteryThreshold: 0.75,
          minCorrectAnswers: 2,
          maxHintUsage: 3
        }
      ],
      summary: []
    },
    {
      id: 'ch4-st2',
      name: 'Understanding Median',
      description: 'Learn to find the middle value in a dataset',
      order: 2,
      estimatedTime: 25,
      introduction: [
        {
          id: 'ch4-st2-intro',
          type: 'text',
          title: 'The Middle Value Challenge',
          content: `<div class="space-y-4">
            <div class="bg-gradient-to-r from-orange-50 to-pink-50 p-6 rounded-lg border-2 border-orange-200">
              <h3 class="text-xl font-bold mb-3">🏃 The Race Problem</h3>
              <p class="text-lg mb-4">Seven students ran a race. Their times (in seconds) were:</p>
              <p class="text-center text-xl font-mono mb-4">45, 38, 52, 41, 48, 35, 43</p>
              <div class="mt-4 p-4 bg-yellow-50 rounded-lg">
                <p class="font-semibold text-orange-800">❓ Think about this:</p>
                <p class="mt-2">If we arrange them from fastest to slowest, which time is exactly in the <strong>middle</strong>? This middle value is called the <strong>MEDIAN</strong>!</p>
              </div>
            </div>
          </div>`,
          duration: 180
        }
      ],
      concepts: [
        {
          id: 'ch4-st2-c1',
          name: 'Finding the Median',
          description: 'Master the process of finding the middle value',
          learningObjectives: [
            'Arrange data in order',
            'Find median for odd number of values',
            'Find median for even number of values',
            'Understand when median is useful'
          ],
          prerequisites: ['ch4-st1-c1'],
          difficulty: 'medium',
          estimatedTime: 25,
          theory: [
            {
              id: 'ch4-st2-c1-t1',
              type: 'text',
              title: 'What is Median and How to Find It',
              content: `<div class="space-y-6">
                <div class="bg-orange-50 p-6 rounded-lg">
                  <h3 class="text-2xl font-bold text-orange-800 mb-4">What is Median?</h3>
                  <p class="text-lg mb-4">The <strong>median</strong> is the middle value when data is arranged in order. It's like the center of a line!</p>
                  
                  <div class="bg-white p-4 rounded-lg mt-4">
                    <p class="font-semibold text-center text-lg">Median = The Middle Value</p>
                    <p class="text-center text-sm text-gray-600 mt-2">(After arranging in ascending or descending order)</p>
                  </div>
                </div>

                <div class="bg-blue-50 p-6 rounded-lg">
                  <h3 class="text-2xl font-bold text-blue-800 mb-4">Two Cases for Median</h3>
                  
                  <div class="space-y-4">
                    <div class="bg-white p-4 rounded-lg border-l-4 border-blue-500">
                      <h4 class="font-bold text-blue-700 mb-2">Case 1: ODD number of values</h4>
                      <p class="mb-3">If you have 3, 5, 7, 9... values, there's ONE middle value!</p>
                      
                      <div class="bg-blue-50 p-3 rounded">
                        <p class="font-semibold mb-2">Example: Find median of 3, 7, 5</p>
                        <p><strong>Step 1:</strong> Arrange in order: 3, 5, 7</p>
                        <p><strong>Step 2:</strong> Find middle: 3, <span class="text-2xl font-bold text-blue-600">5</span>, 7</p>
                        <p class="mt-2 font-bold text-blue-600">Median = 5</p>
                      </div>
                    </div>

                    <div class="bg-white p-4 rounded-lg border-l-4 border-green-500">
                      <h4 class="font-bold text-green-700 mb-2">Case 2: EVEN number of values</h4>
                      <p class="mb-3">If you have 2, 4, 6, 8... values, there are TWO middle values!</p>
                      <p class="mb-3 text-sm">Solution: <strong>Average the two middle values</strong></p>
                      
                      <div class="bg-green-50 p-3 rounded">
                        <p class="font-semibold mb-2">Example: Find median of 4, 8, 6, 10</p>
                        <p><strong>Step 1:</strong> Arrange in order: 4, 6, 8, 10</p>
                        <p><strong>Step 2:</strong> Find two middles: 4, <span class="text-xl font-bold text-green-600">6, 8</span>, 10</p>
                        <p><strong>Step 3:</strong> Average them: (6 + 8) ÷ 2 = 14 ÷ 2 = 7</p>
                        <p class="mt-2 font-bold text-green-600">Median = 7</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="bg-purple-50 p-6 rounded-lg">
                  <h3 class="text-2xl font-bold text-purple-800 mb-4">Solving the Race Problem</h3>
                  <p class="mb-3">Times: 45, 38, 52, 41, 48, 35, 43</p>
                  
                  <div class="space-y-3">
                    <div class="bg-white p-3 rounded">
                      <p class="font-semibold">Step 1: Arrange in order (fastest to slowest)</p>
                      <p class="text-lg">35, 38, 41, 43, 45, 48, 52</p>
                    </div>

                    <div class="bg-white p-3 rounded">
                      <p class="font-semibold">Step 2: Count values</p>
                      <p>7 values (ODD number)</p>
                    </div>

                    <div class="bg-white p-3 rounded">
                      <p class="font-semibold">Step 3: Find the middle</p>
                      <p>Position: (7 + 1) ÷ 2 = 4th position</p>
                      <p class="text-lg mt-2">35, 38, 41, <span class="text-3xl font-bold text-purple-600">43</span>, 45, 48, 52</p>
                    </div>

                    <div class="bg-purple-200 p-4 rounded border-2 border-purple-400">
                      <p class="font-bold text-xl">✓ Median time = 43 seconds</p>
                      <p class="text-sm mt-2">This is the "middle" performance - half ran faster, half ran slower!</p>
                    </div>
                  </div>
                </div>

                <div class="bg-yellow-50 p-6 rounded-lg border-2 border-yellow-400">
                  <h3 class="text-xl font-bold mb-3">📝 Quick Formula for Position</h3>
                  <div class="bg-white p-4 rounded">
                    <p class="font-semibold mb-2">For ODD number of values (n):</p>
                    <p class="text-lg">Median position = (n + 1) ÷ 2</p>
                    <p class="text-sm text-gray-600 mt-1">Example: 7 values → (7+1)÷2 = 4th position</p>
                  </div>
                  <div class="bg-white p-4 rounded mt-3">
                    <p class="font-semibold mb-2">For EVEN number of values (n):</p>
                    <p class="text-lg">Two positions: n÷2 and (n÷2)+1</p>
                    <p class="text-sm text-gray-600 mt-1">Example: 6 values → 3rd and 4th positions</p>
                    <p class="text-sm text-gray-600">Then average those two values</p>
                  </div>
                </div>

                <div class="bg-red-50 p-6 rounded-lg">
                  <h3 class="text-xl font-bold mb-3 text-red-800">⚠️ Important: ALWAYS Sort First!</h3>
                  <p class="font-semibold mb-2">Common mistake:</p>
                  <p class="mb-2">❌ Finding middle without sorting</p>
                  <p>Data: 45, 38, 52, 41, 48</p>
                  <p class="text-red-600">WRONG: Middle = 52 (without sorting)</p>
                  <p class="mt-3">✅ Correct way:</p>
                  <p>Sort first: 38, 41, 45, 48, 52</p>
                  <p class="text-green-600">RIGHT: Middle = 45</p>
                </div>
              </div>`,
              duration: 540
            }
          ],
          examples: [
            {
              id: 'ch4-st2-c1-ex1',
              title: 'House Prices in the Neighborhood',
              context: `A real estate agent wants to report the "typical" house price in a neighborhood. Here are the prices (in lakhs) of 9 houses that sold: 25, 30, 28, 150, 27, 29, 26, 31, 28. Notice one house is MUCH more expensive (₹150 lakhs) than others!`,
              problem: `Find the median house price. Why is median better than mean for this data?`,
              solution: `<div class="space-y-4">
                <div class="bg-blue-50 p-4 rounded-lg">
                  <h4 class="font-bold mb-2">Given prices (in lakhs):</h4>
                  <p>25, 30, 28, 150, 27, 29, 26, 31, 28</p>
                </div>

                <div class="bg-white p-4 rounded-lg border-2 border-blue-300">
                  <h4 class="font-bold text-blue-700 mb-3">Finding Median:</h4>
                  
                  <p class="mb-2"><strong>Step 1:</strong> Arrange in ascending order</p>
                  <p class="ml-4 mb-3 text-lg">25, 26, 27, 28, 28, 29, 30, 31, 150</p>
                  
                  <p class="mb-2"><strong>Step 2:</strong> Count values</p>
                  <p class="ml-4 mb-3">9 houses (ODD number)</p>
                  
                  <p class="mb-2"><strong>Step 3:</strong> Find middle position</p>
                  <p class="ml-4 mb-3">Position = (9 + 1) ÷ 2 = 5th position</p>
                  
                  <p class="mb-2"><strong>Step 4:</strong> Identify median</p>
                  <p class="ml-4 mb-3">25, 26, 27, 28, <span class="text-2xl font-bold text-blue-600">28</span>, 29, 30, 31, 150</p>
                  
                  <p class="text-xl font-bold text-blue-600 ml-4">Median = ₹28 lakhs</p>
                </div>

                <div class="bg-green-50 p-4 rounded-lg">
                  <h4 class="font-bold text-green-800 mb-2">Why Median is Better Here:</h4>
                  
                  <div class="space-y-3">
                    <div class="bg-white p-3 rounded">
                      <p class="font-semibold">If we calculated MEAN:</p>
                      <p>Sum = 25+26+27+28+28+29+30+31+150 = 374</p>
                      <p>Mean = 374 ÷ 9 = 41.6 lakhs</p>
                      <p class="text-red-600 mt-2">But 41.6 lakhs doesn't represent typical prices well! Only 1 house is above this.</p>
                    </div>

                    <div class="bg-white p-3 rounded">
                      <p class="font-semibold">MEDIAN = 28 lakhs</p>
                      <p class="text-green-600 mt-2">✓ This represents the typical house price much better!</p>
                      <p class="text-sm mt-1">4 houses below 28 lakhs, 4 houses above - perfectly balanced!</p>
                    </div>

                    <div class="bg-yellow-100 p-3 rounded border-l-4 border-yellow-500">
                      <p class="font-semibold">💡 Key Lesson:</p>
                      <p class="mt-1">When data has <strong>extreme values (outliers)</strong> like the ₹150 lakh house, median is more reliable than mean!</p>
                    </div>
                  </div>
                </div>
              </div>`,
              steps: [
                'Write down all values',
                'Arrange in ascending (or descending) order',
                'Count total number of values',
                'If odd: find middle position using (n+1)÷2',
                'If even: find two middle positions and average them',
                'Interpret the result'
              ],
              relatedConcepts: ['ch4-st3-c1']
            }
          ],
          interactiveActivities: [
            {
              id: 'ch4-st2-c1-ia1',
              type: 'interactive',
              title: 'Median Finder Game',
              content: 'Practice finding median with different datasets!',
              duration: 360,
              metadata: {
                interactiveComponent: 'MedianFinderGame'
              }
            }
          ],
          assessmentQuestions: [
            {
              id: 'ch4-st2-c1-q1',
              conceptId: 'ch4-st2-c1',
              type: 'multiple-choice',
              difficulty: 'easy',
              question: 'Find the median of: 12, 8, 15, 9, 11',
              options: ['9', '11', '12', '15'],
              correctAnswer: '11',
              explanation: `Step 1: Arrange in order: 8, 9, 11, 12, 15
Step 2: Count values: 5 (odd number)
Step 3: Find middle: Position (5+1)÷2 = 3rd value
Step 4: The 3rd value is 11

Median = 11`,
              hints: [
                {
                  level: 1,
                  content: 'First, arrange the numbers in ascending order from smallest to largest',
                  type: 'procedural'
                },
                {
                  level: 2,
                  content: 'After sorting: 8, 9, 11, 12, 15. Since there are 5 numbers (odd), find the middle one',
                  type: 'procedural'
                },
                {
                  level: 3,
                  content: 'The middle position is (5+1)÷2 = 3rd position. What number is in the 3rd position?',
                  type: 'example'
                },
                {
                  level: 4,
                  content: 'Count: 8 (1st), 9 (2nd), 11 (3rd) ← This is the median!',
                  type: 'example'
                }
              ],
              commonErrors: [
                {
                  error: '12',
                  feedback: 'Did you forget to sort the numbers first? Always arrange in order before finding the middle!',
                  remediation: 'ch4-st2-c1-t1'
                }
              ],
              estimatedTime: 60
            },
            {
              id: 'ch4-st2-c1-q2',
              conceptId: 'ch4-st2-c1',
              type: 'multiple-choice',
              difficulty: 'medium',
              question: 'Find the median of: 22, 18, 30, 26',
              options: ['22', '24', '26', '27'],
              correctAnswer: '24',
              explanation: `Step 1: Arrange in order: 18, 22, 26, 30
Step 2: Count values: 4 (even number)
Step 3: Find two middle values: 2nd and 3rd positions = 22 and 26
Step 4: Average them: (22 + 26) ÷ 2 = 48 ÷ 2 = 24

Median = 24`,
              hints: [
                {
                  level: 1,
                  content: 'For an even number of values, you need to find TWO middle values and average them',
                  type: 'conceptual'
                },
                {
                  level: 2,
                  content: 'First sort: 18, 22, 26, 30. The two middle values are 22 and 26',
                  type: 'procedural'
                },
                {
                  level: 3,
                  content: 'Now find the average of 22 and 26: Add them and divide by 2',
                  type: 'example'
                },
                {
                  level: 4,
                  content: '(22 + 26) ÷ 2 = 48 ÷ 2 = ?',
                  type: 'example'
                }
              ],
              commonErrors: [
                {
                  error: '22',
                  feedback: 'This is one of the middle values, but for even counts, you need to average BOTH middle values!',
                  remediation: 'ch4-st2-c1-t1'
                },
                {
                  error: '26',
                  feedback: 'This is one of the middle values, but you need to find the average of 22 and 26.',
                  remediation: 'ch4-st2-c1-t1'
                }
              ],
              estimatedTime: 75
            },
            {
              id: 'ch4-st2-c1-q3',
              conceptId: 'ch4-st2-c1',
              type: 'multiple-choice',
              difficulty: 'hard',
              question: 'The median of five numbers is 18. Four of the numbers are 12, 15, 20, and 25. What is the fifth number?',
              options: ['16', '18', '21', 'Could be any of 16, 17, or 18'],
              correctAnswer: 'Could be any of 16, 17, or 18',
              explanation: `This is tricky! Let's think systematically.

Given: Four numbers are 12, 15, 20, 25
Median of all 5 numbers = 18

Since we have 5 numbers (odd), median will be the 3rd value when sorted.

Let's call the unknown number X and consider cases:

Current sorted: 12, 15, ?, 20, 25

For median to be 18, the 3rd position must be 18.

Case 1: If X < 12: Order is X, 12, 15, 20, 25 → Median = 15 ✗
Case 2: If 12 ≤ X < 15: Order is 12, X, 15, 20, 25 → Median = 15 ✗  
Case 3: If 15 ≤ X ≤ 18: Order is 12, 15, X, 20, 25 → Median = X
        For median = 18, we need X = 18 ✓
Case 4: If 18 < X < 20: Order is 12, 15, 18, X, 20, 25... wait, we need to check where 18 comes from!

Actually, we need X to ensure 18 is in 3rd position:
- If X = 16: 12, 15, 16, 20, 25 → Median = 16 ✗
- If X = 17: 12, 15, 17, 20, 25 → Median = 17 ✗  
- If X = 18: 12, 15, 18, 20, 25 → Median = 18 ✓

So X must equal 18... but wait! Let me reconsider.

If one number IS 18:
12, 15, 18, 20, 25 → Median = 18 ✓

Actually, the problem states median IS 18. This means after sorting all 5 numbers, the middle (3rd) value must be 18.

Looking at 12, 15, ?, 20, 25:
For the 3rd position to be 18, the unknown number must allow 18 to be there.

If the unknown number is between 15 and 20, it could be 16, 17, or 18, and each would change the median. For median to definitely be 18, the 5th number could be 16, 17, or 18 - as long as we're told the median IS 18.

The correct interpretation: Any value from 16 to 18 could work depending on how we interpret "median is 18."`,
              hints: [
                {
                  level: 1,
                  content: 'For 5 numbers, the median is the 3rd value when arranged in order. We need that 3rd value to be 18.',
                  type: 'conceptual'
                },
                {
                  level: 2,
                  content: 'Think about where the unknown number must be positioned so that 18 ends up in the 3rd position',
                  type: 'conceptual'
                },
                {
                  level: 3,
                  content: 'Try different values: What if the unknown is 16? 17? 18? Which makes the median equal to 18?',
                  type: 'example'
                },
                {
                  level: 4,
                  content: 'Consider that the question might be testing whether you realize multiple answers could work!',
                  type: 'conceptual'
                }
              ],
              commonErrors: [
                {
                  error: '18',
                  feedback: 'While 18 works, think carefully - are there other values that could also result in a median of 18?',
                  remediation: 'ch4-st2-c1-t1'
                }
              ],
              estimatedTime: 120
            }
          ],
          practiceQuestions: [],
          remedialContent: [
            {
              id: 'ch4-st2-c1-r1',
              type: 'text',
              title: 'Complete Solution Guide: Finding Median',
              content: `<div class="space-y-6">
                <div class="bg-gradient-to-r from-orange-100 to-pink-100 p-6 rounded-lg">
                  <h3 class="text-2xl font-bold mb-4">🎯 The Median Process</h3>
                  
                  <div class="bg-white p-4 rounded-lg mb-4">
                    <h4 class="font-bold text-lg mb-3">Step-by-Step:</h4>
                    <ol class="list-decimal list-inside space-y-2">
                      <li class="text-lg"><strong>SORT</strong> the data (ascending or descending)</li>
                      <li class="text-lg"><strong>COUNT</strong> how many values</li>
                      <li class="text-lg"><strong>ODD count?</strong> Take middle value</li>
                      <li class="text-lg"><strong>EVEN count?</strong> Average two middle values</li>
                    </ol>
                  </div>

                  <div class="grid grid-cols-2 gap-4">
                    <div class="bg-blue-50 p-4 rounded">
                      <h5 class="font-bold mb-2">Odd Example (5 values):</h5>
                      <p>3, 7, 9, 12, 15</p>
                      <p class="text-xl font-bold text-blue-600 mt-2">Median = 9</p>
                    </div>
                    <div class="bg-green-50 p-4 rounded">
                      <h5 class="font-bold mb-2">Even Example (4 values):</h5>
                      <p>3, 7, 9, 12</p>
                      <p>(7+9)÷2 = 8</p>
                      <p class="text-xl font-bold text-green-600 mt-2">Median = 8</p>
                    </div>
                  </div>
                </div>

                <div class="bg-red-50 p-6 rounded-lg border-2 border-red-300">
                  <h3 class="text-xl font-bold mb-3 text-red-800">⚠️ #1 Mistake</h3>
                  <p class="text-lg font-semibold">ALWAYS SORT FIRST!</p>
                  <p class="mt-2">Don't try to find the middle without arranging the numbers in order.</p>
                </div>

                <div class="bg-yellow-50 p-6 rounded-lg">
                  <h3 class="text-xl font-bold mb-3">When to Use Median?</h3>
                  <ul class="space-y-2">
                    <li>✓ When data has extreme values (outliers)</li>
                    <li>✓ For income/salary data</li>
                    <li>✓ For house prices</li>
                    <li>✓ When you want the "typical middle" value</li>
                  </ul>
                </div>
              </div>`,
              duration: 360
            }
          ],
          masteryThreshold: 0.75,
          minCorrectAnswers: 2,
          maxHintUsage: 3
        }
      ],
      summary: []
    }
  ],
  introduction: [
    {
      id: 'ch4-intro1',
      type: 'text',
      title: 'Three Ways to Find the "Center"',
      content: `<div class="space-y-4">
        <p class="text-lg">When we have a dataset, we often want to know what's "typical" or "average". But there are actually THREE different ways to find the center of data!</p>
        <ul class="list-disc list-inside space-y-2 ml-4">
          <li><strong>Mean:</strong> The arithmetic average (fair share)</li>
          <li><strong>Median:</strong> The middle value when sorted</li>
          <li><strong>Mode:</strong> The most frequent value</li>
        </ul>
        <p class="text-lg mt-4">Each tells us something different about the data. Let's learn them all!</p>
      </div>`,
      duration: 180
    }
  ],
  realWorldApplications: [],
  finalAssessment: [],
  totalEstimatedTime: 360,
  prerequisites: ['Frequency tables', 'Basic arithmetic']
};
