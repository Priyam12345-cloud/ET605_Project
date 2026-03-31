import { FormEvent, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useAuth } from '../context/AuthContext';
import { Brain } from 'lucide-react';
import { toast } from 'sonner';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation() as { state?: { from?: string } };
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const targetPath = location.state?.from || '/dashboard';

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = login(email, password);
    if (!result.ok) {
      toast.error(result.message);
      return;
    }

    toast.success('Welcome back!');
    navigate(targetPath, { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6">
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto mb-3">
            <Brain className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold">Login</h1>
          <p className="text-gray-600 text-sm">Continue your adaptive learning journey</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@example.com"
              required
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          <Button type="submit" className="w-full">Login</Button>
        </form>

        <p className="text-sm text-gray-600 mt-4 text-center">
          New student? <Link to="/signup" className="text-blue-600 font-semibold">Create account</Link>
        </p>
      </Card>
    </div>
  );
}
