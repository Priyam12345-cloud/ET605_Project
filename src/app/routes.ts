import { createBrowserRouter } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LearningPath from './pages/LearningPath';
import ConceptLearning from './pages/ConceptLearning';
import AssessmentEnhanced from './pages/AssessmentEnhanced';
import Analytics from './pages/Analytics';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Welcome
  },
  {
    path: '/login',
    Component: Login
  },
  {
    path: '/signup',
    Component: Signup
  },
  {
    Component: ProtectedRoute,
    children: [
      {
        path: '/dashboard',
        Component: Dashboard
      },
      {
        path: '/learn',
        Component: LearningPath
      },
      {
        path: '/concept/:conceptId',
        Component: ConceptLearning
      },
      {
        path: '/assessment/:conceptId',
        Component: AssessmentEnhanced
      },
      {
        path: '/analytics',
        Component: Analytics
      }
    ]
  }
]);