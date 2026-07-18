import React from 'react';

export function HarvardTemplate({ data }) {
  const { personal: p, summary, experience, education, skills, projects } = data;
  
  const styles = {
    page: {
      fontFamily: '"EB Garamond", Garamond, "Times New Roman", serif',
      fontVariantNumeric: 'lining-nums',
      color: '#000',
      padding: '48px',
      lineHeight: 1.4,
      fontSize: '11px',
    },
    header: {
      textAlign: 'center',
      marginBottom: '16px',
    },
    name: {
      fontSize: '24px',
      fontWeight: 'normal',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      margin: '0 0 4px 0',
    },
    contact: {
      fontSize: '10px',
      display: 'flex',
      justifyContent: 'center',
      gap: '8px',
      flexWrap: 'wrap'
    },
    section: {
      marginBottom: '16px'
    },
    sectionTitle: {
      fontSize: '12px',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      textAlign: 'center',
      borderBottom: '1px solid #000',
      margin: '0 0 12px 0',
      paddingBottom: '2px'
    },
    itemHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '2px'
    },
    itemTitle: {
      fontWeight: 'bold',
    },
    itemSubtitle: {
      fontStyle: 'italic',
    },
    rightAlign: {
      textAlign: 'right',
      flexShrink: 0,
      marginLeft: '16px'
    },
    bullets: {
      margin: '4px 0 0 0',
      paddingLeft: '24px',
    },
    bulletItem: {
      marginBottom: '2px',
      paddingLeft: '4px' // Slight indent for harvard style
    }
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.name}>{p.name}</h1>
        <div style={styles.contact}>
          {p.location && <span>{p.location}</span>}
          {p.location && (p.phone || p.email) && <span>•</span>}
          {p.phone && <span>{p.phone}</span>}
          {p.phone && p.email && <span>•</span>}
          {p.email && <span>{p.email}</span>}
          {p.linkedin && <span>•</span>}
          {p.linkedin && <span>{p.linkedin.replace('https://', '').replace('http://', '').replace('www.', '')}</span>}
        </div>
      </header>

      {education?.length > 0 && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Education</h2>
          {education.map(edu => (
            <div key={edu.id} style={{ marginBottom: '8px' }}>
              <div style={styles.itemHeader}>
                <span style={styles.itemTitle}>{edu.institution}</span>
                <span style={styles.rightAlign}>{edu.location || ''}</span>
              </div>
              <div style={styles.itemHeader}>
                <span style={styles.itemSubtitle}>{edu.degree}</span>
                <span style={styles.rightAlign}>{edu.year}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {experience?.length > 0 && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Experience</h2>
          {experience.map(exp => (
            <div key={exp.id} style={{ marginBottom: '12px' }}>
              <div style={styles.itemHeader}>
                <span style={styles.itemTitle}>{exp.company}</span>
                <span style={styles.rightAlign}>{exp.location || ''}</span>
              </div>
              <div style={styles.itemHeader}>
                <span style={styles.itemSubtitle}>{exp.title}</span>
                <span style={styles.rightAlign}>{exp.startDate} – {exp.endDate}</span>
              </div>
              <ul style={styles.bullets}>
                {(exp.bullets || []).map((b, i) => <li key={i} style={styles.bulletItem}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      )}

      {projects?.length > 0 && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Projects</h2>
          {projects.map(proj => (
            <div key={proj.id} style={{ marginBottom: '8px' }}>
              <div style={styles.itemHeader}>
                <span>
                  <span style={styles.itemTitle}>{proj.name}</span>
                  {proj.tech?.length > 0 && <span style={styles.itemSubtitle}> ({proj.tech.join(', ')})</span>}
                </span>
              </div>
              <ul style={styles.bullets}>
                {(proj.bullets || []).map((b, i) => <li key={i} style={styles.bulletItem}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      )}

      {skills && (skills.technical?.length > 0 || skills.tools?.length > 0) && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Skills</h2>
          <div style={{ paddingLeft: '8px' }}>
            {skills.technical?.length > 0 && (
              <div style={{ marginBottom: '2px' }}>
                <span style={styles.itemTitle}>Technical: </span>
                <span>{skills.technical.join(', ')}</span>
              </div>
            )}
            {skills.tools?.length > 0 && (
              <div style={{ marginBottom: '2px' }}>
                <span style={styles.itemTitle}>Tools: </span>
                <span>{skills.tools.join(', ')}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
