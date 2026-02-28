import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Register.css';

export const Register: React.FC<{ onSuccess?: () => void; onNavigate?: (p: string) => void }> = ({ onSuccess, onNavigate }) => {
  const { register, logout } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    // Calculate password strength based on 8+ character requirement only
    if (password.length === 0) {
      setPasswordStrength(0);
    } else if (password.length < 8) {
      setPasswordStrength(1); // Too short
    } else {
      setPasswordStrength(4); // Valid - 8+ characters
    }
  }, [password]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (password !== confirm) {
        setError('Passwords do not match');
        return;
      }
      if (password.length < 8) {
        setError('Password must be at least 8 characters long');
        return;
      }
      await register(name, email, password);
      // ensure user is not auto-logged-in after register; require explicit login
      logout();
      onSuccess?.();
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 0: return 'very-weak';
      case 1: return 'very-weak';
      case 2: return 'weak';
      case 3: return 'good';
      case 4: return 'strong';
      default: return 'very-weak';
    }
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 0: return '';
      case 1: return 'Too Short (8+ chars required)';
      case 4: return 'Valid';
      default: return '';
    }
  };

  return (
    <div className="register-container">
      {/* Animated background elements */}
      <div className="register-background">
        <div className="register-bg-orb register-bg-orb-1"></div>
        <div className="register-bg-orb register-bg-orb-2"></div>
        <div className="register-bg-orb register-bg-orb-3"></div>
      </div>

      <div className="register-card">
        <div className="register-header">
          <div className="register-icon-container">
            <svg xmlns="http://www.w3.org/2000/svg" className="register-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h2 className="register-title">Create your account</h2>
          <p className="register-subtitle">Join the Heritage Archive community today</p>
        </div>

        <form onSubmit={submit} className="register-form">
          <div className="register-field-group">
            <label className="register-label">
              <span className="register-label-content">
                <svg className="register-label-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Full Name
              </span>
            </label>
            <input 
              value={name} 
              onChange={e => setName(e.target.value)} 
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
              className={`register-input ${focusedField === 'name' ? 'focused' : ''}`}
              placeholder="Enter your full name" 
              required
            />
          </div>

          <div className="register-field-group">
            <label className="register-label">
              <span className="register-label-content">
                <svg className="register-label-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Address
              </span>
            </label>
            <input 
              type="email"
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              className={`register-input ${focusedField === 'email' ? 'focused' : ''}`}
              placeholder="your@email.com" 
              required
            />
          </div>

          <div className="register-field-group">
            <label className="register-label">
              <span className="register-label-content">
                <svg className="register-label-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Password
              </span>
            </label>
            <div className="register-field-group">
              <input 
                type={showPassword ? "text" : "password"}
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                className={`register-input password-input ${focusedField === 'password' ? 'focused' : ''}`}
                placeholder="8+ characters (any characters)" 
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="register-password-toggle"
              >
                {showPassword ? (
                  <svg className="register-toggle-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="register-toggle-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {password && (
              <div className="register-password-strength">
                <div className="register-strength-header">
                  <span className="register-strength-label">Password Strength</span>
                  <span className={`register-strength-text ${getPasswordStrengthColor()}`}>
                    {getPasswordStrengthText()}
                  </span>
                </div>
                <div className="register-strength-bar">
                  <div 
                    className={`register-strength-fill ${getPasswordStrengthColor()}`}
                    style={{ width: `${(passwordStrength / 4) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          <div className="register-field-group">
            <label className="register-label">
              <span className="register-label-content">
                <svg className="register-label-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Confirm Password
              </span>
            </label>
            <div className="register-field-group">
              <input 
                type={showConfirm ? "text" : "password"}
                value={confirm} 
                onChange={e => setConfirm(e.target.value)} 
                onFocus={() => setFocusedField('confirm')}
                onBlur={() => setFocusedField(null)}
                className={`register-input password-input ${focusedField === 'confirm' ? 'focused' : ''}`}
                placeholder="Confirm your password" 
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="register-password-toggle"
              >
                {showConfirm ? (
                  <svg className="register-toggle-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="register-toggle-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {confirm && (
              <div className="register-match-indicator">
                {password === confirm ? (
                  <span className="match">
                    <svg className="register-match-icon" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Passwords match
                  </span>
                ) : (
                  <span className="no-match">
                    <svg className="register-match-icon" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    Passwords do not match
                  </span>
                )}
              </div>
            )}
          </div>

          {error && (
            <div className="register-error">
              <svg className="register-error-icon" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          <div className="register-button-section">
            <button 
              type="submit" 
              className="register-submit-btn" 
              disabled={loading || password.length < 8 || password !== confirm}
            >
              {loading ? (
                <span className="register-submit-content">
                  <svg className="register-spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
            
            <div className="register-login-link">
              <button 
                type="button" 
                className="register-login-btn" 
                onClick={() => onNavigate?.('login')}
              >
                Already have an account? <span className="register-login-link-text">Sign in</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
