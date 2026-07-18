import React from 'react';

export function ModernTemplate({ data }) {
  const { personal: p, summary, experience, education, skills, projects } = data;
  const brand = '#6366f1';

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', color: '#1e293b', lineHeight: 1.5, fontSize: '12px', display: 'flex', minHeight: '100%' }}>
      {/* Sidebar */}
      <div style={{ width: '30%', backgroundColor: '#f8fafc', padding: '32px', borderRight: '1px solid #e2e8f0' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: brand, margin: '0 0 8px 0', lineHeight: 1.1 }}>
          {p.name.split(' ').map((n, i) => <div key={i}>{n}</div>)}
        </h1>
        <div style={{ fontSize: '14px', fontWeight: 600, color: '#64748b', marginBottom: '32px' }}>{p.title}</div>
        
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', color: brand, marginBottom: '16px', letterSpacing: '0.05em' }}>Contact</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px', color: '#475569' }}>
            {p.email && <div>{p.email}</div>}
            {p.phone && <div>{p.phone}</div>}
            {p.location && <div>{p.location}</div>}
            {p.linkedin && <div>{p.linkedin}</div>}
            {p.github && <div>{p.github}</div>}
          </div>
        </div>

        {skills?.technical?.length > 0 && (
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', color: brand, marginBottom: '16px', letterSpacing: '0.05em' }}>Technical Skills</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {skills.technical.map(s => (
                <div key={s} style={{ backgroundColor: '#e0e7ff', color: brand, padding: '4px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 600 }}>{s}</div>
              ))}
            </div>
          </div>
        )}

        {skills?.tools?.length > 0 && (
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', color: brand, marginBottom: '16px', letterSpacing: '0.05em' }}>Tools</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '11px', color: '#475569' }}>
              {skills.tools.map(s => <div key={s}>{s}</div>)}
            </div>
          </div>
        )}

        {education?.length > 0 && (
          <div>
            <h2 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', color: brand, marginBottom: '16px', letterSpacing: '0.05em' }}>Education</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {education.map(edu => (
                <div key={edu.id}>
                  <div style={{ fontWeight: 600, fontSize: '12px' }}>{edu.degree}</div>
                  <div style={{ color: '#64748b', fontSize: '11px', marginBottom: '2px' }}>{edu.institution}</div>
                  <div style={{ color: '#94a3b8', fontSize: '10px' }}>{edu.year} | {edu.grade}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div style={{ width: '70%', padding: '32px' }}>
        {summary && (
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '12px', borderBottom: '2px solid #f1f5f9', paddingBottom: '8px' }}>Profile</h2>
            <div style={{ color: '#475569', fontSize: '12px', lineHeight: 1.6 }}>{summary}</div>
          </div>
        )}

        {experience?.length > 0 && (
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '16px', borderBottom: '2px solid #f1f5f9', paddingBottom: '8px' }}>Experience</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {experience.map(exp => (
                <div key={exp.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                    <div style={{ fontWeight: 700, fontSize: '14px', color: '#0f172a' }}>{exp.title}</div>
                    <div style={{ fontSize: '11px', color: brand, fontWeight: 600, textAlign: 'right', flexShrink: 0, marginLeft: '16px' }}>{exp.startDate} – {exp.endDate}</div>
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px', fontWeight: 500 }}>{exp.company} • {exp.location}</div>
                  <ul style={{ margin: 0, paddingLeft: '16px', color: '#475569', fontSize: '12px' }}>
                    {(exp.bullets || []).map((b, i) => <li key={i} style={{ marginBottom: '4px' }}>{b}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {projects?.length > 0 && (
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '16px', borderBottom: '2px solid #f1f5f9', paddingBottom: '8px' }}>Projects</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {projects.map(proj => (
                <div key={proj.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                    <div style={{ fontWeight: 700, fontSize: '14px', color: '#0f172a' }}>{proj.name}</div>
                    <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 600, textAlign: 'right', flexShrink: 0, marginLeft: '16px' }}>{proj.tech?.join(' • ')}</div>
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '16px', color: '#475569', fontSize: '12px', marginTop: '8px' }}>
                    {(proj.bullets || []).map((b, i) => <li key={i} style={{ marginBottom: '4px' }}>{b}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
