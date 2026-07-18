import React from 'react';

export function PasswordStrength({ password }) {
  const getStrength = (p) => {
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  };

  const strength = getStrength(password || '');
  
  const getColor = () => {
    switch (strength) {
      case 1: return 'var(--danger)';
      case 2: return 'var(--warning)';
      case 3: return '#eab308'; // yellow
      case 4: return 'var(--success)';
      default: return 'var(--border)';
    }
  };

  const width = strength === 0 ? 0 : (strength / 4) * 100;

  return (
    <div style={{ marginTop: '8px' }}>
      <div style={{ height: '4px', backgroundColor: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
        <div 
          style={{ 
            height: '100%', 
            width: `${width}%`, 
            backgroundColor: getColor(), 
            transition: 'all 0.3s' 
          }} 
        />
      </div>
      <div style={{ fontSize: '11px', color: 'var(--text-3)', marginTop: '4px', textAlign: 'right' }}>
        {strength === 0 ? 'Too weak' : strength === 1 ? 'Weak' : strength === 2 ? 'Fair' : strength === 3 ? 'Good' : 'Strong'}
      </div>
    </div>
  );
}
