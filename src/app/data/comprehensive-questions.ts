/**
 * Comprehensive Adaptive Question Bank for Data Handling
 * Topics: Understanding Data → Collecting Data → Organizing Data → Mean/Range → Mode → Median → Bar Graphs
 * Questions organized by difficulty with similar variants for adaptive practice
 */

import { Question } from '../types/domain-model';

// ============================================================================
// TOPIC 1: UNDERSTANDING DATA - Basic Questions
// ============================================================================

export const understandingDataEasyQuestions: Question[] = [
  {
    id: 'understand-data-easy-1',
    conceptId: 'understand-data',
    type: 'multiple-choice',
    difficulty: 'easy',
    question: 'What is data in simple terms?',
    options: [
      'A collection of facts and figures',
      'A type of computer',
      'A tool used only by scientists',
      'A game on the phone'
    ],
    correctAnswer: 'A collection of facts and figures',
    explanation: 'Data means collected facts, figures, or information. Examples: student marks, weather temperatures, favorite colors.',
    hints: [
      { level: 1, content: 'Think about what teachers collect when they record your grades.', type: 'conceptual' },
      { level: 2, content: 'Data is anything that gives us information about something.', type: 'conceptual' },
      { level: 3, content: 'When a store counts how many items it sells, that count is data.', type: 'example' }
    ],
    commonErrors: [
      { error: 'A type of computer', feedback: 'No, that\'s not right. Data is the information, not a device.', remediation: 'data-remedial-1' },
      { error: 'A tool used only by scientists', feedback: 'Actually, everyone uses data - shopkeepers, teachers, doctors use data daily.', remediation: 'data-remedial-1' }
    ],
    estimatedTime: 60
  },
  {
    id: 'understand-data-easy-2',
    conceptId: 'understand-data',
    type: 'multiple-choice',
    difficulty: 'easy',
    question: 'Which one is an example of data?',
    options: [
      'Your height in centimeters',
      'A book',
      'A pencil',
      'A classroom'
    ],
    correctAnswer: 'Your height in centimeters',
    explanation: 'Height measured in centimeters is numerical data - a specific measurement.',
    hints: [
      { level: 1, content: 'Look for something that is counted or measured.', type: 'procedural' },
      { level: 2, content: 'Numbers and measurements are always data.', type: 'conceptual' },
      { level: 3, content: '175 cm is data. A book is an object, not data.', type: 'example' }
    ],
    commonErrors: [
      { error: 'A book', feedback: 'A book is an object. If you count the NUMBER of books, that count is data.', remediation: 'data-remedial-2' }
    ],
    estimatedTime: 60
  },
  {
    id: 'understand-data-easy-3',
    conceptId: 'understand-data',
    type: 'multiple-choice',
    difficulty: 'easy',
    question: 'Which shows data about fruits in a school?',
    options: [
      'The number of apples, oranges, and bananas sold in the canteen',
      'A picture of a fruit bowl',
      'A recipe for fruit salad',
      'A list of fruit names'
    ],
    correctAnswer: 'The number of apples, oranges, and bananas sold in the canteen',
    explanation: 'Numbers that tell us how much of something happened are data.',
    hints: [
      { level: 1, content: 'Which option has numbers or counts?', type: 'procedural' },
      { level: 2, content: 'Data tells us "how many" or "how much".', type: 'conceptual' },
      { level: 3, content: 'Sold 10 apples, 8 oranges, 6 bananas - these numbers are data.', type: 'example' }
    ],
    commonErrors: [],
    estimatedTime: 60
  },
  {
    id: 'understand-data-easy-4',
    conceptId: 'understand-data',
    type: 'multiple-choice',
    difficulty: 'easy',
    question: 'A student records: "Monday - 5°C, Tuesday - 7°C, Wednesday - 6°C". What is this called?',
    options: [
      'Data',
      'Weather',
      'Temperature',
      'A prediction'
    ],
    correctAnswer: 'Data',
    explanation: 'The recorded temperature readings for each day form a collection of data.',
    hints: [
      { level: 1, content: 'This is something that was measured and written down.', type: 'procedural' },
      { level: 2, content: 'When we collect information and write it, we are collecting data.', type: 'conceptual' },
      { level: 3, content: 'The readings 5°C, 7°C, 6°C are data about temperature.', type: 'example' }
    ],
    commonErrors: [],
    estimatedTime: 60
  },
  {
    id: 'understand-data-easy-5',
    conceptId: 'understand-data',
    type: 'multiple-choice',
    difficulty: 'easy',
    question: 'Which sentence uses the word "data" correctly?',
    options: [
      'The data shows that 15 students prefer pizza',
      'I saw some data running in the street',
      'Please hand me that data from the table',
      'Data is a type of animal'
    ],
    correctAnswer: 'The data shows that 15 students prefer pizza',
    explanation: 'Data refers to collected information or facts. Here, the numbers and preferences are data.',
    hints: [
      { level: 1, content: 'In which sentence is "data" used like facts or information?', type: 'procedural' },
      { level: 2, content: 'Data cannot be a physical object you can hand over.', type: 'conceptual' },
      { level: 3, content: 'Data is information like "15 students", not a living thing.', type: 'example' }
    ],
    commonErrors: [],
    estimatedTime: 60
  }
];

