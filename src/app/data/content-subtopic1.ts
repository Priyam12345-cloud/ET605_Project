import type { Chapter, Subtopic, Concept, Question } from '../types/domain-model';

// Complete Data Handling Chapter for Grade 7
export const dataHandlingChapter: Chapter = {
  id: 'data-handling',
  title: 'Data Handling',
  description: 'Learn to collect, organize, represent, and analyze data to make informed decisions',
  learningGoals: [
    'Understand what data is and how to collect it systematically',
    'Organize raw data into meaningful frequency distributions',
    'Represent data visually using various types of graphs and charts',
    'Calculate and interpret measures of central tendency',
    'Analyze data to draw conclusions and make predictions'
  ],
  totalEstimatedTime: 60,
  subtopics: []
};

// Subtopic 1: Introduction to Data & Data Collection
export const subtopic1: Subtopic = {
  id: 'intro-data-collection',
  chapterId: 'data-handling',
  title: 'Introduction to Data & Data Collection',
  order: 1,
  description: 'Discover what data is and learn systematic methods to collect it',
  icon: 'Database',
  overview: `Data is everywhere around us! From the temperature each day to the number of students in your class, data helps us understand the world. In this section, you'll learn what data is, why it's important, and how to collect it properly.`,
  realWorldApplication: 'Scientists collect data to study climate change, doctors collect patient data to improve treatments, and businesses collect customer data to improve their products. Learning to work with data is a crucial skill for the modern world!',
  concepts: []
};

