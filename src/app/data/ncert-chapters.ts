/**
 * NCERT-Aligned Chapters for Grade 7 Data Handling
 * Topics: Understanding Data, Organizing Data, Mean/Mode/Median, Graphs
 */

import { Chapter } from '../types/domain-model';

export const chapter3: Chapter = {
  id: 'ch3',
  title: 'Understanding and Organizing Data',
  description: 'Learn how to collect, organize, and make sense of data in real-world situations',
  gradeLevel: 7,
  learningOutcomes: [
    'Understand the importance of data in daily life',
    'Organize raw data into meaningful formats',
    'Create frequency tables and tally marks',
    'Identify patterns in organized data',
    'Apply data organization to solve real problems'
  ],
  subtopics: [
    {
      id: 'ch3-st1',
      name: 'Organizing Data with Frequency Tables',
      description: 'Learn to organize large amounts of data using frequency tables',
      order: 1,
      estimatedTime: 25,
      introduction: [
        {
          id: 'ch3-st1-intro',
          type: 'text',
          title: 'The Mystery of the Missing Pencils',
          content: `<div class="space-y-4">
            <div class="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border-2 border-purple-200">
              <h3 class="text-xl font-bold mb-3">🔍 Investigate This!</h3>
              <p class="text-lg mb-4">The school store manager, Mrs. Sharma, is puzzled. She has this list of pencil sales from last week:</p>
              <div class="bg-white p-4 rounded-lg font-mono text-sm">
                <p>Red, Blue, Red, Red, Blue, Yellow, Red, Blue, Red, Red, Blue, Yellow, Red, Blue, Red, Yellow, Red, Blue, Red, Red, Blue, Yellow, Red, Blue, Red, Red, Blue, Red, Yellow, Red</p>
              </div>
              <div class="mt-4 p-4 bg-yellow-50 rounded-lg">
                <p class="font-semibold text-purple-800">❓ Can you help Mrs. Sharma answer:</p>
                <ul class="list-disc list-inside mt-2 space-y-1">
                  <li>Which color sold the most?</li>
                  <li>How many of each color were sold?</li>
                  <li>Is there a better way to show this information?</li>
                </ul>
              </div>
            </div>
            <p class="text-lg">Before we learn the formal method, try to count manually. Notice how difficult it is? That's why we need <strong>Frequency Tables</strong>!</p>
          </div>`,
          duration: 300
        }
      ],
      concepts: [
        {
          id: 'ch3-st1-c1',
          name: 'Frequency Tables and Tally Marks',
          description: 'Master the art of organizing data using tally marks and frequency tables',
          learningObjectives: [
            'Use tally marks to count data efficiently',
            'Create frequency tables from raw data',
            'Interpret information from frequency tables',
            'Calculate total frequencies'
          ],
          prerequisites: ['ch1-st1-c1'],
          difficulty: 'medium',
          estimatedTime: 20,
          theory: [
            {
              id: 'ch3-st1-c1-t1',
              type: 'text',
              title: 'What is a Frequency Table?',
              content: `<div class="space-y-6">
                <p class="text-lg">Now let's solve Mrs. Sharma's problem systematically!</p>
                
                <div class="bg-blue-50 p-6 rounded-lg">
                  <h3 class="text-2xl font-bold text-blue-800 mb-4">Step 1: Understand Tally Marks</h3>
                  <p class="mb-4">Tally marks are a quick way to count. We make a mark for each item:</p>
                  <div class="bg-white p-4 rounded-lg">
                    <table class="w-full">
                      <thead>
                        <tr class="border-b-2 border-blue-300">
                          <th class="text-left p-2">Number</th>
                          <th class="text-left p-2">Tally Marks</th>
                          <th class="text-left p-2">Why?</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="border-b border-blue-100">
                          <td class="p-2 font-bold">1</td>
                          <td class="p-2 text-2xl">|</td>
                          <td class="p-2">One line</td>
                        </tr>
                        <tr class="border-b border-blue-100">
                          <td class="p-2 font-bold">2</td>
                          <td class="p-2 text-2xl">||</td>
                          <td class="p-2">Two lines</td>
                        </tr>
                        <tr class="border-b border-blue-100">
                          <td class="p-2 font-bold">3</td>
                          <td class="p-2 text-2xl">|||</td>
                          <td class="p-2">Three lines</td>
                        </tr>
                        <tr class="border-b border-blue-100">
                          <td class="p-2 font-bold">4</td>
                          <td class="p-2 text-2xl">||||</td>
                          <td class="p-2">Four lines</td>
                        </tr>
                        <tr class="border-b border-blue-100">
                          <td class="p-2 font-bold">5</td>
                          <td class="p-2 text-2xl"><span style="text-decoration: line-through;">||||</span></td>
                          <td class="p-2">Five = Cross the 4th mark!</td>
                        </tr>
                        <tr class="border-b border-blue-100">
                          <td class="p-2 font-bold">6</td>
                          <td class="p-2 text-2xl"><span style="text-decoration: line-through;">||||</span> |</td>
                          <td class="p-2">Start a new group</td>
                        </tr>
                        <tr>
                          <td class="p-2 font-bold">7</td>
                          <td class="p-2 text-2xl"><span style="text-decoration: line-through;">||||</span> ||</td>
                          <td class="p-2">Continue...</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="mt-4 p-3 bg-yellow-100 rounded border-l-4 border-yellow-500">
                    <p class="font-semibold">💡 Pro Tip: We group by 5 because it's easy to count in 5s!</p>
                  </div>
                </div>

                <div class="bg-green-50 p-6 rounded-lg">
                  <h3 class="text-2xl font-bold text-green-800 mb-4">Step 2: Create a Frequency Table</h3>
                  <p class="mb-4">Let's organize the pencil data:</p>
                  
                  <table class="w-full bg-white rounded-lg overflow-hidden">
                    <thead class="bg-green-200">
                      <tr>
                        <th class="p-3 text-left">Pencil Color</th>
                        <th class="p-3 text-left">Tally Marks</th>
                        <th class="p-3 text-left">Frequency</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="border-b border-green-100">
                        <td class="p-3">Red</td>
                        <td class="p-3 text-lg"><span style="text-decoration: line-through;">||||</span> <span style="text-decoration: line-through;">||||</span> <span style="text-decoration: line-through;">||||</span> ||</td>
                        <td class="p-3 font-bold text-xl">17</td>
                      </tr>
                      <tr class="border-b border-green-100">
                        <td class="p-3">Blue</td>
                        <td class="p-3 text-lg"><span style="text-decoration: line-through;">||||</span> <span style="text-decoration: line-through;">||||</span></td>
                        <td class="p-3 font-bold text-xl">10</td>
                      </tr>
                      <tr class="border-b border-green-100">
                        <td class="p-3">Yellow</td>
                        <td class="p-3 text-lg">||||</td>
                        <td class="p-3 font-bold text-xl">4</td>
                      </tr>
                      <tr class="bg-green-100">
                        <td class="p-3 font-bold">Total</td>
                        <td class="p-3"></td>
                        <td class="p-3 font-bold text-xl">31</td>
                      </tr>
                    </tbody>
                  </table>

                  <div class="mt-4 p-4 bg-white rounded-lg">
                    <p class="font-semibold text-green-800 mb-2">Now Mrs. Sharma can easily see:</p>
                    <ul class="list-disc list-inside space-y-1">
                      <li>✓ Red pencils sold the most (17)</li>
                      <li>✓ Yellow sold the least (4)</li>
                      <li>✓ Total 31 pencils sold</li>
                      <li>✓ She should order more red pencils!</li>
                    </ul>
                  </div>
                </div>

                <div class="bg-purple-50 p-6 rounded-lg border-2 border-purple-300">
                  <h3 class="text-xl font-bold mb-3">📚 Key Definitions</h3>
                  <div class="space-y-3">
                    <div class="bg-white p-3 rounded">
                      <p class="font-semibold text-purple-800">Frequency:</p>
                      <p>The number of times something appears in the data</p>
                    </div>
                    <div class="bg-white p-3 rounded">
                      <p class="font-semibold text-purple-800">Frequency Table:</p>
                      <p>A table showing items and their frequencies</p>
                    </div>
                    <div class="bg-white p-3 rounded">
                      <p class="font-semibold text-purple-800">Tally Marks:</p>
                      <p>A counting system using lines, grouped in fives</p>
                    </div>
                  </div>
                </div>
              </div>`,
              duration: 480
            }
          ],
          examples: [
            {
              id: 'ch3-st1-c1-ex1',
              title: 'The Class Favorite Sport Survey',
              context: `Mr. Patel asked his class of 30 students: "What is your favorite sport?" He got these responses (in the order students answered):

Cricket, Football, Cricket, Badminton, Cricket, Football, Cricket, Hockey, Cricket, Football, Badminton, Cricket, Cricket, Football, Cricket, Badminton, Hockey, Cricket, Football, Cricket, Cricket, Badminton, Cricket, Football, Hockey, Cricket, Football, Cricket, Badminton, Cricket`,
              problem: `Create a frequency table to organize this data and answer: Which sport is most popular?`,
              solution: `<div class="space-y-4">
                <div class="bg-blue-50 p-4 rounded-lg">
                  <h4 class="font-bold mb-2">Step 1: List all different sports</h4>
                  <p>Cricket, Football, Badminton, Hockey</p>
                </div>

                <div class="bg-green-50 p-4 rounded-lg">
                  <h4 class="font-bold mb-2">Step 2: Make tally marks</h4>
                  <p class="text-sm mb-2">Go through the list and make a mark for each response:</p>
                  <table class="w-full bg-white rounded">
                    <thead class="bg-green-200">
                      <tr>
                        <th class="p-2 text-left">Sport</th>
                        <th class="p-2 text-left">Tally Marks</th>
                        <th class="p-2 text-left">Frequency</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="border-b">
                        <td class="p-2">Cricket</td>
                        <td class="p-2 text-lg"><span style="text-decoration: line-through;">||||</span> <span style="text-decoration: line-through;">||||</span> <span style="text-decoration: line-through;">||||</span> ||</td>
                        <td class="p-2 font-bold">17</td>
                      </tr>
                      <tr class="border-b">
                        <td class="p-2">Football</td>
                        <td class="p-2 text-lg"><span style="text-decoration: line-through;">||||</span> ||</td>
                        <td class="p-2 font-bold">7</td>
                      </tr>
                      <tr class="border-b">
                        <td class="p-2">Badminton</td>
                        <td class="p-2 text-lg"><span style="text-decoration: line-through;">||||</span></td>
                        <td class="p-2 font-bold">5</td>
                      </tr>
                      <tr class="border-b">
                        <td class="p-2">Hockey</td>
                        <td class="p-2 text-lg">|||</td>
                        <td class="p-2 font-bold">3</td>
                      </tr>
                      <tr class="bg-green-100">
                        <td class="p-2 font-bold">Total</td>
                        <td class="p-2"></td>
                        <td class="p-2 font-bold">32</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div class="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                  <h4 class="font-bold mb-2">Answer:</h4>
                  <p class="text-lg"><strong>Cricket</strong> is the most popular sport with 17 students choosing it.</p>
                </div>

                <div class="bg-purple-50 p-4 rounded-lg">
                  <h4 class="font-bold mb-2">Bonus Insights:</h4>
                  <ul class="list-disc list-inside space-y-1">
                    <li>More than half the class (17 out of 32) likes Cricket</li>
                    <li>Football is the second choice</li>
                    <li>Hockey is the least popular</li>
                    <li>If Mr. Patel plans a sports day, he should definitely include Cricket!</li>
                  </ul>
                </div>
              </div>`,
              steps: [
                'Identify all unique items (sports) in the data',
                'Create a table with columns: Item, Tally Marks, Frequency',
                'Go through data one by one, making tally marks',
                'Remember to group tally marks in fives',
                'Count tally marks to get frequency',
                'Add total at the bottom',
                'Analyze results to answer questions'
              ],
              relatedConcepts: ['ch4-st1-c1']
            }
          ],
          interactiveActivities: [
            {
              id: 'ch3-st1-c1-ia1',
              type: 'interactive',
              title: 'Tally Mark Practice Game',
              content: 'Practice creating frequency tables with real-time feedback!',
              duration: 420,
              metadata: {
                interactiveComponent: 'TallyMarkGame'
              }
            }
          ],
          assessmentQuestions: [
            {
              id: 'ch3-st1-c1-q1',
              conceptId: 'ch3-st1-c1',
              type: 'multiple-choice',
              difficulty: 'easy',
              question: `A fruit seller counted the fruits sold in one hour: Apple, Orange, Apple, Banana, Apple, Orange, Apple, Banana, Apple, Apple, Orange, Apple. How many apples were sold?`,
              options: ['5', '7', '8', '12'],
              correctAnswer: '7',
              explanation: `Let's count using tally marks for Apples:
              
Going through the list: Apple (1), Apple (2), Apple (3), Apple (4), Apple (5), Apple (6), Apple (7)

The correct answer is 7 apples.

You can verify by creating a complete frequency table:
- Apple: 7
- Orange: 3
- Banana: 2
Total: 12 fruits`,
              hints: [
                {
                  level: 1,
                  content: 'Try writing down tally marks as you go through the list. Make a mark each time you see "Apple".',
                  type: 'procedural'
                },
                {
                  level: 2,
                  content: 'Remember to group your tally marks in fives. This makes counting easier: |||| for 5, then start a new group.',
                  type: 'procedural'
                },
                {
                  level: 3,
                  content: 'Start counting: Apple is 1st, 3rd, 5th, 7th, 9th, 10th, 12th position. How many is that?',
                  type: 'example'
                },
                {
                  level: 4,
                  content: 'Count carefully through the list one more time, checking off each Apple. The answer is between 5 and 8.',
                  type: 'example'
                }
              ],
              commonErrors: [
                {
                  error: '8',
                  feedback: 'You counted one extra! Make sure you\'re counting only "Apple" and not similar fruits.',
                  remediation: 'ch3-st1-c1-t1'
                },
                {
                  error: '12',
                  feedback: 'This is the total number of ALL fruits, not just apples. We need to count only apples.',
                  remediation: 'ch3-st1-c1-t1'
                }
              ],
              estimatedTime: 60
            },
            {
              id: 'ch3-st1-c1-q2',
              conceptId: 'ch3-st1-c1',
              type: 'multiple-choice',
              difficulty: 'medium',
              question: `In a frequency table, the tally marks for "Red cars" are: |||| |||| |||. What is the frequency of red cars?`,
              options: ['10', '11', '12', '13'],
              correctAnswer: '13',
              explanation: `Let's count the tally marks group by group:

First group: |||| = 5 (the crossed line means 5)
Second group: |||| = 5 (another crossed group of 5)
Third group: ||| = 3 (three individual lines)

Total: 5 + 5 + 3 = 13 red cars

Remember: Each group of |||| (with the cross) equals 5. Then add any remaining individual marks.`,
              hints: [
                {
                  level: 1,
                  content: 'Remember that when we cross through four marks (||||), it represents the number 5, not 4!',
                  type: 'conceptual'
                },
                {
                  level: 2,
                  content: 'Count each complete group first. Each crossed group |||| equals 5. How many complete groups do you see?',
                  type: 'procedural'
                },
                {
                  level: 3,
                  content: 'You have 2 complete groups (2 × 5 = 10), plus 3 extra marks. What is 10 + 3?',
                  type: 'example'
                },
                {
                  level: 4,
                  content: 'First |||| = 5, Second |||| = 5, Last ||| = 3. Add them all together.',
                  type: 'example'
                }
              ],
              commonErrors: [
                {
                  error: '11',
                  feedback: 'Did you forget that a crossed group |||| means 5, not 4? The cross is the 5th mark!',
                  remediation: 'ch3-st1-c1-t1'
                },
                {
                  error: '10',
                  feedback: 'You counted the two complete groups correctly (10), but don\'t forget the 3 individual marks at the end!',
                  remediation: 'ch3-st1-c1-t1'
                }
              ],
              estimatedTime: 70
            },
            {
              id: 'ch3-st1-c1-q3',
              conceptId: 'ch3-st1-c1',
              type: 'multiple-choice',
              difficulty: 'hard',
              question: `A teacher recorded student absences for a week. Monday: 2, Tuesday: 5, Wednesday: 3, Thursday: 2, Friday: 6. If she makes a frequency table where the "item" is the number of absences and "frequency" is how many days had that many absences, what would be the frequency for "2 absences"?`,
              options: ['1', '2', '3', '4'],
              correctAnswer: '2',
              explanation: `This question tests your understanding of what frequency means!

We're NOT counting how many students were absent. We're counting how many DAYS had the same number of absences.

Let's organize:
- 2 absences happened on: Monday AND Thursday = 2 days
- 3 absences happened on: Wednesday = 1 day
- 5 absences happened on: Tuesday = 1 day
- 6 absences happened on: Friday = 1 day

The frequency table would be:
Number of Absences | Frequency (Number of Days)
2                  | 2
3                  | 1
5                  | 1
6                  | 1

So "2 absences" appeared on 2 different days, making its frequency 2.`,
              hints: [
                {
                  level: 1,
                  content: 'This is tricky! Read carefully: we\'re making a frequency table where the ITEM is "number of absences" and FREQUENCY is "how many days".',
                  type: 'conceptual'
                },
                {
                  level: 2,
                  content: 'Look for which days had exactly 2 absences. How many days fit this criterion?',
                  type: 'procedural'
                },
                {
                  level: 3,
                  content: 'Monday had 2 absences, Thursday also had 2 absences. That\'s 2 days with "2 absences".',
                  type: 'example'
                },
                {
                  level: 4,
                  content: 'Frequency means "how many times does this number appear?" The number 2 appears twice in the week\'s data (Monday and Thursday).',
                  type: 'example'
                }
              ],
              commonErrors: [
                {
                  error: '4',
                  feedback: 'You might be adding 2+2. But frequency asks: how many DAYS had 2 absences, not the total absences.',
                  remediation: 'ch3-st1-c1-t1'
                },
                {
                  error: '1',
                  feedback: 'There\'s more than one day with 2 absences! Check Monday and Thursday.',
                  remediation: 'ch3-st1-c1-t1'
                }
              ],
              estimatedTime: 90
            }
          ],
          practiceQuestions: [],
          remedialContent: [
            {
              id: 'ch3-st1-c1-r1',
              type: 'text',
              title: 'Complete Solution Guide: Understanding Frequency Tables',
              content: `<div class="space-y-6">
                <div class="bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-lg">
                  <h3 class="text-2xl font-bold mb-4">🎯 Step-by-Step: Creating Any Frequency Table</h3>
                  
                  <div class="space-y-4">
                    <div class="bg-white p-4 rounded-lg">
                      <h4 class="font-bold text-blue-700 mb-2">Step 1: Identify Your Data</h4>
                      <p>Write down or look at all your data points. Example:</p>
                      <p class="font-mono bg-gray-100 p-2 rounded mt-2">Red, Blue, Red, Yellow, Red, Blue, Red</p>
                    </div>

                    <div class="bg-white p-4 rounded-lg">
                      <h4 class="font-bold text-blue-700 mb-2">Step 2: Find Unique Items</h4>
                      <p>What are all the different types? Example:</p>
                      <p class="mt-2">Red, Blue, Yellow (3 unique items)</p>
                    </div>

                    <div class="bg-white p-4 rounded-lg">
                      <h4 class="font-bold text-blue-700 mb-2">Step 3: Draw Your Table</h4>
                      <table class="w-full mt-2 border">
                        <tr class="bg-gray-200">
                          <th class="border p-2">Item</th>
                          <th class="border p-2">Tally Marks</th>
                          <th class="border p-2">Frequency</th>
                        </tr>
                        <tr><td class="border p-2">Red</td><td class="border p-2"></td><td class="border p-2"></td></tr>
                        <tr><td class="border p-2">Blue</td><td class="border p-2"></td><td class="border p-2"></td></tr>
                        <tr><td class="border p-2">Yellow</td><td class="border p-2"></td><td class="border p-2"></td></tr>
                      </table>
                    </div>

                    <div class="bg-white p-4 rounded-lg">
                      <h4 class="font-bold text-blue-700 mb-2">Step 4: Make Tally Marks</h4>
                      <p>Go through your data ONE by ONE:</p>
                      <ul class="list-disc list-inside mt-2 space-y-1">
                        <li>Red → Make one mark in Red row: |</li>
                        <li>Blue → Make one mark in Blue row: |</li>
                        <li>Red → Add mark to Red row: ||</li>
                        <li>Yellow → Make one mark in Yellow row: |</li>
                        <li>Continue for all data...</li>
                      </ul>
                    </div>

                    <div class="bg-white p-4 rounded-lg">
                      <h4 class="font-bold text-blue-700 mb-2">Step 5: Remember the Rule of 5</h4>
                      <p>When you reach 4 marks, cross them with the 5th:</p>
                      <div class="text-2xl mt-2">
                        <p>1: |</p>
                        <p>2: ||</p>
                        <p>3: |||</p>
                        <p>4: ||||</p>
                        <p>5: <span style="text-decoration: line-through;">||||</span> ← Cross it!</p>
                        <p>6: <span style="text-decoration: line-through;">||||</span> | ← Start new group</p>
                      </div>
                    </div>

                    <div class="bg-white p-4 rounded-lg">
                      <h4 class="font-bold text-blue-700 mb-2">Step 6: Count for Frequency</h4>
                      <p>Each crossed group = 5, then add extra marks:</p>
                      <p class="mt-2"><span style="text-decoration: line-through;">||||</span> <span style="text-decoration: line-through;">||||</span> ||| = 5 + 5 + 3 = 13</p>
                    </div>
                  </div>
                </div>

                <div class="bg-yellow-50 p-6 rounded-lg border-2 border-yellow-400">
                  <h3 class="text-xl font-bold mb-3">⚠️ Common Mistakes to Avoid</h3>
                  <ul class="space-y-2">
                    <li class="flex items-start gap-2">
                      <span class="text-red-600 font-bold">✗</span>
                      <span>Forgetting that <span style="text-decoration: line-through;">||||</span> = 5, not 4</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="text-red-600 font-bold">✗</span>
                      <span>Not grouping in fives (makes counting harder)</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="text-red-600 font-bold">✗</span>
                      <span>Missing items when going through data</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="text-red-600 font-bold">✗</span>
                      <span>Confusing "frequency" with the item itself</span>
                    </li>
                  </ul>
                </div>

                <div class="bg-green-50 p-6 rounded-lg">
                  <h3 class="text-xl font-bold mb-3">✓ Practice Tips</h3>
                  <ul class="space-y-2">
                    <li>• Always start with listing unique items first</li>
                    <li>• Use a pencil so you can erase mistakes</li>
                    <li>• Check your work by counting total frequency = total data points</li>
                    <li>• Practice makes perfect - try with everyday data!</li>
                  </ul>
                </div>
              </div>`,
              duration: 420
            }
          ],
          masteryThreshold: 0.7,
          minCorrectAnswers: 2,
          maxHintUsage: 3
        }
      ],
      summary: []
    }
  ],
  introduction: [],
  realWorldApplications: [],
  finalAssessment: [],
  totalEstimatedTime: 300,
  prerequisites: ['Data types']
};

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
  subtopics: [],
  introduction: [],
  realWorldApplications: [],
  finalAssessment: [],
  totalEstimatedTime: 360,
  prerequisites: ['Frequency tables', 'Basic arithmetic']
};

export const chapter5: Chapter = {
  id: 'ch5',
  title: 'Representing Data Through Graphs',
  description: 'Visualize data using bar graphs, pie charts, and pictographs',
  gradeLevel: 7,
  learningOutcomes: [
    'Create and interpret bar graphs',
    'Draw and analyze pie charts',
    'Use pictographs effectively',
    'Choose appropriate graph type for data',
    'Extract insights from visual representations'
  ],
  subtopics: [],
  introduction: [],
  realWorldApplications: [],
  finalAssessment: [],
  totalEstimatedTime: 300,
  prerequisites: ['Frequency tables', 'Basic fractions and percentages']
};
