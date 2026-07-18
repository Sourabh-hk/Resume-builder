import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ResumeContext } from '../../context/ResumeContext';
import { IconMoon, IconSun } from '@tabler/icons-react';
import './Navbar.css';

export function Navbar() {
  const { user, signOut } = useContext(AuthContext);
  const { data } = useContext(ResumeContext);
  const location = useLocation();
  const [theme, setTheme] = useState('light');
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // Simple completeness calculation (filled personal info fields out of total + length of other sections)
  let filled = 0;
  let total = 8; // basic required fields count
  if (data?.personal?.name) filled++;
  if (data?.personal?.email) filled++;
  if (data?.personal?.phone) filled++;
  if (data?.personal?.title) filled++;
  if (data?.summary?.length > 10) filled++;
  if (data?.experience?.length > 0) filled++;
  if (data?.education?.length > 0) filled++;
  if (data?.skills?.technical?.length > 0) filled++;
  
  const completeness = Math.round((filled / total) * 100);
  const compColor = completeness < 50 ? 'var(--danger)' : completeness < 80 ? 'var(--warning)' : 'var(--success)';

  if (!user) return null; // Or return a public navbar for landing page

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          </div>
          <span className="wordmark">ResumeAI</span>
        </Link>
      </div>

      <div className="navbar-center" style={{ display: 'flex', gap: '20px' }}>
        <Link to="/builder" className="nav-link-btn" style={{ color: 'var(--text-1)', textDecoration: 'none', fontWeight: 500 }}>Resume Builder</Link>
        <Link to="/jd-workspace" className="nav-link-btn" style={{ color: 'var(--text-1)', textDecoration: 'none', fontWeight: 500 }}>JD Workspace</Link>
      </div>

      <div className="navbar-right">
        <div className="completeness-chip" style={{ borderColor: compColor, color: compColor }}>
          {completeness}% complete
        </div>
        
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? <IconMoon size={20} /> : <IconSun size={20} />}
        </button>

        <div className="avatar-wrapper" onClick={() => setShowDropdown(!showDropdown)}>
          <div className="avatar">
            {user?.name?.substring(0, 2).toUpperCase() || 'U'}
          </div>
          {showDropdown && (
            <div className="avatar-dropdown">
              <Link to="/jd-workspace" className="dropdown-item">JD Workspace</Link>
              <div className="dropdown-item">My Profiles</div>
              <div className="dropdown-item">Settings</div>
              <div className="dropdown-item" onClick={signOut}>Logout</div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
