import { apiRequest } from "@/lib/queryClient";

export interface FileConversionOptions {
  fromFormat: string;
  toFormat: string;
  operation: 'convert' | 'compress' | 'merge' | 'split' | 'edit';
}

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  lastModified: number;
}

export const acceptedFileTypes = {
  pdf: '.pdf',
  doc: '.doc,.docx',
  xls: '.xls,.xlsx',
  ppt: '.ppt,.pptx',
  image: '.jpg,.jpeg,.png,.gif',
  txt: '.txt,.rtf',
  all: '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.gif,.txt,.rtf'
};

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export async function uploadFiles(
  files: File[], 
  options: FileConversionOptions
): Promise<string[]> {
  const formData = new FormData();
  
  // This is the key change - append files with the name 'files' to match what the server expects
  files.forEach(file => {
    formData.append('files', file);
  });
  
  formData.append('fromFormat', options.fromFormat);
  formData.append('toFormat', options.toFormat);
  formData.append('operation', options.operation);
  
  const response = await fetch('/api/files/upload', {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Upload failed: ${errorText}`);
  }
  
  const result = await response.json();
  return result.fileIds;
}

export interface ConversionResult {
  downloadUrls: string[];
  previewContent?: string;
}

export async function convertFiles(
  fileIds: string[],
  options: FileConversionOptions
): Promise<ConversionResult> {
  const response = await apiRequest('POST', '/api/files/convert', {
    fileIds,
    options,
  });
  
  const result = await response.json();
  return {
    downloadUrls: result.downloadUrls,
    previewContent: result.previewContent
  };
}

export async function downloadConvertedFile(url: string): Promise<void> {
  try {
    // Get the file name from the URL
    const fileName = url.split('/').pop() || 'converted-file';
    
    // Fetch the file
    const response = await fetch(`/api/files/download/${url}`);
    if (!response.ok) {
      throw new Error(`Failed to download file: ${response.statusText}`);
    }
    
    // Get the blob
    const blob = await response.blob();
    
    // Create a temporary URL for the blob
    const blobUrl = URL.createObjectURL(blob);
    
    // Create a temporary link element
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = fileName;
    document.body.appendChild(a);
    
    // Click the link to trigger the download
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error('Error downloading file:', error);
    
    // Fallback to opening in a new tab if there's an error
    window.open(`/api/files/download/${url}`, '_blank');
  }
}

export async function previewFileContent(url: string): Promise<string> {
  try {
    const response = await fetch(`/api/files/preview/${url}`);
    if (!response.ok) {
      throw new Error(`Failed to preview file: ${response.statusText}`);
    }
    
    return await response.text();
  } catch (error) {
    console.error('Error previewing file:', error);
    return 'Error loading file preview. Please try downloading instead.';
  }
}
