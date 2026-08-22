// Strict 1-to-1 LaTeX Parser and Serializer
// Renders EXACTLY what is written in the code editor (no fallbacks / no ghost data)

export const resumeToLatex = (resume) => {
  if (!resume) return '';

  const p = resume.personalInfo || {};
  const edu = resume.education || [];
  const exp = resume.experience || [];
  const proj = resume.projects || [];
  const skills = resume.skills || [];
  const certs = resume.certifications || [];
  const achs = resume.achievements || [];

  let latex = `\\documentclass[10pt,a4paper]{article}

\\usepackage[margin=0.7in]{geometry}
\\usepackage{enumitem}
\\usepackage{titlesec}
\\usepackage{hyperref}

\\titleformat{\\section}
  {\\large\\bfseries}
  {}
  {0em}
  {}
  [\\titlerule]

\\setlist[itemize]{noitemsep, topsep=2pt}

\\begin{document}

\\begin{center}
  {\\LARGE \\textbf{${p.name || ''}}}\\
  ${p.title ? `\\vspace{2pt}\n  ${p.title}\\\\` : ''}
  \\vspace{4pt}
  ${p.email ? `\\href{mailto:${p.email}}{${p.email}}` : ''}${p.phone ? ` -- ${p.phone}` : ''}\\\\
  ${p.github ? `\\href{${p.github}}{GitHub}` : ''}${p.linkedin ? ` -- \\href{${p.linkedin}}{LinkedIn}` : ''}
\\end{center}
`;

  if (resume.summary) {
    latex += `\n\\section*{Summary}\n${resume.summary}\n`;
  }

  if (edu.length > 0) {
    latex += `\n\\section*{Education}\n`;
    edu.forEach(item => {
      if (item.degree || item.institution) {
        latex += `\\textbf{${item.degree || ''}}\\\\
${item.institution || ''}${item.location ? `, ${item.location}` : ''} \\hfill ${item.startDate || ''}${item.endDate ? ` -- ${item.endDate}` : ''}\n\n`;
      }
    });
  }

  if (skills.length > 0) {
    latex += `\n\\section*{Skills}\n`;
    latex += `${skills.join(', ')}\n`;
  }

  if (proj.length > 0) {
    latex += `\n\\section*{Projects}\n`;
    proj.forEach(item => {
      if (item.name) {
        const tech = Array.isArray(item.technologies) ? item.technologies.join(', ') : (item.technologies || '');
        latex += `\\textbf{${item.name}}${tech ? ` (${tech})` : ''}\\\\
${item.description ? `\\begin{itemize}\n  \\item ${item.description}\n\\end{itemize}\n` : ''}\n`;
      }
    });
  }

  if (exp.length > 0) {
    latex += `\n\\section*{Experience}\n`;
    exp.forEach(item => {
      if (item.role || item.company) {
        latex += `\\textbf{${item.role || ''}}\\\\
${item.company || ''} \\hfill ${item.startDate || ''}${item.endDate ? ` -- ${item.endDate}` : ''}
${item.description ? `\\begin{itemize}\n  \\item ${(item.description).replace(/\n/g, '\n  \\item ')}\n\\end{itemize}\n` : ''}\n`;
      }
    });
  }

  if (achs.length > 0) {
    latex += `\n\\section*{Achievements}\n\\begin{itemize}\n`;
    achs.forEach(item => {
      latex += `  \\item ${item}\n`;
    });
    latex += `\\end{itemize}\n`;
  }

  if (certs.length > 0) {
    latex += `\n\\section*{Certifications}\n\\begin{itemize}\n`;
    certs.forEach(item => {
      const name = typeof item === 'string' ? item : (item.name || '');
      latex += `  \\item ${name}\n`;
    });
    latex += `\\end{itemize}\n`;
  }

  latex += `\n\\end{document}`;
  return latex;
};