// Concept 1.1: What is Data?
const concept1_1: Concept = {
  id: 'what-is-data',
  subtopicId: 'intro-data-collection',
  title: 'What is Data?',
  order: 1,
  introduction: `Imagine you're planning a class picnic. You need to know: How many students are coming? What food do they like? What games do they want to play? All these pieces of information are examples of **data**.`,
  mainContent: [
    `**Definition**: Data is a collection of facts, observations, or measurements that give us information about something. Data can be numbers, words, or even images!`,
    
    `**Types of Data:**
    
1. **Numerical Data (Quantitative)**: Data that consists of numbers and can be measured or counted.
   - *Discrete Data*: Can only take specific values (usually counted). Example: Number of students (23, 24, 25... not 23.5!)
   - *Continuous Data*: Can take any value within a range (usually measured). Example: Height (152.3 cm, 152.35 cm...)
   
2. **Categorical Data (Qualitative)**: Data that describes qualities or characteristics.
   - *Nominal Data*: Categories with no order. Example: Favorite colors (red, blue, green)
   - *Ordinal Data*: Categories with a meaningful order. Example: Rating (poor, fair, good, excellent)`,
    
    `**Why is Data Important?**
    
Data helps us:
- Make informed decisions (Should we bring umbrellas? Check weather data!)
- Identify patterns (Do students score better after breakfast? Analyze test score data!)
- Solve problems (Too much traffic? Study traffic data to find solutions!)
- Predict future events (Will it rain tomorrow? Meteorologists use weather data!)`,
    
    `**Data vs Information:**
    
*Data* is raw facts: 35, 28, 42, 31, 39 (temperatures in °C)
*Information* is data with context: "The average temperature last week was 35°C, which is unusually hot for this time of year."

Data becomes information when we organize and analyze it!`
  ],
  keyTakeaways: [
    'Data is a collection of facts, observations, or measurements',
    'Numerical data consists of numbers; categorical data describes qualities',
    'Discrete data can be counted; continuous data can be measured to any precision',
    'Data becomes information when we organize and interpret it'
  ],
  examples: [
    {
      id: 'ex1-basic',
      type: 'basic',
      title: 'Identifying Data Types',
      content: `Let's identify the type of data in each case:
      
1. **Number of books in your backpack**: 3, 5, 2, 4
   - Type: Discrete Numerical Data (can be counted, specific values)
   
2. **Your favorite subject**: Math, Science, English, Art
   - Type: Nominal Categorical Data (categories, no natural order)
   
3. **Test grades**: A, B, C, D, F
   - Type: Ordinal Categorical Data (categories with order)
   
4. **Time taken to run 100m**: 15.3s, 16.7s, 14.9s
   - Type: Continuous Numerical Data (can be measured precisely)`,
      explanation: 'Understanding data types helps us choose the right methods to analyze and represent data.'
    },
    {
      id: 'ex1-story',
      type: 'story',
      title: 'Maya\'s Pet Survey Adventure',
      content: `Maya wanted to know what pets her classmates had. She went around asking everyone:

"I have a dog!" said Rahul.
"I have 2 cats," said Priya.
"I have a goldfish," said Arjun.
"I don't have any pets," said Sneha.
"I have 1 rabbit and 3 chickens," said Kiran.

Maya wrote everything down. But then she realized her data was messy! She needed to organize it better.

She decided to collect:
1. **Type of pet** (categorical data): Dog, Cat, Fish, Rabbit, Chicken, None
2. **Number of pets** (discrete numerical data): 0, 1, 2, 3, 4...

This made it much easier to see patterns! Most students had either a dog or a cat, and the average number of pets was about 1.5 per student.`,
      explanation: 'Planning what data to collect and how to organize it makes analysis much easier!'
    },
    {
      id: 'ex1-real-world',
      type: 'real-world',
      title: 'Real-World Data in Action',
      content: `**Example 1: Sports Statistics**
A cricket team tracks:
- Runs scored (discrete numerical)
- Overs bowled (discrete numerical)
- Player positions (categorical)
- Match outcomes (categorical: win/loss/tie)

**Example 2: Weather Forecasting**
Meteorologists collect:
- Temperature (continuous numerical)
- Rainfall (continuous numerical)
- Cloud cover (ordinal categorical: clear, partly cloudy, cloudy, overcast)
- Wind direction (nominal categorical: N, S, E, W)

**Example 3: Online Shopping**
E-commerce sites track:
- Purchase amount (continuous numerical)
- Number of items (discrete numerical)
- Product category (nominal categorical)
- Customer satisfaction (ordinal categorical: 1-5 stars)`,
      explanation: 'Every field uses data to make better decisions!'
    }
  ],
  questions: [
    {
      id: 'q1-1',
      conceptId: 'what-is-data',
      question: 'Which of the following is an example of discrete numerical data?',
      type: 'mcq',
      options: [
        'The weight of a book',
        'The number of pages in a book',
        'The height of a bookshelf',
        'The temperature in the library'
      ],
      correctAnswer: 'The number of pages in a book',
      explanation: 'Number of pages is discrete because you can count pages (200, 201, 202...) but not have fractional pages. Weight, height, and temperature are continuous because they can be measured to any precision.',
      hints: [
        'Think about whether this value can be counted or measured',
        'Discrete data involves counting whole items, not measuring',
        'Can you have half a page in this context?'
      ],
      difficulty: 'easy',
      errorPatterns: {
        'The weight of a book': {
          type: 'conceptual',
          feedback: 'Weight is continuous data because it can be measured to any precision (e.g., 245.67 grams). Discrete data can only take specific whole number values.'
        },
        'The height of a bookshelf': {
          type: 'conceptual',
          feedback: 'Height is continuous data because it can be measured with increasing precision (e.g., 180.5 cm, 180.53 cm). Look for something that involves counting.'
        },
        'The temperature in the library': {
          type: 'conceptual',
          feedback: 'Temperature is continuous data because it can take any value (e.g., 22.5°C, 22.53°C). Discrete data involves counting distinct items.'
        }
      }
    },
    {
      id: 'q1-2',
      conceptId: 'what-is-data',
      question: 'Classify the following data: "Movie ratings: Excellent, Good, Average, Poor"',
      type: 'mcq',
      options: [
        'Discrete numerical data',
        'Continuous numerical data',
        'Nominal categorical data',
        'Ordinal categorical data'
      ],
      correctAnswer: 'Ordinal categorical data',
      explanation: 'Movie ratings are ordinal categorical data because they represent categories (not numbers) that have a meaningful order from best to worst.',
      hints: [
        'Are these numbers or categories (words)?',
        'If categories, do they have a natural order or ranking?',
        'Ordinal means "having an order"'
      ],
      difficulty: 'medium',
      errorPatterns: {
        'Nominal categorical data': {
          type: 'conceptual',
          feedback: 'While this is categorical data, nominal means no order. These ratings clearly have an order from best (Excellent) to worst (Poor), so they\'re ordinal.'
        },
        'Discrete numerical data': {
          type: 'conceptual',
          feedback: 'These are words (categories), not numbers. Even though ratings could be converted to numbers, in this form they are categorical data.'
        }
      }
    },
    {
      id: 'q1-3',
      conceptId: 'what-is-data',
      question: 'A teacher records: "Number of students absent: Monday-3, Tuesday-1, Wednesday-5, Thursday-2, Friday-4". What type of data is this?',
      type: 'mcq',
      options: [
        'Continuous numerical data',
        'Discrete numerical data',
        'Ordinal categorical data',
        'Nominal categorical data'
      ],
      correctAnswer: 'Discrete numerical data',
      explanation: 'The number of absent students is discrete numerical data because we count students (whole numbers), and we cannot have a fractional number of students.',
      hints: [
        'Are we counting or measuring?',
        'Can we have 2.5 absent students?',
        'This involves numbers that can only be specific values'
      ],
      difficulty: 'easy'
    },
    {
      id: 'q1-4',
      conceptId: 'what-is-data',
      question: 'Which statement best describes the difference between data and information?',
      type: 'mcq',
      options: [
        'Data and information are exactly the same thing',
        'Data is organized facts; information is raw facts',
        'Data is raw facts; information is organized and interpreted data',
        'Data is always numbers; information is always words'
      ],
      correctAnswer: 'Data is raw facts; information is organized and interpreted data',
      explanation: 'Data consists of raw, unprocessed facts. When we organize, analyze, and interpret data, it becomes information that helps us make decisions.',
      hints: [
        'Think about which comes first: raw facts or interpreted results?',
        'Information has context and meaning added to it',
        'Data is transformed into information through processing'
      ],
      difficulty: 'medium'
    }
  ],
  videos: [
    {
      id: 'vid1-1',
      title: 'What is Data? | Introduction to Data Handling',
      description: 'A fun animated introduction to data and its types',
      url: 'https://www.youtube.com/embed/XcVfaaux9oc',
      duration: 300
    }
  ],
  interactiveActivities: [
    {
      id: 'activity1-1',
      type: 'sorting',
      title: 'Data Type Sorter',
      description: 'Sort different examples into the correct data type category',
      component: 'DataTypeSorter',
      learningObjective: 'Identify and classify different types of data'
    }
  ],
  prerequisites: [],
  relatedConcepts: ['data-collection-methods'],
  estimatedTime: 8,
  difficulty: 'easy',
  learningObjectives: [
    'Define what data is',
    'Distinguish between numerical and categorical data',
    'Understand the difference between discrete and continuous data',
    'Recognize the difference between data and information'
  ]
};

