import React from 'react';

export function ExecutiveTemplate({ data }) {
  const { personal: p, summary, experience, education, skills, projects } = data;
  
  const styles = {
    page: {
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      color: '#2b2b2b',
      padding: '40px',
      lineHeight: 1.5,
      fontSize: '11px',
    },
    header: {
      borderBottom: '3px solid #1a1a1a',
      paddingBottom: '16px',
      marginBottom: '24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end'
    },
    name: {
      fontSize: '32px',
      fontWeight: 800,
      letterSpacing: '-0.5px',
      margin: 0,
      lineHeight: 1,
      color: '#1a1a1a'
    },
    title: {
      fontSize: '14px',
      fontWeight: 500,
      color: '#666',
      marginTop: '8px',
      textTransform: 'uppercase',
      letterSpacing: '1px'
    },
    contact: {
      textAlign: 'right',
      fontSize: '11px',
      color: '#444',
      lineHeight: 1.6
    },
    columns: {
      display: 'flex',
      gap: '32px'
    },
    mainCol: {
      flex: '0 0 65%',
    },
    sideCol: {
      flex: '0 0 calc(35% - 32px)',
    },
    sectionTitle: {
      fontSize: '14px',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      borderBottom: '1px solid #ddd',
      paddingBottom: '6px',
      marginBottom: '16px',
      color: '#1a1a1a'
    },
    itemHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '4px'
    },
    bold: { fontWeight: 700 },
    italic: { fontStyle: 'italic', color: '#555' },
    bullets: { margin: 0, paddingLeft: '16px', marginTop: '6px' },
    rightAlign: { textAlign: 'right', flexShrink: 0, marginLeft: '16px', fontWeight: 600, color: '#666' }
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.name}>{p.name}</h1>
          {p.title && <div style={styles.title}>{p.title}</div>}
        </div>
        <div style={styles.contact}>
          {p.email && <div>{p.email}</div>}
          {p.phone && <div>{p.phone}</div>}
          {p.location && <div>{p.location}</div>}
          {p.linkedin && <div>{p.linkedin}</div>}
        </div>
      </header>

      <div style={styles.columns}>
        <div style={styles.mainCol}>
          {summary && (
            <div style={{ marginBottom: '24px' }}>
              <div style={styles.sectionTitle}>Executive Summary</div>
              <div style={{ fontSize: '12px', lineHeight: 1.6 }}>{summary}</div>
            </div>
          )}

          {experience?.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <div style={styles.sectionTitle}>Professional Experience</div>
              {experience.map(exp => (
                <div key={exp.id} style={{ marginBottom: '16px' }}>
                  <div style={styles.itemHeader}>
                    <span style={{ fontSize: '13px', fontWeight: 700 }}>{exp.title}</span>
                    <span style={styles.rightAlign}>{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 500, color: '#444', marginBottom: '8px' }}>
                    {exp.company} {exp.location && `• ${exp.location}`}
                  </div>
                  <ul style={styles.bullets}>
                    {(exp.bullets || []).map((b, i) => <li key={i} style={{ marginBottom: '4px' }}>{b}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={styles.sideCol}>
          {skills && (skills.technical?.length > 0 || skills.tools?.length > 0) && (
            <div style={{ marginBottom: '24px' }}>
              <div style={styles.sectionTitle}>Core Competencies</div>
              {skills.technical?.length > 0 && (
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ fontWeight: 700, marginBottom: '4px' }}>Technical</div>
                  <div style={{ lineHeight: 1.6 }}>{skills.technical.join(', ')}</div>
                </div>
              )}
              {skills.tools?.length > 0 && (
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ fontWeight: 700, marginBottom: '4px' }}>Tools & Platforms</div>
                  <div style={{ lineHeight: 1.6 }}>{skills.tools.join(', ')}</div>
                </div>
              )}
              {skills.soft?.length > 0 && (
                <div>
                  <div style={{ fontWeight: 700, marginBottom: '4px' }}>Soft Skills</div>
                  <div style={{ lineHeight: 1.6 }}>{skills.soft.join(', ')}</div>
                </div>
              )}
            </div>
          )}

          {education?.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <div style={styles.sectionTitle}>Education</div>
              {education.map(edu => (
                <div key={edu.id} style={{ marginBottom: '12px' }}>
                  <div style={{ fontWeight: 700 }}>{edu.degree}</div>
                  <div style={{ color: '#444', margin: '4px 0' }}>{edu.institution}</div>
                  <div style={{ color: '#666', fontSize: '10px' }}>{edu.year}</div>
                </div>
              ))}
            </div>
          )}

          {projects?.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <div style={styles.sectionTitle}>Key Projects</div>
              {projects.map(proj => (
                <div key={proj.id} style={{ marginBottom: '12px' }}>
                  <div style={{ fontWeight: 700 }}>{proj.name}</div>
                  <div style={{ color: '#666', fontSize: '10px', marginTop: '2px' }}>{proj.tech?.join(', ')}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
