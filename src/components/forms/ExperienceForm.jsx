import React, { useContext, useState } from 'react';
import { ResumeContext } from '../../context/ResumeContext';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { IconGripVertical, IconX, IconPlus, IconSparkles } from '@tabler/icons-react';
import { enhanceBullets, fixGrammarBullets } from '../../utils/geminiApi';
import { toast } from '../../utils/toast';
import { IconWand } from '@tabler/icons-react';

export function ExperienceForm() {
  const { data, update } = useContext(ResumeContext);
  const experience = data.experience || [];
  const [loadingId, setLoadingId] = useState(null);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(experience);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    update('experience', items);
  };

  const handleChange = (index, field, value) => {
    const newExp = [...experience];
    newExp[index][field] = value;
    update('experience', newExp);
  };

  const handleBulletChange = (expIndex, bulletIndex, value) => {
    const newExp = [...experience];
    newExp[expIndex].bullets[bulletIndex] = value;
    update('experience', newExp);
  };

  const addBullet = (expIndex) => {
    const newExp = [...experience];
    newExp[expIndex].bullets.push('');
    update('experience', newExp);
  };

  const removeBullet = (expIndex, bulletIndex) => {
    const newExp = [...experience];
    newExp[expIndex].bullets.splice(bulletIndex, 1);
    update('experience', newExp);
  };

  const addExperience = () => {
    const newId = Date.now();
    update('experience', [...experience, { id: newId, title: '', company: '', location: '', startDate: '', endDate: '', bullets: [''] }]);
  };

  const removeExperience = (index) => {
    const newExp = [...experience];
    newExp.splice(index, 1);
    update('experience', newExp);
  };

  const handleEnhance = async (expIndex) => {
    const exp = experience[expIndex];
    if (!exp.title || !exp.company) {
      toast.error('Please fill Job Title and Company before enhancing');
      return;
    }
    try {
      setLoadingId(exp.id);
      const enhanced = await enhanceBullets(exp.title, exp.company, exp.bullets);
      const newExp = [...experience];
      newExp[expIndex].bullets = enhanced;
      update('experience', newExp);
      toast.success('Bullets enhanced successfully');
    } catch (err) {
      toast.error('Failed to enhance bullets');
    } finally {
      setLoadingId(null);
    }
  };

  const handleFixGrammar = async (expIndex) => {
    const exp = experience[expIndex];
    if (!exp.bullets || exp.bullets.length === 0 || exp.bullets.every(b => !b.trim())) {
      toast.error('Please add some bullet points to fix');
      return;
    }
    try {
      setLoadingId(`grammar-${exp.id}`);
      const fixed = await fixGrammarBullets(exp.bullets);
      const newExp = [...experience];
      newExp[expIndex].bullets = fixed;
      update('experience', newExp);
      toast.success('Grammar fixed successfully');
    } catch (err) {
      toast.error('Failed to fix grammar');
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="form-panel-content">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="experience-list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {experience.map((exp, index) => (
                <Draggable key={exp.id} draggableId={exp.id.toString()} index={index}>
                  {(provided) => (
                    <div 
                      ref={provided.innerRef} 
                      {...provided.draggableProps} 
                      className="form-card"
                      style={{ 
                        ...provided.draggableProps.style,
                        border: '1px solid var(--border)',
                        padding: '16px',
                        marginBottom: '16px',
                        borderRadius: '8px',
                        backgroundColor: 'var(--surface)'
                      }}
                    >
                      <div className="flex justify-between items-center" style={{ marginBottom: '12px' }}>
                        <div {...provided.dragHandleProps} style={{ cursor: 'grab', color: 'var(--text-3)' }}>
                          <IconGripVertical size={20} />
                        </div>
                        <button className="btn-icon" onClick={() => removeExperience(index)} style={{ color: 'var(--danger)' }}>
                          <IconX size={18} />
                        </button>
                      </div>

                      <div className="flex gap-3">
                        <div className="form-group" style={{ flex: 1 }}>
                          <label className="form-label">Job Title</label>
                          <input className="form-input" value={exp.title} onChange={e => handleChange(index, 'title', e.target.value)} />
                        </div>
                        <div className="form-group" style={{ flex: 1 }}>
                          <label className="form-label">Company</label>
                          <input className="form-input" value={exp.company} onChange={e => handleChange(index, 'company', e.target.value)} />
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="form-group" style={{ flex: 1 }}>
                          <label className="form-label">Start Date</label>
                          <input className="form-input" value={exp.startDate} onChange={e => handleChange(index, 'startDate', e.target.value)} placeholder="e.g. Feb 2026" />
                        </div>
                        <div className="form-group" style={{ flex: 1 }}>
                          <label className="form-label">End Date</label>
                          <input className="form-input" value={exp.endDate} onChange={e => handleChange(index, 'endDate', e.target.value)} placeholder="e.g. Present" />
                        </div>
                        <div className="form-group" style={{ flex: 1 }}>
                          <label className="form-label">Location</label>
                          <input className="form-input" value={exp.location} onChange={e => handleChange(index, 'location', e.target.value)} />
                        </div>
                      </div>

                      <div className="bullets-section" style={{ marginTop: '12px' }}>
                        <label className="form-label">Responsibilities</label>
                        {(exp.bullets || []).map((bullet, bIndex) => (
                          <div key={bIndex} className="flex gap-2 items-start" style={{ marginBottom: '8px' }}>
                            <span style={{ marginTop: '10px', color: 'var(--text-3)' }}>•</span>
                            <textarea 
                              className="form-textarea" 
                              rows={2}
                              value={bullet}
                              onChange={e => handleBulletChange(index, bIndex, e.target.value)}
                            />
                            <button onClick={() => removeBullet(index, bIndex)} style={{ marginTop: '10px', color: 'var(--text-3)', background: 'none', border: 'none', cursor: 'pointer' }}>
                              <IconX size={16} />
                            </button>
                          </div>
                        ))}
                        <div className="flex gap-3" style={{ marginTop: '8px' }}>
                          <button className="btn-outline" onClick={() => addBullet(index)} style={{ padding: '6px 12px', fontSize: '12px' }}>
                            <IconPlus size={14} /> Add Bullet
                          </button>
                          <button className="btn-outline" onClick={() => handleFixGrammar(index)} disabled={loadingId === `grammar-${exp.id}`} style={{ padding: '6px 12px', fontSize: '12px', color: 'var(--brand)' }}>
                            <IconWand size={14} /> {loadingId === `grammar-${exp.id}` ? 'Fixing...' : 'Fix Grammar'}
                          </button>
                          <button className="btn-outline" onClick={() => handleEnhance(index)} disabled={loadingId === exp.id} style={{ padding: '6px 12px', fontSize: '12px', color: 'var(--brand)' }}>
                            <IconSparkles size={14} /> {loadingId === exp.id ? 'Enhancing...' : 'Enhance with AI'}
                          </button>
                        </div>
                      </div>

                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <button className="btn-primary w-full" onClick={addExperience} style={{ marginTop: '8px' }}>
        <IconPlus size={18} /> Add Experience
      </button>
    </div>
  );
}