export const understandingDataMediumQuestions: Question[] = [
  {
    id: 'understand-data-med-1',
    conceptId: 'understand-data',
    type: 'multiple-choice',
    difficulty: 'medium',
    question: 'Classify this: "Students in Grade 7 wear shirts of different colors: red, blue, white, green"',
    options: [
      'Qualitative/Categorical data (no numbers involved)',
      'Quantitative data (has numbers)',
      'Not data',
      'Scientific data'
    ],
    correctAnswer: 'Qualitative/Categorical data (no numbers involved)',
    explanation: 'Colors are categories or qualities, not numbers. This is qualitative/categorical data.',
    hints: [
      { level: 1, content: 'Are colors numbers or descriptions?', type: 'procedural' },
      { level: 2, content: 'Categorical data describes qualities or types. Quantitative data uses numbers.', type: 'conceptual' },
      { level: 3, content: 'Red, blue, white, green are categories. If we count "5 red, 3 blue", that becomes numerical.', type: 'example' }
    ],
    commonErrors: [
      { error: 'Quantitative data (has numbers)', feedback: 'Color names aren\'t numbers. Only if you count colors (5 red) is it numerical.', remediation: 'data-remedial-3' }
    ],
    estimatedTime: 90
  },
  {
    id: 'understand-data-med-2',
    conceptId: 'understand-data',
    type: 'multiple-choice',
    difficulty: 'medium',
    question: 'Which is an example of discrete numerical data?',
    options: [
      'Number of students in a class: 35',
      'Height of a student: 165.5 cm',
      'Temperature outside: 25.3°C',
      'Weight of a person: 52.8 kg'
    ],
    correctAnswer: 'Number of students in a class: 35',
    explanation: 'Discrete data uses whole numbers only. You can\'t have 35.5 students. The others are continuous (have decimals).',
    hints: [
      { level: 1, content: 'Can you have a partial student? Can you have a partial degree?', type: 'procedural' },
      { level: 2, content: 'Discrete = whole numbers only. Continuous = can have decimals.', type: 'conceptual' },
      { level: 3, content: 'Students, books, cars = discrete. Height, weight, temperature = continuous.', type: 'example' }
    ],
    commonErrors: [
      { error: 'Height of a student: 165.5 cm', feedback: 'Height is continuous - we can measure 165.5 or 165.3 cm.', remediation: 'data-remedial-4' }
    ],
    estimatedTime: 90
  },
  {
    id: 'understand-data-med-3',
    conceptId: 'understand-data',
    type: 'multiple-choice',
    difficulty: 'medium',
    question: 'A researcher collects: "Monday-34°C, Tuesday-36°C, Wednesday-35°C". What type of data is this?',
    options: [
      'Continuous quantitative data (temperature can have decimals)',
      'Discrete data',
      'Qualitative data',
      'Primary data'
    ],
    correctAnswer: 'Continuous quantitative data (temperature can have decimals)',
    explanation: 'Temperature is continuous data because it can have decimal values like 34.5°C.',
    hints: [
      { level: 1, content: 'Can temperature be 34.5°C?', type: 'procedural' },
      { level: 2, content: 'Continuous data can have any decimal value between whole numbers.', type: 'conceptual' },
      { level: 3, content: 'Height, weight, temperature, time - these can have decimals. Count of items - cannot.', type: 'example' }
    ],
    commonErrors: [],
    estimatedTime: 90
  },
  {
    id: 'understand-data-med-4',
    conceptId: 'understand-data',
    type: 'multiple-choice',
    difficulty: 'medium',
    question: 'What is the difference between data and information?',
    options: [
      'Data is raw facts; information is data that has been processed and gives meaning',
      'They mean the same thing',
      'Data is more important than information',
      'Information is always numbers'
    ],
    correctAnswer: 'Data is raw facts; information is data that has been processed and gives meaning',
    explanation: 'Raw data (5, 7, 3, 8, 5 sales) becomes information when processed (average is 5.6 sales per day).',
    hints: [
      { level: 1, content: 'Think about raw numbers vs. what they mean when analyzed.', type: 'conceptual' },
      { level: 2, content: 'Data = raw collection. Information = meaning from analyzing data.', type: 'conceptual' },
      { level: 3, content: 'Scores 80, 90, 75, 88 = data. Average score 83.25 = information.', type: 'example' }
    ],
    commonErrors: [],
    estimatedTime: 90
  }
];

export const understandingDataHardQuestions: Question[] = [
  {
    id: 'understand-data-hard-1',
    conceptId: 'understand-data',
    type: 'multiple-choice',
    difficulty: 'hard',
    question: 'A school record shows only "Class 7-A has students". Is this data?',
    options: [
      'No, because it lacks specific information (numbers/details)',
      'Yes, it is data',
      'Only if the class has more than 20 students',
      'It depends on the day'
    ],
    correctAnswer: 'No, because it lacks specific information (numbers/details)',
    explanation: 'Data must be specific facts. "Students" without numbers or names is too vague. "35 students" or "names of 35 students" would be data.',
    hints: [
      { level: 1, content: 'Does "students exist" tell you anything specific?', type: 'procedural' },
      { level: 2, content: 'Data must be specific and verifiable facts, not vague statements.', type: 'conceptual' },
      { level: 3, content: '"35 students in Class 7-A" = data. "Students in class" = too vague.', type: 'example' }
    ],
    commonErrors: [
      { error: 'Yes, it is data', feedback: 'Too vague! Data needs specific numbers or details.', remediation: 'data-remedial-5' }
    ],
    estimatedTime: 120
  }
];

// ============================================================================
// TOPIC 2: COLLECTING DATA - Questionnaire & Methods
// ============================================================================

export const collectingDataEasyQuestions: Question[] = [
  {
    id: 'collect-data-easy-1',
    conceptId: 'collecting-data',
    type: 'multiple-choice',
    difficulty: 'easy',
    question: 'You want to find out which fruit is most popular in your class. What is the BEST way?',
    options: [
      'Ask each student their favorite fruit (survey)',
      'Look at a fruit market website',
      'Guess based on what you like',
      'Ask only your close friends'
    ],
    correctAnswer: 'Ask each student their favorite fruit (survey)',
    explanation: 'A survey directly asks the people in your class what they prefer, giving you primary data.',
    hints: [
      { level: 1, content: 'You want to know about YOUR class, so ask your class.', type: 'procedural' },
      { level: 2, content: 'Direct questioning is better than guessing or looking elsewhere.', type: 'conceptual' },
      { level: 3, content: 'Surveys let people give you their opinions directly.', type: 'example' }
    ],
    commonErrors: [
      { error: 'Guess based on what you like', feedback: 'Guessing is not data collection! You must actually ask people.', remediation: 'collect-remedial-1' }
    ],
    estimatedTime: 60
  },
  {
    id: 'collect-data-easy-2',
    conceptId: 'collecting-data',
    type: 'multiple-choice',
    difficulty: 'easy',
    question: 'What is primary data?',
    options: [
      'Data you collect yourself directly from the source',
      'Data you find in a book',
      'Data from the internet',
      'Data that is old'
    ],
    correctAnswer: 'Data you collect yourself directly from the source',
    explanation: 'Primary data is collected by you or your group. You gathered it yourself.',
    hints: [
      { level: 1, content: 'Who collected this data? You yourself?', type: 'procedural' },
      { level: 2, content: 'Primary = from the primary source (the person or place directly).', type: 'conceptual' },
      { level: 3, content: 'If YOU count the apples sold, it\'s your primary data.', type: 'example' }
    ],
    commonErrors: [],
    estimatedTime: 60
  },
  {
    id: 'collect-data-easy-3',
    conceptId: 'collecting-data',
    type: 'multiple-choice',
    difficulty: 'easy',
    question: 'Which is an example of secondary data?',
    options: [
      'Weather data from yesterday published in a newspaper',
      'You measuring rainfall today',
      'You asking students their age',
      'You counting cars at the school gate'
    ],
    correctAnswer: 'Weather data from yesterday published in a newspaper',
    explanation: 'Secondary data is collected by someone else and you use it. A newspaper collected the weather data, not you.',
    hints: [
      { level: 1, content: 'Did someone else collect this data before you?', type: 'procedural' },
      { level: 2, content: 'Secondary = from a secondary source, not your direct collection.', type: 'conceptual' },
      { level: 3, content: 'Reading data from a source is using secondary data.', type: 'example' }
    ],
    commonErrors: [],
    estimatedTime: 60
  },
  {
    id: 'collect-data-easy-4',
    conceptId: 'collecting-data',
    type: 'multiple-choice',
    difficulty: 'easy',
    question: 'What is a survey?',
    options: [
      'A set of questions asked to gather information from people',
      'A map of a place',
      'A type of test', 
      'A measurement tool'
    ],
    correctAnswer: 'A set of questions asked to gather information from people',
    explanation: 'A survey is a method of collecting data by asking people specific questions.',
    hints: [
      { level: 1, content: 'Think of when someone asks you questions to learn about you.', type: 'procedural' },
      { level: 2, content: 'Surveys gather information through questions.', type: 'conceptual' },
      { level: 3, content: '"What\'s your favorite subject?" - asking this is surveying.', type: 'example' }
    ],
    commonErrors: [],
    estimatedTime: 60
  }
];

