import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useAuth } from '../context/AuthContext';
import { Brain } from 'lucide-react';
import { toast } from 'sonner';

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = signup(name, email, password);

    if (!result.ok) {
      toast.error(result.message);
      return;
    }

    toast.success(`Welcome, ${name.trim()}!`);
    navigate('/dashboard', { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6">
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-full bg-purple-600 text-white flex items-center justify-center mx-auto mb-3">
            <Brain className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold">Create Account</h1>
          <p className="text-gray-600 text-sm">Sign up and start personalized practice</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="name">Student Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              required
            />
          </div>

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
              placeholder="At least 4 characters"
              minLength={4}
              required
            />
          </div>

          <Button type="submit" className="w-full">Sign Up</Button>
        </form>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Already have an account? <Link to="/login" className="text-blue-600 font-semibold">Login</Link>
        </p>
      </Card>
    </div>
  );
}