// Due to length constraints, I'll create a comprehensive structure and continue with other concepts
// Continuing with more concepts...

export const concept1_2: Concept = {
  id: 'data-collection-methods',
  subtopicId: 'intro-data-collection',
  title: 'Methods of Data Collection',
  order: 2,
  introduction: `Now that you know what data is, how do you collect it? Imagine you're a detective gathering clues, or a scientist conducting experiments. The way you collect data can make a big difference in how useful it is!`,
  mainContent: [
    `**Primary Data Collection:**

Primary data is information you collect yourself, directly from the source. It's like being a reporter getting a firsthand account!

**1. Surveys and Questionnaires**
- Written or digital forms with questions
- Can reach many people quickly
- Good for: Opinions, preferences, behaviors
- Example: "What is your favorite lunch item?" survey for the school cafeteria

**2. Observations**
- Watching and recording what happens
- No interference with the subject
- Good for: Natural behaviors, patterns
- Example: Counting how many cars pass by your school in an hour

**3. Experiments**
- Controlled tests to find cause and effect
- Can change variables and measure results
- Good for: Scientific investigations
- Example: Testing which soil type helps plants grow fastest

**4. Interviews**
- One-on-one or group conversations
- Detailed, in-depth information
- Good for: Personal experiences, detailed opinions
- Example: Interviewing the school principal about new policies`,

    `**Secondary Data Collection:**

Secondary data is information that someone else has already collected. It's like using a library to research a topic!

**Sources of Secondary Data:**
- Books and encyclopedias
- Government reports and census data
- Research papers and journals
- Websites and online databases
- Newspapers and magazines
- School records and archives

**Example**: If you want to know the population of India over the last 50 years, you would use secondary data from census records rather than trying to count everyone yourself!`,

    `**Choosing the Right Method:**

Consider these factors:
1. **Your Question**: What do you want to find out?
2. **Time Available**: How quickly do you need the data?
3. **Resources**: What tools and budget do you have?
4. **Sample Size**: How many people/things do you need to study?
5. **Accuracy Needed**: How precise must your data be?`,

    `**Tips for Good Data Collection:**

✓ **Be Systematic**: Follow a clear plan and method
✓ **Be Consistent**: Collect data the same way each time
✓ **Be Accurate**: Record data carefully without errors
✓ **Be Honest**: Don't change data to fit expectations
✓ **Be Complete**: Don't skip important information
✓ **Be Organized**: Label and date all your data

Remember: "Garbage in, garbage out" - Poor data collection leads to poor conclusions!`
  ],
  keyTakeaways: [
    'Primary data is collected directly by you; secondary data is collected by others',
    'Different collection methods include surveys, observations, experiments, and interviews',
    'Choose collection methods based on your research question and resources',
    'Systematic and accurate collection is essential for reliable data'
  ],
  examples: [
    {
      id: 'ex2-story',
      type: 'story',
      title: 'Rohan\'s Science Fair Project',
      content: `Rohan wanted to find out: "Do students concentrate better with music or silence?"

**Planning Data Collection:**
First, Rohan thought about his options:

**Option 1: Survey** (asking students their opinion)
- Pro: Easy and quick
- Con: People might not remember accurately

**Option 2: Experiment** (testing it himself)
- Pro: Gets real data, not just opinions
- Con: Takes more time and planning

Rohan chose the experiment!

**His Method:**
1. Got permission from his teacher
2. Selected 20 volunteer students
3. Day 1: Students solved 10 math problems in silence (15 minutes)
4. Day 2: Same students solved 10 similar problems with soft music (15 minutes)
5. Recorded: Time taken and number of correct answers

**Primary Data Collected:**
- Time per problem (continuous numerical)
- Number correct (discrete numerical)
- Student feedback (categorical)

**Secondary Data Used:**
- Research papers on music and concentration
- Brain science articles about focus

**Result:** Rohan found that 60% of students solved problems faster with music, but 70% made fewer errors in silence! The data showed music helps speed but silence helps accuracy.`,
      explanation: 'Combining primary data (your experiment) with secondary data (existing research) gives stronger evidence!'
    },
    {
      id: 'ex2-real-world',
      type: 'real-world',
      title: 'Real-World Data Collection',
      content: `**Case 1: Traffic Management**
Problem: Too much traffic congestion in the city

Primary Data Collection:
- Sensors count cars passing each hour
- Cameras record traffic flow
- Surveys ask commuters about travel times

Secondary Data Used:
- Historical traffic patterns
- Population growth data
- Urban planning records

**Case 2: New Restaurant Menu**
Problem: Restaurant wants to improve its menu

Primary Data Collection:
- Customer feedback cards
- Sales data (which dishes sell most)
- Observation (which dishes get compliments)
- Taste-testing focus groups

Secondary Data Used:
- Food trend reports
- Nutritional guidelines
- Competitor menu analysis

**Case 3: Crop Yield Improvement**
Problem: Farmers want to increase harvest

Primary Data Collection:
- Soil testing in different fields
- Daily weather measurements
- Crop growth observations
- Yield measurements at harvest

Secondary Data Used:
- Historical climate data
- Agricultural research studies
- Best practices from farming journals`,
      explanation: 'Real-world problem-solving almost always combines multiple data collection methods!'
    }
  ],
  questions: [
    {
      id: 'q2-1',
      conceptId: 'data-collection-methods',
      question: 'You want to find out the favorite ice cream flavor of students in your school. Which is the BEST primary data collection method?',
      type: 'mcq',
      options: [
        'Reading a newspaper article about popular ice cream flavors',
        'Checking ice cream sales data from last year',
        'Conducting a survey asking each student their favorite flavor',
        'Looking up national ice cream preferences online'
      ],
      correctAnswer: 'Conducting a survey asking each student their favorite flavor',
      explanation: 'A survey is the best primary method because it collects fresh data directly from your target group (students in your school). The other options are secondary data sources.',
      hints: [
        'Remember: primary data means YOU collect it yourself',
        'Which option involves directly asking YOUR school students?',
        'Secondary data is information someone else already collected'
      ],
      difficulty: 'easy',
      errorPatterns: {
        'Reading a newspaper article about popular ice cream flavors': {
          type: 'conceptual',
          feedback: 'This is secondary data - information collected and published by someone else. You need to collect primary data directly from your school students.'
        },
        'Checking ice cream sales data from last year': {
          type: 'conceptual',
          feedback: 'This is secondary data, and it might not reflect current preferences or your specific school population.'
        }
      }
    },
    {
      id: 'q2-2',
      conceptId: 'data-collection-methods',
      question: 'A researcher wants to study how students behave in the library without influencing their behavior. Which method is most appropriate?',
      type: 'mcq',
      options: [
        'Survey',
        'Interview',
        'Observation',
        'Experiment'
      ],
      correctAnswer: 'Observation',
      explanation: 'Observation is best when you want to see natural behavior without interference. Surveys and interviews involve direct interaction, and experiments involve manipulation of variables.',
      hints: [
        'The key phrase is "without influencing their behavior"',
        'Which method lets you watch without interacting?',
        'Think about a wildlife documentary - how do they study animals?'
      ],
      difficulty: 'medium'
    },
    {
      id: 'q2-3',
      conceptId: 'data-collection-methods',
      question: 'Which of the following is an example of secondary data?',
      type: 'mcq',
      options: [
        'Recording the temperature outside your classroom every hour for a week',
        'Interviewing your classmates about their favorite sports',
        'Using census data to find the population of your city',
        'Conducting an experiment on plant growth'
      ],
      correctAnswer: 'Using census data to find the population of your city',
      explanation: 'Census data is collected and published by the government - you are using data someone else collected, which makes it secondary data. All other options involve you collecting data yourself (primary data).',
      hints: [
        'Secondary data is collected by someone else, not by you',
        'Which data was already collected before you needed it?',
        'Census is a large-scale data collection by the government'
      ],
      difficulty: 'easy'
    }
  ],
  videos: [
    {
      id: 'vid2-1',
      title: 'Data Collection Methods Explained',
      description: 'Learn about different ways to collect data with real examples',
      url: 'https://www.youtube.com/embed/XYZ123',
      duration: 420
    }
  ],
  interactiveActivities: [
    {
      id: 'activity2-1',
      type: 'matching',
      title: 'Match the Method',
      description: 'Match research scenarios with the most appropriate data collection method',
      component: 'MethodMatcher',
      learningObjective: 'Select appropriate data collection methods for different scenarios'
    }
  ],
  prerequisites: ['what-is-data'],
  relatedConcepts: ['what-is-data', 'data-accuracy'],
  estimatedTime: 10,
  difficulty: 'medium',
  learningObjectives: [
    'Distinguish between primary and secondary data',
    'Identify appropriate data collection methods for different situations',
    'Understand the importance of systematic data collection',
    'Recognize factors that influence choice of collection method'
  ]
};

// Add concepts to subtopic
subtopic1.concepts = [concept1_1, concept1_2];

// Export for use in domain model
export { concept1_1, concept1_2 };
