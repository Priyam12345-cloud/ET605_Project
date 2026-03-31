/**
 * Chapters 2 & 3: Data Collection and Frequency Distribution
 */

import { Chapter } from '../types/domain-model';

export const chapter2: Chapter = {
  id: 'ch2',
  title: 'Data Collection and Organization',
  description: 'Learning systematic methods to collect and organize data effectively',
  gradeLevel: 7,
  learningOutcomes: [
    'Understand different methods of data collection',
    'Learn to design effective surveys and questionnaires',
    'Organize raw data systematically',
    'Create data recording sheets',
    'Identify sources of data'
  ],
  subtopics: [
    {
      id: 'ch2-st1',
      name: 'Methods of Data Collection',
      description: 'Understanding how to gather data through different methods',
      order: 1,
      estimatedTime: 30,
      introduction: [
        {
          id: 'ch2-st1-intro',
          type: 'text',
          title: 'How Do We Collect Data?',
          content: `<div class="space-y-4">
            <p class="text-lg">Imagine you're a detective trying to solve a mystery! You need clues (data), but how do you get them? Just like detectives have different methods to gather evidence, we have different methods to collect data.</p>
            <p>Let's explore the main ways to collect data!</p>
          </div>`,
          duration: 120
        }
      ],
      concepts: [
        {
          id: 'ch2-st1-c1',
          name: 'Surveys and Questionnaires',
          description: 'Collecting data by asking questions',
          learningObjectives: [
            'Understand what surveys are',
            'Design effective questions',
            'Conduct surveys properly'
          ],
          prerequisites: ['ch1-st1-c1'],
          difficulty: 'medium',
          estimatedTime: 20,
          theory: [
            {
              id: 'ch2-st1-c1-t1',
              type: 'text',
              title: 'Surveys: Asking the Right Questions',
              content: `<div class="space-y-6">
                <h3 class="text-2xl font-bold">What is a Survey?</h3>
                <p class="text-lg">A survey is a method of collecting data by asking people questions. It's like being a reporter - you ask questions to get information!</p>
                
                <div class="bg-purple-50 p-6 rounded-lg">
                  <h4 class="text-xl font-semibold mb-4">Types of Survey Questions:</h4>
                  
                  <div class="space-y-4">
                    <div class="bg-white p-4 rounded border-l-4 border-blue-500">
                      <h5 class="font-bold text-blue-700">1. Closed Questions</h5>
                      <p class="mt-2">Questions with specific answer choices</p>
                      <div class="mt-2 bg-blue-50 p-3 rounded">
                        <p class="font-semibold">Example:</p>
                        <p>What is your favorite sport?</p>
                        <p class="ml-4">□ Cricket □ Football □ Basketball □ Badminton</p>
                      </div>
                      <p class="mt-2 text-sm"><strong>Best for:</strong> Easy counting and comparison</p>
                    </div>
                    
                    <div class="bg-white p-4 rounded border-l-4 border-green-500">
                      <h5 class="font-bold text-green-700">2. Open Questions</h5>
                      <p class="mt-2">Questions where people can write any answer</p>
                      <div class="mt-2 bg-green-50 p-3 rounded">
                        <p class="font-semibold">Example:</p>
                        <p>Why do you like sports?</p>
                        <p class="ml-4">Answer: _________________</p>
                      </div>
                      <p class="mt-2 text-sm"><strong>Best for:</strong> Detailed opinions and reasons</p>
                    </div>
                    
                    <div class="bg-white p-4 rounded border-l-4 border-orange-500">
                      <h5 class="font-bold text-orange-700">3. Rating Scale Questions</h5>
                      <p class="mt-2">Questions where people rate on a scale</p>
                      <div class="mt-2 bg-orange-50 p-3 rounded">
                        <p class="font-semibold">Example:</p>
                        <p>How much do you enjoy mathematics?</p>
                        <p class="ml-4">1 (Not at all) - 2 - 3 - 4 - 5 (Very much)</p>
                      </div>
                      <p class="mt-2 text-sm"><strong>Best for:</strong> Measuring intensity of feelings</p>
                    </div>
                  </div>
                </div>
                
                <div class="bg-yellow-50 p-6 rounded-lg border-2 border-yellow-400">
                  <h4 class="text-xl font-semibold mb-3">Rules for Good Survey Questions:</h4>
                  <ul class="space-y-2">
                    <li class="flex items-start">
                      <span class="text-green-600 font-bold mr-2">✓</span>
                      <span><strong>Clear and Simple:</strong> Use easy words everyone understands</span>
                    </li>
                    <li class="flex items-start">
                      <span class="text-green-600 font-bold mr-2">✓</span>
                      <span><strong>One Topic at a Time:</strong> Don't ask two things in one question</span>
                    </li>
                    <li class="flex items-start">
                      <span class="text-green-600 font-bold mr-2">✓</span>
                      <span><strong>Not Leading:</strong> Don't hint at what answer you want</span>
                    </li>
                    <li class="flex items-start">
                      <span class="text-green-600 font-bold mr-2">✓</span>
                      <span><strong>Relevant:</strong> Ask questions that matter to your topic</span>
                    </li>
                    <li class="flex items-start">
                      <span class="text-red-600 font-bold mr-2">✗</span>
                      <span><strong>Bad Example:</strong> "Don't you think homework is bad?" (Leading question!)</span>
                    </li>
                    <li class="flex items-start">
                      <span class="text-green-600 font-bold mr-2">✓</span>
                      <span><strong>Good Example:</strong> "What is your opinion on homework?" (Neutral!)</span>
                    </li>
                  </ul>
                </div>
              </div>`,
              duration: 420
            }
          ],
          examples: [
            {
              id: 'ch2-st1-c1-ex1',
              title: 'Planning the School Carnival',
              context: `The student council wants to plan an awesome school carnival! They need to know what activities students would enjoy. Priya and her team decide to create a survey to collect this data.`,
              problem: `Help Priya design a good survey to find out:
1. What activities students want
2. When they prefer the carnival
3. How much they're willing to spend on tickets

What types of questions should she ask?`,
              solution: `<div class="space-y-4">
                <p class="font-semibold text-lg">Here's a well-designed survey:</p>
                
                <div class="bg-gray-50 p-4 rounded">
                  <p class="font-bold mb-3">School Carnival Survey</p>
                  
                  <div class="space-y-4">
                    <div>
                      <p class="font-semibold">Question 1 (Closed Question - Multiple Choice):</p>
                      <p>Which activities would you like at the carnival? (Select all that apply)</p>
                      <p class="ml-4">□ Games stall  □ Food stalls  □ Magic show  □ Music performance  □ Art corner</p>
                      <p class="text-sm italic mt-1">Why this works: Easy to count preferences!</p>
                    </div>
                    
                    <div>
                      <p class="font-semibold">Question 2 (Closed Question - Single Choice):</p>
                      <p>When should we hold the carnival?</p>
                      <p class="ml-4">○ Saturday morning  ○ Saturday evening  ○ Sunday morning  ○ Sunday evening</p>
                      <p class="text-sm italic mt-1">Why this works: Clear options to choose from!</p>
                    </div>
                    
                    <div>
                      <p class="font-semibold">Question 3 (Rating Scale):</p>
                      <p>How much would you spend on carnival tickets?</p>
                      <p class="ml-4">○ ₹0-50  ○ ₹51-100  ○ ₹101-150  ○ More than ₹150</p>
                      <p class="text-sm italic mt-1">Why this works: Gives a range of budget options!</p>
                    </div>
                    
                    <div>
                      <p class="font-semibold">Question 4 (Open Question):</p>
                      <p>Any other suggestions for making the carnival fun?</p>
                      <p class="ml-4">Answer: _________________________</p>
                      <p class="text-sm italic mt-1">Why this works: Allows creative ideas!</p>
                    </div>
                  </div>
                </div>
                
                <div class="bg-green-50 p-4 rounded">
                  <p class="font-semibold">Why this survey works:</p>
                  <ul class="list-disc list-inside mt-2 space-y-1">
                    <li>Questions are clear and simple</li>
                    <li>Mix of closed and open questions</li>
                    <li>Each question has a specific purpose</li>
                    <li>Easy for students to answer</li>
                    <li>Easy for Priya to analyze the results</li>
                  </ul>
                </div>
              </div>`,
              steps: [
                'Identify what information you need',
                'Choose appropriate question types',
                'Write clear, simple questions',
                'Provide relevant answer options',
                'Test the survey on a few people first',
                'Make changes if questions are confusing'
              ],
              relatedConcepts: ['ch2-st1-c2']
            }
          ],
          interactiveActivities: [
            {
              id: 'ch2-st1-c1-ia1',
              type: 'interactive',
              title: 'Survey Builder Game',
              content: 'Design your own survey and see how good your questions are!',
              duration: 480,
              metadata: {
                interactiveComponent: 'SurveyBuilder'
              }
            }
          ],
          assessmentQuestions: [
            {
              id: 'ch2-st1-c1-q1',
              conceptId: 'ch2-st1-c1',
              type: 'multiple-choice',
              difficulty: 'medium',
              question: 'Which is the BEST survey question to find out students\' favorite lunch item?',
              options: [
                'You like pizza, right?',
                'What is your favorite lunch item?',
                'Don\'t you think burgers are the best lunch?',
                'Everyone loves sandwiches, don\'t they?'
              ],
              correctAnswer: 'What is your favorite lunch item?',
              explanation: 'This is the best question because it is neutral and doesn\'t lead the person toward any particular answer. The other options are leading questions that suggest a specific answer.',
              hints: [
                {
                  level: 1,
                  content: 'Good survey questions should be neutral - they shouldn\'t hint at any particular answer',
                  type: 'conceptual'
                },
                {
                  level: 2,
                  content: 'Look for the question that doesn\'t suggest what the answer should be',
                  type: 'conceptual'
                },
                {
                  level: 3,
                  content: 'Questions starting with "Don\'t you think..." or "You like... right?" are leading questions',
                  type: 'example'
                }
              ],
              commonErrors: [],
              estimatedTime: 60
            },
            {
              id: 'ch2-st1-c1-q2',
              conceptId: 'ch2-st1-c1',
              type: 'multiple-choice',
              difficulty: 'medium',
              question: 'What type of question is this: "How many hours do you study each day?"',
              options: [
                'Open question',
                'Closed question with specific choices',
                'Rating scale question',
                'Open question expecting a number'
              ],
              correctAnswer: 'Open question expecting a number',
              explanation: 'This is an open question because the person can write any numerical answer (1 hour, 2.5 hours, etc.). While it expects a number, there are no preset options to choose from.',
              hints: [
                {
                  level: 1,
                  content: 'Does this question give you specific options to choose from?',
                  type: 'conceptual'
                },
                {
                  level: 2,
                  content: 'If someone can write any answer they want, what type of question is it?',
                  type: 'conceptual'
                }
              ],
              commonErrors: [],
              estimatedTime: 55
            }
          ],
          practiceQuestions: [],
          remedialContent: [
            {
              id: 'ch2-st1-c1-r1',
              type: 'text',
              title: 'Quick Review: Survey Questions',
              content: `<div class="space-y-4">
                <div class="bg-blue-100 p-4 rounded">
                  <p class="font-bold">Remember the Three Types:</p>
                  <ul class="list-disc list-inside mt-2">
                    <li><strong>Closed:</strong> Give specific choices → Easy to count</li>
                    <li><strong>Open:</strong> Any answer allowed → Get detailed info</li>
                    <li><strong>Rating:</strong> Scale from low to high → Measure feelings</li>
                  </ul>
                </div>
                <div class="bg-green-100 p-4 rounded">
                  <p class="font-bold">Golden Rule:</p>
                  <p>Make questions simple, clear, and fair (not leading)!</p>
                </div>
              </div>`,
              duration: 180
            }
          ],
          masteryThreshold: 0.75,
          minCorrectAnswers: 2,
          maxHintUsage: 2
        },
        {
          id: 'ch2-st1-c2',
          name: 'Observation Method',
          description: 'Collecting data by watching and recording',
          learningObjectives: [
            'Understand observational data collection',
            'Learn to record observations systematically',
            'Identify when observation is the best method'
          ],
          prerequisites: ['ch2-st1-c1'],
          difficulty: 'easy',
          estimatedTime: 15,
          theory: [
            {
              id: 'ch2-st1-c2-t1',
              type: 'text',
              title: 'Learning Through Observation',
              content: `<div class="space-y-6">
                <p class="text-lg">Sometimes the best way to collect data is simply to watch and record what you see! This is called the <strong>observation method</strong>.</p>
                
                <div class="bg-blue-50 p-6 rounded-lg">
                  <h3 class="text-xl font-bold mb-4">What is Observation?</h3>
                  <p class="text-lg">Observation means watching things carefully and recording what you see without asking questions or interfering.</p>
                  
                  <div class="mt-4 bg-white p-4 rounded">
                    <p class="font-semibold mb-2">Think of it like:</p>
                    <ul class="list-disc list-inside space-y-1">
                      <li>A birdwatcher recording what birds do</li>
                      <li>A scientist watching how plants grow</li>
                      <li>Counting cars passing on a road</li>
                      <li>Recording the weather each day</li>
                    </ul>
                  </div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="bg-green-50 p-4 rounded-lg">
                    <h4 class="font-bold text-green-800 mb-2">✓ Good for Observation:</h4>
                    <ul class="list-disc list-inside space-y-1">
                      <li>Traffic patterns</li>
                      <li>Animal behavior</li>
                      <li>Weather conditions</li>
                      <li>Plant growth</li>
                      <li>People's behavior in public</li>
                    </ul>
                  </div>
                  
                  <div class="bg-red-50 p-4 rounded-lg">
                    <h4 class="font-bold text-red-800 mb-2">✗ Not good for Observation:</h4>
                    <ul class="list-disc list-inside space-y-1">
                      <li>People's opinions</li>
                      <li>Personal preferences</li>
                      <li>Past experiences</li>
                      <li>Future plans</li>
                      <li>Feelings and emotions</li>
                    </ul>
                  </div>
                </div>
                
                <div class="bg-yellow-50 p-6 rounded-lg border-2 border-yellow-400">
                  <h4 class="text-xl font-semibold mb-3">Tips for Good Observation:</h4>
                  <ol class="list-decimal list-inside space-y-2">
                    <li><strong>Be Patient:</strong> Sometimes you need to wait for things to happen</li>
                    <li><strong>Be Accurate:</strong> Record exactly what you see, not what you think</li>
                    <li><strong>Be Systematic:</strong> Use a chart or table to record regularly</li>
                    <li><strong>Don't Interfere:</strong> Just watch, don't change what's happening</li>
                    <li><strong>Record Immediately:</strong> Write it down right away so you don't forget</li>
                  </ol>
                </div>
              </div>`,
              duration: 360
            }
          ],
          examples: [
            {
              id: 'ch2-st1-c2-ex1',
              title: 'The Traffic Study',
              context: `The city council wants to know if they need a traffic light at a busy intersection near a school. They ask Amit, a responsible Grade 7 student, to help collect data by observing the traffic during school hours for one week.`,
              problem: `How should Amit collect this data using the observation method?`,
              solution: `<div class="space-y-4">
                <p class="font-semibold text-lg">Amit's Observation Plan:</p>
                
                <div class="bg-gray-50 p-4 rounded">
                  <p class="font-bold mb-3">Observation Data Sheet</p>
                  
                  <table class="w-full border-collapse border border-gray-300 mt-3">
                    <thead class="bg-gray-200">
                      <tr>
                        <th class="border border-gray-300 p-2">Day</th>
                        <th class="border border-gray-300 p-2">Time</th>
                        <th class="border border-gray-300 p-2">Cars</th>
                        <th class="border border-gray-300 p-2">Bikes</th>
                        <th class="border border-gray-300 p-2">Pedestrians</th>
                        <th class="border border-gray-300 p-2">Near-misses</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="border border-gray-300 p-2">Monday</td>
                        <td class="border border-gray-300 p-2">8:00-8:30 AM</td>
                        <td class="border border-gray-300 p-2">45</td>
                        <td class="border border-gray-300 p-2">23</td>
                        <td class="border border-gray-300 p-2">67</td>
                        <td class="border border-gray-300 p-2">3</td>
                      </tr>
                      <tr>
                        <td class="border border-gray-300 p-2">Tuesday</td>
                        <td class="border border-gray-300 p-2">8:00-8:30 AM</td>
                        <td class="border border-gray-300 p-2">48</td>
                        <td class="border border-gray-300 p-2">21</td>
                        <td class="border border-gray-300 p-2">71</td>
                        <td class="border border-gray-300 p-2">2</td>
                      </tr>
                      <tr>
                        <td colspan="6" class="border border-gray-300 p-2 text-center italic">...continues for full week</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div class="bg-green-50 p-4 rounded">
                  <p class="font-semibold">Why this is good observation:</p>
                  <ul class="list-disc list-inside mt-2 space-y-1">
                    <li><strong>Systematic:</strong> Same time every day, using a table</li>
                    <li><strong>Consistent:</strong> Recording the same things each time</li>
                    <li><strong>Accurate:</strong> Counting actual vehicles and people</li>
                    <li><strong>Non-intrusive:</strong> Just watching, not stopping traffic</li>
                    <li><strong>Relevant:</strong> Collecting data that helps answer the question about needing a traffic light</li>
                  </ul>
                </div>
                
                <div class="bg-blue-50 p-4 rounded">
                  <p class="font-semibold">What the data shows:</p>
                  <p class="mt-2">After one week, Amit can show the city council:</p>
                  <ul class="list-disc list-inside mt-2">
                    <li>Total number of vehicles and pedestrians</li>
                    <li>Peak traffic times</li>
                    <li>Number of dangerous situations</li>
                    <li>This evidence helps them make a decision!</li>
                  </ul>
                </div>
              </div>`,
              steps: [
                'Decide what to observe (vehicles, pedestrians, incidents)',
                'Create a recording sheet with clear categories',
                'Observe at the same time each day for consistency',
                'Record data immediately and accurately',
                'Continue for enough time to see patterns (one week)',
                'Analyze the collected data'
              ],
              relatedConcepts: ['ch2-st2-c1']
            }
          ],
          interactiveActivities: [
            {
              id: 'ch2-st1-c2-ia1',
              type: 'game',
              title: 'Observation Challenge',
              content: 'Practice your observation skills with timed challenges!',
              duration: 360,
              metadata: {
                interactiveComponent: 'ObservationGame'
              }
            }
          ],
          assessmentQuestions: [
            {
              id: 'ch2-st1-c2-q1',
              conceptId: 'ch2-st1-c2',
              type: 'multiple-choice',
              difficulty: 'easy',
              question: 'Which of these can be BEST studied using the observation method?',
              options: [
                'What people think about a movie',
                'How many birds visit a bird feeder each hour',
                'Students\' favorite colors',
                'Reasons why people like ice cream'
              ],
              correctAnswer: 'How many birds visit a bird feeder each hour',
              explanation: 'The number of birds visiting can be counted by watching and recording. The other options require asking people about their thoughts, opinions, or preferences, which need surveys instead.',
              hints: [
                {
                  level: 1,
                  content: 'Observation is about watching and counting things you can see',
                  type: 'conceptual'
                },
                {
                  level: 2,
                  content: 'You can\'t observe people\'s thoughts or preferences - you need to ask them',
                  type: 'conceptual'
                }
              ],
              commonErrors: [],
              estimatedTime: 45
            }
          ],
          practiceQuestions: [],
          remedialContent: [],
          masteryThreshold: 0.7,
          minCorrectAnswers: 1,
          maxHintUsage: 2
        }
      ],
      summary: []
    }
  ],
  introduction: [
    {
      id: 'ch2-intro1',
      type: 'text',
      title: 'Why Data Collection Matters',
      content: `<div class="space-y-4">
        <p class="text-lg">Before we can analyze data or make charts, we need to <strong>collect</strong> it properly! Good data collection is like being a detective - you need the right tools and methods to gather accurate clues.</p>
        <p>In this chapter, you'll learn how to collect data like a pro!</p>
      </div>`,
      duration: 120
    }
  ],
  realWorldApplications: [],
  finalAssessment: [],
  totalEstimatedTime: 240,
  prerequisites: ['Understanding of data types']
};

export const chapter3: Chapter = {
  id: 'ch3',
  title: 'Frequency Distribution and Tally Marks',
  description: 'Organizing data into frequency tables and using tally marks for counting',
  gradeLevel: 7,
  learningOutcomes: [
    'Create and interpret frequency tables',
    'Use tally marks effectively',
    'Calculate frequency and cumulative frequency',
    'Organize large datasets',
    'Identify patterns in frequency distribution'
  ],
  subtopics: [],
  introduction: [],
  realWorldApplications: [],
  finalAssessment: [],
  totalEstimatedTime: 300,
  prerequisites: ['Data collection methods']
};