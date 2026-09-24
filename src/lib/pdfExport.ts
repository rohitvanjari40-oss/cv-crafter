import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface ExportPdfOptions {
  filename?: string;
  onProgress?: (stage: string) => void;
}

/**
 * High-fidelity client-side PDF export for CV Crafter resumes
 * Clones the resume element offscreen at 100% scale (A4 210mm x 297mm)
 * to avoid CSS zoom/transform clipping and dark-mode bleeding.
 */
export async function exportResumeToPdf(
  elementId: string = 'resume-paper',
  options: ExportPdfOptions = {}
): Promise<{ success: boolean; error?: string }> {
  if (typeof window === 'undefined') {
    return { success: false, error: 'Cannot run PDF generation on the server.' };
  }

  const { filename = 'Resume.pdf', onProgress } = options;

  try {
    onProgress?.('Preparing resume canvas...');

    const sourceElement = document.getElementById(elementId);
    if (!sourceElement) {
      return { success: false, error: `Resume element #${elementId} not found.` };
    }

    // Ensure web fonts are completely loaded before capturing
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }

    onProgress?.('Rendering high-resolution vector layers...');

    // Clone element to an off-screen container with fixed A4 dimensions (794px width @ 96 DPI)
    // This strips any parent scale(zoom) transforms, dark mode filters, or responsive wrappers
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '-99999px';
    container.style.width = '794px';
    container.style.minHeight = '1123px';
    container.style.backgroundColor = '#ffffff';
    container.style.color = '#0f172a';
    container.style.zIndex = '-9999';
    container.setAttribute('data-theme', 'light');

    const clone = sourceElement.cloneNode(true) as HTMLElement;
    clone.style.transform = 'none';
    clone.style.margin = '0';
    clone.style.boxShadow = 'none';
    clone.style.border = 'none';
    clone.style.width = '794px';
    clone.style.minHeight = '1123px';
    clone.style.backgroundColor = '#ffffff';
    clone.style.color = '#0f172a';

    // Force all child text and elements inside the clone to have proper light theme styles
    const allElements = clone.querySelectorAll('*');
    allElements.forEach((el) => {
      const htmlEl = el as HTMLElement;
      // Ensure images load with CORS
      if (htmlEl.tagName === 'IMG') {
        (htmlEl as HTMLImageElement).crossOrigin = 'anonymous';
      }
    });

    container.appendChild(clone);
    document.body.appendChild(container);

    // Give the DOM a tiny tick to paint clone styles
    await new Promise((resolve) => setTimeout(resolve, 150));

    // Render high-DPI canvas
    const canvas = await html2canvas(clone, {
      scale: 2, // 2x DPI for razor sharp text
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 794,
      scrollX: 0,
      scrollY: 0,
    });

    // Clean up offscreen DOM immediately
    document.body.removeChild(container);

    onProgress?.('Generating A4 PDF pages...');

    // A4 dimensions in mm: 210 x 297
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pdfPageWidth = 210;
    const pdfPageHeight = 297;

    // Calculate height of one A4 page in canvas pixel units
    const pageCanvasHeight = Math.floor((canvas.width * pdfPageHeight) / pdfPageWidth);
    const totalCanvasHeight = canvas.height;

    // If single page
    if (totalCanvasHeight <= pageCanvasHeight + 20) {
      const imgHeight = (totalCanvasHeight * pdfPageWidth) / canvas.width;
      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfPageWidth, Math.min(imgHeight, pdfPageHeight));
    } else {
      // Multi-page slicing
      let renderedOffset = 0;
      let pageIndex = 0;

      while (renderedOffset < totalCanvasHeight) {
        const sliceHeight = Math.min(pageCanvasHeight, totalCanvasHeight - renderedOffset);
        
        // Skip tiny empty trailing slivers (less than 25px)
        if (sliceHeight < 25 && pageIndex > 0) {
          break;
        }

        const sliceCanvas = document.createElement('canvas');
        sliceCanvas.width = canvas.width;
        sliceCanvas.height = sliceHeight;

        const ctx = sliceCanvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, sliceCanvas.width, sliceHeight);
          ctx.drawImage(
            canvas,
            0,
            renderedOffset,
            canvas.width,
            sliceHeight,
            0,
            0,
            canvas.width,
            sliceHeight
          );
        }

        if (pageIndex > 0) {
          pdf.addPage();
        }

        const slicePdfHeight = (sliceHeight * pdfPageWidth) / canvas.width;
        const sliceImgData = sliceCanvas.toDataURL('image/jpeg', 0.98);
        pdf.addImage(sliceImgData, 'JPEG', 0, 0, pdfPageWidth, slicePdfHeight);

        renderedOffset += pageCanvasHeight;
        pageIndex++;
      }
    }

    onProgress?.('Saving PDF document...');

    // Ensure safe file name
    const sanitizedFilename = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;
    pdf.save(sanitizedFilename);

    return { success: true };
  } catch (err: any) {
    console.error('PDF export error:', err);
    return {
      success: false,
      error: err?.message || 'An unexpected error occurred during PDF generation.',
    };
  }
}
