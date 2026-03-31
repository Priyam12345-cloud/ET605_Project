import { Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BookOpen, BarChart3, Brain, Home, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './components/ui/button';
import { Progress } from './components/ui/progress';
import { LearnerModelService } from './services/learner-model-service';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [learnerState, setLearnerState] = useState(LearnerModelService.initializeLearnerState());
  const location = useLocation();

  useEffect(() => {
    // Update learner state when it changes
    const state = LearnerModelService.initializeLearnerState();
    setLearnerState(state);
  }, [location]);

  const overallProgress = (() => {
    const analytics = LearnerModelService.getLearningAnalytics(learnerState);
    return analytics.masteryPercentage;
  })();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Learning Path', href: '/learning-path', icon: BookOpen },
    { name: 'Progress', href: '/progress', icon: BarChart3 },
    { name: 'Analytics', href: '/analytics', icon: Brain }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64 bg-white shadow-xl border-r border-gray-200`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Data ITS</h2>
                <p className="text-xs text-gray-500">Grade 7</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Progress Overview */}
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-700">Overall Progress</span>
              <span className="text-sm font-bold text-indigo-700">{overallProgress.toFixed(0)}%</span>
            </div>
            <Progress value={overallProgress} className="h-2" />
            <p className="text-xs text-gray-600 mt-2">
              Keep learning! {100 - Math.round(overallProgress)}% to go
            </p>
          </div>

          {/* Navigation */}
          <nav className="space-y-2 flex-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Learner Stats */}
          <div className="mt-auto pt-4 border-t border-gray-200">
            <div className="text-xs text-gray-500 space-y-2">
              <div className="flex justify-between">
                <span>Total Interactions:</span>
                <span className="font-semibold text-gray-700">{learnerState.totalInteractions}</span>
              </div>
              <div className="flex justify-between">
                <span>Reliability Score:</span>
                <span className="font-semibold text-gray-700">
                  {(learnerState.responseReliabilityScore * 100).toFixed(0)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span>Hint Usage:</span>
                <span className="font-semibold text-gray-700">
                  {(learnerState.hintDependencyRate * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile menu button */}
      {!sidebarOpen && (
        <Button
          onClick={() => setSidebarOpen(true)}
          className="fixed top-4 left-4 z-30 lg:hidden"
          size="sm"
        >
          <Menu className="w-5 h-5" />
        </Button>
      )}

      {/* Main content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'ml-0'}`}>
        <main className="min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
