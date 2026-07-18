import React from 'react';

export function MinimalistTemplate({ data }) {
  const { personal: p, summary, experience, education, skills, projects } = data;
  
  const styles = {
    page: {
      fontFamily: 'Inter, system-ui, sans-serif',
      color: '#111',
      padding: '50px 60px',
      lineHeight: 1.7,
      fontSize: '11px',
    },
    header: {
      marginBottom: '40px',
    },
    name: {
      fontSize: '24px',
      fontWeight: 300,
      letterSpacing: '2px',
      textTransform: 'uppercase',
      margin: '0 0 16px 0',
    },
    contact: {
      display: 'flex',
      gap: '16px',
      fontSize: '10px',
      color: '#666',
      flexWrap: 'wrap',
      textTransform: 'uppercase',
      letterSpacing: '1px'
    },
    section: {
      marginBottom: '32px',
      display: 'flex'
    },
    sectionTitle: {
      flex: '0 0 120px',
      fontSize: '10px',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '2px',
      color: '#888',
      paddingTop: '2px'
    },
    sectionContent: {
      flex: 1
    },
    item: {
      marginBottom: '20px'
    },
    itemHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '6px'
    },
    itemTitle: {
      fontWeight: 600,
      fontSize: '12px'
    },
    itemMeta: {
      fontSize: '10px',
      color: '#666',
      textAlign: 'right',
      flexShrink: 0,
      marginLeft: '16px',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    bullets: {
      margin: 0,
      paddingLeft: '16px',
      color: '#444'
    }
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.name}>{p.name}</h1>
        <div style={styles.contact}>
          {p.email && <span>{p.email}</span>}
          {p.phone && <span>{p.phone}</span>}
          {p.location && <span>{p.location}</span>}
          {p.linkedin && <span>LinkedIn</span>}
          {p.github && <span>GitHub</span>}
        </div>
      </header>

      {summary && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Profile</div>
          <div style={styles.sectionContent}>
            <div style={{ color: '#444' }}>{summary}</div>
          </div>
        </div>
      )}

      {experience?.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Experience</div>
          <div style={styles.sectionContent}>
            {experience.map(exp => (
              <div key={exp.id} style={styles.item}>
                <div style={styles.itemHeader}>
                  <div>
                    <span style={styles.itemTitle}>{exp.title}</span>
                    <span style={{ color: '#666', margin: '0 8px' }}>—</span>
                    <span>{exp.company}</span>
                  </div>
                  <span style={styles.itemMeta}>{exp.startDate} - {exp.endDate}</span>
                </div>
                <ul style={styles.bullets}>
                  {(exp.bullets || []).map((b, i) => <li key={i} style={{ marginBottom: '4px' }}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {education?.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Education</div>
          <div style={styles.sectionContent}>
            {education.map(edu => (
              <div key={edu.id} style={styles.item}>
                <div style={styles.itemHeader}>
                  <div>
                    <span style={styles.itemTitle}>{edu.degree}</span>
                    <span style={{ color: '#666', margin: '0 8px' }}>—</span>
                    <span>{edu.institution}</span>
                  </div>
                  <span style={styles.itemMeta}>{edu.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {projects?.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Projects</div>
          <div style={styles.sectionContent}>
            {projects.map(proj => (
              <div key={proj.id} style={styles.item}>
                <div style={styles.itemHeader}>
                  <div style={styles.itemTitle}>{proj.name}</div>
                  <span style={styles.itemMeta}>{proj.tech?.join(', ')}</span>
                </div>
                <ul style={styles.bullets}>
                  {(proj.bullets || []).map((b, i) => <li key={i} style={{ marginBottom: '4px' }}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {skills && (skills.technical?.length > 0 || skills.tools?.length > 0) && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Skills</div>
          <div style={styles.sectionContent}>
            {skills.technical?.length > 0 && (
              <div style={{ marginBottom: '8px' }}>
                <span style={{ fontWeight: 600, marginRight: '8px' }}>Technical:</span>
                <span style={{ color: '#444' }}>{skills.technical.join(', ')}</span>
              </div>
            )}
            {skills.tools?.length > 0 && (
              <div style={{ marginBottom: '8px' }}>
                <span style={{ fontWeight: 600, marginRight: '8px' }}>Tools:</span>
                <span style={{ color: '#444' }}>{skills.tools.join(', ')}</span>
              </div>
            )}
            {skills.soft?.length > 0 && (
              <div>
                <span style={{ fontWeight: 600, marginRight: '8px' }}>Soft Skills:</span>
                <span style={{ color: '#444' }}>{skills.soft.join(', ')}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
