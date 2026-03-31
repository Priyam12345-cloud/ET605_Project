import { useMemo, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Label } from '../components/ui/label';
import { Progress } from '../components/ui/progress';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Textarea } from '../components/ui/textarea';
import { useLearner } from '../context/LearnerContext';
import { adaptiveQuestionSelectionService } from '../services/adaptive-question-selection';
import { domainModel } from '../data/domain-model';
import barGraphIllustration from '../assets/bar-graph-illustration.svg';
import type { Question } from '../types/domain-model';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Clock,
  Award,
  Brain,
  ChevronRight,
  Eye,
  BookOpen,
  Sparkles,
  TriangleAlert
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

function normalizeAnswer(input: string) {
  return input.trim().toLowerCase().replace(/\s+/g, ' ');
}

function formatTimer(totalSeconds: number) {
  const safe = Math.max(0, totalSeconds);
  const mins = Math.floor(safe / 60)
    .toString()
    .padStart(2, '0');
  const secs = Math.floor(safe % 60)
    .toString()
    .padStart(2, '0');
  return `${mins}:${secs}`;
}

function isCorrectForQuestion(question: Question, learnerInput: string): boolean {
  const normalizedInput = normalizeAnswer(learnerInput);
  const expected = Array.isArray(question.correctAnswer)
    ? question.correctAnswer
    : [question.correctAnswer];

  const normalizedExpected = expected.map((entry) => normalizeAnswer(String(entry)));

  if (question.type === 'subjective') {
    return normalizedExpected.some(
      (entry) => normalizedInput.includes(entry) || entry.includes(normalizedInput)
    );
  }

  return normalizedExpected.includes(normalizedInput);
}

