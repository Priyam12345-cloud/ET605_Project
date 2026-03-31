/**
 * Chapter 5: Representing Data Through Graphs
 * Complete content for Bar Charts, Pie Charts, and other visualizations
 */

import { Chapter } from '../types/domain-model';

export const chapter5: Chapter = {
  id: 'ch5',
  title: 'Representing Data Through Graphs',
  description: 'Visualize data using bar graphs, pie charts, and other graphical representations',
  gradeLevel: 7,
  learningOutcomes: [
    'Create and interpret bar graphs',
    'Draw and analyze pie charts',
    'Choose appropriate graph type for data',
    'Extract insights from visual representations',
    'Compare different types of graphs'
  ],
  subtopics: [
    {
      id: 'ch5-st1',
      name: 'Bar Graphs',
      description: 'Learn to create and interpret bar graphs for comparing categories',
      order: 1,
      estimatedTime: 30,
      introduction: [
        {
          id: 'ch5-st1-intro',
          type: 'text',
          title: 'The Visual Story of Data',
          content: `<div class="space-y-4">
            <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border-2 border-blue-200">
              <h3 class="text-xl font-bold mb-3">📊 A Picture is Worth a Thousand Numbers!</h3>
              <p class="text-lg mb-4">Imagine you conducted a survey about favorite fruits in your class:</p>
              
              <div class="bg-white p-4 rounded-lg mb-4">
                <table class="w-full">
                  <thead class="bg-gray-200">
                    <tr>
                      <th class="p-2 text-left">Fruit</th>
                      <th class="p-2 text-left">Number of Students</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="border-b"><td class="p-2">Apple</td><td class="p-2">12</td></tr>
                    <tr class="border-b"><td class="p-2">Banana</td><td class="p-2">18</td></tr>
                    <tr class="border-b"><td class="p-2">Mango</td><td class="p-2">15</td></tr>
                    <tr><td class="p-2">Orange</td><td class="p-2">8</td></tr>
                  </tbody>
                </table>
              </div>

              <div class="mt-4 p-4 bg-yellow-50 rounded-lg">
                <p class="font-semibold text-indigo-800">❓ Quick Question:</p>
                <p class="mt-2">Can you instantly see which fruit is most popular? Or do you have to read and compare numbers?</p>
                <p class="mt-3 font-semibold">Now imagine the same data as colorful bars of different heights - INSTANT understanding!</p>
              </div>
            </div>
            <p class="text-lg">That's the power of <strong>BAR GRAPHS</strong> - they turn numbers into visual stories!</p>
          </div>`,
          duration: 240
        }
      ],
      concepts: [
        {
          id: 'ch5-st1-c1',
          name: 'Creating Bar Graphs',
          description: 'Learn to construct accurate and effective bar graphs',
          learningObjectives: [
            'Understand parts of a bar graph',
            'Choose appropriate scale',
            'Draw bars correctly',
            'Label graphs properly'
          ],
          prerequisites: ['ch3-st1-c1'],
          difficulty: 'medium',
          estimatedTime: 25,
          theory: [
            {
              id: 'ch5-st1-c1-t1',
              type: 'text',
              title: 'Anatomy of a Bar Graph',
              content: `<div class="space-y-6">
                <div class="bg-blue-50 p-6 rounded-lg">
                  <h3 class="text-2xl font-bold text-blue-800 mb-4">Parts of a Bar Graph</h3>
                  
                  <div class="bg-white p-6 rounded-lg border-2 border-blue-300">
                    <div class="space-y-4">
                      <div class="flex items-start gap-3">
                        <span class="text-2xl">1️⃣</span>
                        <div>
                          <p class="font-bold text-blue-700">Title</p>
                          <p>Tells what the graph is about</p>
                          <p class="text-sm text-gray-600">Example: "Favorite Fruits in Class 7A"</p>
                        </div>
                      </div>

                      <div class="flex items-start gap-3">
                        <span class="text-2xl">2️⃣</span>
                        <div>
                          <p class="font-bold text-blue-700">X-axis (Horizontal)</p>
                          <p>Shows categories or items being compared</p>
                          <p class="text-sm text-gray-600">Example: Apple, Banana, Mango, Orange</p>
                        </div>
                      </div>

                      <div class="flex items-start gap-3">
                        <span class="text-2xl">3️⃣</span>
                        <div>
                          <p class="font-bold text-blue-700">Y-axis (Vertical)</p>
                          <p>Shows the quantity or frequency</p>
                          <p class="text-sm text-gray-600">Example: Number of Students (0, 5, 10, 15, 20...)</p>
                        </div>
                      </div>

                      <div class="flex items-start gap-3">
                        <span class="text-2xl">4️⃣</span>
                        <div>
                          <p class="font-bold text-blue-700">Bars</p>
                          <p>Height represents the value</p>
                          <p class="text-sm text-gray-600">All bars should have the same width and equal spacing</p>
                        </div>
                      </div>

                      <div class="flex items-start gap-3">
                        <span class="text-2xl">5️⃣</span>
                        <div>
                          <p class="font-bold text-blue-700">Scale</p>
                          <p>The intervals on the Y-axis</p>
                          <p class="text-sm text-gray-600">Should be equal (like 0, 5, 10, 15...)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="bg-green-50 p-6 rounded-lg">
                  <h3 class="text-2xl font-bold text-green-800 mb-4">Step-by-Step: Drawing a Bar Graph</h3>
                  
                  <div class="space-y-4">
                    <div class="bg-white p-4 rounded-lg">
                      <h4 class="font-bold text-green-700 mb-2">Step 1: Draw and Label Axes</h4>
                      <ul class="list-disc list-inside ml-4 space-y-1">
                        <li>Draw horizontal line (X-axis)</li>
                        <li>Draw vertical line (Y-axis)</li>
                        <li>Label X-axis with what you're comparing</li>
                        <li>Label Y-axis with what you're measuring</li>
                      </ul>
                    </div>

                    <div class="bg-white p-4 rounded-lg">
                      <h4 class="font-bold text-green-700 mb-2">Step 2: Choose the Scale</h4>
                      <p class="mb-2">Look at your highest value and decide intervals:</p>
                      <div class="ml-4 space-y-1">
                        <p>• If highest value is 20 → Use scale of 5 (0, 5, 10, 15, 20...)</p>
                        <p>• If highest value is 100 → Use scale of 10 or 20</p>
                        <p>• Make sure scale goes slightly above highest value</p>
                      </div>
                      <div class="mt-3 p-3 bg-yellow-100 rounded">
                        <p class="font-semibold text-sm">💡 Scale must be uniform! If you start with 5, keep adding 5 (not 5, 7, 12...)</p>
                      </div>
                    </div>

                    <div class="bg-white p-4 rounded-lg">
                      <h4 class="font-bold text-green-700 mb-2">Step 3: Mark Categories on X-axis</h4>
                      <p>Write each category (Apple, Banana, etc.) with equal spacing</p>
                    </div>

                    <div class="bg-white p-4 rounded-lg">
                      <h4 class="font-bold text-green-700 mb-2">Step 4: Draw the Bars</h4>
                      <ul class="list-disc list-inside ml-4 space-y-1">
                        <li>For each category, draw a bar to the correct height</li>
                        <li>All bars should have same width</li>
                        <li>Leave equal space between bars</li>
                        <li>Bars should NOT touch each other</li>
                      </ul>
                    </div>

                    <div class="bg-white p-4 rounded-lg">
                      <h4 class="font-bold text-green-700 mb-2">Step 5: Add Title</h4>
                      <p>Write a clear title at the top describing the graph</p>
                    </div>
                  </div>

                  <div class="mt-4 p-4 bg-green-200 rounded-lg border-2 border-green-400">
                    <p class="font-bold">✓ Check Your Work:</p>
                    <ul class="mt-2 space-y-1">
                      <li>✓ Both axes labeled?</li>
                      <li>✓ Scale is uniform?</li>
                      <li>✓ Bars are same width?</li>
                      <li>✓ Title is clear?</li>
                    </ul>
                  </div>
                </div>

                <div class="bg-purple-50 p-6 rounded-lg">
                  <h3 class="text-xl font-bold mb-3">📝 Example: Ice Cream Sales</h3>
                  <p class="mb-3">An ice cream shop sold these flavors last week:</p>
                  <table class="w-full bg-white rounded mb-4">
                    <thead class="bg-purple-200">
                      <tr>
                        <th class="p-2 text-left">Flavor</th>
                        <th class="p-2 text-left">Scoops Sold</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="border-b"><td class="p-2">Vanilla</td><td class="p-2">45</td></tr>
                      <tr class="border-b"><td class="p-2">Chocolate</td><td class="p-2">60</td></tr>
                      <tr class="border-b"><td class="p-2">Strawberry</td><td class="p-2">30</td></tr>
                      <tr><td class="p-2">Mango</td><td class="p-2">25</td></tr>
                    </tbody>
                  </table>

                  <div class="bg-white p-4 rounded">
                    <p class="font-semibold mb-2">For this data:</p>
                    <ul class="list-disc list-inside ml-4 space-y-1">
                      <li><strong>Title:</strong> "Ice Cream Sales Last Week"</li>
                      <li><strong>X-axis:</strong> Flavors (Vanilla, Chocolate, Strawberry, Mango)</li>
                      <li><strong>Y-axis:</strong> Number of Scoops Sold</li>
                      <li><strong>Scale:</strong> 0, 10, 20, 30, 40, 50, 60, 70 (intervals of 10)</li>
                      <li><strong>Highest bar:</strong> Chocolate (60)</li>
                      <li><strong>Shortest bar:</strong> Mango (25)</li>
                    </ul>
                  </div>
                </div>

                <div class="bg-red-50 p-6 rounded-lg border-2 border-red-300">
                  <h3 class="text-xl font-bold mb-3 text-red-800">⚠️ Common Mistakes to Avoid</h3>
                  <div class="space-y-2">
                    <div class="flex items-start gap-2">
                      <span class="text-red-600 font-bold">✗</span>
                      <span>Starting Y-axis from a high number instead of 0 (misleading!)</span>
                    </div>
                    <div class="flex items-start gap-2">
                      <span class="text-red-600 font-bold">✗</span>
                      <span>Making bars different widths</span>
                    </div>
                    <div class="flex items-start gap-2">
                      <span class="text-red-600 font-bold">✗</span>
                      <span>Using unequal scale intervals (0, 5, 12, 25...)</span>
                    </div>
                    <div class="flex items-start gap-2">
                      <span class="text-red-600 font-bold">✗</span>
                      <span>Forgetting to label axes or add title</span>
                    </div>
                    <div class="flex items-start gap-2">
                      <span class="text-red-600 font-bold">✗</span>
                      <span>Making bars touch each other</span>
                    </div>
                  </div>
                </div>

                <div class="bg-yellow-50 p-6 rounded-lg">
                  <h3 class="text-xl font-bold mb-3">🎯 Quick Reading Tips</h3>
                  <p class="mb-3">When you see a bar graph, quickly identify:</p>
                  <ul class="space-y-2">
                    <li><strong>Tallest bar</strong> = Highest value = Most popular/frequent</li>
                    <li><strong>Shortest bar</strong> = Lowest value = Least popular/frequent</li>
                    <li><strong>Compare heights</strong> = See differences easily</li>
                    <li><strong>Look for patterns</strong> = Are values increasing? Decreasing? Random?</li>
                  </ul>
                </div>
              </div>`,
              duration: 540
            }
          ],
          examples: [
            {
              id: 'ch5-st1-c1-ex1',
              title: 'The School Book Fair',
              context: `The school librarian recorded book sales during the annual book fair. Here's what sold:
              
- Fiction: 85 books
- Science: 45 books  
- History: 30 books
- Comics: 95 books
- Biography: 25 books

She wants to create a bar graph to present to the principal.`,
              problem: `How should she create the bar graph? What insights can be drawn?`,
              solution: `<div class="space-y-4">
                <div class="bg-blue-50 p-4 rounded-lg">
                  <h4 class="font-bold mb-3">Creating the Graph:</h4>
                  
                  <div class="space-y-3">
                    <div class="bg-white p-3 rounded">
                      <p class="font-semibold">1. Title:</p>
                      <p>"Book Sales at School Fair"</p>
                    </div>

                    <div class="bg-white p-3 rounded">
                      <p class="font-semibold">2. X-axis Label:</p>
                      <p>"Book Categories"</p>
                      <p class="text-sm text-gray-600">Categories: Fiction, Science, History, Comics, Biography</p>
                    </div>

                    <div class="bg-white p-3 rounded">
                      <p class="font-semibold">3. Y-axis Label:</p>
                      <p>"Number of Books Sold"</p>
                    </div>

                    <div class="bg-white p-3 rounded">
                      <p class="font-semibold">4. Choose Scale:</p>
                      <p>Highest value = 95 (Comics)</p>
                      <p>Good scale: 0, 20, 40, 60, 80, 100 (intervals of 20)</p>
                      <p class="text-sm text-gray-600 mt-1">Why 20? Because 95 ÷ 20 ≈ 5 divisions, which fits nicely</p>
                    </div>

                    <div class="bg-white p-3 rounded">
                      <p class="font-semibold">5. Bar Heights:</p>
                      <ul class="ml-4 mt-2 space-y-1">
                        <li>Fiction: 85 (slightly below 100 mark)</li>
                        <li>Science: 45 (just above 40 mark)</li>
                        <li>History: 30 (between 20 and 40)</li>
                        <li>Comics: 95 (almost at 100 mark) - TALLEST</li>
                        <li>Biography: 25 (between 20 and 40) - SHORTEST</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="bg-green-50 p-4 rounded-lg">
                  <h4 class="font-bold text-green-800 mb-3">Insights from the Graph:</h4>
                  <ul class="space-y-2">
                    <li class="flex items-start gap-2">
                      <span class="text-green-600 font-bold">📊</span>
                      <span><strong>Most Popular:</strong> Comics (95 books) - Students love visual storytelling!</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="text-green-600 font-bold">📊</span>
                      <span><strong>Second Popular:</strong> Fiction (85 books) - Close behind comics</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="text-green-600 font-bold">📊</span>
                      <span><strong>Least Popular:</strong> Biography (25 books) - Only about 1/4 of comic sales</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="text-green-600 font-bold">📊</span>
                      <span><strong>Big Gap:</strong> Comics and Fiction sell 3x more than History and Biography</span>
                    </li>
                  </ul>
                </div>

                <div class="bg-purple-50 p-4 rounded-lg">
                  <h4 class="font-bold text-purple-800 mb-3">Recommendations for Principal:</h4>
                  <ul class="list-disc list-inside ml-4 space-y-2">
                    <li>Order more Comics and Fiction for next year</li>
                    <li>Consider combining History and Biography into one section</li>
                    <li>Maybe promote Science books more - they're in the middle</li>
                    <li>The visual graph makes these patterns instantly clear!</li>
                  </ul>
                </div>

                <div class="bg-yellow-100 p-4 rounded border-l-4 border-yellow-500">
                  <p class="font-semibold">💡 Key Lesson:</p>
                  <p class="mt-2">Bar graphs make comparisons EASY. Without the graph, you'd have to read all the numbers and compare mentally. With the graph, you see patterns instantly!</p>
                </div>
              </div>`,
              steps: [
                'Collect and organize the data',
                'Determine appropriate title',
                'Label X-axis (categories) and Y-axis (values)',
                'Choose suitable scale based on highest value',
                'Draw bars with equal width and spacing',
                'Interpret the visual patterns',
                'Draw conclusions from comparisons'
              ],
              relatedConcepts: ['ch5-st2-c1']
            }
          ],
          interactiveActivities: [
            {
              id: 'ch5-st1-c1-ia1',
              type: 'interactive',
              title: 'Bar Graph Builder',
              content: 'Create your own bar graphs with interactive tools!',
              duration: 420,
              metadata: {
                interactiveComponent: 'BarGraphBuilder'
              }
            }
          ],
          assessmentQuestions: [
            {
              id: 'ch5-st1-c1-q1',
              conceptId: 'ch5-st1-c1',
              type: 'multiple-choice',
              difficulty: 'easy',
              question: 'In a bar graph showing favorite sports, the tallest bar represents Cricket at 25 students. What does this tell you?',
              options: [
                'Cricket is the least popular sport',
                'Cricket is the most popular sport',
                'Exactly 25 people were surveyed',
                'The graph scale goes up to 25'
              ],
              correctAnswer: 'Cricket is the most popular sport',
              explanation: `The tallest bar in a bar graph represents the category with the highest value. Since Cricket's bar is tallest at 25 students, it means Cricket is the most popular sport among those surveyed. The height of each bar shows the frequency or count for that category.`,
              hints: [
                {
                  level: 1,
                  content: 'In a bar graph, the height of each bar represents the value for that category',
                  type: 'conceptual'
                },
                {
                  level: 2,
                  content: 'If one bar is taller than all others, what does that mean about its value?',
                  type: 'conceptual'
                },
                {
                  level: 3,
                  content: 'The tallest bar means that category has the most (highest frequency)',
                  type: 'example'
                },
                {
                  level: 4,
                  content: 'Cricket at 25 is taller than other sports, so Cricket is the most popular choice',
                  type: 'example'
                }
              ],
              commonErrors: [
                {
                  error: 'Cricket is the least popular sport',
                  feedback: 'Actually, the opposite! The tallest bar shows the MOST popular, not least popular.',
                  remediation: 'ch5-st1-c1-t1'
                }
              ],
              estimatedTime: 45
            },
            {
              id: 'ch5-st1-c1-q2',
              conceptId: 'ch5-st1-c1',
              type: 'multiple-choice',
              difficulty: 'medium',
              question: 'A bar graph shows car sales with Y-axis scale: 0, 50, 100, 150, 200. If a bar reaches exactly between the 100 and 150 marks, approximately how many cars were sold?',
              options: ['100', '120', '125', '150'],
              correctAnswer: '125',
              explanation: `To find the value of a bar between two scale marks:

Step 1: Identify the two marks it's between: 100 and 150
Step 2: Find the difference: 150 - 100 = 50
Step 3: Since the bar is exactly in the middle: 50 ÷ 2 = 25
Step 4: Add to lower mark: 100 + 25 = 125

The bar represents approximately 125 cars sold.

This is an important skill - reading between the scale marks!`,
              hints: [
                {
                  level: 1,
                  content: 'The bar is between two marks: 100 and 150. What value is exactly in the middle of these?',
                  type: 'conceptual'
                },
                {
                  level: 2,
                  content: 'Find the difference between 150 and 100, then divide by 2 to find the midpoint',
                  type: 'procedural'
                },
                {
                  level: 3,
                  content: 'The difference is 50. Half of 50 is 25. Add 25 to the lower number (100)',
                  type: 'example'
                },
                {
                  level: 4,
                  content: '100 + 25 = ? This is the value exactly between 100 and 150',
                  type: 'example'
                }
              ],
              commonErrors: [
                {
                  error: '120',
                  feedback: 'Close! But 120 is not exactly in the middle. The middle between 100 and 150 is 125.',
                  remediation: 'ch5-st1-c1-t1'
                }
              ],
              estimatedTime: 70
            },
            {
              id: 'ch5-st1-c1-q3',
              conceptId: 'ch5-st1-c1',
              type: 'multiple-choice',
              difficulty: 'hard',
              question: 'If you need to create a bar graph for data with values: 450, 380, 520, 290, 410, what scale interval would be MOST appropriate?',
              options: ['Intervals of 5', 'Intervals of 25', 'Intervals of 50', 'Intervals of 100'],
              correctAnswer: 'Intervals of 100',
              explanation: `Choosing the right scale is crucial for a readable graph!

Step 1: Identify the range
- Lowest value: 290
- Highest value: 520
- Range: 520 - 290 = 230

Step 2: Determine how many divisions you want
- Typically aim for 5-10 divisions for clarity

Step 3: Evaluate each option:

Intervals of 5: 
- Would need 520 ÷ 5 = 104 marks! TOO MANY, graph unreadable

Intervals of 25:
- Would need 520 ÷ 25 ≈ 21 marks - Still too many!

Intervals of 50:
- Would need 520 ÷ 50 ≈ 11 marks - Better, but still crowded

Intervals of 100:
- Would need 600 ÷ 100 = 6 marks (0, 100, 200, 300, 400, 500, 600)
- PERFECT! Easy to read, not too crowded, covers all values

Answer: Intervals of 100

General Rule: For values in hundreds, use intervals of 50 or 100. For values in tens, use intervals of 5 or 10.`,
              hints: [
                {
                  level: 1,
                  content: 'Look at the highest value (520). Your scale should go at least that high, with comfortable spacing',
                  type: 'conceptual'
                },
                {
                  level: 2,
                  content: 'Small intervals (like 5 or 25) would create too many marks. You want 5-10 divisions typically',
                  type: 'conceptual'
                },
                {
                  level: 3,
                  content: 'Since the values are in the hundreds, think about what makes sense: 50 or 100?',
                  type: 'procedural'
                },
                {
                  level: 4,
                  content: 'Test: Using 100s gives you marks at 0, 100, 200, 300, 400, 500, 600. That\'s only 6 marks - perfect!',
                  type: 'example'
                }
              ],
              commonErrors: [
                {
                  error: 'Intervals of 50',
                  feedback: 'This could work, but would create about 11-12 marks, which is more crowded than needed. Intervals of 100 are cleaner for values in the 300-500 range.',
                  remediation: 'ch5-st1-c1-t1'
                },
                {
                  error: 'Intervals of 5',
                  feedback: 'This would create over 100 marks on your Y-axis! Way too crowded. For large values, use larger intervals.',
                  remediation: 'ch5-st1-c1-t1'
                }
              ],
              estimatedTime: 90
            }
          ],
          practiceQuestions: [],
          remedialContent: [
            {
              id: 'ch5-st1-c1-r1',
              type: 'text',
              title: 'Complete Guide: Bar Graphs Made Easy',
              content: `<div class="space-y-6">
                <div class="bg-gradient-to-r from-blue-100 to-indigo-100 p-6 rounded-lg">
                  <h3 class="text-2xl font-bold mb-4">🎨 Bar Graph Checklist</h3>
                  
                  <div class="bg-white p-4 rounded space-y-3">
                    <div class="flex items-start gap-3">
                      <input type="checkbox" class="mt-1" />
                      <span><strong>Title:</strong> Clear and descriptive</span>
                    </div>
                    <div class="flex items-start gap-3">
                      <input type="checkbox" class="mt-1" />
                      <span><strong>X-axis:</strong> Labeled with categories</span>
                    </div>
                    <div class="flex items-start gap-3">
                      <input type="checkbox" class="mt-1" />
                      <span><strong>Y-axis:</strong> Labeled with what you're measuring</span>
                    </div>
                    <div class="flex items-start gap-3">
                      <input type="checkbox" class="mt-1" />
                      <span><strong>Scale:</strong> Uniform intervals, starts at 0</span>
                    </div>
                    <div class="flex items-start gap-3">
                      <input type="checkbox" class="mt-1" />
                      <span><strong>Bars:</strong> Equal width, equal spacing, don't touch</span>
                    </div>
                    <div class="flex items-start gap-3">
                      <input type="checkbox" class="mt-1" />
                      <span><strong>Accuracy:</strong> Bar heights match the data</span>
                    </div>
                  </div>
                </div>

                <div class="bg-green-50 p-6 rounded-lg">
                  <h3 class="text-xl font-bold mb-3">Quick Scale Guide</h3>
                  <table class="w-full bg-white rounded">
                    <thead class="bg-green-200">
                      <tr>
                        <th class="p-2 text-left">Data Range</th>
                        <th class="p-2 text-left">Good Scale</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="border-b"><td class="p-2">0-50</td><td class="p-2">Intervals of 5 or 10</td></tr>
                      <tr class="border-b"><td class="p-2">50-200</td><td class="p-2">Intervals of 20 or 25</td></tr>
                      <tr class="border-b"><td class="p-2">200-500</td><td class="p-2">Intervals of 50</td></tr>
                      <tr><td class="p-2">500+</td><td class="p-2">Intervals of 100</td></tr>
                    </tbody>
                  </table>
                </div>

                <div class="bg-yellow-50 p-6 rounded">
                  <h3 class="text-xl font-bold mb-3">Reading a Bar Graph:</h3>
                  <ol class="list-decimal list-inside space-y-2">
                    <li>Read the title to understand what it's about</li>
                    <li>Check the X-axis to see what's being compared</li>
                    <li>Check the Y-axis to see what's being measured</li>
                    <li>Compare bar heights to see which is most/least</li>
                    <li>Look for patterns or trends</li>
                  </ol>
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
      id: 'ch5-intro1',
      type: 'text',
      title: 'Why Visualize Data?',
      content: `<div class="space-y-4">
        <p class="text-lg">Numbers tell a story, but graphs make that story come alive! Visual representations of data help us:</p>
        <ul class="list-disc list-inside space-y-2 ml-4">
          <li><strong>Understand Quickly:</strong> See patterns at a glance</li>
          <li><strong>Compare Easily:</strong> Which is bigger? Smaller? Instantly visible!</li>
          <li><strong>Remember Better:</strong> We remember pictures better than numbers</li>
          <li><strong>Communicate Clearly:</strong> Share insights with others effectively</li>
        </ul>
        <p class="text-lg mt-4">Let's learn the most powerful data visualization tools!</p>
      </div>`,
      duration: 180
    }
  ],
  realWorldApplications: [],
  finalAssessment: [],
  totalEstimatedTime: 300,
  prerequisites: ['Frequency tables', 'Basic arithmetic']
};