export const collectingDataMediumQuestions: Question[] = [
  {
    id: 'collect-data-med-1',
    conceptId: 'collecting-data',
    type: 'multiple-choice',
    difficulty: 'medium',
    question: 'Which survey question is BEST designed?',
    options: [
      'On a scale of 1-5, how much do you like sports? (1=not at all, 5=very much)',
      'Do you like sports?',
      'Don\'t you think sports are the best?',
      'Sports are fun, right?'
    ],
    correctAnswer: 'On a scale of 1-5, how much do you like sports? (1=not at all, 5=very much)',
    explanation: 'This question is clear, unbiased, and has specific answer options with clear meanings.',
    hints: [
      { level: 1, content: 'A good question is clear and not leading (unbiased).', type: 'procedural' },
      { level: 2, content: 'Good questions have specific answer choices, not just yes/no.', type: 'conceptual' },
      { level: 3, content: '"Don\'t you think X is best?" pushes people to say they like it - that\'s biased!', type: 'example' }
    ],
    commonErrors: [
      { error: 'Do you like sports?', feedback: 'Too simple. Yes/no doesn\'t let people express how much.', remediation: 'collect-remedial-2' },
      { error: 'Don\'t you think sports are the best?', feedback: 'This is leading - it pushes people to agree!', remediation: 'collect-remedial-2' }
    ],
    estimatedTime: 90
  },
  {
    id: 'collect-data-med-2',
    conceptId: 'collecting-data',
    type: 'multiple-choice',
    difficulty: 'medium',
    question: 'Your teacher records absences every day without students knowing. What method is this?',
    options: [
      'Observation (collecting data without disturbing the normal situation)',
      'Survey',
      'Interview',
      'Secondary data'
    ],
    correctAnswer: 'Observation (collecting data without disturbing the normal situation)',
    explanation: 'Observation is primary data collection by watching and recording without interfering.',
    hints: [
      { level: 1, content: 'Is anyone being asked questions? No - just watching.', type: 'procedural' },
      { level: 2, content: 'Observation means watching and recording quietly.', type: 'conceptual' },
      { level: 3, content: 'A scientist watching animals without disturbing them - that\'s observation.', type: 'example' }
    ],
    commonErrors: [],
    estimatedTime: 90
  }
];

// ============================================================================
// TOPIC 3: ORGANIZING DATA - Frequency Tables & Tally Marks
// ============================================================================

export const organizingDataEasyQuestions: Question[] = [
  {
    id: 'organize-data-easy-1',
    conceptId: 'organizing-data',
    type: 'multiple-choice',
    difficulty: 'easy',
    question: 'What are tally marks used for?',
    options: [
      'To count and record data quickly',
      'To draw pictures',
      'To measure length',
      'To tell the time'
    ],
    correctAnswer: 'To count and record data quickly',
    explanation: 'Tally marks are a quick way to count items. Each mark represents one item, and |||| || means 7.',
    hints: [
      { level: 1, content: 'Tally marks make counting easy and organized.', type: 'procedural' },
      { level: 2, content: 'Each line represents one count.', type: 'conceptual' },
      { level: 3, content: 'When you have ||||  (4 marks), the next group of 5 crosses the 4: ||||/', type: 'example' }
    ],
    commonErrors: [],
    estimatedTime: 60
  },
  {
    id: 'organize-data-easy-2',
    conceptId: 'organizing-data',
    type: 'multiple-choice',
    difficulty: 'easy',
    question: 'Tally marks |||| || represent which number?',
    options: [
      '7',
      '9',
      '6',
      '5'
    ],
    correctAnswer: '7',
    explanation: 'First group of |||| = 5, then ++ = 2 more. Total = 5 + 2 = 7',
    hints: [
      { level: 1, content: 'Count the marks: 1, 2, 3, 4, (that\'s one group of 5), 5, 6, 7', type: 'procedural' },
      { level: 2, content: 'A crossed group |||| means 5. Extras after add on.', type: 'conceptual' },
      { level: 3, content: 'One full group = 5, so |||| = 5. Plus 2 more marks = 5 + 2 = 7', type: 'example' }
    ],
    commonErrors: [
      { error: '9', feedback: 'That would be |||| |||| (two groups of 5 = 10, minus 1 = 9). Look again!', remediation: 'organize-remedial-1' },
      { error: '6', feedback: 'Close! |||| = 5 (the crossed marks). Plus 2 = 7, not 6.', remediation: 'organize-remedial-1' }
    ],
    estimatedTime: 60
  },
  {
    id: 'organize-data-easy-3',
    conceptId: 'organizing-data',
    type: 'multiple-choice',
    difficulty: 'easy',
    question: 'What is a frequency table?',
    options: [
      'A table that shows items and how many times each appears',
      'A schedule of when things happen',
      'A list of numbers',
      'A piece of furniture'
    ],
    correctAnswer: 'A table that shows items and how many times each appears',
    explanation: 'A frequency table lists each item and the count (frequency) of how many times it appears.',
    hints: [
      { level: 1, content: 'Frequency means "how often" something appears.', type: 'conceptual' },
      { level: 2, content: 'A frequency table organizes data into item and count columns.', type: 'conceptual' },
      { level: 3, content: 'Item: Color, Frequency: Red-5, Blue-3, Green-2 - that\'s a frequency table.', type: 'example' }
    ],
    commonErrors: [],
    estimatedTime: 60
  },
  {
    id: 'organize-data-easy-4',
    conceptId: 'organizing-data',
    type: 'multiple-choice',
    difficulty: 'easy',
    question: 'A seller counted: Apple-8, Orange-5, Banana-6. What is the frequency for apples?',
    options: [
      '8',
      '5',
      '6',
      '19'
    ],
    correctAnswer: '8',
    explanation: 'The frequency for apples is 8, which means 8 apples were sold.',
    hints: [
      { level: 1, content: 'Frequency is the count or number for that item.', type: 'procedural' },
      { level: 2, content: 'Look at Apple - the number next to it is the frequency.', type: 'procedural' },
      { level: 3, content: 'Apple: 8 means apple appears 8 times.', type: 'example' }
    ],
    commonErrors: [],
    estimatedTime: 60
  },
  {
    id: 'organize-data-easy-5',
    conceptId: 'organizing-data',
    type: 'multiple-choice',
    difficulty: 'easy',
    question: 'A fruit seller had: Apple-|||| |||, Orange-||||, Banana-|||| ||. What is the frequency of oranges?',
    options: [
      '4',
      '5',
      '8',
      '9'
    ],
    correctAnswer: '4',
    explanation: '|||| = 4 oranges. One full group of tally marks = 5. This group has only 4 marks.',
    hints: [
      { level: 1, content: 'Count the orange tally marks.', type: 'procedural' },
      { level: 2, content: 'This group is |||| which is 4 (not crossed, so not 5+).', type: 'procedural' },
      { level: 3, content: 'Frequency of oranges = the count of tally marks for oranges = 4', type: 'example' }
    ],
    commonErrors: [
      { error: '5', feedback: 'If it were crossed (||||/), it would be 5. But this is just |||| = 4.', remediation: 'organize-remedial-2' }
    ],
    estimatedTime: 60
  }
];

