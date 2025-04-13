import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * Export a resume to PDF format
 * @param {string} resumeTemplateId - ID of the element containing the resume template
 * @param {string} fileName - Name for the exported PDF file
 */
export const exportResumeToPDF = async (resumeTemplateId, fileName = 'resume.pdf') => {
  try {
    const resumeElement = document.getElementById(resumeTemplateId);
    
    if (!resumeElement) {
      console.error('Could not find the resume template to export');
      throw new Error('Could not find the resume template to export');
    }
    
    // Make a clone of the element to avoid modifying the original
    const clone = resumeElement.cloneNode(true);
    clone.style.width = '210mm'; // A4 width
    clone.style.margin = '0';
    clone.style.padding = '0';
    clone.style.position = 'absolute';
    clone.style.top = '-9999px';
    clone.style.left = '-9999px';
    document.body.appendChild(clone);
    
    // Get the height of the content
    const contentHeight = clone.scrollHeight;
    const contentWidth = clone.scrollWidth;
    
    // Calculate scale to fit A4 width (210mm)
    const a4Width = 210; // mm
    const a4Height = 297; // mm
    const pxPerMm = contentWidth / a4Width;
    
    // Calculate how many pages we'll need
    const totalPages = Math.ceil(contentHeight / (a4Height * pxPerMm));
    
    console.log(`PDF Export: Content size ${contentWidth}x${contentHeight}px, will use ${totalPages} pages`);
    
    // Create a PDF with A4 dimensions
    const pdf = new jsPDF({
      format: 'a4',
      unit: 'mm',
      orientation: 'portrait'
    });
    
    // Capture each page and add it to the PDF
    for (let page = 0; page < totalPages; page++) {
      // Calculate the vertical offset for this page
      const verticalOffset = page * a4Height * pxPerMm;
      
      // Create a canvas for this page
      const canvas = await html2canvas(clone, {
        scale: 2, // Higher scale for better quality
        useCORS: true, // Enable loading cross-origin images
        logging: false,
        windowWidth: contentWidth,
        windowHeight: contentHeight,
        y: verticalOffset,
        height: Math.min(a4Height * pxPerMm, contentHeight - verticalOffset)
      });
      
      // Convert canvas to image
      const imgData = canvas.toDataURL('image/png');
      
      // Add new page if not the first page
      if (page > 0) {
        pdf.addPage();
      }
      
      // Add image to PDF
      pdf.addImage(imgData, 'PNG', 0, 0, a4Width, a4Height, '', 'FAST');
    }
    
    // Clean up the clone
    document.body.removeChild(clone);
    
    // Save the PDF
    pdf.save(fileName);
    
    return true;
  } catch (error) {
    console.error('Error exporting resume to PDF:', error);
    throw error;
  }
};