function AssessmentEnhancedContent() {
  const { conceptId } = useParams();
  const navigate = useNavigate();
  const { learnerState, recordInteraction } = useLearner();

  const [questionsPool, setQuestionsPool] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [typedAnswer, setTypedAnswer] = useState('');
  const [currentHintLevel, setCurrentHintLevel] = useState(0);
  const [attemptsOnCurrentQuestion, setAttemptsOnCurrentQuestion] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [usedQuestionIds, setUsedQuestionIds] = useState<Set<string>>(new Set());
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [consecutiveErrors, setConsecutiveErrors] = useState(0);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [showAdaptiveMessage, setShowAdaptiveMessage] = useState(false);
  const [adaptiveMessage, setAdaptiveMessage] = useState('');
  const [timerSecondsLeft, setTimerSecondsLeft] = useState(0);
  const [mustReturnToLesson, setMustReturnToLesson] = useState(false);

  const allConcepts = domainModel.chapters[0]?.subtopics[0]?.concepts || [];
  const concept = allConcepts.find((c) => c.id === conceptId);

  const goToLearningPath = () => {
    navigate('/learn');
  };

  useEffect(() => {
    if (concept) {
      const initialQuestions = adaptiveQuestionSelectionService.getAvailableQuestionsForConcept(concept.id);
      setQuestionsPool(initialQuestions);
    }
  }, [concept]);

  const currentQuestion = questionsPool[currentQuestionIndex];

  useEffect(() => {
    if (!currentQuestion) return;
    setQuestionStartTime(Date.now());
    setSelectedAnswer('');
    setTypedAnswer('');
    setCurrentHintLevel(0);
    setAttemptsOnCurrentQuestion(0);
    setShowSolution(false);
    setIsCorrect(null);
    setMustReturnToLesson(false);
    setTimerSecondsLeft(currentQuestion.estimatedTime);
  }, [currentQuestionIndex, currentQuestion]);

  useEffect(() => {
    if (!currentQuestion || timerSecondsLeft <= 0 || isCorrect !== null) return;
    const timer = window.setInterval(() => {
      setTimerSecondsLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [timerSecondsLeft, currentQuestion, isCorrect]);

  useEffect(() => {
    if (timerSecondsLeft === 0 && isCorrect === null && currentQuestion) {
      toast.warning('Time is up for this question.', {
        description: 'You can still submit, or go back to lesson review.'
      });
    }
  }, [timerSecondsLeft, isCorrect, currentQuestion]);

  const answerForSubmission = useMemo(() => {
    if (!currentQuestion) return '';
    return currentQuestion.type === 'multiple-choice' ? selectedAnswer : typedAnswer;
  }, [currentQuestion, selectedAnswer, typedAnswer]);

  if (!concept || questionsPool.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl mb-4">Concept not found or loading questions...</p>
          <Button onClick={goToLearningPath}>Back to Learning Path</Button>
        </div>
      </div>
    );
  }

  if (!learnerState) {
    return <div>Loading...</div>;
  }

  const mastery = learnerState.stateVector.conceptMasteryMap[concept.id];
  const masteryPercent = mastery ? Math.round(mastery.masteryProbability * 100) : 0;
  const masteryLevel = mastery?.masteryLevel || 'novice';

  const handleViewSolution = () => {
    if (!currentQuestion) return;
    setShowSolution(true);
    recordInteraction(concept.id, currentQuestion.id, 'hint_requested');
    toast.info('Solution shown. Review it carefully before the next question.');
  };

  const handleSubmitAnswer = () => {
    if (!currentQuestion) return;
    if (!answerForSubmission.trim()) {
      toast.error('Please enter/select an answer first.');
      return;
    }

    const responseTime = Date.now() - questionStartTime;
    const correct = isCorrectForQuestion(currentQuestion, answerForSubmission);
    const nextAttempts = attemptsOnCurrentQuestion + 1;

    setIsCorrect(correct);
    setAttemptsOnCurrentQuestion(nextAttempts);

    let errorType: string | undefined;
    if (!correct) {
      errorType = currentQuestion.type === 'multiple-choice' ? 'conceptual' : 'calculation';
    }

    recordInteraction(
      concept.id,
      currentQuestion.id,
      'question_attempt',
      answerForSubmission,
      correct,
      responseTime,
      errorType
    );

    if (correct) {
      const nextCorrectStreak = consecutiveCorrect + 1;
      setConsecutiveCorrect(nextCorrectStreak);
      setConsecutiveErrors(0);
      setUsedQuestionIds((prev) => new Set([...prev, currentQuestion.id]));

      if (nextCorrectStreak >= 3) {
        confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
      }

      toast.success('Correct answer!');
      return;
    }

    const nextErrorStreak = consecutiveErrors + 1;
    setConsecutiveErrors(nextErrorStreak);
    setConsecutiveCorrect(0);

    if (nextAttempts <= currentQuestion.hints.length) {
      setCurrentHintLevel(nextAttempts);
      const hintToShow = currentQuestion.hints[nextAttempts - 1];
      toast.error('Incorrect. Here is your next hint.', {
        description: hintToShow?.content || 'Review the concept and try again.'
      });
      return;
    }

    setMustReturnToLesson(true);
    setShowSolution(true);
    toast.error('You have used all hint levels. Please go back to lesson review now.');
  };

  const handleNextQuestion = () => {
    if (!currentQuestion || !learnerState) return;

    const hasNextInCurrentPool = currentQuestionIndex < questionsPool.length - 1;

    if (hasNextInCurrentPool) {
      setCurrentQuestionIndex((prev) => prev + 1);
      return;
    }

    const recentInteractions = learnerState.interactionHistory.slice(-10);

    const adaptiveResult = adaptiveQuestionSelectionService.selectNextQuestions({
      conceptId: concept.id,
      studentMasteryLevel: masteryLevel as 'novice' | 'developing' | 'proficient' | 'mastered',
      recentInteractions,
      consecutiveCorrect,
      consecutiveErrors,
      totalAttemptsOnConcept: recentInteractions.length,
      previouslyUsedQuestionIds: usedQuestionIds
    });

    setShowAdaptiveMessage(true);
    setAdaptiveMessage(adaptiveResult.reason);

    const newQuestions = adaptiveResult.questions.filter(
      (q) => !usedQuestionIds.has(q.id) && q.id !== currentQuestion.id
    );
    const appendedCount = newQuestions.length;

    if (appendedCount > 0) {
      setQuestionsPool((prev) => [...prev, ...newQuestions]);
    }

    window.setTimeout(() => {
      setShowAdaptiveMessage(false);
      if (hasNextInCurrentPool || appendedCount > 0) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        setSessionComplete(true);
      }
    }, 900);
  };

  const handleRetryCurrent = () => {
    setIsCorrect(null);
    if (currentQuestion?.type === 'multiple-choice') {
      setSelectedAnswer('');
    } else {
      setTypedAnswer('');
    }
    setQuestionStartTime(Date.now());
  };

  if (sessionComplete) {
    const finalMastery = learnerState.stateVector.conceptMasteryMap[concept.id];
    const finalMasteryPercent = finalMastery ? Math.round(finalMastery.masteryProbability * 100) : 0;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <Card className="max-w-2xl mx-auto p-8 text-center bg-gradient-to-br from-white to-green-50">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Award className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Assessment Complete!</h1>
          <p className="text-xl text-gray-600 mb-8">Great work on {concept.name}.</p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <Card className="p-4 bg-blue-50">
              <p className="text-sm text-gray-600 mb-1">Current Mastery</p>
              <p className="text-3xl font-bold text-blue-600">{finalMasteryPercent}%</p>
            </Card>
            <Card className="p-4 bg-purple-50">
              <p className="text-sm text-gray-600 mb-1">Questions Answered</p>
              <p className="text-3xl font-bold text-purple-600">{usedQuestionIds.size}</p>
            </Card>
          </div>

          <div className="space-y-3">
            <Button size="lg" className="w-full" onClick={goToLearningPath}>
              Continue Learning
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="w-full" onClick={() => navigate('/dashboard')}>
              View Dashboard
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (!currentQuestion) {
    return <div className="text-center py-8">Loading question...</div>;
  }

  const isMcq = currentQuestion.type === 'multiple-choice' && Array.isArray(currentQuestion.options);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" onClick={() => navigate(`/concept/${concept.id}`)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Concept
          </Button>

          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-lg">
              <Brain className="w-4 h-4 mr-1" />
              Mastery: {masteryPercent}%
            </Badge>
            <Badge variant={timerSecondsLeft <= 15 ? 'destructive' : 'secondary'} className="text-lg">
              <Clock className="w-4 h-4 mr-1" />
              {formatTimer(timerSecondsLeft)}
            </Badge>
            <Badge className="text-lg">
              <BookOpen className="w-4 h-4 mr-1" />
              {currentQuestionIndex + 1} / {Math.min(questionsPool.length, 20)}
            </Badge>
          </div>
        </div>

        <Progress
          value={((currentQuestionIndex + 1) / Math.min(questionsPool.length, 20)) * 100}
          className="mb-8 h-2"
        />

        <AnimatePresence>
          {showAdaptiveMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6"
            >
              <Alert className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                <Sparkles className="h-4 w-4 text-purple-600" />
                <AlertDescription className="text-blue-900 font-semibold">{adaptiveMessage}</AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div key={currentQuestion.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-8 mb-8 shadow-lg bg-white border-2 border-transparent hover:border-blue-100">
            <div className="mb-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary">{currentQuestion.difficulty}</Badge>
                    <Badge variant="outline">{currentQuestion.type}</Badge>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{currentQuestion.question}</h2>
                </div>
                <div className="text-right ml-4">
                  <p className="text-sm text-gray-500">Attempts: {attemptsOnCurrentQuestion}</p>
                </div>
              </div>

              {concept.id === 'bar-graphs' && (
                <div className="mb-4 rounded-lg border bg-slate-50 p-3">
                  <img src={barGraphIllustration} alt="Bar graph support visual" className="w-full rounded-md border" />
                </div>
              )}

              {isCorrect !== null && (
                <Alert className={isCorrect ? 'bg-green-50 border-green-200 mb-4' : 'bg-red-50 border-red-200 mb-4'}>
                  {isCorrect ? (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-600" />
                  )}
                  <AlertDescription className={isCorrect ? 'text-green-900 font-semibold' : 'text-red-900 font-semibold'}>
                    {isCorrect ? 'Correct! Great job.' : 'Incorrect. Review the hint shown below and try again.'}
                  </AlertDescription>
                </Alert>
              )}
            </div>

            <div className="mb-8">
              {isMcq ? (
                <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                  <div className="space-y-3">
                    {currentQuestion.options?.map((option, index) => (
                      <Label
                        key={index}
                        className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          selectedAnswer === option ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <RadioGroupItem value={option} id={`option-${index}`} />
                        <span className="text-base">{option}</span>
                      </Label>
                    ))}
                  </div>
                </RadioGroup>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="typed-answer" className="text-sm font-semibold">
                    Write your answer:
                  </Label>
                  <Textarea
                    id="typed-answer"
                    value={typedAnswer}
                    onChange={(e) => setTypedAnswer(e.target.value)}
                    placeholder="Type your answer here..."
                    rows={4}
                  />
                </div>
              )}
            </div>

            {currentHintLevel > 0 && !showSolution && (
              <div className="mb-6 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
                <p className="text-sm font-semibold text-yellow-900 mb-2">Hint Progress</p>
                <div className="space-y-2">
                  {currentQuestion.hints.slice(0, currentHintLevel).map((hint) => (
                    <p key={hint.level} className="text-sm text-yellow-800">
                      Hint {hint.level}: {hint.content}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {(showSolution || mustReturnToLesson) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg"
              >
                <div className="flex items-start gap-3">
                  <Eye className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <p className="font-semibold text-blue-900 mb-2">Solution:</p>
                    <p className="text-sm text-blue-800 mb-2">{currentQuestion.explanation}</p>

                    {mustReturnToLesson && (
                      <Alert className="mt-3 border-orange-200 bg-orange-50">
                        <TriangleAlert className="h-4 w-4 text-orange-700" />
                        <AlertDescription className="text-orange-800 font-medium">
                          You have reached the final hint level and still got it wrong. Please revisit the lesson before continuing.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            <div className="flex gap-3 flex-wrap">
              {isCorrect === null && !mustReturnToLesson && (
                <Button onClick={handleSubmitAnswer} size="lg" className="flex-1 bg-blue-600 hover:bg-blue-700">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Submit Answer
                </Button>
              )}

              {isCorrect === false && !mustReturnToLesson && (
                <Button onClick={handleRetryCurrent} size="lg" variant="outline" className="flex-1">
                  Try Again
                </Button>
              )}

              {isCorrect === false && !mustReturnToLesson && currentHintLevel >= currentQuestion.hints.length && (
                <Button onClick={handleViewSolution} size="lg" variant="outline" className="flex-1">
                  <Eye className="w-4 h-4 mr-2" />
                  View Solution
                </Button>
              )}

              {mustReturnToLesson && (
                <Button onClick={() => navigate(`/concept/${concept.id}`)} size="lg" className="flex-1 bg-orange-600 hover:bg-orange-700">
                  Go Back To Lesson
                </Button>
              )}

              {(isCorrect === true || showSolution) && !mustReturnToLesson && (
                <Button onClick={handleNextQuestion} size="lg" className="flex-1 bg-green-600 hover:bg-green-700">
                  <ChevronRight className="w-4 h-4 mr-2" />
                  {consecutiveCorrect >= 2 ? 'Next Level' : 'Next Question'}
                </Button>
              )}
            </div>
          </Card>
        </motion.div>

        <div className="grid grid-cols-4 gap-4 mb-8">
          <Card className="p-4 bg-blue-50">
            <p className="text-sm text-gray-600 mb-1">Consecutive ✓</p>
            <p className="text-3xl font-bold text-blue-600">{consecutiveCorrect}</p>
          </Card>
          <Card className="p-4 bg-red-50">
            <p className="text-sm text-gray-600 mb-1">Consecutive ✗</p>
            <p className="text-3xl font-bold text-red-600">{consecutiveErrors}</p>
          </Card>
          <Card className="p-4 bg-purple-50">
            <p className="text-sm text-gray-600 mb-1">Questions Done</p>
            <p className="text-3xl font-bold text-purple-600">{usedQuestionIds.size}</p>
          </Card>
          <Card className="p-4 bg-green-50">
            <p className="text-sm text-gray-600 mb-1">Current Mastery</p>
            <p className="text-3xl font-bold text-green-600">{masteryPercent}%</p>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function AssessmentEnhanced() {
  return <AssessmentEnhancedContent />;
}
