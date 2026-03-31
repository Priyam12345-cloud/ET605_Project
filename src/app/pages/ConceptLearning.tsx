import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Progress } from '../components/ui/progress';
import { useLearner } from '../context/LearnerContext';
import { domainModel } from '../data/domain-model';
import barGraphIllustration from '../assets/bar-graph-illustration.svg';
import defaultInteractiveVideo from '../../Videos/Recording 2026-03-30 122143.mp4';
import {
  ArrowLeft,
  BookOpen,
  PlayCircle,
  CheckCircle2,
  Lightbulb,
  Target,
  Clock,
  Award
} from 'lucide-react';
import { motion } from 'motion/react';

const fallbackVideoPath = '/Videos/Recording 2026-03-30 122143.mp4';

export default function ConceptLearning() {
  const { conceptId } = useParams();
  const navigate = useNavigate();
  const { learnerState, recordInteraction } = useLearner();
  const [activeTab, setActiveTab] = useState('theory');

  const concepts = domainModel.chapters[0]?.subtopics[0]?.concepts || [];
  const concept = concepts.find((c) => c.id === conceptId);

  const goToLearningPath = () => {
    navigate('/learn');
  };

  const goToPractice = () => {
    const target = `/assessment/${concept?.id}`;
    navigate(target);
  };

  useEffect(() => {
    if (concept && activeTab !== 'assessment') {
      const action =
        activeTab === 'theory'
          ? 'video_watched'
          : activeTab === 'examples'
          ? 'example_viewed'
          : 'game_played';
      recordInteraction(concept.id, `${concept.id}_${activeTab}`, action);
    }
  }, [activeTab, concept, recordInteraction]);

  if (!concept) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl mb-4">Concept not found</p>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" onClick={goToLearningPath}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Learning Path
          </Button>
          <Badge
            className={
              masteryPercent >= 70
                ? 'bg-green-100 text-green-800'
                : masteryPercent >= 40
                ? 'bg-blue-100 text-blue-800'
                : 'bg-yellow-100 text-yellow-800'
            }
          >
            {mastery ? mastery.masteryLevel : 'Not Started'}
          </Badge>
        </div>

        <Card className="p-6 mb-6 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{concept.name}</h1>
              <p className="text-gray-600 mb-4">{concept.description}</p>

              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">{concept.estimatedTime} minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600 capitalize">{concept.difficulty}</span>
                </div>
                {mastery && (
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-600">{mastery.attemptCount} attempts</span>
                  </div>
                )}
              </div>

              {mastery && (
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Mastery Progress</span>
                    <span className="font-semibold">{masteryPercent}%</span>
                  </div>
                  <Progress value={masteryPercent} className="h-3" />
                </div>
              )}
            </div>
          </div>
        </Card>

        <Card className="p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            Learning Objectives
          </h2>
          <ul className="space-y-2">
            {concept.learningObjectives.map((objective, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-start gap-3"
              >
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-blue-600">{index + 1}</span>
                </div>
                <span>{objective}</span>
              </motion.li>
            ))}
          </ul>
        </Card>

        <Card className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="theory" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Theory
              </TabsTrigger>
              <TabsTrigger value="examples" className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                Examples
              </TabsTrigger>
              <TabsTrigger value="interactive" className="flex items-center gap-2">
                <PlayCircle className="w-4 h-4" />
                Interactive
              </TabsTrigger>
              <TabsTrigger value="assessment" className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Practice
              </TabsTrigger>
            </TabsList>

            <TabsContent value="theory" className="space-y-6">
              {concept.theory.map((content, index) => (
                <motion.div
                  key={content.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="p-6 bg-gradient-to-br from-white to-blue-50">
                    <h3 className="text-2xl font-bold mb-4">{content.title}</h3>
                    <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content.content }} />

                    {concept.id === 'bar-graphs' && (
                      <div className="mt-6 rounded-lg border bg-white p-4">
                        <p className="font-semibold text-gray-700 mb-3">Bar Graph Visual Example</p>
                        <img
                          src={barGraphIllustration}
                          alt="Bar graph illustration"
                          className="w-full rounded-md border"
                        />
                      </div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="examples" className="space-y-6">
              {concept.examples.map((example, index) => (
                <motion.div
                  key={example.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="p-6 bg-gradient-to-br from-white to-green-50">
                    <h3 className="text-2xl font-bold mb-4">{example.title}</h3>

                    <div className="mb-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                      <h4 className="font-semibold mb-2">Story Context:</h4>
                      <p className="text-gray-700">{example.context}</p>
                    </div>

                    <div className="mb-4 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                      <h4 className="font-semibold mb-2">Problem:</h4>
                      <p className="text-gray-700">{example.problem}</p>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold mb-3">Step-by-Step Solution:</h4>
                      <ol className="space-y-2">
                        {example.steps.map((step, stepIndex) => (
                          <li key={stepIndex} className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                              {stepIndex + 1}
                            </div>
                            <span className="pt-0.5">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                      <h4 className="font-semibold mb-2">Complete Solution:</h4>
                      <p className="text-gray-700">{example.solution}</p>
                    </div>

                    {concept.id === 'bar-graphs' && (
                      <div className="mt-6 rounded-lg border bg-white p-4">
                        <p className="font-semibold text-gray-700 mb-3">Graph Reference Image</p>
                        <img
                          src={barGraphIllustration}
                          alt="Bar graph reference"
                          className="w-full rounded-md border"
                        />
                      </div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="interactive" className="space-y-6">
              {(concept.interactiveActivities.length > 0 ? concept.interactiveActivities : [
                {
                  id: `${concept.id}-fallback-video`,
                  type: 'video',
                  title: `Interactive Session: ${concept.name}`,
                  content: 'Use this shared interactive video while topic-specific videos are being prepared.',
                  duration: 180,
                  metadata: {
                    videoUrl: fallbackVideoPath,
                    interactiveComponent: 'shared-video-player'
                  }
                }
              ]).map((activity, index) => {
                const videoUrl = defaultInteractiveVideo;
                return (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Card className="p-8 bg-gradient-to-br from-white to-purple-50">
                      <h3 className="text-2xl font-bold mb-2">{activity.title}</h3>
                      <p className="text-gray-600 mb-4">{activity.content}</p>

                      <div className="rounded-lg border bg-black overflow-hidden">
                        <video controls className="w-full" preload="metadata">
                          <source src={videoUrl} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>

                      {concept.id === 'bar-graphs' && (
                        <div className="mt-4 rounded-lg border bg-white p-4">
                          <p className="font-semibold text-gray-700 mb-2">Use this picture while watching</p>
                          <img
                            src={barGraphIllustration}
                            alt="Bar graph support visual"
                            className="w-full rounded-md border"
                          />
                        </div>
                      )}
                    </Card>
                  </motion.div>
                );
              })}
            </TabsContent>

            <TabsContent value="assessment">
              <Card className="p-6 bg-gradient-to-br from-white to-yellow-50 text-center">
                <CheckCircle2 className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">Ready to Practice?</h3>
                <p className="text-gray-600 mb-6">
                  Test your understanding with {concept.assessmentQuestions.length} practice questions.
                  The system adapts to your performance and includes MCQ + subjective question types.
                </p>
                <Button
                  size="lg"
                  onClick={goToPractice}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Start Practice Questions
                  <ArrowLeft className="ml-2 w-5 h-5 rotate-180" />
                </Button>
              </Card>
            </TabsContent>
          </Tabs>
        </Card>

        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={goToLearningPath}>
            Back to Learning Path
          </Button>
          <Button onClick={goToPractice} className="bg-gradient-to-r from-blue-600 to-purple-600">
            Go to Practice
            <ArrowLeft className="ml-2 w-4 h-4 rotate-180" />
          </Button>
        </div>
      </div>
    </div>
  );
}
