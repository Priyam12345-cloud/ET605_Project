import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { BookOpen, Brain, BarChart3, Target, Sparkles, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { LearnerProvider } from '../context/LearnerContext';
import { useAuth } from '../context/AuthContext';

function WelcomeContent() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Data Handling ITS
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your Intelligent Tutoring System for Grade 7 Data Handling
          </p>
          {isAuthenticated && user && (
            <p className="text-lg font-semibold text-blue-700 mt-2">Hey {user.name}!</p>
          )}
          <p className="text-lg text-gray-500 mt-2">
            Personalized learning that adapts to you!
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6 h-full bg-white/80 backdrop-blur hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Adaptive Learning</h3>
              <p className="text-gray-600">
                The system adapts to your learning style, pace, and needs in real-time
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 h-full bg-white/80 backdrop-blur hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Rich Content</h3>
              <p className="text-gray-600">
                Learn through stories, examples, videos, games, and interactive activities
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 h-full bg-white/80 backdrop-blur hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
              <p className="text-gray-600">
                Detailed analytics show your strengths, areas for improvement, and growth
              </p>
            </Card>
          </motion.div>
        </div>

        {/* What You'll Learn */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <Card className="p-8 bg-white/80 backdrop-blur">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-yellow-500" />
              What You'll Learn
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-semibold">Understanding Data</h4>
                  <p className="text-sm text-gray-600">What is data and why it matters</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-semibold">Data Collection</h4>
                  <p className="text-sm text-gray-600">Methods to gather information</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-semibold">Frequency Tables</h4>
                  <p className="text-sm text-gray-600">Organizing data systematically</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm">4</span>
                </div>
                <div>
                  <h4 className="font-semibold">Graphs & Charts</h4>
                  <p className="text-sm text-gray-600">Visual representation of data</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm">5</span>
                </div>
                <div>
                  <h4 className="font-semibold">Central Tendency</h4>
                  <p className="text-sm text-gray-600">Mean, median, and mode</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm">6</span>
                </div>
                <div>
                  <h4 className="font-semibold">Data Interpretation</h4>
                  <p className="text-sm text-gray-600">Making sense of information</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* System Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <Card className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              Intelligent Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Real-time mastery tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Response time analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Error pattern recognition</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span>Personalized hints</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>Adaptive difficulty</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                <span>Remedial content delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Learning velocity calculation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Engagement monitoring</span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <Button
            size="lg"
            onClick={() => navigate(isAuthenticated ? '/dashboard' : '/login')}
            className="text-lg px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {isAuthenticated ? 'Continue Learning' : 'Start Learning Now'}
            <Brain className="ml-2 w-5 h-5" />
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            Estimated time to complete: 60 minutes
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default function Welcome() {
  return (
    <LearnerProvider>
      <WelcomeContent />
    </LearnerProvider>
  );
}
