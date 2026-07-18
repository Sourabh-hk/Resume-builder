import React, { useContext } from 'react';
import { ResumeContext } from '../../context/ResumeContext';
import { ImportResume } from './ImportResume';

export function PersonalInfoForm() {
  const { data, updatePersonal } = useContext(ResumeContext);
  const p = data.personal || {};

  return (
    <div className="form-panel-content">
      <ImportResume />

      <div className="form-group">
        <label className="form-label">Full Name *</label>
        <input 
          type="text" 
          className="form-input" 
          value={p.name || ''} 
          onChange={(e) => updatePersonal('name', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Professional Title *</label>
        <input 
          type="text" 
          className="form-input" 
          value={p.title || ''} 
          onChange={(e) => updatePersonal('title', e.target.value)}
        />
      </div>

      <div className="flex gap-3">
        <div className="form-group" style={{ flex: 1 }}>
          <label className="form-label">Email *</label>
          <input 
            type="email" 
            className="form-input" 
            value={p.email || ''} 
            onChange={(e) => updatePersonal('email', e.target.value)}
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label className="form-label">Phone *</label>
          <input 
            type="tel" 
            className="form-input" 
            value={p.phone || ''} 
            onChange={(e) => updatePersonal('phone', e.target.value)}
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Location</label>
        <input 
          type="text" 
          className="form-input" 
          value={p.location || ''} 
          onChange={(e) => updatePersonal('location', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">LinkedIn URL</label>
        <input 
          type="url" 
          className="form-input" 
          value={p.linkedin || ''} 
          onChange={(e) => updatePersonal('linkedin', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">GitHub URL</label>
        <input 
          type="url" 
          className="form-input" 
          value={p.github || ''} 
          onChange={(e) => updatePersonal('github', e.target.value)}
        />
      </div>

      <div className="flex gap-3">
        <div className="form-group" style={{ flex: 1 }}>
          <label className="form-label">Portfolio URL</label>
          <input 
            type="url" 
            className="form-input" 
            value={p.portfolio || ''} 
            onChange={(e) => updatePersonal('portfolio', e.target.value)}
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label className="form-label">LeetCode URL</label>
          <input 
            type="url" 
            className="form-input" 
            value={p.leetcode || ''} 
            onChange={(e) => updatePersonal('leetcode', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