export const organizingDataMediumQuestions: Question[] = [
  {
    id: 'organize-data-med-1',
    conceptId: 'organizing-data',
    type: 'multiple-choice',
    difficulty: 'medium',
    question: 'Raw data: Red, Blue, Red, Green, Red, Blue, Red, Red, Blue, Green. What is the frequency of Red from this?',
    options: [
      '5',
      '3',
      '2',
      '10'
    ],
    correctAnswer: '5',
    explanation: 'Count the Red entries: Red appears 5 times in the list.',
    hints: [
      { level: 1, content: 'Count how many times "Red" appears in the list.', type: 'procedural' },
      { level: 2, content: 'Go through: Red(1), Blue, Red(2), Green, Red(3), Blue, Red(4), Red(5), Blue, Green', type: 'procedural' },
      { level: 3, content: 'Frequency = count. Red appears 5 times, so frequency = 5', type: 'example' }
    ],
    commonErrors: [
      { error: '3', feedback: 'Count again. Red appears more than 3 times in the list.', remediation: 'organize-remedial-3' }
    ],
    estimatedTime: 90
  },
  {
    id: 'organize-data-med-2',
    conceptId: 'organizing-data',
    type: 'multiple-choice',
    difficulty: 'medium',
    question: 'A frequency table shows: Item | Frequency: Red | 5, Blue | 3, Green | 2. What is the total frequency?',
    options: [
      '10',
      '5',
      '3',
      '8'
    ],
    correctAnswer: '10',
    explanation: 'Total frequency = 5 + 3 + 2 = 10. This is the total number of items counted.',
    hints: [
      { level: 1, content: 'Add all the frequencies together.', type: 'procedural' },
      { level: 2, content: '5 + 3 + 2 = ?', type: 'procedural' },
      { level: 3, content: 'Total frequency means how many items were counted in total.', type: 'conceptual' }
    ],
    commonErrors: [
      { error: '5', feedback: 'That\'s just the frequency for red. Add all three frequencies!', remediation: 'organize-remedial-4' }
    ],
    estimatedTime: 90
  }
];

// ============================================================================
// TOPIC 4: REPRESENTATIVE VALUES - MEAN & RANGE
// ============================================================================

export const meanAndRangeEasyQuestions: Question[] = [
  {
    id: 'mean-range-easy-1',
    conceptId: 'mean-and-range',
    type: 'multiple-choice',
    difficulty: 'easy',
    question: 'What is the mean (average)?',
    options: [
      'The sum of all values divided by how many values there are',
      'The middle value when arranged in order',
      'The value that appears most often',
      'The difference between highest and lowest'
    ],
    correctAnswer: 'The sum of all values divided by how many values there are',
    explanation: 'Mean = (sum of all values) ÷ (number of values). It\'s the average.',
    hints: [
      { level: 1, content: 'Mean is what we call average.', type: 'conceptual' },
      { level: 2, content: 'To find average: add all numbers, then divide by how many numbers.', type: 'procedural' },
      { level: 3, content: 'Scores 10, 20, 30: sum=60, count=3, mean=60÷3=20', type: 'example' }
    ],
    commonErrors: [],
    estimatedTime: 60
  },
  {
    id: 'mean-range-easy-2',
    conceptId: 'mean-and-range',
    type: 'multiple-choice',
    difficulty: 'easy',
    question: 'Find the mean of: 10, 20, 30',
    options: [
      '20',
      '30',
      '10',
      '60'
    ],
    correctAnswer: '20',
    explanation: 'Sum = 10+20+30 = 60. Count = 3. Mean = 60÷3 = 20',
    hints: [
      { level: 1, content: 'Add: 10+20+30 = ?', type: 'procedural' },
      { level: 2, content: 'Then divide by 3 (because there are 3 numbers).', type: 'procedural' },
      { level: 3, content: '60 ÷ 3 = 20. The mean is 20.', type: 'example' }
    ],
    commonErrors: [
      { error: '30', feedback: 'That\'s the highest value, not the average!', remediation: 'mean-remedial-1' },
      { error: '60', feedback: 'That\'s the sum! Divide by 3 to get the mean.', remediation: 'mean-remedial-1' }
    ],
    estimatedTime: 60
  },
  {
    id: 'mean-range-easy-3',
    conceptId: 'mean-and-range',
    type: 'multiple-choice',
    difficulty: 'easy',
    question: 'What is range?',
    options: [
      'The difference between the highest and lowest value',
      'The average value',
      'The middle value',
      'The most common value'
    ],
    correctAnswer: 'The difference between the highest and lowest value',
    explanation: 'Range = Highest value - Lowest value. It shows how spread out the data is.',
    hints: [
      { level: 1, content: 'Range tells you how far apart the values are.', type: 'conceptual' },
      { level: 2, content: 'Find the biggest and smallest, then subtract.', type: 'procedural' },
      { level: 3, content: 'Scores 10, 20, 30: biggest=30, smallest=10, range=30-10=20', type: 'example' }
    ],
    commonErrors: [],
    estimatedTime: 60
  },
  {
    id: 'mean-range-easy-4',
    conceptId: 'mean-and-range',
    type: 'multiple-choice',
    difficulty: 'easy',
    question: 'Find the range of: 5, 15, 25, 35',
    options: [
      '30',
      '20',
      '10',
      '80'
    ],
    correctAnswer: '30',
    explanation: 'Highest = 35, Lowest = 5. Range = 35 - 5 = 30',
    hints: [
      { level: 1, content: 'Find the biggest number: 35', type: 'procedural' },
      { level: 2, content: 'Find the smallest number: 5', type: 'procedural' },
      { level: 3, content: 'Range = 35 - 5 = 30', type: 'example' }
    ],
    commonErrors: [
      { error: '20', feedback: 'That\'s not the range. 35-5 = 30, not 20.', remediation: 'mean-remedial-2' }
    ],
    estimatedTime: 60
  },
  {
    id: 'mean-range-easy-5',
    conceptId: 'mean-and-range',
    type: 'multiple-choice',
    difficulty: 'easy',
    question: 'A student\'s scores are: 90, 85, 95. Find the mean.',
    options: [
      '90',
      '95',
      '85',
      '60'
    ],
    correctAnswer: '90',
    explanation: 'Sum = 90+85+95 = 270. Count = 3. Mean = 270÷3 = 90',
    hints: [
      { level: 1, content: 'Add all three scores.', type: 'procedural' },
      { level: 2, content: '90+85+95 = 270', type: 'procedural' },
      { level: 3, content: 'Divide by 3: 270÷3 = 90. Mean is 90.', type: 'example' }
    ],
    commonErrors: [],
    estimatedTime: 60
  }
];