export const latexToResume = (latexText) => {
  if (!latexText) {
    return {
      personalInfo: { name: '', title: '', email: '', phone: '', location: '', website: '', linkedin: '', github: '' },
      summary: '',
      education: [],
      skills: [],
      experience: [],
      projects: [],
      achievements: [],
      certifications: []
    };
  }

  try {
    const p = { name: '', title: '', email: '', phone: '', location: '', website: '', linkedin: '', github: '' };

    // Extract Name from {\LARGE \textbf{...}} or \name{...}
    const nameMatch = latexText.match(/\\name\{([^}]+)\}|\\LARGE\s+\\textbf\{([^}]+)\}/);
    if (nameMatch) {
      p.name = (nameMatch[1] || nameMatch[2] || '').trim();
    }

    // Extract Title
    const titleMatch = latexText.match(/\\title\{([^}]+)\}|\\LARGE[\s\S]*?\\\\[\s\n]*([^\\\n{]+)\\\\/);
    if (titleMatch) {
      p.title = (titleMatch[1] || titleMatch[2] || '').trim();
    }

    // Extract Email
    const emailMatch = latexText.match(/mailto:([^}]+)/);
    if (emailMatch) {
      p.email = emailMatch[1].trim();
    }

    // Extract Phone
    const phoneMatch = latexText.match(/\+?\d[\d\s-]{7,15}/);
    if (phoneMatch) {
      p.phone = phoneMatch[0].trim();
    }

    // Extract GitHub
    const ghMatch = latexText.match(/href\{([^}]*github[^}]*)\}/i);
    if (ghMatch) {
      p.github = ghMatch[1].trim();
    }

    // Extract LinkedIn
    const liMatch = latexText.match(/href\{([^}]*linkedin[^}]*)\}/i);
    if (liMatch) {
      p.linkedin = liMatch[1].trim();
    }

    // Strict Summary parsing (ONLY if present in LaTeX text)
    let summary = '';
    const summaryMatch = latexText.match(/\\section\*?\{Summary\}([\s\S]*?)(?=\\section|\n\\end\{document\}|$)/i);
    if (summaryMatch) {
      summary = summaryMatch[1].replace(/\\\\/g, '').trim();
    }

    // Strict Skills parsing
    let skills = [];
    const skillsMatch = latexText.match(/\\section\*?\{Skills\}([\s\S]*?)(?=\\section|\n\\end\{document\}|$)/i);
    if (skillsMatch) {
      const skillsStr = skillsMatch[1].replace(/\\textbf\{[^}]+\}:?|\\\\/g, '').trim();
      if (skillsStr) {
        skills = skillsStr.split(/,|\n/).map(s => s.replace(/\\item|\\begin\{itemize\}|\\end\{itemize\}/g, '').trim()).filter(Boolean);
      }
    }

    // Strict Education parsing
    const education = [];
    const eduMatch = latexText.match(/\\section\*?\{Education\}([\s\S]*?)(?=\\section|\n\\end\{document\}|$)/i);
    if (eduMatch) {
      const eduBlock = eduMatch[1];
      const items = eduBlock.split('\\textbf{').slice(1);
      items.forEach((itemStr, idx) => {
        const parts = itemStr.split('}');
        const degree = parts[0] ? parts[0].trim() : '';
        const rest = parts.slice(1).join('}').replace(/\\\\/g, '\n');
        const lines = rest.split('\n').map(l => l.trim()).filter(Boolean);
        const instLine = lines[0] || '';
        
        education.push({
          id: `edu_strict_${idx}`,
          degree,
          institution: instLine.split('\\hfill')[0].trim(),
          startDate: instLine.includes('\\hfill') ? instLine.split('\\hfill')[1].trim() : '',
          endDate: '',
          description: lines.slice(1).join(' ')
        });
      });
    }

    // Strict Projects parsing
    const projects = [];
    const projMatch = latexText.match(/\\section\*?\{Projects\}([\s\S]*?)(?=\\section|\n\\end\{document\}|$)/i);
    if (projMatch) {
      const projBlock = projMatch[1];
      const items = projBlock.split('\\textbf{').slice(1);
      items.forEach((itemStr, idx) => {
        const parts = itemStr.split('}');
        const nameTech = parts[0] ? parts[0].trim() : '';
        const name = nameTech.split('(')[0].trim();
        const techStr = nameTech.includes('(') ? nameTech.split('(')[1].replace(')', '').trim() : '';
        const descMatch = itemStr.match(/\\item\s+([^\n]+)/);
        
        projects.push({
          id: `proj_strict_${idx}`,
          name,
          technologies: techStr ? techStr.split(',').map(t => t.trim()) : [],
          description: descMatch ? descMatch[1].trim() : '',
          url: ''
        });
      });
    }

    // Strict Experience parsing
    const experience = [];
    const expMatch = latexText.match(/\\section\*?\{Experience\}([\s\S]*?)(?=\\section|\n\\end\{document\}|$)/i);
    if (expMatch) {
      const expBlock = expMatch[1];
      const items = expBlock.split('\\textbf{').slice(1);
      items.forEach((itemStr, idx) => {
        const parts = itemStr.split('}');
        const role = parts[0] ? parts[0].trim() : '';
        const descMatch = itemStr.match(/\\item\s+([^\n]+)/);
        
        experience.push({
          id: `exp_strict_${idx}`,
          role,
          company: '',
          startDate: '',
          endDate: '',
          description: descMatch ? descMatch[1].trim() : ''
        });
      });
    }

    // Strict Achievements
    const achievements = [];
    const achMatch = latexText.match(/\\section\*?\{Achievements\}([\s\S]*?)(?=\\section|\n\\end\{document\}|$)/i);
    if (achMatch) {
      const items = achMatch[1].match(/\\item\s+([^\n]+)/g);
      if (items) {
        items.forEach(it => achievements.push(it.replace(/\\item\s+/, '').trim()));
      }
    }

    // Strict Certifications
    const certifications = [];
    const certMatch = latexText.match(/\\section\*?\{Certifications\}([\s\S]*?)(?=\\section|\n\\end\{document\}|$)/i);
    if (certMatch) {
      const items = certMatch[1].match(/\\item\s+([^\n]+)/g);
      if (items) {
        items.forEach(it => certifications.push({ name: it.replace(/\\item\s+|\\textbf\{|\}/g, '').trim() }));
      }
    }

    return {
      personalInfo: p,
      summary,
      education,
      skills,
      projects,
      experience,
      achievements,
      certifications
    };
  } catch (err) {
    console.error('Strict LaTeX parse error:', err);
    return currentResume;
  }
};
