import { promises as fs } from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execPromise = promisify(exec);

/**
 * Extract text content from a file using basic methods
 */
export async function extractTextFromFile(filePath: string, format: string): Promise<string> {
  try {
    // For small files, just use a basic approach to get text content
    const buffer = await fs.readFile(filePath);
    
    // PDF files are binary, so we need special handling
    if (format === 'pdf') {
      // For PDFs, let's create a proper analysis rather than trying to extract binary text
      // Trying to extract text from binary PDFs without proper libraries produces gibberish
      
      // Create a meaningful description of the PDF
      const stats = await fs.stat(filePath);
      
      return `
PDF Document Analysis
=====================
Filename: ${fileName}
Size: ${(stats.size / 1024).toFixed(2)} KB
Type: PDF Document

This PDF document contains ${(stats.size / 1024).toFixed(0)} KB of data.
The content appears to be binary and would require specialized PDF parsing libraries
for full content extraction. 

For a proper conversion, we recommend using a specialized PDF library or online service 
that can extract the text content properly.
      `;
    }
    
    // For most other formats, just return the content as a string
    return buffer.toString('utf-8');
  } catch (error: any) {
    console.error('Error extracting text from file:', error);
    return `Error extracting text: ${error.message || String(error)}`;
  }
}

/**
 * Convert extracted text to the target format
 */
export function createFormattedContent(
  text: string, 
  targetFormat: string, 
  sourceFilename: string, 
  sourceFormat: string
): string {
  if (targetFormat === 'txt') {
    return `
=============================================
CONVERTED DOCUMENT: ${sourceFilename}
ORIGINAL FORMAT: ${sourceFormat}
CONVERTED FORMAT: TXT
=============================================

${text}

=============================================
Converted with Text Alchemist & File Forge
=============================================
`;
  }
  
  if (targetFormat === 'html') {
    return `<!DOCTYPE html>
<html>
<head>
  <title>Converted Document: ${sourceFilename}</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
    .header { background: #f4f4f4; padding: 20px; border-bottom: 1px solid #ddd; }
    .content { padding: 20px; white-space: pre-wrap; }
    .footer { text-align: center; margin-top: 40px; font-size: 0.8em; color: #777; }
  </style>
</head>
<body>
  <div class="header">
    <h1>Converted Document: ${sourceFilename}</h1>
    <p>Original format: ${sourceFormat} | Converted to: HTML</p>
  </div>
  
  <div class="content">
    ${text.split('\n').map(line => `<p>${line}</p>`).join('')}
  </div>
  
  <div class="footer">
    <p>Converted with Text Alchemist & File Forge</p>
  </div>
</body>
</html>`;
  }
  
  if (targetFormat === 'docx' || targetFormat === 'doc') {
    // For docx/doc, we can't really create a proper Office document
    // So we'll return a text representation
    return `CONVERTED DOCUMENT: ${sourceFilename}
ORIGINAL FORMAT: ${sourceFormat}
CONVERTED FORMAT: ${targetFormat.toUpperCase()}

${text}

Converted with Text Alchemist & File Forge`;
  }
  
  // Default format
  return `
CONVERTED DOCUMENT: ${sourceFilename}
ORIGINAL FORMAT: ${sourceFormat}
CONVERTED FORMAT: ${targetFormat.toUpperCase()}

${text}

Converted with Text Alchemist & File Forge
`;
}