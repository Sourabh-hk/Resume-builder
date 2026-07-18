import React, { useContext } from 'react';
import { ResumeContext } from '../../context/ResumeContext';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { IconGripVertical, IconX, IconPlus } from '@tabler/icons-react';

export function ProjectsForm() {
  const { data, update } = useContext(ResumeContext);
  const projects = data.projects || [];

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(projects);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    update('projects', items);
  };

  const handleChange = (index, field, value) => {
    const newProj = [...projects];
    newProj[index][field] = value;
    update('projects', newProj);
  };

  const handleTechChange = (index, value) => {
    const techArray = value.split(',').map(t => t.trim()).filter(Boolean);
    handleChange(index, 'tech', techArray);
  };

  const handleBulletChange = (projIndex, bulletIndex, value) => {
    const newProj = [...projects];
    newProj[projIndex].bullets[bulletIndex] = value;
    update('projects', newProj);
  };

  const addBullet = (projIndex) => {
    const newProj = [...projects];
    newProj[projIndex].bullets.push('');
    update('projects', newProj);
  };

  const removeBullet = (projIndex, bulletIndex) => {
    const newProj = [...projects];
    newProj[projIndex].bullets.splice(bulletIndex, 1);
    update('projects', newProj);
  };

  const addProject = () => {
    const newId = Date.now();
    update('projects', [...projects, { id: newId, name: '', tech: [], bullets: [''], live: '', github: '' }]);
  };

  const removeProject = (index) => {
    const newProj = [...projects];
    newProj.splice(index, 1);
    update('projects', newProj);
  };

  return (
    <div className="form-panel-content">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="project-list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {projects.map((proj, index) => (
                <Draggable key={proj.id} draggableId={proj.id.toString()} index={index}>
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
                        <button className="btn-icon" onClick={() => removeProject(index)} style={{ color: 'var(--danger)', background: 'none', border: 'none', cursor: 'pointer' }}>
                          <IconX size={18} />
                        </button>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Project Name</label>
                        <input className="form-input" value={proj.name} onChange={e => handleChange(index, 'name', e.target.value)} />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Technologies (comma separated)</label>
                        <input 
                          className="form-input" 
                          value={proj.tech.join(', ')} 
                          onChange={e => handleTechChange(index, e.target.value)} 
                          placeholder="React, Node.js, MongoDB"
                        />
                      </div>

                      <div className="flex gap-3">
                        <div className="form-group" style={{ flex: 1 }}>
                          <label className="form-label">Live Link</label>
                          <input type="url" className="form-input" value={proj.live} onChange={e => handleChange(index, 'live', e.target.value)} />
                        </div>
                        <div className="form-group" style={{ flex: 1 }}>
                          <label className="form-label">GitHub Link</label>
                          <input type="url" className="form-input" value={proj.github} onChange={e => handleChange(index, 'github', e.target.value)} />
                        </div>
                      </div>

                      <div className="bullets-section" style={{ marginTop: '12px' }}>
                        <label className="form-label">Description Bullets</label>
                        {(proj.bullets || []).map((bullet, bIndex) => (
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
                        <button className="btn-outline" onClick={() => addBullet(index)} style={{ marginTop: '8px', padding: '6px 12px', fontSize: '12px' }}>
                          <IconPlus size={14} /> Add Bullet
                        </button>
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
      <button className="btn-primary w-full" onClick={addProject} style={{ marginTop: '8px' }}>
        <IconPlus size={18} /> Add Project
      </button>
    </div>
  );
}
