import React, { useContext } from 'react';
import { ResumeContext } from '../../context/ResumeContext';

export function OptionalSectionsForm() {
  const { data, update } = useContext(ResumeContext);
  const optional = data.optional || { languages: [], hobbies: [], awards: [], custom: [] };

  const toggleSection = (sectionName) => {
    // For simplicity, just handling basic toggling of sections 
    // In a full implementation, this would manage arrays of data
    // Here we just display a placeholder UI for these advanced sections
  };

  return (
    <div className="form-panel-content">
      <div className="form-group">
        <label className="form-label" style={{ marginBottom: '16px', display: 'block' }}>Optional Sections (Coming Soon)</label>
        
        <div style={{ padding: '16px', border: '1px solid var(--border)', borderRadius: '8px', marginBottom: '12px' }}>
          <div className="flex justify-between items-center">
            <span style={{ fontWeight: 500 }}>Languages</span>
            <input type="checkbox" disabled />
          </div>
        </div>

        <div style={{ padding: '16px', border: '1px solid var(--border)', borderRadius: '8px', marginBottom: '12px' }}>
          <div className="flex justify-between items-center">
            <span style={{ fontWeight: 500 }}>Hobbies</span>
            <input type="checkbox" disabled />
          </div>
        </div>

        <div style={{ padding: '16px', border: '1px solid var(--border)', borderRadius: '8px', marginBottom: '12px' }}>
          <div className="flex justify-between items-center">
            <span style={{ fontWeight: 500 }}>Awards</span>
            <input type="checkbox" disabled />
          </div>
        </div>

      </div>
    </div>
  );
}
