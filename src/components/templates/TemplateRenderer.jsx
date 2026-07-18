import React, { useContext } from 'react';
import { ResumeContext } from '../../context/ResumeContext';
import { ClassicTemplate } from './ClassicTemplate';
import { ModernTemplate } from './ModernTemplate';
import { DeveloperDarkTemplate } from './DeveloperDarkTemplate';
import { ProfessionalTemplate } from './ProfessionalTemplate';
import { ExecutiveTemplate } from './ExecutiveTemplate';
import { MinimalistTemplate } from './MinimalistTemplate';
import { HarvardTemplate } from './HarvardTemplate';

export function TemplateRenderer({ templateName }) {
  const { data } = useContext(ResumeContext);

  switch (templateName) {
    case 'Professional': return <ProfessionalTemplate data={data} />;
    case 'Harvard': return <HarvardTemplate data={data} />;
    case 'Executive': return <ExecutiveTemplate data={data} />;
    case 'Minimalist': return <MinimalistTemplate data={data} />;
    case 'Classic': return <ClassicTemplate data={data} />;
    case 'Modern': return <ModernTemplate data={data} />;
    case 'DeveloperDark': return <DeveloperDarkTemplate data={data} />;
    default: return <ProfessionalTemplate data={data} />;
  }
}
