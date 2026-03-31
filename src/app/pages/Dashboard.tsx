import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { useLearner, LearnerProvider } from '../context/LearnerContext';
import {
  Brain,
  BookOpen,
  Trophy,
  TrendingUp,
  Clock,
  Target,
  Zap,
  BarChart3,
  PlayCircle,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { domainModel } from '../data/domain-model';
import { useAuth } from '../context/AuthContext';

function DashboardContent() {
  const navigate = useNavigate();
  const { learnerState, resetProgress } = useLearner();
  const { user, logout } = useAuth();

  if (!learnerState) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading your learning dashboard...</p>
        </div>
      </div>
    );
  }

  const { stateVector } = learnerState;
  const totalConcepts = Object.keys(stateVector.conceptMasteryMap).length;
  const masteredConcepts = Object.values(stateVector.conceptMasteryMap).filter(
    c => c.masteryLevel === 'mastered'
  ).length;

  const overallProgress = totalConcepts > 0
    ? (masteredConcepts / totalConcepts) * 100
    : 0;

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const getMasteryColor = (probability: number) => {
    if (probability >= 0.85) return 'text-green-600 bg-green-100';
    if (probability >= 0.6) return 'text-blue-600 bg-blue-100';
    if (probability >= 0.3) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getMasteryLabel = (probability: number) => {
    if (probability >= 0.85) return 'Mastered';
    if (probability >= 0.6) return 'Proficient';
    if (probability >= 0.3) return 'Developing';
    return 'Novice';
  };

  // Get available concepts from domain model
  const allConcepts = domainModel.chapters[0]?.subtopics[0]?.concepts || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Learning Dashboard</h1>
            <p className="text-gray-600">Track your progress and continue your learning journey</p>
            {user && <p className="text-blue-700 font-semibold mt-1">Hey {user.name}!</p>}
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => {
                logout();
                navigate('/login');
              }}
            >
              Logout
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/analytics')}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </Button>
            <Button
              variant="outline"
              onClick={resetProgress}
            >
              Reset Progress
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <div className="flex items-center justify-between mb-2">
                <Trophy className="w-8 h-8 opacity-80" />
                <Badge className="bg-white/20 text-white border-0">
                  {Math.round(overallProgress)}%
                </Badge>
              </div>
              <p className="text-sm opacity-90 mb-1">Overall Progress</p>
              <p className="text-2xl font-bold">{masteredConcepts} / {totalConcepts || '...'} Concepts</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <div className="flex items-center justify-between mb-2">
                <Clock className="w-8 h-8 opacity-80" />
              </div>
              <p className="text-sm opacity-90 mb-1">Time Spent Learning</p>
              <p className="text-2xl font-bold">{formatTime(stateVector.totalTimeSpent)}</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 bg-gradient-to-br from-green-500 to-green-600 text-white">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-8 h-8 opacity-80" />
              </div>
              <p className="text-sm opacity-90 mb-1">Learning Velocity</p>
              <p className="text-2xl font-bold">{(stateVector.learningVelocity * 100).toFixed(1)}%</p>
              <p className="text-xs opacity-80">mastery per hour</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
              <div className="flex items-center justify-between mb-2">
                <Zap className="w-8 h-8 opacity-80" />
              </div>
              <p className="text-sm opacity-90 mb-1">Engagement Score</p>
              <p className="text-2xl font-bold">{Math.round(stateVector.engagementScore * 100)}%</p>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Domain Mastery */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                Domain Mastery Levels
              </h2>
              <div className="space-y-4">
                {Object.entries(stateVector.masteryProbabilities).map(([domain, probability], index) => {
                  const percentage = Math.round(probability * 100);
                  return (
                    <motion.div
                      key={domain}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium capitalize">
                            {domain.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                          <Badge className={getMasteryColor(probability)}>
                            {getMasteryLabel(probability)}
                          </Badge>
                        </div>
                        <span className="text-sm font-semibold">{percentage}%</span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </motion.div>
                  );
                })}
              </div>
            </Card>

            {/* Continue Learning */}
            <Card className="p-6 mt-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-purple-600" />
                Available Concepts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {allConcepts.slice(0, 4).map((concept, index) => {
                  const mastery = stateVector.conceptMasteryMap[concept.id];
                  const masteryPercent = mastery ? Math.round(mastery.masteryProbability * 100) : 0;
                  
                  return (
                    <motion.div
                      key={concept.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.05 * index }}
                    >
                      <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-white to-gray-50"
                        onClick={() => navigate(`/concept/${concept.id}`)}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-sm mb-1">{concept.name}</h3>
                            <p className="text-xs text-gray-600 line-clamp-2">{concept.description}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {concept.difficulty}
                          </Badge>
                          {mastery && (
                            <span className="text-xs font-medium">{masteryPercent}%</span>
                          )}
                        </div>
                        {mastery && (
                          <Progress value={masteryPercent} className="h-1 mt-2" />
                        )}
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
              <Button
                className="w-full mt-4"
                onClick={() => navigate('/learn')}
              >
                View All Concepts
                <PlayCircle className="ml-2 w-4 h-4" />
              </Button>
            </Card>
          </div>

          {/* Student State Insights */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-blue-600" />
                Your Learning Profile
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Average Response Time</span>
                    <span className="text-sm text-gray-600">
                      {(stateVector.averageResponseTime / 1000).toFixed(1)}s
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500"
                      style={{
                        width: `${Math.min(100, (stateVector.averageResponseTime / 120000) * 100)}%`
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Hint Dependency</span>
                    <span className="text-sm text-gray-600">
                      {Math.round(stateVector.hintDependencyRate * 100)}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        stateVector.hintDependencyRate > 0.5 ? 'bg-orange-500' : 'bg-green-500'
                      }`}
                      style={{
                        width: `${stateVector.hintDependencyRate * 100}%`
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Persistence Level</span>
                    <span className="text-sm text-gray-600">
                      {Math.round(stateVector.persistenceLevel * 100)}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-500"
                      style={{
                        width: `${stateVector.persistenceLevel * 100}%`
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Reliability Score</span>
                    <span className="text-sm text-gray-600">
                      {Math.round(stateVector.reliabilityScore.overallScore * 100)}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500"
                      style={{
                        width: `${stateVector.reliabilityScore.overallScore * 100}%`
                      }}
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Error Patterns */}
            {stateVector.errorPatterns.length > 0 && (
              <Card className="p-6">
                <h2 className="text-lg font-bold mb-4">Common Error Patterns</h2>
                <div className="space-y-3">
                  {stateVector.errorPatterns.slice(0, 3).map((pattern, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                      <div className="w-6 h-6 bg-red-200 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-red-700">{pattern.frequency}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium capitalize">{pattern.errorType}</p>
                        <p className="text-xs text-gray-600">Focus on improving this area</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Quick Actions */}
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50">
              <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  onClick={() => navigate('/learn')}
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Browse All Topics
                </Button>
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  onClick={() => navigate('/analytics')}
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Detailed Analytics
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <LearnerProvider>
      <DashboardContent />
    </LearnerProvider>
  );
}
