import React, { useContext } from 'react';
import { ResumeContext } from '../../context/ResumeContext';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { IconGripVertical, IconX, IconPlus } from '@tabler/icons-react';

export function EducationForm() {
  const { data, update } = useContext(ResumeContext);
  const education = data.education || [];

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(education);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    update('education', items);
  };

  const handleChange = (index, field, value) => {
    const newEdu = [...education];
    newEdu[index][field] = value;
    update('education', newEdu);
  };

  const addEducation = () => {
    const newId = Date.now();
    update('education', [...education, { id: newId, degree: '', institution: '', year: '', grade: '' }]);
  };

  const removeEducation = (index) => {
    const newEdu = [...education];
    newEdu.splice(index, 1);
    update('education', newEdu);
  };

  return (
    <div className="form-panel-content">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="education-list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {education.map((edu, index) => (
                <Draggable key={edu.id} draggableId={edu.id.toString()} index={index}>
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
                        <button className="btn-icon" onClick={() => removeEducation(index)} style={{ color: 'var(--danger)', background: 'none', border: 'none', cursor: 'pointer' }}>
                          <IconX size={18} />
                        </button>
                      </div>

                      <div className="flex gap-3">
                        <div className="form-group" style={{ flex: 1 }}>
                          <label className="form-label">Degree</label>
                          <input className="form-input" value={edu.degree} onChange={e => handleChange(index, 'degree', e.target.value)} placeholder="e.g. B.E. in Information Science" />
                        </div>
                        <div className="form-group" style={{ flex: 1 }}>
                          <label className="form-label">Institution</label>
                          <input className="form-input" value={edu.institution} onChange={e => handleChange(index, 'institution', e.target.value)} />
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="form-group" style={{ flex: 1 }}>
                          <label className="form-label">Year</label>
                          <input className="form-input" value={edu.year} onChange={e => handleChange(index, 'year', e.target.value)} placeholder="e.g. Dec 2022 – May 2026" />
                        </div>
                        <div className="form-group" style={{ flex: 1 }}>
                          <label className="form-label">Grade</label>
                          <input className="form-input" value={edu.grade} onChange={e => handleChange(index, 'grade', e.target.value)} placeholder="e.g. CGPA: 8.78" />
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
      <button className="btn-primary w-full" onClick={addEducation} style={{ marginTop: '8px' }}>
        <IconPlus size={18} /> Add Education
      </button>
    </div>
  );
}
