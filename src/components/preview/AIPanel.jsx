import React, { useState, useContext, useEffect } from 'react';
import { ResumeContext } from '../../context/ResumeContext';
import axios from 'axios';
import { IconSparkles, IconX, IconCheck } from '@tabler/icons-react';
import { toast } from '../../utils/toast';

export function AIPanel({ onClose, initialJdId }) {
  const { data, setData, activeResumeId } = useContext(ResumeContext);
  const [jd, setJd] = useState('');
  const [loadingScore, setLoadingScore] = useState(false);
  const [loadingTailor, setLoadingTailor] = useState(false);
  const [scoreResult, setScoreResult] = useState(null);

  useEffect(() => {
    if (initialJdId) {
      // Fetch JD text
      axios.get(`/api/jds/${initialJdId}`).then(res => {
        if (res.data && res.data.jobDescriptionText) {
          setJd(res.data.jobDescriptionText);
        }
      }).catch(err => {
        console.error('Failed to fetch JD', err);
      });
    }
  }, [initialJdId]);

  const getResumeText = () => {
    return JSON.stringify(data);
  };

  const handleScore = async () => {
    if (!jd.trim()) {
      toast.error('Please paste a job description first');
      return;
    }
    try {
      setLoadingScore(true);
      const res = await axios.post('/api/ai/recruiter-review', {
        resumeText: getResumeText(),
        jdText: jd
      });
      // Mock formatting since we changed the backend to recruiter-review logic 
      // but the UI expects an ATS score format
      setScoreResult({
        ats_score: res.data.shortlistChance === 'High' ? 95 : res.data.shortlistChance === 'Medium' ? 75 : 55,
        grade: res.data.shortlistChance === 'High' ? 'A' : 'C',
        overall_summary: res.data.recruiterImpression,
        improvements: res.data.suggestedImprovements?.map(s => ({ section: 'General', suggestion: s })) || []
      });
      toast.success('Resume scored successfully');
    } catch (err) {
      toast.error('Failed to score resume');
    } finally {
      setLoadingScore(false);
    }
  };

  const handleTailor = async () => {
    if (!jd.trim()) {
      toast.error('Please paste a job description first');
      return;
    }
    try {
      setLoadingTailor(true);
      const res = await axios.post('/api/ai/tailor-resume', {
        resumeJSON: data,
        jdText: jd
      });
      
      const tailored = res.data;
      if (tailored && tailored.personal) {
        setData(tailored);
        toast.success('Resume tailored successfully!');
        
        // Auto-update the ATS score
        setScoreResult(null);
        handleScore();
        
      } else {
        throw new Error('Invalid format returned');
      }
    } catch (err) {
      toast.error('Failed to tailor resume');
    } finally {
      setLoadingTailor(false);
    }
  };

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="flex justify-between items-center" style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <IconSparkles size={20} color="var(--brand)" /> AI Assistant
        </h2>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-2)', cursor: 'pointer' }}>
          <IconX size={20} />
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', flex: 1, overflowY: 'auto' }}>
        
        <div>
          <label className="form-label">Job Description</label>
          <textarea 
            className="form-textarea" 
            rows={8} 
            value={jd} 
            onChange={e => setJd(e.target.value)}
            placeholder="Paste the job description here..."
          />
        </div>

        <div className="flex gap-3">
          <button 
            className="btn-outline" 
            style={{ flex: 1, padding: '10px' }} 
            onClick={handleScore} 
            disabled={loadingScore || loadingTailor}
          >
            {loadingScore ? 'Scoring...' : 'Score Resume'}
          </button>
          <button 
            className="btn-primary" 
            style={{ flex: 1, padding: '10px' }} 
            onClick={handleTailor} 
            disabled={loadingScore || loadingTailor}
          >
            <IconSparkles size={16} /> {loadingTailor ? 'Tailoring...' : 'Auto-Tailor'}
          </button>
        </div>

        {scoreResult && (
          <div style={{ backgroundColor: 'var(--surface-2)', padding: '20px', borderRadius: '8px', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <div style={{ 
                width: '60px', height: '60px', borderRadius: '50%', 
                border: `4px solid ${scoreResult.ats_score > 80 ? 'var(--success)' : scoreResult.ats_score > 60 ? 'var(--warning)' : 'var(--danger)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '18px', fontWeight: 700
              }}>
                {scoreResult.ats_score}
              </div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: 600 }}>ATS Match: {scoreResult.grade}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-2)' }}>Based on provided job description</div>
              </div>
            </div>

            {scoreResult.overall_summary && (
              <div style={{ marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid var(--border)' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Overall Analysis:</div>
                <div style={{ fontSize: '12px', color: 'var(--text-2)', lineHeight: 1.5 }}>
                  {scoreResult.overall_summary}
                </div>
              </div>
            )}

            {scoreResult.improvements?.length > 0 && (
              <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, marginBottom: '8px' }}>Specific Improvements:</div>
                <ul style={{ fontSize: '12px', color: 'var(--text-2)', paddingLeft: '16px', margin: 0 }}>
                  {scoreResult.improvements.map((imp, i) => (
                    <li key={i} style={{ marginBottom: '6px' }}>
                      <strong>{imp.section}:</strong> {imp.suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
