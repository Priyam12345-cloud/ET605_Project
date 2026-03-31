import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { useLearner, LearnerProvider } from '../context/LearnerContext';
import { domainModel } from '../data/domain-model';
import {
  ArrowLeft,
  BookOpen,
  Lock,
  CheckCircle2,
  Clock,
  Target,
  PlayCircle,
  LightbulbIcon
} from 'lucide-react';
import { motion } from 'motion/react';

function LearningPathContent() {
  const navigate = useNavigate();
  const { learnerState } = useLearner();

  if (!learnerState) {
    return <div>Loading...</div>;
  }

  // Get concepts from the new comprehensive curriculum
  const concepts = domainModel.chapters[0].subtopics[0].concepts;

  const getConceptStatus = (conceptId: string, prerequisites: string[]) => {
    const mastery = learnerState.stateVector.conceptMasteryMap[conceptId];
    
    // Check if prerequisites are met
    const prereqsMet = prerequisites.every(prereqId => {
      const prereqMastery = learnerState.stateVector.conceptMasteryMap[prereqId];
      return prereqMastery && prereqMastery.masteryProbability >= 0.6;
    });

    if (mastery && mastery.masteryLevel === 'mastered') {
      return { status: 'completed', color: 'green', icon: CheckCircle2 };
    } else if (mastery && mastery.attemptCount > 0) {
      return { status: 'in-progress', color: 'blue', icon: PlayCircle };
    } else if (prereqsMet || prerequisites.length === 0) {
      return { status: 'available', color: 'purple', icon: BookOpen };
    } else {
      return { status: 'locked', color: 'gray', icon: Lock };
    }
  };

  const getMasteryBadge = (conceptId: string) => {
    const mastery = learnerState.stateVector.conceptMasteryMap[conceptId];
    if (!mastery) return null;

    const percentage = Math.round(mastery.masteryProbability * 100);
    let colorClass = 'bg-gray-100 text-gray-800';
    
    if (percentage >= 85) colorClass = 'bg-green-100 text-green-800';
    else if (percentage >= 60) colorClass = 'bg-blue-100 text-blue-800';
    else if (percentage >= 30) colorClass = 'bg-yellow-100 text-yellow-800';
    else colorClass = 'bg-red-100 text-red-800';

    return (
      <Badge className={colorClass}>
        {percentage}% - {mastery.masteryLevel}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Dashboard
          </Button>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Learning Path</h1>
            <p className="text-gray-600">Choose a concept to learn</p>
          </div>
        </div>

        {/* Main Chapter - Data Handling */}
        <Card className="p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-blue-600">📊</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold">{domainModel.chapters[0].title}</h2>
              <p className="text-gray-600">{domainModel.chapters[0].description}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {concepts.map((concept, index) => {
              const { status, color, icon: StatusIcon } = getConceptStatus(
                concept.id,
                concept.prerequisites
              );
              const isLocked = status === 'locked';
              const isCompleted = status === 'completed';
              const mastery = learnerState.stateVector.conceptMasteryMap[concept.id];

              return (
                <motion.div
                  key={concept.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card
                    className={`p-5 h-full transition-all ${
                      isLocked
                        ? 'opacity-60 cursor-not-allowed'
                        : 'hover:shadow-lg cursor-pointer'
                    } ${
                      isCompleted
                        ? 'border-2 border-green-300 bg-green-50/30'
                        : status === 'in-progress'
                        ? 'border-2 border-blue-300 bg-blue-50/30'
                        : ''
                    }`}
                    onClick={() => !isLocked && navigate(`/concept/${concept.id}`)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-10 h-10 bg-${color}-100 rounded-full flex items-center justify-center`}>
                        <StatusIcon className={`w-5 h-5 text-${color}-600`} />
                      </div>
                      {getMasteryBadge(concept.id)}
                    </div>

                    <h3 className="font-bold text-lg mb-2">{concept.name}</h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {concept.description}
                    </p>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{concept.estimatedTime} min</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Target className="w-4 h-4" />
                        <span className="capitalize">{concept.difficulty}</span>
                      </div>

                      {mastery && mastery.attemptCount > 0 && (
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-600">Mastery Progress</span>
                            <span className="font-medium">
                              {Math.round(mastery.masteryProbability * 100)}%
                            </span>
                          </div>
                          <Progress
                            value={mastery.masteryProbability * 100}
                            className="h-2"
                          />
                        </div>
                      )}

                      {isLocked && concept.prerequisites.length > 0 && (
                        <div className="flex items-start gap-2 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                          <Lock className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                          <p className="text-xs text-yellow-800">
                            Complete: {concept.prerequisites.map(p => {
                              const prereqConcept = concepts.find(c => c.id === p);
                              return prereqConcept?.name;
                            }).join(', ')}
                          </p>
                        </div>
                      )}
                    </div>

                    {!isLocked && (
                      <Button
                        className="w-full mt-4"
                        variant={isCompleted ? 'outline' : 'default'}
                        onClick={() => navigate(`/concept/${concept.id}`)}
                      >
                        {isCompleted ? 'Review' : status === 'in-progress' ? 'Continue' : 'Start Learning'}
                      </Button>
                    )}
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </Card>

        {/* Learning Tips */}
        <Card className="p-6 mt-6 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <LightbulbIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Learning Tips</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Complete concepts in order for the best learning experience</li>
                <li>• Take your time with examples and practice questions</li>
                <li>• Use hints when you're stuck - they're designed to help you learn!</li>
                <li>• Review concepts with lower mastery scores to strengthen your understanding</li>
                <li>• The system adapts to your pace - don't rush!</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default function LearningPath() {
  return (
    <LearnerProvider>
      <LearningPathContent />
    </LearnerProvider>
  );
}