export const meanAndRangeMediumQuestions: Question[] = [
  {
    id: 'mean-range-med-1',
    conceptId: 'mean-and-range',
    type: 'multiple-choice',
    difficulty: 'medium',
    question: 'The mean of 4 numbers is 25. If three numbers are 20, 30, and 28, what is the fourth number?',
    options: [
      '22',
      '30',
      '25',
      '24'
    ],
    correctAnswer: '22',
    explanation: 'If mean = 25 and count = 4, then sum = 25×4 = 100. Known sum: 20+30+28 = 78. Fourth = 100-78 = 22',
    hints: [
      { level: 1, content: 'Mean × Count = Total sum. So 25 × 4 = ?', type: 'procedural' },
      { level: 2, content: 'Total sum should be 100. Add the known numbers: 20+30+28 = 78', type: 'procedural' },
      { level: 3, content: 'Missing number = 100 - 78 = 22', type: 'example' }
    ],
    commonErrors: [
      { error: '25', feedback: 'That\'s just the mean. We need to find the actual missing number.', remediation: 'mean-remedial-3' }
    ],
    estimatedTime: 90
  },
  {
    id: 'mean-range-med-2',
    conceptId: 'mean-and-range',
    type: 'multiple-choice',
    difficulty: 'medium',
    question: 'Student A: scores 80, 85, 90. Student B: scores 75, 80, 100. Who has higher mean score?',
    options: [
      'Student A (mean = 85)',
      'Student B (mean = 85)',
      'Equal means',
      'Need more information'
    ],
    correctAnswer: 'Student A (mean = 85)',
    explanation: 'Student A: (80+85+90)÷3 = 255÷3 = 85. Student B: (75+80+100)÷3 = 255÷3 = 85. Both are equal!',
    hints: [
      { level: 1, content: 'Calculate mean for Student A.', type: 'procedural' },
      { level: 2, content: 'Calculate mean for Student B.', type: 'procedural' },
      { level: 3, content: 'Compare: both have mean 85. They\'re equal!', type: 'example' }
    ],
    commonErrors: [
      { error: 'Student B (mean = 85)', feedback: 'Student B\'s highest score is 100, but that doesn\'t make their mean higher!', remediation: 'mean-remedial-4' }
    ],
    estimatedTime: 90
  }
];

// ============================================================================
// TOPIC 5: MODE
// ============================================================================

export const modeEasyQuestions: Question[] = [
  {
    id: 'mode-easy-1',
    conceptId: 'mode',
    type: 'multiple-choice',
    difficulty: 'easy',
    question: 'What is mode?',
    options: [
      'The value that appears most often',
      'The average value',
      'The middle value',
      'The difference between highest and lowest'
    ],
    correctAnswer: 'The value that appears most often',
    explanation: 'Mode is the data point that occurs most frequently.',
    hints: [
      { level: 1, content: 'Which value shows up the most?', type: 'procedural' },
      { level: 2, content: 'Mode = most common value.', type: 'conceptual' },
      { level: 3, content: 'In 1,2,2,2,3: the number 2 appears 3 times, so mode = 2', type: 'example' }
    ],
    commonErrors: [],
    estimatedTime: 60
  },
  {
    id: 'mode-easy-2',
    conceptId: 'mode',
    type: 'multiple-choice',
    difficulty: 'easy',
    question: 'Find the mode of: 5, 6, 6, 7, 6',
    options: [
      '6',
      '5',
      '7',
      '24'
    ],
    correctAnswer: '6',
    explanation: 'The number 6 appears 3 times (most frequent). 5 and 7 appear once each.',
    hints: [
      { level: 1, content: 'Count how many times each number appears.', type: 'procedural' },
      { level: 2, content: '5→1 time, 6→3 times, 7→1 time. Which appears most?', type: 'procedural' },
      { level: 3, content: '6 appears the most (3 times), so mode = 6', type: 'example' }
    ],
    commonErrors: [
      { error: '24', feedback: 'That\'s the sum of all numbers, not the mode!', remediation: 'mode-remedial-1' }
    ],
    estimatedTime: 60
  },
  {
    id: 'mode-easy-3',
    conceptId: 'mode',
    type: 'multiple-choice',
    difficulty: 'easy',
    question: 'Colors chosen: Red, Blue, Red, Green, Red, Blue. What is the mode?',
    options: [
      'Red',
      'Blue',
      'Green',
      'No mode'
    ],
    correctAnswer: 'Red',
    explanation: 'Red appears 3 times. Blue appears 2 times. Green appears 1 time. Red is most frequent.',
    hints: [
      { level: 1, content: 'Count each color: Red, Blue, Green', type: 'procedural' },
      { level: 2, content: 'Red=3, Blue=2, Green=1. Which count is highest?', type: 'procedural' },
      { level: 3, content: 'Red appears most (3 times), so mode = Red', type: 'example' }
    ],
    commonErrors: [],
    estimatedTime: 60
  },
  {
    id: 'mode-easy-4',
    conceptId: 'mode',
    type: 'multiple-choice',
    difficulty: 'easy',
    question: 'From frequency table: Apple-8, Orange-5, Banana-6. Which fruit is the mode?',
    options: [
      'Apple',
      'Orange',
      'Banana',
      'All equal'
    ],
    correctAnswer: 'Apple',
    explanation: 'Apple has frequency 8, which is the highest. Mode is the value with highest frequency.',
    hints: [
      { level: 1, content: 'Look at the frequencies: 8, 5, 6', type: 'procedural' },
      { level: 2, content: 'Which is the highest frequency?', type: 'procedural' },
      { level: 3, content: '8 is highest, so Apple (with 8) is the mode', type: 'example' }
    ],
    commonErrors: [],
    estimatedTime: 60
  }
];

