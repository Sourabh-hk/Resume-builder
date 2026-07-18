import React, { useContext } from 'react';
import { ResumeContext } from '../../context/ResumeContext';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { IconGripVertical, IconX, IconPlus } from '@tabler/icons-react';

export function CertificationsForm() {
  const { data, update } = useContext(ResumeContext);
  const certifications = data.certifications || [];

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(certifications);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    update('certifications', items);
  };

  const handleChange = (index, field, value) => {
    const newCert = [...certifications];
    newCert[index][field] = value;
    update('certifications', newCert);
  };

  const addCertification = () => {
    const newId = Date.now();
    update('certifications', [...certifications, { id: newId, name: '', issuer: '', date: '', url: '' }]);
  };

  const removeCertification = (index) => {
    const newCert = [...certifications];
    newCert.splice(index, 1);
    update('certifications', newCert);
  };

  return (
    <div className="form-panel-content">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="cert-list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {certifications.map((cert, index) => (
                <Draggable key={cert.id} draggableId={cert.id.toString()} index={index}>
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
                        <button className="btn-icon" onClick={() => removeCertification(index)} style={{ color: 'var(--danger)', background: 'none', border: 'none', cursor: 'pointer' }}>
                          <IconX size={18} />
                        </button>
                      </div>

                      <div className="flex gap-3">
                        <div className="form-group" style={{ flex: 1 }}>
                          <label className="form-label">Certification Name</label>
                          <input className="form-input" value={cert.name} onChange={e => handleChange(index, 'name', e.target.value)} />
                        </div>
                        <div className="form-group" style={{ flex: 1 }}>
                          <label className="form-label">Issuer</label>
                          <input className="form-input" value={cert.issuer} onChange={e => handleChange(index, 'issuer', e.target.value)} />
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="form-group" style={{ flex: 1 }}>
                          <label className="form-label">Date</label>
                          <input className="form-input" value={cert.date} onChange={e => handleChange(index, 'date', e.target.value)} placeholder="e.g. Jan 2025" />
                        </div>
                        <div className="form-group" style={{ flex: 1 }}>
                          <label className="form-label">Credential URL</label>
                          <input type="url" className="form-input" value={cert.url} onChange={e => handleChange(index, 'url', e.target.value)} />
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
      <button className="btn-primary w-full" onClick={addCertification} style={{ marginTop: '8px' }}>
        <IconPlus size={18} /> Add Certification
      </button>
    </div>
  );
}
