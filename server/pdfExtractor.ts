// Import the pdf.js library in a way that's compatible with Node.js
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import { promises as fs } from 'fs';

// Configure the library for Node.js environment
const pdfjsVersion = pdfjsLib.version;

/**
 * Extract text content from a PDF file
 */
export async function extractTextFromPDF(pdfPath: string): Promise<string> {
  try {
    // Read the PDF file
    const data = await fs.readFile(pdfPath);
    
    // Load the PDF document using the legacy build
    const pdfDocument = await pdfjsLib.getDocument({ data }).promise;
    
    const numPages = pdfDocument.numPages;
    console.log(`PDF loaded with ${numPages} pages`);
    
    let textContent = '';
    
    // Extract text from each page
    for (let i = 1; i <= numPages; i++) {
      try {
        const page = await pdfDocument.getPage(i);
        const content = await page.getTextContent();
        
        // Concatenate the text content
        const pageText = content.items
          .map((item: any) => item.str)
          .join(' ');
        
        textContent += `\n--- Page ${i} ---\n\n${pageText}\n`;
      } catch (pageErr) {
        console.warn(`Error extracting text from page ${i}:`, pageErr);
        textContent += `\n--- Page ${i} ---\n\n[Error extracting text from this page]\n`;
      }
    }
    
    return textContent || "No text could be extracted from the PDF.";
  } catch (error: any) {
    console.error('Error extracting text from PDF:', error);
    throw new Error(`Failed to extract text from PDF: ${error.message || String(error)}`);
  }
}

/**
 * Generate an HTML document from PDF text
 */
export function generateHTMLFromPDFText(text: string, originalFilename: string): string {
  // Split the text into pages
  const pages = text.split(/\n--- Page \d+ ---\n/g).filter(page => page.trim());
  
  // Create an HTML document
  const html = `<!DOCTYPE html>
<html>
<head>
  <title>Converted from PDF: ${originalFilename}</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
    .header { background: #f4f4f4; padding: 20px; border-bottom: 1px solid #ddd; margin-bottom: 20px; }
    .page { margin-bottom: 40px; padding: 20px; border: 1px solid #eee; }
    .page-header { background: #f9f9f9; padding: 10px; margin-bottom: 20px; font-weight: bold; }
    .footer { text-align: center; margin-top: 40px; font-size: 0.8em; color: #777; }
  </style>
</head>
<body>
  <div class="header">
    <h1>Converted Document: ${originalFilename}</h1>
    <p>Original format: PDF | Converted with Text Alchemist & File Forge</p>
  </div>
  
  ${pages.map((page, i) => `
  <div class="page">
    <div class="page-header">Page ${i + 1}</div>
    <div class="content">
      ${page.split('\n').map(line => `<p>${line}</p>`).join('')}
    </div>
  </div>
  `).join('')}
  
  <div class="footer">
    <p>Converted from PDF using Text Alchemist & File Forge</p>
  </div>
</body>
</html>`;

  return html;
}

/**
 * Generate a docx-compatible content from PDF text
 * 
 * This is a simplified representation as actual DOCX conversion would require
 * a specialized library for Office formats
 */
export function generateDocContent(text: string, originalFilename: string): string {
  // Create a simplified representation
  // In a real implementation, we would use a library like docx-js
  return `CONVERTED DOCUMENT: ${originalFilename}
ORIGINAL FORMAT: PDF
CONVERTED TO: DOCX

${text}

Converted with Text Alchemist & File Forge`;
}

/**
 * Convert extracted PDF text to another format
 */
export function convertPDFTextToFormat(
  text: string, 
  toFormat: string,
  originalFilename: string
): string {
  switch (toFormat) {
    case 'txt':
      return text;
      
    case 'html':
      return generateHTMLFromPDFText(text, originalFilename);
      
    case 'docx':
    case 'doc':
      return generateDocContent(text, originalFilename);
      
    default:
      return text;
  }
}