import React from 'react';

export function ClassicTemplate({ data }) {
  const { personal: p, summary, experience, education, skills, projects } = data;

  return (
    <div style={{ fontFamily: 'Georgia, serif', fontVariantNumeric: 'lining-nums', color: '#333', padding: '40px', lineHeight: 1.6, fontSize: '12px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, margin: '0 0 4px 0', letterSpacing: '0.05em' }}>{p.name}</h1>
        {p.title && <div style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>{p.title}</div>}
        <div style={{ fontSize: '12px', display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {p.email && <span>{p.email}</span>}
          {p.phone && <><span style={{ color: '#ccc' }}>•</span><span>{p.phone}</span></>}
          {p.location && <><span style={{ color: '#ccc' }}>•</span><span>{p.location}</span></>}
          {p.linkedin && <><span style={{ color: '#ccc' }}>•</span><span>{p.linkedin}</span></>}
          {p.github && <><span style={{ color: '#ccc' }}>•</span><span>{p.github}</span></>}
        </div>
      </div>
      
      <hr style={{ border: 'none', borderTop: '1px solid #000', margin: '0 0 16px 0' }} />

      {/* Summary */}
      {summary && (
        <div style={{ marginBottom: '16px' }}>
          <h2 style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 8px 0', borderBottom: '1px solid #000', paddingBottom: '4px' }}>Professional Summary</h2>
          <div>{summary}</div>
        </div>
      )}

      {/* Experience */}
      {experience?.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <h2 style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 8px 0', borderBottom: '1px solid #000', paddingBottom: '4px' }}>Experience</h2>
          {experience.map(exp => (
            <div key={exp.id} style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', fontWeight: 'bold' }}>
                <span>{exp.title}</span>
                <span style={{ textAlign: 'right', flexShrink: 0, marginLeft: '16px' }}>{exp.startDate} – {exp.endDate}</span>
              </div>
              <div style={{ fontStyle: 'italic', marginBottom: '4px' }}>{exp.company}, {exp.location}</div>
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                {(exp.bullets || []).map((b, i) => <li key={i} style={{ marginBottom: '4px' }}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education?.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <h2 style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 8px 0', borderBottom: '1px solid #000', paddingBottom: '4px' }}>Education</h2>
          {education.map(edu => (
            <div key={edu.id} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', fontWeight: 'bold' }}>
                <span>{edu.degree}</span>
                <span style={{ textAlign: 'right', flexShrink: 0, marginLeft: '16px' }}>{edu.year}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span>{edu.institution}</span>
                <span style={{ textAlign: 'right', flexShrink: 0, marginLeft: '16px' }}>{edu.grade}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {projects?.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <h2 style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 8px 0', borderBottom: '1px solid #000', paddingBottom: '4px' }}>Projects</h2>
          {projects.map(proj => (
            <div key={proj.id} style={{ marginBottom: '12px' }}>
              <div style={{ fontWeight: 'bold' }}>
                {proj.name} {proj.tech?.length > 0 && <span style={{ fontWeight: 'normal', fontStyle: 'italic' }}>| {proj.tech.join(', ')}</span>}
              </div>
              <ul style={{ margin: 0, paddingLeft: '20px', marginTop: '4px' }}>
                {(proj.bullets || []).map((b, i) => <li key={i} style={{ marginBottom: '4px' }}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {(skills?.technical?.length > 0 || skills?.tools?.length > 0) && (
        <div style={{ marginBottom: '16px' }}>
          <h2 style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 8px 0', borderBottom: '1px solid #000', paddingBottom: '4px' }}>Skills</h2>
          {skills.technical?.length > 0 && (
            <div style={{ marginBottom: '4px' }}><strong>Technical:</strong> {skills.technical.join(', ')}</div>
          )}
          {skills.tools?.length > 0 && (
            <div style={{ marginBottom: '4px' }}><strong>Tools:</strong> {skills.tools.join(', ')}</div>
          )}
          {skills.soft?.length > 0 && (
            <div style={{ marginBottom: '4px' }}><strong>Soft Skills:</strong> {skills.soft.join(', ')}</div>
          )}
        </div>
      )}
    </div>
  );
}
