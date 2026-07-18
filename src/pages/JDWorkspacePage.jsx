import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from '../utils/toast';
import { useNavigate } from 'react-router-dom';
import './JDWorkspace.css';

export function JDWorkspacePage() {
  const [jds, setJds] = useState([]);
  const [title, setTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [role, setRole] = useState('');
  const [jobDescriptionText, setJobDescriptionText] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedJd, setSelectedJd] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJDs();
  }, []);

  const fetchJDs = async () => {
    try {
      const res = await axios.get('/api/jds');
      setJds(res.data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load Job Descriptions');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!jobDescriptionText) return toast.error('Please paste a Job Description');
    setLoading(true);
    try {
      const res = await axios.post('/api/jds', {
        title,
        companyName,
        role,
        jobDescriptionText
      });
      toast.success('Job Description saved & analyzed!');
      setJds([res.data, ...jds]);
      setSelectedJd(res.data);
      // Reset form
      setTitle('');
      setCompanyName('');
      setRole('');
      setJobDescriptionText('');
    } catch (err) {
      toast.error('Failed to save JD');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/jds/${id}`);
      setJds(jds.filter(j => j._id !== id));
      if (selectedJd && selectedJd._id === id) setSelectedJd(null);
      toast.success('Deleted');
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="jd-workspace">
      <div className="jd-sidebar">
        <h3>Saved Job Descriptions</h3>
        <button className="btn-primary w-full" onClick={() => setSelectedJd(null)}>+ New JD</button>
        <ul className="jd-list">
          {jds.map(jd => (
            <li key={jd._id} className={selectedJd?._id === jd._id ? 'active' : ''} onClick={() => setSelectedJd(jd)}>
              <div className="jd-title">{jd.title || jd.role || 'Untitled JD'}</div>
              <div className="jd-company">{jd.companyName}</div>
              <button className="btn-icon" onClick={(e) => { e.stopPropagation(); handleDelete(jd._id); }}>🗑</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="jd-main">
        {selectedJd ? (
          <div className="jd-details">
            <h2>{selectedJd.title}</h2>
            <div className="jd-meta">
              <span><strong>Company:</strong> {selectedJd.companyName}</span>
              <span><strong>Role:</strong> {selectedJd.role}</span>
            </div>
            
            <div className="jd-analysis">
              <h3>AI Analysis</h3>
              {selectedJd.analysis ? (
                <div className="analysis-grid">
                  <div className="analysis-card">
                    <h4>Required Skills</h4>
                    <div className="skill-tags">
                      {selectedJd.analysis.requiredSkills?.map(s => <span key={s} className="tag required">{s}</span>)}
                    </div>
                  </div>
                  <div className="analysis-card">
                    <h4>Keywords & Tools</h4>
                    <div className="skill-tags">
                      {selectedJd.analysis.keywords?.map(s => <span key={s} className="tag keyword">{s}</span>)}
                      {selectedJd.analysis.tools?.map(s => <span key={s} className="tag tool">{s}</span>)}
                    </div>
                  </div>
                  <div className="analysis-card">
                    <h4>Soft Skills</h4>
                    <div className="skill-tags">
                      {selectedJd.analysis.softSkills?.map(s => <span key={s} className="tag soft">{s}</span>)}
                    </div>
                  </div>
                </div>
              ) : (
                <p>No analysis available.</p>
              )}
            </div>

            <div className="jd-raw">
              <h3>Original Description</h3>
              <pre>{selectedJd.jobDescriptionText}</pre>
            </div>
            
            <div className="jd-actions">
              <button className="btn-primary" onClick={() => navigate('/builder', { state: { jdId: selectedJd._id } })}>
                Tailor Resume to this JD
              </button>
            </div>
          </div>
        ) : (
          <div className="jd-form-container">
            <h2>Add New Job Description</h2>
            <form onSubmit={handleSave} className="jd-form">
              <div className="form-group">
                <label>Title (Internal)</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Google Frontend Eng" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Company Name</label>
                  <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <input type="text" value={role} onChange={e => setRole(e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <label>Job Description Text *</label>
                <textarea 
                  required
                  value={jobDescriptionText} 
                  onChange={e => setJobDescriptionText(e.target.value)}
                  placeholder="Paste the full job description here..."
                  rows="15"
                ></textarea>
              </div>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Analyzing with AI...' : 'Save & Analyze'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