export const modeMediumQuestions: Question[] = [
  {
    id: 'mode-med-1',
    conceptId: 'mode',
    type: 'multiple-choice',
    difficulty: 'medium',
    question: 'Scores: 10, 20, 20, 30, 30, 30. What is the mode?',
    options: [
      '30',
      '20',
      '10',
      'No single mode'
    ],
    correctAnswer: '30',
    explanation: '10 appears 1 time, 20 appears 2 times, 30 appears 3 times. 30 is most frequent.',
    hints: [
      { level: 1, content: 'How many times does each score appear?', type: 'procedural' },
      { level: 2, content: '10→1, 20→2, 30→3. Which appears most?', type: 'procedural' },
      { level: 3, content: '30 appears 3 times (most), so mode = 30', type: 'example' }
    ],
    commonErrors: [
      { error: '20', feedback: 'Close! But 30 appears 3 times while 20 appears only 2 times.', remediation: 'mode-remedial-2' }
    ],
    estimatedTime: 90
  },
  {
    id: 'mode-med-2',
    conceptId: 'mode',
    type: 'multiple-choice',
    difficulty: 'medium',
    question: 'A survey of favorite subjects: Math-5, Science-5, English-3, Arts-2. How many modes are there?',
    options: [
      'Two modes (Math and Science both have 5)',
      'One mode (Math)',
      'No mode',
      'Four modes (all subjects)'
    ],
    correctAnswer: 'Two modes (Math and Science both have 5)',
    explanation: 'When two or more values tie for highest frequency, they are all modes.',
    hints: [
      { level: 1, content: 'Which frequencies appear most often?', type: 'procedural' },
      { level: 2, content: 'Math=5, Science=5. Both are tied for highest.', type: 'procedural' },
      { level: 3, content: 'When values tie for highest frequency, both are modes (bimodal).', type: 'conceptual' }
    ],
    commonErrors: [],
    estimatedTime: 90
  }
];

// ============================================================================
// TOPIC 6: MEDIAN
// ============================================================================

export const medianEasyQuestions: Question[] = [
  {
    id: 'median-easy-1',
    conceptId: 'median',
    type: 'multiple-choice',
    difficulty: 'easy',
    question: 'What is median?',
    options: [
      'The middle value when data is arranged in order',
      'The value that appears most often',
      'The average of all values',
      'The difference between highest and lowest'
    ],
    correctAnswer: 'The middle value when data is arranged in order',
    explanation: 'Median is the value in the middle when numbers are arranged from smallest to largest.',
    hints: [
      { level: 1, content: '"Median" sounds like "middle" - because it is!', type: 'conceptual' },
      { level: 2, content: 'First arrange numbers in order, then find the middle one.', type: 'procedural' },
      { level: 3, content: 'For 1,3,5,7,9: median is 5 (middle value).', type: 'example' }
    ],
    commonErrors: [],
    estimatedTime: 60
  },
  {
    id: 'median-easy-2',
    conceptId: 'median',
    type: 'multiple-choice',
    difficulty: 'easy',
    question: 'Find the median of: 3, 1, 4, 2, 5',
    options: [
      '3',
      '5',
      '1',
      '15'
    ],
    correctAnswer: '3',
    explanation: 'Arranges in order: 1, 2, 3, 4, 5. The middle value (3rd position) is 3.',
    hints: [
      { level: 1, content: 'Arrange in order: 1, 2, 3, 4, 5', type: 'procedural' },
      { level: 2, content: 'Find the middle: 1, 2, (3), 4, 5', type: 'procedural' },
      { level: 3, content: 'Median = 3 (the value in the middle)', type: 'example' }
    ],
    commonErrors: [
      { error: '5', feedback: 'That\'s the highest value, not the middle!', remediation: 'median-remedial-1' }
    ],
    estimatedTime: 60
  },
  {
    id: 'median-easy-3',
    conceptId: 'median',
    type: 'multiple-choice',
    difficulty: 'easy',
    question: 'Find the median of: 10, 20',
    options: [
      '15',
      '10',
      '20',
      '30'
    ],
    correctAnswer: '15',
    explanation: 'With 2 numbers, median = average of the two. (10+20)÷2 = 15',
    hints: [
      { level: 1, content: 'When there are 2 numbers, we average them.', type: 'conceptual' },
      { level: 2, content: '(10 + 20) ÷ 2 = ?', type: 'procedural' },
      { level: 3, content: '30 ÷ 2 = 15. Median = 15', type: 'example' }
    ],
    commonErrors: [
      { error: '10', feedback: 'That\'s the lower value. With even count, take average of middle two.', remediation: 'median-remedial-2' }
    ],
    estimatedTime: 60
  },
  {
    id: 'median-easy-4',
    conceptId: 'median',
    type: 'multiple-choice',
    difficulty: 'easy',
    question: 'Find the median of: 7, 3, 5',
    options: [
      '5',
      '7',
      '3',
      '15'
    ],
    correctAnswer: '5',
    explanation: 'Arrange: 3, 5, 7. Middle value is 5.',
    hints: [
      { level: 1, content: 'Arrange from smallest to largest: 3, 5, 7', type: 'procedural' },
      { level: 2, content: 'Which is in the middle position?', type: 'procedural' },
      { level: 3, content: '5 is in the middle, so median = 5', type: 'example' }
    ],
    commonErrors: [],
    estimatedTime: 60
  },
  {
    id: 'median-easy-5',
    conceptId: 'median',
    type: 'multiple-choice',
    difficulty: 'easy',
    question: 'Find the median of: 90, 85, 95, 80, 88',
    options: [
      '88',
      '90',
      '95',
      '85'
    ],
    correctAnswer: '88',
    explanation: 'Arranged: 80, 85, 88, 90, 95. The middle (3rd) value is 88.',
    hints: [
      { level: 1, content: 'Arrange in order: 80, 85, 88, 90, 95', type: 'procedural' },
      { level: 2, content: 'Find the middle position (3rd of 5).', type: 'procedural' },
      { level: 3, content: '88 is in the middle, so median = 88', type: 'example' }
    ],
    commonErrors: [
      { error: '90', feedback: 'That\'s 4th position. The middle (3rd) position has 88.', remediation: 'median-remedial-3' }
    ],
    estimatedTime: 60
  }
];

export const medianMediumQuestions: Question[] = [
  {
    id: 'median-med-1',
    conceptId: 'median',
    type: 'multiple-choice',
    difficulty: 'medium',
    question: 'Find the median of: 12, 8, 15, 9, 11',
    options: [
      '11',
      '12',
      '15',
      '9'
    ],
    correctAnswer: '11',
    explanation: 'Arrange: 8, 9, 11, 12, 15. Middle value (3rd of 5) is 11.',
    hints: [
      { level: 1, content: 'Arrange in order: 8, 9, 11, 12, 15', type: 'procedural' },
      { level: 2, content: 'With 5 numbers, the media is at position 3.', type: 'procedural' },
      { level: 3, content: '11 is at the middle position, so median = 11', type: 'example' }
    ],
    commonErrors: [],
    estimatedTime: 90
  },
  {
    id: 'median-med-2',
    conceptId: 'median',
    type: 'multiple-choice',
    difficulty: 'medium',
    question: 'Find the median of: 22, 18, 30, 26',
    options: [
      '24',
      '22',
      '30',
      '26'
    ],
    correctAnswer: '24',
    explanation: 'Arrange: 18, 22, 26, 30. With 4 numbers, median = average of middle two: (22+26)÷2 = 24',
    hints: [
      { level: 1, content: 'Arrange: 18, 22, 26, 30', type: 'procedural' },
      { level: 2, content: 'With even count (4), average the middle two: 22 and 26', type: 'procedural' },
      { level: 3, content: '(22 + 26) ÷ 2 = 48 ÷ 2 = 24. Median = 24', type: 'example' }
    ],
    commonErrors: [
      { error: '22', feedback: 'That\'s one of the middle numbers, but you need to average both middle numbers!', remediation: 'median-remedial-4' },
      { error: '26', feedback: 'That\'s the other middle number. Average 22 and 26: (22+26)÷2 = 24', remediation: 'median-remedial-4' }
    ],
    estimatedTime: 90
  }
];

