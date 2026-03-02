import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';
import './AdminLogin.css';

interface AdminLoginProps {
  onSuccess?: (user: any) => void;
  onNavigate?: (page: string) => void;
}

export function AdminLogin({ onSuccess, onNavigate }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await login(email, password);
      if (res.user && res.user.role === 'admin') {
        onSuccess?.(res.user);
        onNavigate?.('admin');
      } else {
        setError('Invalid admin credentials');
      }
    } catch (err: any) {
      setError(err.message || 'Admin login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <h1 className="admin-login-title">🔐 Admin Access</h1>
          <p className="admin-login-subtitle">Heritage Archive Administration</p>
        </div>

        <form onSubmit={submit} className="admin-login-form">
          {error && (
            <div className="admin-login-error">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}

          <div className="admin-form-group">
            <Label htmlFor="email">Admin Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@heritage.com"
              required
            />
          </div>

          <div className="admin-form-group">
            <Label htmlFor="password">Admin Password</Label>
            <div className="password-input-wrapper">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            className="admin-login-button"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In as Admin'}
          </Button>

          <div className="admin-login-footer">
            <Button
              type="button"
              variant="outline"
              onClick={() => onNavigate?.('login')}
              className="back-to-user-login"
            >
              Back to User Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
