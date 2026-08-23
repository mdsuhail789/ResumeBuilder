import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const generatePDF = async (elementId, filename = 'Resume.pdf') => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id #${elementId} not found.`);
    return false;
  }

  // Clean formatted file name
  const safeFilename = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;

  // 1. Temporarily sanitize all document <style> tags to strip oklab(), oklch(), color-mix() before html2canvas parses styleSheets
  const styleTags = Array.from(document.querySelectorAll('style'));
  const originalStyleContents = styleTags.map(tag => tag.textContent);

  styleTags.forEach(tag => {
    if (tag.textContent) {
      if (tag.textContent.includes('oklab') || tag.textContent.includes('oklch') || tag.textContent.includes('color-mix')) {
        tag.textContent = tag.textContent
          .replace(/oklab\([^)]+\)/g, 'inherit')
          .replace(/oklch\([^)]+\)/g, 'inherit')
          .replace(/color-mix\([^)]+\)/g, 'inherit');
      }
    }
  });

  // Store original transforms
  const originalTransform = element.style.transform;
  const parentElement = element.parentElement;
  const parentTransform = parentElement ? parentElement.style.transform : '';

  try {
    // 2. Temporarily reset zoom scaling so canvas captures full-size A4 paper
    if (parentElement) {
      parentElement.style.transform = 'none';
    }
    element.style.transform = 'none';

    // 3. Render element to high-res canvas (scale 2 = 300 DPI clarity)
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      scrollX: 0,
      scrollY: 0
    });

    // 4. Restore preview zoom transforms in UI immediately
    element.style.transform = originalTransform;
    if (parentElement) {
      parentElement.style.transform = parentTransform;
    }

    // 5. Restore original <style> contents in document
    styleTags.forEach((tag, idx) => {
      tag.textContent = originalStyleContents[idx];
    });

    // 6. Convert canvas to JPEG image string
    const imgData = canvas.toDataURL('image/jpeg', 0.98);

    // 7. Create A4 PDF (210mm x 297mm)
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // 8. Add image fitting full A4 dimensions
    pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);

    // 9. Save and trigger direct browser .pdf file download
    pdf.save(safeFilename);
    return true;
  } catch (error) {
    console.error('Direct PDF Generation error:', error);

    // Restore transforms and style tags if error occurs
    element.style.transform = originalTransform;
    if (parentElement) {
      parentElement.style.transform = parentTransform;
    }
    styleTags.forEach((tag, idx) => {
      tag.textContent = originalStyleContents[idx];
    });

    throw error;
  }
};
