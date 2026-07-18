import React, { useRef, useState, useContext } from 'react';
import { IconUpload } from '@tabler/icons-react';
import { ResumeContext } from '../../context/ResumeContext';
import { parseResume, parseResumeFromImage } from '../../utils/geminiApi';
import { toast } from '../../utils/toast';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export function ImportResume() {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const { setData } = useContext(ResumeContext);

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    toast.success('Analyzing file...', 2000);

    try {
      if (file.type.startsWith('image/')) {
        await handleImage(file);
      } else if (file.type === 'application/pdf') {
        await handlePDF(file);
      } else {
        toast.error('Unsupported file type. Please upload a PDF or Image.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to parse resume');
    } finally {
      setLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleImage = async (file) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64 = e.target.result;
      const parsed = await parseResumeFromImage(base64);
      if (parsed && parsed.personal) {
        setData(parsed);
        toast.success('Resume imported successfully!');
      }
    };
    reader.readAsDataURL(file);
  };

  const handlePDF = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';
    
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      fullText += pageText + '\\n';
    }

    const parsed = await parseResume(fullText);
    if (parsed && parsed.personal) {
      setData(parsed);
      toast.success('Resume imported successfully!');
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="application/pdf,image/*"
        style={{ display: 'none' }}
      />
      <button 
        className="btn-outline" 
        onClick={() => fileInputRef.current?.click()}
        disabled={loading}
        style={{ width: '100%', marginBottom: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
      >
        <IconUpload size={18} />
        {loading ? 'Importing...' : 'Import Resume (PDF/Image)'}
      </button>
    </>
  );
}
