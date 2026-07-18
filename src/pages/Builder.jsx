import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { IconSidebar } from '../components/layout/IconSidebar';
import { PreviewPanel } from '../components/preview/PreviewPanel';
import { AIPanel } from '../components/preview/AIPanel';

// Form Components
import { PersonalInfoForm } from '../components/forms/PersonalInfoForm';
import { SummaryForm } from '../components/forms/SummaryForm';
import { ExperienceForm } from '../components/forms/ExperienceForm';
import { EducationForm } from '../components/forms/EducationForm';
import { SkillsForm } from '../components/forms/SkillsForm';
import { ProjectsForm } from '../components/forms/ProjectsForm';
import { CertificationsForm } from '../components/forms/CertificationsForm';
import { OptionalSectionsForm } from '../components/forms/OptionalSectionsForm';
import { ResumeHealth } from '../components/forms/ResumeHealth';

export function Builder() {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('personal');
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState('DeveloperDark');

  const renderActiveForm = () => {
    switch (activeSection) {
      case 'personal': return <PersonalInfoForm />;
      case 'summary': return <SummaryForm />;
      case 'experience': return <ExperienceForm />;
      case 'education': return <EducationForm />;
      case 'skills': return <SkillsForm />;
      case 'projects': return <ProjectsForm />;
      case 'certifications': return <CertificationsForm />;
      case 'optional': return <OptionalSectionsForm />;
      default: return <PersonalInfoForm />;
    }
  };

  const getSectionTitle = () => {
    const titles = {
      personal: 'Personal Information',
      summary: 'Professional Summary',
      experience: 'Work Experience',
      education: 'Education',
      skills: 'Skills',
      projects: 'Projects',
      certifications: 'Certifications',
      optional: 'Optional Sections'
    };
    return titles[activeSection];
  };

  return (
    <div className="mesh-bg" style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <Navbar />
      
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', padding: '16px', gap: '16px' }}>
        {/* Left Sidebar */}
        <div className="glass-panel" style={{ display: 'flex', borderRadius: '16px', overflow: 'hidden' }}>
          <IconSidebar 
            activeSection={activeSection} 
            setActiveSection={setActiveSection} 
            toggleAIPanel={() => setShowAIPanel(!showAIPanel)}
          />
        </div>

        {/* Center Form Panel */}
        <div className="glass-panel" style={{ 
          width: '400px', 
          display: 'flex',
          flexDirection: 'column',
          zIndex: 10,
          borderRadius: '16px',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '24px 24px 16px', borderBottom: '1px solid var(--border)', backgroundColor: 'var(--surface-solid)' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600 }}>{getSectionTitle()}</h2>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px', backgroundColor: 'var(--surface)' }}>
            {renderActiveForm()}
          </div>
          <div style={{ backgroundColor: 'var(--surface-solid)' }}>
            <ResumeHealth />
          </div>
        </div>

        {/* Right Panel (Preview / AI Panel) */}
        <div className="glass-panel" style={{ flex: 1, display: 'flex', position: 'relative', overflow: 'hidden', borderRadius: '16px' }}>
          
          <div style={{ flex: 1, transition: 'all 0.3s', backgroundColor: 'var(--surface-solid)' }}>
            <PreviewPanel activeTemplate={activeTemplate} setActiveTemplate={setActiveTemplate} />
          </div>

          {/* AI Panel Slide-over */}
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            width: '400px',
            backgroundColor: 'var(--surface-solid)',
            boxShadow: '-8px 0 32px rgba(0,0,0,0.1)',
            transform: showAIPanel ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            zIndex: 20,
            borderLeft: '1px solid var(--border)'
          }}>
            <AIPanel onClose={() => setShowAIPanel(false)} initialJdId={location.state?.jdId} />
          </div>

        </div>
      </div>
    </div>
  );
}
