import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth-context';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Clock } from 'lucide-react';

export function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Email and password are required');
      setLoading(false);
      return;
    }

    const result = isLogin
      ? await login(email, password)
      : await register(email, password);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || 'Something went wrong');
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-br from-background to-muted">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-primary/10 p-3">
              <Clock className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl">ChronoSend</CardTitle>
          <CardDescription>Schedule messages. Send anywhere. One place.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex mb-6 rounded-lg border p-1 bg-muted">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isLogin ? 'bg-background shadow-sm' : 'text-muted-foreground'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                !isLogin ? 'bg-background shadow-sm' : 'text-muted-foreground'
              }`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error && !email ? '' : undefined}
            />
            <Input
              label="Password"
              type="password"
              placeholder={isLogin ? 'Your password' : 'Min 8 chars, uppercase, lowercase, number'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={error && !password ? '' : undefined}
            />
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
            <Button type="submit" className="w-full" loading={loading}>
              {isLogin ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            {isLogin ? (
              <>
                Don't have an account?{' '}
                <button onClick={() => setIsLogin(false)} className="text-primary hover:underline">
                  Register
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button onClick={() => setIsLogin(true)} className="text-primary hover:underline">
                  Sign In
                </button>
              </>
            )}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
