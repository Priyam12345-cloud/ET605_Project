import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useLearner, LearnerProvider } from '../context/LearnerContext';
import {
  ArrowLeft,
  TrendingUp,
  Clock,
  Target,
  Brain,
  Zap,
  AlertCircle,
  Award,
  BarChart3
} from 'lucide-react';
import { motion } from 'motion/react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];

function AnalyticsContent() {
  const navigate = useNavigate();
  const { learnerState } = useLearner();

  if (!learnerState) {
    return <div>Loading...</div>;
  }

  const { stateVector, interactionHistory } = learnerState;

  // Prepare data for charts
  const domainMasteryData = Object.entries(stateVector.masteryProbabilities).map(([domain, value]) => ({
    domain: domain.replace(/([A-Z])/g, ' $1').trim(),
    mastery: Math.round(value * 100),
    fullMark: 100
  }));

  const conceptMasteryData = Object.entries(stateVector.conceptMasteryMap).map(([id, mastery]) => ({
    name: id.split('-').pop() || id,
    mastery: Math.round(mastery.masteryProbability * 100),
    attempts: mastery.attemptCount,
    avgTime: Math.round(mastery.avgResponseTime / 1000)
  }));

  const timeRangeData = [
    { range: 'Fast (<30s)', reliability: Math.round(stateVector.reliabilityScore.timeRangeReliability.fast * 100) },
    { range: 'Medium (30-90s)', reliability: Math.round(stateVector.reliabilityScore.timeRangeReliability.medium * 100) },
    { range: 'Slow (>90s)', reliability: Math.round(stateVector.reliabilityScore.timeRangeReliability.slow * 100) }
  ];

  const errorPatternData = stateVector.errorPatterns
    .slice(0, 5)
    .map(pattern => ({
      type: pattern.errorType,
      frequency: pattern.frequency
    }));

  // Performance metrics
  const totalAttempts = interactionHistory.filter(i => i.action === 'question_attempt').length;
  const correctAttempts = interactionHistory.filter(i => i.action === 'question_attempt' && i.isCorrect).length;
  const accuracy = totalAttempts > 0 ? Math.round((correctAttempts / totalAttempts) * 100) : 0;

  const hintsRequested = interactionHistory.filter(i => i.action === 'hint_requested').length;
  const contentViewed = interactionHistory.filter(i => 
    ['video_watched', 'example_viewed', 'game_played'].includes(i.action)
  ).length;

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  // Learning progress over time
  const progressData = Object.values(stateVector.conceptMasteryMap)
    .sort((a, b) => a.lastAttempt - b.lastAttempt)
    .map((mastery, index) => ({
      attempt: index + 1,
      mastery: Math.round(mastery.masteryProbability * 100)
    }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Learning Analytics</h1>
              <p className="text-gray-600">Detailed insights into your learning journey</p>
            </div>
          </div>
        </div>

        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <div className="flex items-center justify-between mb-2">
                <Target className="w-8 h-8 opacity-80" />
              </div>
              <p className="text-sm opacity-90 mb-1">Overall Accuracy</p>
              <p className="text-3xl font-bold">{accuracy}%</p>
              <p className="text-xs opacity-80 mt-1">{correctAttempts} / {totalAttempts} correct</p>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <div className="flex items-center justify-between mb-2">
                <Brain className="w-8 h-8 opacity-80" />
              </div>
              <p className="text-sm opacity-90 mb-1">Avg Response Time</p>
              <p className="text-3xl font-bold">{(stateVector.averageResponseTime / 1000).toFixed(1)}s</p>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="p-6 bg-gradient-to-br from-green-500 to-green-600 text-white">
              <div className="flex items-center justify-between mb-2">
                <Zap className="w-8 h-8 opacity-80" />
              </div>
              <p className="text-sm opacity-90 mb-1">Engagement</p>
              <p className="text-3xl font-bold">{Math.round(stateVector.engagementScore * 100)}%</p>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="p-6 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
              <div className="flex items-center justify-between mb-2">
                <Clock className="w-8 h-8 opacity-80" />
              </div>
              <p className="text-sm opacity-90 mb-1">Time Invested</p>
              <p className="text-3xl font-bold">{formatTime(stateVector.totalTimeSpent)}</p>
            </Card>
          </motion.div>
        </div>

        {/* Main Analytics Tabs */}
        <Tabs defaultValue="mastery" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="mastery">Mastery Analysis</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="behavior">Learning Behavior</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          {/* Mastery Analysis */}
          <TabsContent value="mastery" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Domain Mastery Radar */}
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Domain Mastery Profile</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={domainMasteryData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="domain" tick={{ fontSize: 12 }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar name="Mastery" dataKey="mastery" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                  </RadarChart>
                </ResponsiveContainer>
                <p className="text-sm text-gray-600 mt-4 text-center">
                  Your mastery across different data handling domains
                </p>
              </Card>

              {/* Concept Mastery Bar Chart */}
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Concept-Level Mastery</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={conceptMasteryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                    <YAxis domain={[0, 100]} />
                    <RechartsTooltip />
                    <Bar dataKey="mastery" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
                <p className="text-sm text-gray-600 mt-4 text-center">
                  Mastery percentage for each concept attempted
                </p>
              </Card>

              {/* Learning Progress Over Time */}
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Learning Progress Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="attempt" label={{ value: 'Concepts Attempted', position: 'insideBottom', offset: -5 }} />
                    <YAxis domain={[0, 100]} label={{ value: 'Mastery %', angle: -90, position: 'insideLeft' }} />
                    <RechartsTooltip />
                    <Legend />
                    <Line type="monotone" dataKey="mastery" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
                <p className="text-sm text-gray-600 mt-4 text-center">
                  How your mastery has improved over time
                </p>
              </Card>

              {/* Concept Details Table */}
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Detailed Concept Statistics</h3>
                <div className="space-y-3 max-h-[300px] overflow-y-auto">
                  {conceptMasteryData.map((concept, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{concept.name}</p>
                        <div className="flex gap-4 text-xs text-gray-600 mt-1">
                          <span>{concept.attempts} attempts</span>
                          <span>{concept.avgTime}s avg</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">{concept.mastery}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Performance Analysis */}
          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Response Time Reliability */}
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Response Time Reliability</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={timeRangeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" />
                    <YAxis domain={[0, 100]} />
                    <RechartsTooltip />
                    <Bar dataKey="reliability" fill="#f59e0b" />
                  </BarChart>
                </ResponsiveContainer>
                <p className="text-sm text-gray-600 mt-4 text-center">
                  Your accuracy at different response speeds
                </p>
              </Card>

              {/* Error Patterns */}
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Error Pattern Distribution</h3>
                {errorPatternData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={errorPatternData}
                        dataKey="frequency"
                        nameKey="type"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                      >
                        {errorPatternData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-[300px] text-gray-500">
                    <div className="text-center">
                      <Award className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <p>Great job! No significant error patterns detected.</p>
                    </div>
                  </div>
                )}
                <p className="text-sm text-gray-600 mt-4 text-center">
                  Common types of mistakes you've made
                </p>
              </Card>

              {/* Performance Metrics */}
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Performance Breakdown</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Overall Reliability</span>
                      <span className="text-sm font-semibold">
                        {Math.round(stateVector.reliabilityScore.overallScore * 100)}%
                      </span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-green-500"
                        style={{ width: `${stateVector.reliabilityScore.overallScore * 100}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Consistency Score</span>
                      <span className="text-sm font-semibold">
                        {Math.round(stateVector.reliabilityScore.consistencyScore * 100)}%
                      </span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                        style={{ width: `${stateVector.reliabilityScore.consistencyScore * 100}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Speed-Accuracy Ratio</span>
                      <span className="text-sm font-semibold">
                        {Math.round(stateVector.reliabilityScore.speedAccuracyRatio * 100)}%
                      </span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-orange-500 to-red-500"
                        style={{ width: `${stateVector.reliabilityScore.speedAccuracyRatio * 100}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Hint Dependency</span>
                      <span className="text-sm font-semibold">
                        {Math.round(stateVector.hintDependencyRate * 100)}%
                      </span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          stateVector.hintDependencyRate > 0.5 ? 'bg-red-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${stateVector.hintDependencyRate * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Activity Summary */}
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Activity Summary</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <Target className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-medium">Questions Attempted</span>
                    </div>
                    <span className="text-2xl font-bold">{totalAttempts}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <Award className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-medium">Correct Answers</span>
                    </div>
                    <span className="text-2xl font-bold">{correctAttempts}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                        <Zap className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-medium">Hints Requested</span>
                    </div>
                    <span className="text-2xl font-bold">{hintsRequested}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-medium">Content Viewed</span>
                    </div>
                    <span className="text-2xl font-bold">{contentViewed}</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Learning Behavior */}
          <TabsContent value="behavior" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-6">Learning Characteristics</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-blue-600" />
                        <span className="font-medium">Learning Velocity</span>
                      </div>
                      <span className="text-lg font-bold text-blue-600">
                        {(stateVector.learningVelocity * 100).toFixed(1)}%/hr
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Rate at which you're gaining mastery per hour of study
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-green-600" />
                        <span className="font-medium">Engagement Score</span>
                      </div>
                      <span className="text-lg font-bold text-green-600">
                        {Math.round(stateVector.engagementScore * 100)}%
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Measure of your active participation and interaction variety
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Target className="w-5 h-5 text-purple-600" />
                        <span className="font-medium">Persistence Level</span>
                      </div>
                      <span className="text-lg font-bold text-purple-600">
                        {Math.round(stateVector.persistenceLevel * 100)}%
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Your ability to work through challenging problems
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-6">Session Statistics</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Total Time Invested</p>
                    <p className="text-3xl font-bold text-blue-700">
                      {formatTime(stateVector.totalTimeSpent)}
                    </p>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Sessions Completed</p>
                    <p className="text-3xl font-bold text-purple-700">
                      {stateVector.sessionsCompleted}
                    </p>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Avg Session Length</p>
                    <p className="text-3xl font-bold text-green-700">
                      {stateVector.sessionsCompleted > 0
                        ? formatTime(stateVector.totalTimeSpent / stateVector.sessionsCompleted)
                        : '0m'}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Insights & Recommendations */}
          <TabsContent value="insights" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-blue-600" />
                Personalized Insights
              </h3>
              <div className="space-y-4">
                {/* Strength Areas */}
                <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-green-800 mb-2">💪 Strengths</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    {stateVector.reliabilityScore.overallScore > 0.7 && (
                      <li>• High reliability score - you're consistent in your performance!</li>
                    )}
                    {stateVector.persistenceLevel > 0.7 && (
                      <li>• Excellent persistence - you don't give up easily!</li>
                    )}
                    {stateVector.engagementScore > 0.7 && (
                      <li>• Great engagement - you're actively participating in all activities!</li>
                    )}
                    {Object.values(stateVector.masteryProbabilities).some(m => m > 0.8) && (
                      <li>• Strong mastery in some domains - keep up the excellent work!</li>
                    )}
                  </ul>
                </div>

                {/* Areas for Improvement */}
                <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                  <h4 className="font-semibold text-yellow-800 mb-2">📈 Areas to Focus On</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    {stateVector.hintDependencyRate > 0.5 && (
                      <li>• Try solving problems independently before using hints</li>
                    )}
                    {stateVector.averageResponseTime > 90000 && (
                      <li>• Work on improving your response time with more practice</li>
                    )}
                    {Object.entries(stateVector.masteryProbabilities)
                      .filter(([_, v]) => v < 0.5)
                      .map(([domain, _]) => (
                        <li key={domain}>• Focus more on {domain.replace(/([A-Z])/g, ' $1').trim()}</li>
                      ))}
                  </ul>
                </div>

                {/* Recommendations */}
                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-blue-800 mb-2">💡 Recommendations</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Review concepts where your mastery is below 60%</li>
                    <li>• Practice more questions in areas with low reliability</li>
                    {stateVector.errorPatterns.length > 0 && (
                      <li>• Work on reducing {stateVector.errorPatterns[0].errorType} errors</li>
                    )}
                    <li>• Maintain your current learning pace - you're doing great!</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default function Analytics() {
  return (
    <LearnerProvider>
      <AnalyticsContent />
    </LearnerProvider>
  );
}
