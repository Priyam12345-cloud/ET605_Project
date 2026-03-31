import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { Toaster } from './components/ui/sonner';
import { LearnerProvider } from './context/LearnerContext';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <LearnerProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" />
      </LearnerProvider>
    </AuthProvider>
  );
}