import React, { useContext, useMemo } from 'react';
import { ResumeContext } from '../../context/ResumeContext';
import { IconCheck, IconAlertTriangle } from '@tabler/icons-react';

export function ResumeHealth() {
  const { data } = useContext(ResumeContext);

  const health = useMemo(() => {
    let score = 0;
    const missing = [];

    // Personal Info (20%)
    if (data.personal?.name) score += 5; else missing.push("Add your full name");
    if (data.personal?.email && data.personal?.phone) score += 5; else missing.push("Add both email and phone number");
    if (data.personal?.location) score += 5; else missing.push("Add your location/city");
    if (data.personal?.linkedin) score += 5; else missing.push("Add your LinkedIn URL");

    // Summary (15%)
    if (data.summary?.length > 100) score += 15; 
    else if (data.summary?.length > 0) { score += 5; missing.push("Make your summary longer (at least 2-3 sentences)"); }
    else missing.push("Add a professional summary");

    // Experience (30%)
    if (data.experience?.length > 0) {
      score += 15;
      const hasGoodBullets = data.experience.some(e => e.bullets?.length >= 3);
      if (hasGoodBullets) score += 15; else missing.push("Add at least 3 bullet points to your experience");
    } else {
      missing.push("Add your work experience");
    }

    // Education (15%)
    if (data.education?.length > 0) score += 15; else missing.push("Add your education details");

    // Skills (20%)
    const techSkillsCount = data.skills?.technical?.length || 0;
    if (techSkillsCount >= 5) score += 20; 
    else if (techSkillsCount > 0) { score += 10; missing.push("Add at least 5 technical skills"); }
    else missing.push("Add your technical skills");

    return { score: Math.min(score, 100), missing };
  }, [data]);

  return (
    <div style={{ padding: '24px', backgroundColor: 'var(--surface-2)', borderTop: '1px solid var(--border)' }}>
      <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>Resume Health</h3>
      
      <div className="flex items-center gap-4" style={{ marginBottom: '20px' }}>
        <div style={{ position: 'relative', width: '60px', height: '60px' }}>
          <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%' }}>
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="var(--border)"
              strokeWidth="3"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke={health.score >= 80 ? 'var(--success)' : health.score >= 50 ? 'var(--warning)' : 'var(--danger)'}
              strokeWidth="3"
              strokeDasharray={`${health.score}, 100`}
              style={{ transition: 'stroke-dasharray 0.5s ease' }}
            />
          </svg>
          <div style={{ 
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '14px', fontWeight: 700
          }}>
            {health.score}%
          </div>
        </div>
        <div>
          <div style={{ fontWeight: 600 }}>{health.score >= 80 ? 'Looking Great!' : 'Needs Work'}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-2)' }}>Completeness Score</div>
        </div>
      </div>

      <div>
        <div style={{ fontSize: '12px', fontWeight: 600, marginBottom: '8px' }}>Action Items:</div>
        {health.missing.length === 0 ? (
          <div className="flex items-center gap-2" style={{ fontSize: '12px', color: 'var(--success)' }}>
            <IconCheck size={16} /> Your resume is fully complete!
          </div>
        ) : (
          <ul style={{ paddingLeft: '0', margin: 0, listStyle: 'none' }}>
            {health.missing.slice(0, 3).map((item, i) => (
              <li key={i} className="flex gap-2 items-start" style={{ fontSize: '12px', color: 'var(--text-2)', marginBottom: '6px' }}>
                <IconAlertTriangle size={14} style={{ color: 'var(--warning)', flexShrink: 0, marginTop: '2px' }} />
                <span>{item}</span>
              </li>
            ))}
            {health.missing.length > 3 && (
              <li style={{ fontSize: '11px', color: 'var(--text-3)', paddingLeft: '22px' }}>
                + {health.missing.length - 3} more items...
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
