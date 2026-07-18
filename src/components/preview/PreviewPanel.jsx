import React, { useRef, useEffect, useState, useContext } from 'react';
import { ResumeContext } from '../../context/ResumeContext';
import { TemplateRenderer } from '../templates/TemplateRenderer';
import { ExportBar } from './ExportBar';

export function PreviewPanel({ activeTemplate, setActiveTemplate }) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [isFullScreen, setIsFullScreen] = useState(false);


  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        // Calculate scale to fit 794px A4 width inside container, with some padding
        const containerWidth = containerRef.current.clientWidth - 48; // 24px padding each side
        const newScale = Math.min(containerWidth / 794, 1); // Don't scale up past 1
        setScale(newScale);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { data, update } = useContext(ResumeContext);
  const currentFont = data.settings?.font || 'Inter';
  const templates = ['Professional', 'Harvard', 'Executive', 'Minimalist', 'Classic', 'Modern', 'DeveloperDark'];
  const fonts = ['Inter', 'Roboto', 'Helvetica', 'Georgia', 'EB Garamond', 'Times New Roman'];

  // Auto-fit to 1 page logic
  const contentRef = useRef(null);
  const [contentScale, setContentScale] = useState(1);

  // We need to re-run the scaling logic whenever data or template changes
  useEffect(() => {
    // Small timeout to allow DOM to render the new template/data
    const timer = setTimeout(() => {
      if (contentRef.current) {
        // Reset scale to 1 first to get true natural height
        setContentScale(1);
        
        requestAnimationFrame(() => {
          if (!contentRef.current) return;
          const naturalHeight = contentRef.current.scrollHeight;
          const targetHeight = 1122; // Max A4 height in px
          
          if (naturalHeight > targetHeight) {
            // Content is too long, shrink it to fit 1 page
            const shrinkRatio = targetHeight / naturalHeight;
            setContentScale(shrinkRatio);
          } else {
            // Content fits, don't stretch it
            setContentScale(1);
          }
        });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [data, activeTemplate]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Toolbar */}
      <div style={{ 
        padding: '12px 24px', 
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
        overflowX: 'auto',
        backgroundColor: 'var(--surface)'
      }}>
        <span style={{ fontSize: '12px', color: 'var(--text-2)', marginRight: '8px' }}>Live preview</span>
        {templates.map(t => (
          <button 
            key={t}
            onClick={() => setActiveTemplate(t)}
            style={{
              padding: '4px 12px',
              borderRadius: '16px',
              border: `1px solid ${activeTemplate === t ? 'var(--brand)' : 'var(--border)'}`,
              backgroundColor: activeTemplate === t ? 'var(--brand)' : 'transparent',
              color: activeTemplate === t ? 'white' : 'var(--text-1)',
              fontSize: '12px',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {t === 'DeveloperDark' ? 'Dev Dark' : t}
          </button>
        ))}
        
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-3)' }}>Font:</span>
          <select 
            value={currentFont}
            onChange={(e) => update('settings', { ...data.settings, font: e.target.value })}
            style={{ 
              padding: '4px 8px', 
              borderRadius: '4px', 
              border: '1px solid var(--border)',
              backgroundColor: 'var(--surface-2)',
              color: 'var(--text-1)',
              fontSize: '12px',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            {fonts.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
      </div>

      {/* Preview Area */}
      <div 
        ref={containerRef}
        style={{ 
          flex: 1, 
          backgroundColor: 'var(--surface-2)', 
          overflowY: 'auto',
          display: 'flex',
          justifyContent: 'center',
          padding: '24px'
        }}
      >
        <div style={{ 
          transform: `scale(${scale})`, 
          transformOrigin: 'top center',
          height: `${1123 * scale}px`, // Reserve scaled height
          marginBottom: '24px'
        }}>
          <div 
            id="resume-preview" 
            style={{ 
              width: '794px', 
              height: '1122px', // Force exactly 1 A4 page height
              backgroundColor: 'white',
              boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
              overflow: 'hidden', // Hide any bleeding edge
              position: 'relative'
            }}
          >
            <style dangerouslySetInnerHTML={{ __html: `
              #resume-preview, #resume-preview * {
                font-family: "${currentFont}", sans-serif !important;
              }
              #template-wrapper > div {
                flex: 1;
                min-height: 100%;
              }
            `}} />
            <div 
              ref={contentRef}
              style={{
                width: '100%',
                height: '100%', // FORCE exactly 100% of the parent 1122px
                transform: `scale(${contentScale})`,
                transformOrigin: 'top left',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div id="template-wrapper" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <TemplateRenderer templateName={activeTemplate} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <ExportBar onFullScreen={() => setIsFullScreen(true)} />

      {/* Full Screen Modal */}
      {isFullScreen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(8px)',
          zIndex: 9999,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '24px',
          overflowY: 'auto'
        }}>
          <button 
            onClick={() => setIsFullScreen(false)}
            style={{
              position: 'fixed',
              top: '32px',
              right: '32px',
              backgroundColor: 'var(--surface-solid)',
              color: 'var(--text-1)',
              border: '1px solid var(--border)',
              borderRadius: '24px',
              padding: '12px 24px',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
              zIndex: 10000,
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <span style={{ fontSize: '18px' }}>×</span> Exit Full View
          </button>
          
          {/* Re-render the exact same content but naturally sized without container scaling restrictions, 
              or scaled to fit the viewport height */}
          <div style={{
            transform: `scale(${Math.min((window.innerHeight - 80) / 1122, 1)})`,
            transformOrigin: 'center center'
          }}>
            <div 
              style={{ 
                width: '794px', 
                height: '1122px', 
                backgroundColor: 'white',
                boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              <div 
                style={{
                  width: '100%',
                  height: '100%', 
                  transform: `scale(${contentScale})`,
                  transformOrigin: 'top left',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <TemplateRenderer templateName={activeTemplate} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