// ============================================================================
// TOPIC 7: GRAPHICAL REPRESENTATION - BAR GRAPHS
// ============================================================================

export const barGraphsEasyQuestions: Question[] = [
  {
    id: 'bar-graph-easy-1',
    conceptId: 'bar-graphs',
    type: 'multiple-choice',
    difficulty: 'easy',
    question: 'What is a bar graph used for?',
    options: [
      'To show and compare data using bars of different heights',
      'To draw shapes',
      'To measure temperature',
      'To tell time'
    ],
    correctAnswer: 'To show and compare data using bars of different heights',
    explanation: 'Bar graphs use horizontal or vertical bars to represent data values visually.',
    hints: [
      { level: 1, content: 'Think about a graph with tall and short bars.', type: 'procedural' },
      { level: 2, content: 'Different heights represent different values.', type: 'conceptual' },
      { level: 3, content: 'Bar graphs make it easy to compare values at a glance.', type: 'conceptual' }
    ],
    commonErrors: [],
    estimatedTime: 60
  },
  {
    id: 'bar-graph-easy-2',
    conceptId: 'bar-graphs',
    type: 'multiple-choice',
    difficulty: 'easy',
    question: 'In a bar graph, the horizontal line at the bottom is called the:',
    options: [
      'X-axis',
      'Y-axis',
      'Title',
      'Legend'
    ],
    correctAnswer: 'X-axis',
    explanation: 'The horizontal axis (X-axis) shows categories. The vertical axis (Y-axis) shows values.',
    hints: [
      { level: 1, content: 'The bottom line goes left-right (horizontal).', type: 'procedural' },
      { level: 2, content: 'Horizontal axis = X-axis. Vertical axis = Y-axis.', type: 'conceptual' },
      { level: 3, content: 'X-axis shows categories like "Red, Blue, Green". Y-axis shows numbers.', type: 'example' }
    ],
    commonErrors: [
      { error: 'Y-axis', feedback: 'Y-axis is vertical (up-down). The bottom is the X-axis.', remediation: 'graph-remedial-1' }
    ],
    estimatedTime: 60
  },
  {
    id: 'bar-graph-easy-3',
    conceptId: 'bar-graphs',
    type: 'multiple-choice',
    difficulty: 'easy',
    question: 'What does the height of a bar represent in a bar graph?',
    options: [
      'The value or quantity of that category',
      'The name of the category',
      'The color of the category',
      'The size of the paper'
    ],
    correctAnswer: 'The value or quantity of that category',
    explanation: 'The height shows how much or how many. A taller bar means a higher value.',
    hints: [
      { level: 1, content: 'A tall bar means a big number. A short bar means a small number.', type: 'conceptual' },
      { level: 2, content: 'The higher the bar, the larger the value.', type: 'conceptual' },
      { level: 3, content: 'If Bar A is twice as tall as Bar B, it means value A is twice value B.', type: 'example' }
    ],
    commonErrors: [],
    estimatedTime: 60
  },
  {
    id: 'bar-graph-easy-4',
    conceptId: 'bar-graphs',
    type: 'multiple-choice',
    difficulty: 'easy',
    question: 'A bar graph shows favorite sports: Cricket bar reaches to 25, Football bar reaches to 15. Which is more popular?',
    options: [
      'Cricket (25 > 15)',
      'Football (15 is lower)',
      'Equal popularity',
      'Cannot tell from the graph'
    ],
    correctAnswer: 'Cricket (25 > 15)',
    explanation: 'Cricket\'s bar reaches 25, Football\'s reaches 15. The higher bar represents more students.',
    hints: [
      { level: 1, content: 'Compare the heights: Cricket = 25, Football = 15', type: 'procedural' },
      { level: 2, content: 'Which number is bigger: 25 or 15?', type: 'procedural' },
      { level: 3, content: 'Cricket bar is taller, so cricket is more popular (25 > 15).', type: 'example' }
    ],
    commonErrors: [],
    estimatedTime: 60
  }
];

export const barGraphsMediumQuestions: Question[] = [
  {
    id: 'bar-graph-med-1',
    conceptId: 'bar-graphs',
    type: 'multiple-choice',
    difficulty: 'medium',
    question: 'A bar graph shows: AppleBar=50, OrangeBar=30, BananaBar=?. Y-axis scale: 0, 10, 20, 30, 40, 50, 60. The banana bar reaches 40. How many bananas were sold?',
    options: [
      '40',
      '50',
      '30',
      '60'
    ],
    correctAnswer: '40',
    explanation: 'Read where the banana bar reaches on the Y-axis. It meets the 40 mark.',
    hints: [
      { level: 1, content: 'Look at where the banana bar touches the Y-axis scale.', type: 'procedural' },
      { level: 2, content: 'Trace from the top of the bar to the numbers on the side.', type: 'procedural' },
      { level: 3, content: 'The bar aligns with 40, so 40 bananas were sold.', type: 'example' }
    ],
    commonErrors: [
      { error: '50', feedback: 'That\'s the Apple value, not Banana. Read the correct bar!', remediation: 'graph-remedial-2' }
    ],
    estimatedTime: 90
  },
  {
    id: 'bar-graph-med-2',
    conceptId: 'bar-graphs',
    type: 'multiple-choice',
    difficulty: 'medium',
    question: 'A bar graph needs a scale on the Y-axis. Data: 100, 250, 180, 120. Which scale is BEST?',
    options: [
      '0, 50, 100, 150, 200, 250 (interval of 50)',
      '0, 10, 20, 30, 40 (interval of 10)',
      '0, 500, 1000 (interval of 500)',
      '0, 1, 2, 3 (interval of 1)'
    ],
    correctAnswer: '0, 50, 100, 150, 200, 250 (interval of 50)',
    explanation: 'The highest value is 250. Interval of 50 covers all values clearly (0-250). Others are too small or too large.',
    hints: [
      { level: 1, content: 'What\'s the highest value? 250', type: 'procedural' },
      { level: 2, content: 'The scale must go from 0 to at least 250.', type: 'conceptual' },
      { level: 3, content: 'Interval of 50 fits perfectly: reaches 250 and shows all data clearly.', type: 'example' }
    ],
    commonErrors: [
      { error: '0, 10, 20, 30, 40 (interval of 10)', feedback: 'This only goes to 40, but your highest value is 250! Too small.', remediation: 'graph-remedial-3' },
      { error: '0, 500, 1000 (interval of 500)', feedback: 'This is too large. The bars would be too short to read clearly.', remediation: 'graph-remedial-3' }
    ],
    estimatedTime: 90
  }
];

// ============================================================================
// SUPPLEMENTARY NON-MCQ QUESTIONS (NCERT-STYLE PRACTICE)
// ============================================================================

