import React, { useContext, useState } from 'react';
import { ResumeContext } from '../../context/ResumeContext';
import { IconX, IconSparkles } from '@tabler/icons-react';
import { extractSkills } from '../../utils/geminiApi';
import { toast } from '../../utils/toast';

export function SkillsForm() {
  const { data, update } = useContext(ResumeContext);
  const skills = data.skills || { technical: [], tools: [], soft: [] };

  const [techInput, setTechInput] = useState('');
  const [toolsInput, setToolsInput] = useState('');
  const [softInput, setSoftInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAutoExtract = async () => {
    const expText = JSON.stringify(data.experience || []);
    const projText = JSON.stringify(data.projects || []);
    if (expText.length < 20 && projText.length < 20) {
      toast.error('Please add experience or projects first!');
      return;
    }
    
    try {
      setLoading(true);
      const extracted = await extractSkills(expText, projText);
      if (extracted) {
        // Merge with existing skills uniquely
        const mergeUnique = (arr1, arr2) => [...new Set([...(arr1 || []), ...(arr2 || [])])];
        
        update('skills', {
          technical: mergeUnique(skills.technical, extracted.technical),
          tools: mergeUnique(skills.tools, extracted.tools),
          soft: mergeUnique(skills.soft, extracted.soft)
        });
        toast.success('Skills auto-extracted successfully!');
      }
    } catch (err) {
      toast.error('Failed to extract skills');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e, category, inputVal, setInput) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = inputVal.trim();
      if (val && !skills[category].includes(val)) {
        update('skills', { ...skills, [category]: [...skills[category], val] });
      }
      setInput('');
    }
  };

  const removeSkill = (category, index) => {
    const newSkills = [...skills[category]];
    newSkills.splice(index, 1);
    update('skills', { ...skills, [category]: newSkills });
  };

  const renderSkillGroup = (title, category, inputVal, setInput) => (
    <div className="form-group" style={{ marginBottom: '24px' }}>
      <label className="form-label">{title}</label>
      <div 
        className="form-input" 
        style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '8px', 
          padding: '8px', 
          minHeight: '44px',
          height: 'auto'
        }}
      >
        {skills[category].map((skill, idx) => (
          <div 
            key={idx} 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px',
              backgroundColor: 'var(--brand-light)', 
              color: 'var(--brand-dark)', 
              padding: '4px 8px', 
              borderRadius: '4px',
              fontSize: '13px'
            }}
          >
            {skill}
            <button 
              onClick={() => removeSkill(category, idx)} 
              style={{ background: 'none', border: 'none', color: 'var(--brand-dark)', cursor: 'pointer', display: 'flex' }}
            >
              <IconX size={14} />
            </button>
          </div>
        ))}
        <input 
          type="text" 
          value={inputVal}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => handleKeyDown(e, category, inputVal, setInput)}
          style={{ border: 'none', outline: 'none', flex: 1, minWidth: '100px', backgroundColor: 'transparent', color: 'var(--text-1)' }}
          placeholder="Type and press Enter..."
        />
      </div>
    </div>
  );

  return (
    <div className="form-panel-content">
      <div style={{ marginBottom: '24px' }}>
        <button 
          className="btn-outline w-full" 
          onClick={handleAutoExtract} 
          disabled={loading}
          style={{ padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--brand)' }}
        >
          <IconSparkles size={18} /> {loading ? 'Analyzing Experience...' : '🪄 Auto-Extract Skills from Experience'}
        </button>
        <div style={{ fontSize: '11px', color: 'var(--text-3)', textAlign: 'center', marginTop: '8px' }}>
          Automatically generates a list of skills by reading your past jobs and projects.
        </div>
      </div>

      {renderSkillGroup('Technical Skills', 'technical', techInput, setTechInput)}
      {renderSkillGroup('Tools & Platforms', 'tools', toolsInput, setToolsInput)}
      {renderSkillGroup('Soft Skills', 'soft', softInput, setSoftInput)}
    </div>
  );
}
