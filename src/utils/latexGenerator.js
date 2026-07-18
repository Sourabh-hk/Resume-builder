export function generateLatex(data) {
  const { personal: p, summary, experience, education, skills, projects, certifications } = data;

  return `\\documentclass[11pt,a4paper,sans]{moderncv}
\\moderncvstyle{classic}
\\moderncvcolor{blue}
\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage[margin=15mm]{geometry}

\\name{${p.name.split(' ')[0]}}{${p.name.split(' ').slice(1).join(' ')}}
\\title{${p.title}}
\\email{${p.email}}
\\phone{${p.phone}}
${p.linkedin ? `\\social[linkedin]{${p.linkedin.replace(/.*linkedin\\.com\/in\//,'')}}` : ''}
${p.github ? `\\social[github]{${p.github.replace(/.*github\\.com\//,'')}}` : ''}
${p.location ? `\\address{${p.location}}{}{}` : ''}

\\begin{document}
\\makecvtitle

\\section{Professional Summary}
${summary}

\\section{Experience}
${experience.map(e => `\\cventry{${e.startDate}--${e.endDate}}{${e.title}}{${e.company}}{${e.location}}{}{
\\begin{itemize}
${e.bullets.map(b => `  \\item ${b}`).join('\n')}
\\end{itemize}
}`).join('\n\n')}

\\section{Education}
${education.map(e => `\\cventry{${e.year}}{${e.degree}}{${e.institution}}{}{${e.grade}}{}`).join('\n')}

\\section{Skills}
\\cvitem{Technical}{${skills.technical.join(', ')}}
${skills.tools.length ? `\\cvitem{Tools}{${skills.tools.join(', ')}}` : ''}
${skills.soft.length ? `\\cvitem{Soft Skills}{${skills.soft.join(', ')}}` : ''}

\\section{Projects}
${projects.map(pr => `\\cventry{}{${pr.name}}{}{${pr.tech.join(', ')}}{}{
\\begin{itemize}
${pr.bullets.map(b => `  \\item ${b}`).join('\n')}
\\end{itemize}
}`).join('\n\n')}

${certifications.length ? `\\section{Certifications}
${certifications.map(c => `\\cvitem{${c.issuer}}{${c.name}${c.date ? ` (${c.date})` : ''}}`).join('\n')}` : ''}

\\end{document}`;
}

export const downloadLatex = (name, data) => {
  const tex = generateLatex(data);
  const blob = new Blob([tex], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${name.replace(/\s+/g,'_')}_Resume.tex`;
  a.click();
};