export const supplementaryOpenEndedQuestions: Question[] = [
  {
    id: 'understand-data-subj-1',
    conceptId: 'understand-data',
    type: 'subjective',
    difficulty: 'easy',
    question: 'In your own words, explain what data means and give one real-life example.',
    correctAnswer: ['data is information', 'facts and figures', 'information collected'],
    explanation: 'A good answer says data is collected information and gives an example like marks, temperatures, or survey results.',
    hints: [
      { level: 1, content: 'Write one sentence for meaning and one sentence for example.', type: 'procedural' },
      { level: 2, content: 'Use words like facts, figures, records, collected information.', type: 'conceptual' },
      { level: 3, content: 'Example: Daily temperature readings are data.', type: 'example' }
    ],
    commonErrors: [],
    estimatedTime: 120
  },
  {
    id: 'collect-data-fill-1',
    conceptId: 'collecting-data',
    type: 'fill-in-blank',
    difficulty: 'easy',
    question: 'Data collected by yourself directly from the source is called ____ data.',
    correctAnswer: ['primary'],
    explanation: 'Primary data is collected first-hand by the investigator.',
    hints: [
      { level: 1, content: 'Think of the word opposite of secondary.', type: 'conceptual' },
      { level: 2, content: 'It starts with letter P.', type: 'procedural' },
      { level: 3, content: 'Primary data means first-hand data.', type: 'example' }
    ],
    commonErrors: [],
    estimatedTime: 90
  },
  {
    id: 'organize-data-subj-1',
    conceptId: 'organizing-data',
    type: 'subjective',
    difficulty: 'easy',
    question: 'Why are tally marks useful when organizing raw data?',
    correctAnswer: ['quick counting', 'easy counting', 'group of five', 'organize counts'],
    explanation: 'Tally marks speed up counting and reduce mistakes, especially when grouped in fives.',
    hints: [
      { level: 1, content: 'Mention speed and clarity.', type: 'conceptual' },
      { level: 2, content: 'Groups of 5 make counting easier.', type: 'procedural' },
      { level: 3, content: 'Example: ||||/ || is faster to read than writing seven lines separately.', type: 'example' }
    ],
    commonErrors: [],
    estimatedTime: 120
  },
  {
    id: 'mean-range-fill-1',
    conceptId: 'mean-and-range',
    type: 'fill-in-blank',
    difficulty: 'easy',
    question: 'Range = highest value minus ____ value.',
    correctAnswer: ['lowest', 'smallest'],
    explanation: 'Range is found by subtracting the smallest value from the largest value.',
    hints: [
      { level: 1, content: 'Think of the opposite of highest.', type: 'conceptual' },
      { level: 2, content: 'The answer can be lowest or smallest.', type: 'procedural' },
      { level: 3, content: 'If values are 5 and 20, range is 20 - 5.', type: 'example' }
    ],
    commonErrors: [],
    estimatedTime: 90
  },
  {
    id: 'mode-subj-1',
    conceptId: 'mode',
    type: 'subjective',
    difficulty: 'easy',
    question: 'How do you identify the mode from a frequency table?',
    correctAnswer: ['highest frequency', 'most frequent', 'largest count'],
    explanation: 'Mode is the value/category with the highest frequency in the table.',
    hints: [
      { level: 1, content: 'Focus on the largest count.', type: 'procedural' },
      { level: 2, content: 'Mode means most frequent value.', type: 'conceptual' },
      { level: 3, content: 'If frequencies are 2, 5, 3 then mode is the category with 5.', type: 'example' }
    ],
    commonErrors: [],
    estimatedTime: 120
  },
  {
    id: 'median-fill-1',
    conceptId: 'median',
    type: 'fill-in-blank',
    difficulty: 'easy',
    question: 'Before finding median, data should be arranged in ____ order.',
    correctAnswer: ['ascending', 'increasing'],
    explanation: 'Median is found after arranging data from smallest to largest (ascending order).',
    hints: [
      { level: 1, content: 'From smallest to largest.', type: 'procedural' },
      { level: 2, content: 'The word starts with A.', type: 'procedural' },
      { level: 3, content: 'Ascending order: 1, 2, 3, 4...', type: 'example' }
    ],
    commonErrors: [],
    estimatedTime: 90
  },
  {
    id: 'bar-graphs-subj-1',
    conceptId: 'bar-graphs',
    type: 'subjective',
    difficulty: 'medium',
    question: 'Write two key rules for choosing a good Y-axis scale in a bar graph.',
    correctAnswer: ['highest value included', 'equal intervals', 'easy intervals', 'clear scale'],
    explanation: 'A good scale should cover the maximum value and use equal, readable intervals.',
    hints: [
      { level: 1, content: 'Mention maximum value and readability.', type: 'conceptual' },
      { level: 2, content: 'Use equal gaps like 10, 20, 30 or 50, 100, 150.', type: 'procedural' },
      { level: 3, content: 'Bad scale example: jumping from 0 to 500 for values near 50.', type: 'example' }
    ],
    commonErrors: [],
    estimatedTime: 150
  }
];

// Export all question banks
export const allQuestionBanks = {
  // Understanding Data
  'understand-data-easy': [
    ...understandingDataEasyQuestions,
    ...supplementaryOpenEndedQuestions.filter((q) => q.conceptId === 'understand-data')
  ],
  'understand-data-medium': understandingDataMediumQuestions,
  'understand-data-hard': understandingDataHardQuestions,
  
  // Collecting Data
  'collecting-data-easy': [
    ...collectingDataEasyQuestions,
    ...supplementaryOpenEndedQuestions.filter((q) => q.conceptId === 'collecting-data')
  ],
  'collecting-data-medium': collectingDataMediumQuestions,
  
  // Organizing Data
  'organizing-data-easy': [
    ...organizingDataEasyQuestions,
    ...supplementaryOpenEndedQuestions.filter((q) => q.conceptId === 'organizing-data')
  ],
  'organizing-data-medium': organizingDataMediumQuestions,
  
  // Mean & Range
  'mean-and-range-easy': [
    ...meanAndRangeEasyQuestions,
    ...supplementaryOpenEndedQuestions.filter((q) => q.conceptId === 'mean-and-range')
  ],
  'mean-and-range-medium': meanAndRangeMediumQuestions,
  
  // Mode
  'mode-easy': [
    ...modeEasyQuestions,
    ...supplementaryOpenEndedQuestions.filter((q) => q.conceptId === 'mode')
  ],
  'mode-medium': modeMediumQuestions,
  
  // Median
  'median-easy': [
    ...medianEasyQuestions,
    ...supplementaryOpenEndedQuestions.filter((q) => q.conceptId === 'median')
  ],
  'median-medium': medianMediumQuestions,
  
  // Bar Graphs
  'bar-graphs-easy': [
    ...barGraphsEasyQuestions,
    ...supplementaryOpenEndedQuestions.filter((q) => q.conceptId === 'bar-graphs')
  ],
  'bar-graphs-medium': barGraphsMediumQuestions
};
