import React from 'react';

export function ProfessionalTemplate({ data }) {
  const { personal: p, summary, experience, education, skills, projects, certifications } = data;

  const styles = {
    container: {
      fontFamily: '"Times New Roman", Times, serif',
      color: '#000',
      padding: '40px 48px',
      lineHeight: 1.3,
      fontSize: '11px',
      minHeight: '100%',
      backgroundColor: 'white'
    },
    header: {
      textAlign: 'center',
      marginBottom: '16px'
    },
    name: {
      fontSize: '28px',
      textTransform: 'uppercase',
      letterSpacing: '2px',
      marginBottom: '4px'
    },
    title: {
      fontSize: '12px',
      marginBottom: '4px'
    },
    contact: {
      fontSize: '11px',
      marginBottom: '4px'
    },
    links: {
      fontSize: '11px',
      fontWeight: 'bold'
    },
    section: {
      marginBottom: '16px'
    },
    sectionTitle: {
      fontSize: '14px',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      borderBottom: '1px solid #000',
      paddingBottom: '2px',
      marginBottom: '8px'
    },
    itemHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '2px'
    },
    rightAlign: {
      textAlign: 'right',
      flexShrink: 0,
      marginLeft: '16px'
    },
    bold: { fontWeight: 'bold' },
    italic: { fontStyle: 'italic' },
    bullets: {
      margin: '4px 0 0 0',
      paddingLeft: '18px'
    },
    bulletItem: {
      marginBottom: '2px'
    },
    skillsTable: {
      display: 'grid',
      gridTemplateColumns: '150px 1fr',
      gap: '4px 0',
      paddingLeft: '18px'
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.name}>{p.name}</div>
        <div style={styles.title}>{p.title}</div>
        <div style={styles.contact}>
          {p.email} {p.email && p.phone && '|'} {p.phone}
        </div>
        <div style={styles.links}>
          {[
            p.github && 'GitHub',
            p.linkedin && 'LinkedIn',
            p.portfolio && 'Portfolio'
          ].filter(Boolean).join(' | ')}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Summary</div>
          <div>{summary}</div>
        </div>
      )}

      {/* Education */}
      {education?.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Education</div>
          {education.map(edu => (
            <div key={edu.id} style={{ marginBottom: '8px' }}>
              <div style={styles.itemHeader}>
                <span style={styles.bold}>{edu.institution}</span>
                <span style={styles.rightAlign}>{edu.location || ''}</span>
              </div>
              <div style={styles.itemHeader}>
                <span style={styles.italic}>{edu.degree}</span>
                <span style={styles.rightAlign}>{edu.year}</span>
              </div>
              {edu.grade && <div style={styles.italic}>CGPA/Percentage: {edu.grade}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Experience */}
      {experience?.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Experience</div>
          {experience.map(exp => (
            <div key={exp.id} style={{ marginBottom: '12px' }}>
              <div style={styles.itemHeader}>
                <span>
                  <span style={styles.bold}>{exp.company}</span>
                  {exp.company && exp.title && ' | '}
                  <span style={styles.bold}>{exp.title}</span>
                </span>
                <span style={styles.rightAlign}>{exp.startDate} - {exp.endDate}</span>
              </div>
              <ul style={styles.bullets}>
                {(exp.bullets || []).map((b, i) => <li key={i} style={styles.bulletItem}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {(skills?.technical?.length > 0 || skills?.tools?.length > 0) && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Skills</div>
          <div style={styles.skillsTable}>
            {skills.technical?.length > 0 && (
              <>
                <span>Languages/Frameworks:</span>
                <span>{skills.technical.join(', ')}</span>
              </>
            )}
            {skills.tools?.length > 0 && (
              <>
                <span>Tools/Platforms:</span>
                <span>{skills.tools.join(', ')}</span>
              </>
            )}
            {skills.soft?.length > 0 && (
              <>
                <span>Soft Skills:</span>
                <span>{skills.soft.join(', ')}</span>
              </>
            )}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects?.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Projects / Open-Source</div>
          {projects.map(proj => (
            <div key={proj.id} style={{ marginBottom: '12px' }}>
              <div style={styles.itemHeader}>
                <span style={styles.bold}>{proj.name}</span>
                <span style={{ ...styles.italic, ...styles.rightAlign }}>{proj.tech?.join(', ')}</span>
              </div>
              <ul style={styles.bullets}>
                {(proj.bullets || []).map((b, i) => <li key={i} style={styles.bulletItem}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications?.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Certifications</div>
          <ul style={{ ...styles.bullets, paddingLeft: '18px', margin: 0 }}>
            {certifications.map(cert => (
              <li key={cert.id} style={styles.bulletItem}>
                {cert.name} {cert.issuer && `- ${cert.issuer}`} {cert.date && `(${cert.date})`}
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
}
