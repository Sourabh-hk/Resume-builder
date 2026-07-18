import React from 'react';

export function DeveloperDarkTemplate({ data }) {
  const { personal: p, summary, experience, education, skills, projects } = data;
  const accent = '#00ff41'; // default green

  return (
    <div style={{ 
      fontFamily: '"JetBrains Mono", monospace', 
      backgroundColor: '#0d1117', 
      color: '#e6edf3', 
      padding: '40px', 
      lineHeight: 1.6, 
      fontSize: '12px',
      minHeight: '100%',
      backgroundImage: 'radial-gradient(circle at center, #161b22 1px, transparent 1px)',
      backgroundSize: '20px 20px'
    }}>
      <div style={{ borderTop: `3px solid ${accent}`, paddingTop: '20px', marginBottom: '20px' }}>
        <div style={{ color: accent, fontSize: '18px', fontWeight: 'bold' }}>
          {p.name}<span className="cursor-blink">_</span>
        </div>
        <div style={{ color: '#8b949e', marginBottom: '16px' }}>// {p.title}</div>
        
        <div style={{ color: '#8b949e' }}>const contact = {'{'}</div>
        <div style={{ paddingLeft: '20px' }}>
          {p.email && <div>email: <span style={{ color: '#a5d6ff' }}>"{p.email}"</span>,</div>}
          {p.phone && <div>phone: <span style={{ color: '#a5d6ff' }}>"{p.phone}"</span>,</div>}
          {p.github && <div>github: <span style={{ color: '#a5d6ff' }}>"{p.github}"</span>,</div>}
          {p.linkedin && <div>linkedin: <span style={{ color: '#a5d6ff' }}>"{p.linkedin}"</span>,</div>}
          {p.location && <div>location: <span style={{ color: '#a5d6ff' }}>"{p.location}"</span>,</div>}
        </div>
        <div style={{ color: '#8b949e' }}>{'};'}</div>
      </div>

      <div style={{ borderLeft: `2px solid ${accent}`, paddingLeft: '16px', marginBottom: '20px' }}>
        <div style={{ color: '#8b949e', marginBottom: '8px' }}>/* ─── SUMMARY ─── */</div>
        <div>{summary}</div>
      </div>

      <div style={{ borderLeft: `2px solid ${accent}`, paddingLeft: '16px', marginBottom: '20px' }}>
        <div style={{ color: '#8b949e', marginBottom: '8px' }}>/* ─── EXPERIENCE ─── */</div>
        {experience?.map(exp => (
          <div key={exp.id} style={{ marginBottom: '16px' }}>
            <div><span style={{ color: '#d2a8ff' }}>function</span> {exp.company.replace(/\\s+/g, '')}() {'{'} <span style={{ color: '#8b949e' }}>// {exp.startDate} – {exp.endDate}</span></div>
            <div style={{ paddingLeft: '20px', color: '#8b949e', marginBottom: '8px' }}>// {exp.title} · {exp.location}</div>
            <div style={{ paddingLeft: '20px' }}>
              {(exp.bullets || []).map((b, i) => (
                <div key={i}><span style={{ color: accent }}>▸</span> {b}</div>
              ))}
            </div>
            <div>{'}'}</div>
          </div>
        ))}
      </div>

      <div style={{ borderLeft: `2px solid ${accent}`, paddingLeft: '16px', marginBottom: '20px' }}>
        <div style={{ color: '#8b949e', marginBottom: '8px' }}>/* ─── SKILLS ─── */</div>
        {skills?.technical?.length > 0 && <div><span style={{ color: '#d2a8ff' }}>const</span> technical = [{skills.technical.map(s => <span key={s} style={{ color: '#a5d6ff' }}>"{s}", </span>)}];</div>}
        {skills?.tools?.length > 0 && <div><span style={{ color: '#d2a8ff' }}>const</span> tools = [{skills.tools.map(s => <span key={s} style={{ color: '#a5d6ff' }}>"{s}", </span>)}];</div>}
      </div>

      <div style={{ borderLeft: `2px solid ${accent}`, paddingLeft: '16px', marginBottom: '20px' }}>
        <div style={{ color: '#8b949e', marginBottom: '8px' }}>/* ─── EDUCATION ─── */</div>
        {education?.map(edu => (
          <div key={edu.id} style={{ marginBottom: '16px' }}>
            <div><span style={{ color: '#d2a8ff' }}>const</span> education = {'{'}</div>
            <div style={{ paddingLeft: '20px' }}>
              <div>degree: <span style={{ color: '#a5d6ff' }}>"{edu.degree}"</span>,</div>
              <div>school: <span style={{ color: '#a5d6ff' }}>"{edu.institution}"</span>,</div>
              <div>grade: <span style={{ color: '#a5d6ff' }}>"{edu.grade}"</span>,</div>
              <div>year: <span style={{ color: '#a5d6ff' }}>"{edu.year}"</span>,</div>
            </div>
            <div>{'};'}</div>
          </div>
        ))}
      </div>

      <div style={{ borderLeft: `2px solid ${accent}`, paddingLeft: '16px', marginBottom: '20px' }}>
        <div style={{ color: '#8b949e', marginBottom: '8px' }}>/* ─── PROJECTS ─── */</div>
        {projects?.map(proj => (
          <div key={proj.id} style={{ marginBottom: '16px' }}>
            <div style={{ color: '#8b949e' }}>// ── {proj.name} ──</div>
            <div style={{ color: '#8b949e', marginBottom: '8px' }}>// Stack: {proj.tech.join(' | ')}</div>
            <div>
              {(proj.bullets || []).map((b, i) => (
                <div key={i}><span style={{ color: accent }}>▸</span> {b}</div>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
