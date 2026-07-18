import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from '../utils/toast';
import { IconBrandGoogle } from '@tabler/icons-react';
import './Auth.css';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    try {
      await signIn({ email, password });
      toast.success('Logged in successfully');
      navigate('/builder');
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-logo">
          <div className="logo-icon-auth">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          </div>
          <span>ResumeAI</span>
        </div>
        
        <div className="auth-hero">
          <h1>Build resumes that get interviews.</h1>
          <p>AI-powered. ATS-optimized.<br/>9 professional templates.</p>
          
          <ul className="auth-features">
            <li><span className="check">✓</span> Real-time live preview</li>
            <li><span className="check">✓</span> Gemini AI tailoring + ATS score</li>
            <li><span className="check">✓</span> Export PDF + LaTeX instantly</li>
            <li><span className="check">✓</span> 9 templates incl. Developer Dark</li>
          </ul>
        </div>
        
        <div className="auth-footer">
          Trusted by 10,000+ developers
        </div>
      </div>
      
      <div className="auth-right">
        <div className="auth-card">
          <div className="auth-tabs">
            <Link to="/login" className="auth-tab active">Sign in</Link>
            <Link to="/signup" className="auth-tab">Create account</Link>
          </div>
          
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label">Email address</label>
              <input 
                type="email" 
                className={`form-input ${error ? 'error' : ''}`}
                value={email}
                onChange={e => { setEmail(e.target.value); setError(''); }}
                autoComplete="email"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Password</label>
              <input 
                type="password" 
                className={`form-input ${error ? 'error' : ''}`}
                value={password}
                onChange={e => { setPassword(e.target.value); setError(''); }}
              />
              {error && <span className="form-error-text">{error}</span>}
            </div>
            
            <div className="auth-options">
              <label className="flex items-center gap-2" style={{ fontSize: '13px', color: 'var(--text-2)' }}>
                <input type="checkbox" /> Remember me
              </label>
              <a href="#" style={{ fontSize: '13px' }}>Forgot password?</a>
            </div>

            <button type="submit" className="btn-primary w-full" style={{ padding: '12px', fontSize: '16px' }}>
              Sign in to ResumeAI
            </button>
          </form>

          <div className="auth-divider">
            <span>or continue with</span>
          </div>

          <button type="button" className="btn-outline w-full" style={{ padding: '12px' }}>
            <IconBrandGoogle size={20} />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}
