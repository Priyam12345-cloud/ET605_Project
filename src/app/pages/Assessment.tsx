import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Label } from '../components/ui/label';
import { Progress } from '../components/ui/progress';
import { Alert, AlertDescription } from '../components/ui/alert';
import { useLearner, LearnerProvider } from '../context/LearnerContext';
import { pedagogicalService } from '../services/pedagogical-service';
import { domainModel } from '../data/domain-model';
import { chapter2 } from '../data/chapters-2-3';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Lightbulb,
  TrendingUp,
  Clock,
  Award,
  Brain,
  ChevronRight,
  Flag
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

function AssessmentContent() {
  const { conceptId } = useParams();
  const navigate = useNavigate();
  const { learnerState, recordInteraction } = useLearner();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [hintsRevealed, setHintsRevealed] = useState<number[]>([]);
  const [attemptedQuestions, setAttemptedQuestions] = useState<Set<string>>(new Set());
  const [startTime, setStartTime] = useState(Date.now());
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [consecutiveErrors, setConsecutiveErrors] = useState(0);
  const [sessionComplete, setSessionComplete] = useState(false);

  // Find the concept
  const allConcepts = [
    ...domainModel.chapters[0].subtopics[0].concepts,
    ...(chapter2.subtopics[0]?.concepts || [])
  ];
  
  const concept = allConcepts.find(c => c.id === conceptId);
  const questions = concept?.assessmentQuestions || [];
  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    setQuestionStartTime(Date.now());
    setSelectedAnswer('');
    setShowFeedback(false);
    setHintsRevealed([]);
  }, [currentQuestionIndex]);

  if (!concept) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl mb-4">Concept not found</p>
          <Button onClick={() => navigate('/learn')}>Back to Learning Path</Button>
        </div>
      </div>
    );
  }

  if (!learnerState) {
    return <div>Loading...</div>;
  }

  const mastery = learnerState.stateVector.conceptMasteryMap[concept.id];
  const masteryPercent = mastery ? Math.round(mastery.masteryProbability * 100) : 0;

  const handleRevealHint = (hintIndex: number) => {
    if (!hintsRevealed.includes(hintIndex)) {
      setHintsRevealed([...hintsRevealed, hintIndex]);
      recordInteraction(
        concept.id,
        currentQuestion.id,
        'hint_requested'
      );
      toast.info('Hint revealed!', {
        description: 'Take your time to understand the hint.'
      });
    }
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) {
      toast.error('Please select an answer first');
      return;
    }

    const responseTime = Date.now() - questionStartTime;
    const correct = selectedAnswer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);

    // Determine error type if incorrect
    let errorType: string | undefined;
    if (!correct) {
      const commonError = currentQuestion.commonErrors?.find(e => e.error === selectedAnswer);
      errorType = commonError ? 'conceptual' : 'calculation';
    }

    // Record the interaction
    recordInteraction(
      concept.id,
      currentQuestion.id,
      'question_attempt',
      selectedAnswer,
      correct,
      responseTime,
      errorType
    );

    // Update consecutive counts
    if (correct) {
      setConsecutiveCorrect(prev => prev + 1);
      setConsecutiveErrors(0);
      
      // Celebrate on correct answer
      if (consecutiveCorrect + 1 >= 3) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        toast.success('Amazing! You\'re on a roll! 🎉');
      } else {
        toast.success('Correct! Well done! ✓');
      }
    } else {
      setConsecutiveErrors(prev => prev + 1);
      setConsecutiveCorrect(0);
      toast.error('Not quite right', {
        description: 'Review the explanation and try the next question'
      });
    }

    setAttemptedQuestions(new Set([...attemptedQuestions, currentQuestion.id]));

    // Make pedagogical decision
    const context = {
      currentConcept: concept.id,
      studentState: learnerState.stateVector,
      recentInteractions: learnerState.interactionHistory.slice(-10),
      timeInCurrentConcept: Date.now() - startTime,
      consecutiveErrors: consecutiveErrors + (correct ? 0 : 1),
      consecutiveCorrect: consecutiveCorrect + (correct ? 1 : 0)
    };

    const decision = pedagogicalService.makeInstructionalDecision(context);
    
    // Handle decision
    if (decision.action === 'remediate') {
      toast.warning(decision.reason, {
        duration: 5000
      });
    } else if (decision.action === 'advance') {
      toast.success(decision.reason, {
        duration: 5000
      });
    } else if (decision.action === 'take_break') {
      toast.info(decision.reason, {
        duration: 5000
      });
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Assessment complete
      setSessionComplete(true);
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 }
      });
      toast.success('Assessment Complete!', {
        description: `You've completed all questions for ${concept.name}`
      });
    }
  };

  const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;

  if (sessionComplete) {
    const finalMastery = learnerState.stateVector.conceptMasteryMap[concept.id];
    const finalMasteryPercent = finalMastery ? Math.round(finalMastery.masteryProbability * 100) : 0;
    const improvement = finalMasteryPercent - masteryPercent;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="max-w-2xl mx-auto p-8 text-center bg-gradient-to-br from-white to-green-50">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-white" />
              </div>
              
              <h1 className="text-4xl font-bold mb-4">Assessment Complete!</h1>
              <p className="text-xl text-gray-600 mb-8">
                Great job completing the practice questions for {concept.name}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <Card className="p-4 bg-blue-50">
                  <p className="text-sm text-gray-600 mb-1">Current Mastery</p>
                  <p className="text-3xl font-bold text-blue-600">{finalMasteryPercent}%</p>
                </Card>
                <Card className="p-4 bg-green-50">
                  <p className="text-sm text-gray-600 mb-1">Improvement</p>
                  <p className="text-3xl font-bold text-green-600">+{improvement}%</p>
                </Card>
                <Card className="p-4 bg-purple-50">
                  <p className="text-sm text-gray-600 mb-1">Questions Answered</p>
                  <p className="text-3xl font-bold text-purple-600">{attemptedQuestions.size}</p>
                </Card>
                <Card className="p-4 bg-orange-50">
                  <p className="text-sm text-gray-600 mb-1">Mastery Level</p>
                  <p className="text-2xl font-bold text-orange-600 capitalize">
                    {finalMastery?.masteryLevel || 'Developing'}
                  </p>
                </Card>
              </div>

              <div className="space-y-3">
                <Button
                  size="lg"
                  className="w-full"
                  onClick={() => navigate('/learn')}
                >
                  Continue Learning
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate('/dashboard')}
                >
                  View Dashboard
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="outline"
            onClick={() => navigate(`/concept/${concept.id}`)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Concept
          </Button>
          <Badge className="text-lg px-4 py-2">
            Question {currentQuestionIndex + 1} of {questions.length}
          </Badge>
        </div>

        {/* Progress Bar */}
        <Card className="p-4 mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium">Assessment Progress</span>
            <span className="font-semibold">{Math.round(progressPercent)}%</span>
          </div>
          <Progress value={progressPercent} className="h-3" />
        </Card>

        {/* Current Status */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-xs text-gray-600">Mastery</p>
                <p className="text-xl font-bold">{masteryPercent}%</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-xs text-gray-600">Streak</p>
                <p className="text-xl font-bold">{consecutiveCorrect}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100">
            <div className="flex items-center gap-3">
              <Lightbulb className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-xs text-gray-600">Hints Used</p>
                <p className="text-xl font-bold">{hintsRevealed.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-100">
            <div className="flex items-center gap-3">
              <Flag className="w-8 h-8 text-orange-600" />
              <div>
                <p className="text-xs text-gray-600">Answered</p>
                <p className="text-xl font-bold">{attemptedQuestions.size}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card className="p-8 mb-6">
              {/* Question Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <Badge className="mb-3 capitalize">
                    {currentQuestion.difficulty} • {currentQuestion.type}
                  </Badge>
                  <h2 className="text-2xl font-bold mb-4">{currentQuestion.question}</h2>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>~{currentQuestion.estimatedTime}s</span>
                </div>
              </div>

              {/* Answer Options */}
              {!showFeedback && currentQuestion.options && (
                <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                  <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                      >
                        <Card
                          className={`p-4 cursor-pointer transition-all ${
                            selectedAnswer === option
                              ? 'border-2 border-blue-500 bg-blue-50'
                              : 'hover:border-gray-300 hover:bg-gray-50'
                          }`}
                          onClick={() => setSelectedAnswer(option)}
                        >
                          <div className="flex items-center gap-3">
                            <RadioGroupItem value={option} id={`option-${index}`} />
                            <Label
                              htmlFor={`option-${index}`}
                              className="flex-1 cursor-pointer text-base"
                            >
                              {option}
                            </Label>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </RadioGroup>
              )}

              {/* Feedback */}
              {showFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Alert className={isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}>
                    <div className="flex items-start gap-3">
                      {isCorrect ? (
                        <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <h3 className={`font-bold text-lg mb-2 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                          {isCorrect ? 'Correct! Well done!' : 'Not quite right'}
                        </h3>
                        <AlertDescription className="text-gray-700">
                          {currentQuestion.explanation}
                        </AlertDescription>
                        {!isCorrect && (
                          <p className="mt-3 font-semibold text-gray-800">
                            Correct answer: {currentQuestion.correctAnswer}
                          </p>
                        )}
                      </div>
                    </div>
                  </Alert>

                  {/* Common Error Feedback */}
                  {!isCorrect && currentQuestion.commonErrors && (
                    <>
                      {currentQuestion.commonErrors
                        .filter(e => e.error === selectedAnswer)
                        .map((error, index) => (
                          <Alert key={index} className="mt-4 border-orange-500 bg-orange-50">
                            <AlertDescription>
                              <p className="font-semibold text-orange-800 mb-2">Common Mistake:</p>
                              <p className="text-gray-700">{error.feedback}</p>
                            </AlertDescription>
                          </Alert>
                        ))}
                    </>
                  )}
                </motion.div>
              )}

              {/* Submit/Next Button */}
              <div className="mt-6">
                {!showFeedback ? (
                  <Button
                    size="lg"
                    onClick={handleSubmitAnswer}
                    disabled={!selectedAnswer}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Submit Answer
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    onClick={handleNextQuestion}
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  >
                    {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Assessment'}
                    <ChevronRight className="ml-2 w-5 h-5" />
                  </Button>
                )}
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Hints Section */}
        {!showFeedback && currentQuestion.hints && currentQuestion.hints.length > 0 && (
          <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-600" />
              Need Help? Use These Hints
            </h3>
            <div className="space-y-3">
              {currentQuestion.hints.map((hint, index) => (
                <div key={index}>
                  {hintsRevealed.includes(index) ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                    >
                      <Alert className="bg-white border-yellow-300">
                        <AlertDescription>
                          <p className="font-semibold text-sm text-yellow-800 mb-1">
                            Hint {index + 1} ({hint.type}):
                          </p>
                          <p className="text-gray-700">{hint.content}</p>
                        </AlertDescription>
                      </Alert>
                    </motion.div>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={() => handleRevealHint(index)}
                      disabled={index > 0 && !hintsRevealed.includes(index - 1)}
                      className="w-full"
                    >
                      Reveal Hint {index + 1}
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-600 mt-4">
              Note: Using hints will affect your mastery score calculation
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}

export default function Assessment() {
  return (
    <LearnerProvider>
      <AssessmentContent />
    </LearnerProvider>
  );
}
