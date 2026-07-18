import React, { useContext } from 'react';
import { ResumeContext } from '../../context/ResumeContext';
import { downloadPDF } from '../../utils/pdfExport';
import { downloadLatex } from '../../utils/latexGenerator';
import { toast } from '../../utils/toast';
import { IconDownload, IconLink, IconCheck, IconMaximize } from '@tabler/icons-react';

export function ExportBar({ onShare, onFullScreen }) {

  const { data } = useContext(ResumeContext);
  const name = data.personal?.name || 'Resume';

  const handleCopyLink = () => {
    // Generate a base64 encoded string of current data to use in a shareable link
    const encoded = btoa(encodeURIComponent(JSON.stringify(data)));
    const url = `${window.location.origin}/preview?data=${encoded}`;
    navigator.clipboard.writeText(url);
    toast.success('Link copied to clipboard!');
  };

  return (
    <div className="export-bar" style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      padding: '16px 24px',
      backgroundColor: 'var(--surface-solid)',
      borderTop: '1px solid var(--border)'
    }}>
      <div className="flex gap-3">
        <button 
          className="btn-outline" 
          onClick={onFullScreen}
          style={{ fontSize: '14px', padding: '8px 16px' }}
        >
          <IconMaximize size={16} /> Full View
        </button>
        <button 
          className="btn-primary btn-pdf-export" 
          onClick={() => downloadPDF(name)}
          style={{ fontSize: '14px', padding: '8px 16px' }}
        >
          <IconDownload size={16} /> Download PDF
        </button>
        <button 
          className="btn-outline" 
          onClick={() => downloadLatex(name, data)}
          style={{ fontSize: '14px', padding: '8px 16px' }}
        >
          <IconDownload size={16} /> LaTeX (.tex)
        </button>
        <button 
          className="btn-outline" 
          onClick={handleCopyLink}
          style={{ fontSize: '14px', padding: '8px 16px' }}
        >
          <IconLink size={16} /> Share link
        </button>
      </div>

      <div style={{ fontSize: '11px', color: 'var(--text-3)', display: 'flex', alignItems: 'center', gap: '4px' }}>
        <IconCheck size={14} /> Auto-saved 2 min ago
      </div>
    </div>
  );
}
