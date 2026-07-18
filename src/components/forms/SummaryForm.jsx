import React, { useContext, useState } from 'react';
import { ResumeContext } from '../../context/ResumeContext';
import { generateSummary, fixGrammar } from '../../utils/geminiApi';
import { IconSparkles, IconWand } from '@tabler/icons-react';
import { toast } from '../../utils/toast';

export function SummaryForm() {
  const { data, update } = useContext(ResumeContext);
  const [loading, setLoading] = useState(false);
  const [fixing, setFixing] = useState(false);
  const summary = data.summary || '';

  const handleFixGrammar = async () => {
    if (!summary.trim()) return;
    try {
      setFixing(true);
      const result = await fixGrammar(summary);
      update('summary', result);
      toast.success('Grammar & Tone polished!');
    } catch (err) {
      toast.error('Failed to fix grammar');
    } finally {
      setFixing(false);
    }
  };

  const handleGenerate = async () => {
    try {
      setLoading(true);
      const { name, title } = data.personal || {};
      const skills = data.skills?.technical || [];
      const companies = data.experience?.map(e => e.company) || [];
      const result = await generateSummary(name, title, skills, companies);
      update('summary', result);
      toast.success('Summary generated successfully');
    } catch (err) {
      toast.error('Failed to generate summary');
    } finally {
      setLoading(false);
    }
  };

  const wordCount = summary.trim() ? summary.trim().split(/\\s+/).length : 0;
  const isGoodLength = wordCount >= 40 && wordCount <= 80;

  return (
    <div className="form-panel-content">
      <div className="form-group">
        <label className="form-label">Professional Summary</label>
        <textarea 
          className="form-textarea" 
          rows={5} 
          maxLength={600}
          value={summary}
          onChange={(e) => update('summary', e.target.value)}
          placeholder="Write 3-4 sentences summarizing your career..."
        />
        <div className="flex justify-between items-center" style={{ marginTop: '8px' }}>
          <div className="flex gap-3">
            <span style={{ fontSize: '12px', color: 'var(--text-3)' }}>
              {summary.length} / 600 chars
            </span>
            <span style={{ 
              fontSize: '12px', 
              color: isGoodLength ? 'var(--success)' : 'var(--text-3)',
              fontWeight: isGoodLength ? 600 : 400
            }}>
              {wordCount} words
            </span>
          </div>
          <div className="flex gap-2">
            <button 
              className="btn-outline" 
              onClick={handleFixGrammar} 
              disabled={fixing || !summary.trim()}
              style={{ padding: '6px 12px', fontSize: '12px' }}
            >
              <IconWand size={14} color="var(--brand)" />
              {fixing ? 'Fixing...' : 'Fix Grammar'}
            </button>
            <button 
              className="btn-outline" 
              onClick={handleGenerate} 
              disabled={loading}
              style={{ padding: '6px 12px', fontSize: '12px' }}
            >
              <IconSparkles size={14} color="var(--brand)" />
              {loading ? 'Generating...' : 'Generate with AI'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
