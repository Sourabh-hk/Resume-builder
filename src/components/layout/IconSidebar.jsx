import React from 'react';
import { 
  IconUser, 
  IconFileText, 
  IconBriefcase, 
  IconSchool, 
  IconCode, 
  IconDeviceLaptop, 
  IconCertificate, 
  IconAdjustments, 
  IconSparkles 
} from '@tabler/icons-react';
import { ResumeHealth } from '../forms/ResumeHealth';
import './IconSidebar.css';

export function IconSidebar({ activeSection, setActiveSection, toggleAIPanel }) {
  const sections = [
    { id: 'personal', icon: IconUser, label: 'Personal Info' },
    { id: 'summary', icon: IconFileText, label: 'Summary' },
    { id: 'experience', icon: IconBriefcase, label: 'Experience' },
    { id: 'education', icon: IconSchool, label: 'Education' },
    { id: 'skills', icon: IconCode, label: 'Skills' },
    { id: 'projects', icon: IconDeviceLaptop, label: 'Projects' },
    { id: 'certifications', icon: IconCertificate, label: 'Certifications' },
    { id: 'optional', icon: IconAdjustments, label: 'Optional Sections' },
  ];

  return (
    <div className="icon-sidebar">
      <div className="sidebar-top">
        {sections.map(section => {
          const Icon = section.icon;
          return (
            <div 
              key={section.id}
              className={`sidebar-item ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => setActiveSection(section.id)}
              title={section.label}
            >
              <Icon size={20} />
              <span className="tooltip">{section.label}</span>
            </div>
          );
        })}
      </div>
      <div className="sidebar-bottom">
        <div 
          className="sidebar-item ai-item" 
          onClick={toggleAIPanel}
          title="AI Assistant"
        >
          <IconSparkles size={20} />
          <span className="tooltip">AI Assistant</span>
        </div>
      </div>
    </div>
  );
}
