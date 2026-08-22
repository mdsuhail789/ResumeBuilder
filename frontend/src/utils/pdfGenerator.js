import html2pdf from 'html2pdf.js';

export const generatePDF = async (elementId, filename = 'Resume.pdf') => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id #${elementId} not found.`);
    return false;
  }

  // Clean formatted file name
  const safeFilename = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;

  const opt = {
    margin:       0,
    filename:     safeFilename,
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { 
      scale: 2, 
      useCORS: true, 
      letterRendering: true,
      scrollX: 0,
      scrollY: 0,
      onclone: (clonedDoc) => {
        const clonedElement = clonedDoc.getElementById(elementId);
        if (clonedElement) {
          // Reset zoom transform on parent so canvas renders full-scale A4
          if (clonedElement.parentElement) {
            clonedElement.parentElement.style.transform = 'none';
          }
          clonedElement.style.transform = 'none';
          clonedElement.style.margin = '0 auto';
          clonedElement.style.boxShadow = 'none';

          // Fix oklch color error in html2canvas by converting to computed RGB
          const allElements = clonedElement.querySelectorAll('*');
          allElements.forEach((el) => {
            const style = window.getComputedStyle(el);
            ['color', 'backgroundColor', 'borderColor'].forEach((prop) => {
              const val = style[prop];
              if (val && val.includes('oklch')) {
                // Set explicit fallback color if oklch detected
                if (prop === 'backgroundColor') el.style.backgroundColor = '#ffffff';
                else if (prop === 'color') el.style.color = '#0f172a';
                else if (prop === 'borderColor') el.style.borderColor = '#e2e8f0';
              }
            });
          });
        }
      }
    },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
  };

  try {
    await html2pdf().set(opt).from(element).save();
    return true;
  } catch (error) {
    console.error('PDF Generation error:', error);
    // Print fallback
    window.print();
    return true;
  }
};
