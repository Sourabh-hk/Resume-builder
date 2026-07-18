import html2pdf from 'html2pdf.js';

export const downloadPDF = (name) => {
  const el = document.getElementById('resume-preview');
  if (!el) return;
  html2pdf().set({
    margin: [0, 0, -2, 0], // Negative bottom margin to prevent blank page
    filename: `${name.replace(/\s+/g,'_')}_Resume.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  }).from(el).save();
};
