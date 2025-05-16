import React, { useState } from "react";
import { FileConversionOptions, UploadedFile, formatFileSize } from "@/lib/fileUtils";
import { FileDropzone } from "@/components/ui/file-dropzone";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Settings, Trash2, FileText, FileImage, FileSpreadsheet, File } from "lucide-react";

interface FileUploadAreaProps {
  onUpload: (files: File[]) => void;
  uploadedFiles: UploadedFile[];
  onRemoveFile: (id: string) => void;
  options: FileConversionOptions;
  isUploading: boolean;
}

const FileUploadArea: React.FC<FileUploadAreaProps> = ({
  onUpload,
  uploadedFiles,
  onRemoveFile,
  options,
  isUploading,
}) => {
  const getFileIcon = (fileType: string) => {
    if (fileType.includes('pdf')) return <FileText className="h-5 w-5 text-red-500" />;
    if (fileType.includes('word') || fileType.includes('doc')) return <FileText className="h-5 w-5 text-blue-500" />;
    if (fileType.includes('spreadsheet') || fileType.includes('excel') || fileType.includes('xls')) return <FileSpreadsheet className="h-5 w-5 text-green-500" />;
    if (fileType.includes('presentation') || fileType.includes('powerpoint') || fileType.includes('ppt')) return <File className="h-5 w-5 text-orange-500" />;
    if (fileType.includes('image')) return <FileImage className="h-5 w-5 text-purple-500" />;
    return <FileText className="h-5 w-5 text-gray-500" />;
  };

  const getConversionLabel = () => {
    return `${options.fromFormat.toUpperCase()} → ${options.toFormat.toUpperCase()}`;
  };
  
  const acceptedTypes = {
    "pdf": {
      "application/pdf": [".pdf"]
    },
    "docx": {
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "application/msword": [".doc"]
    },
    "xlsx": {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
      "application/vnd.ms-excel": [".xls"]
    },
    "ppt": {
      "application/vnd.openxmlformats-officedocument.presentationml.presentation": [".pptx"],
      "application/vnd.ms-powerpoint": [".ppt"]
    },
    "jpg": {
      "image/jpeg": [".jpg", ".jpeg"]
    },
    "png": {
      "image/png": [".png"]
    },
    "txt": {
      "text/plain": [".txt"]
    }
  };

  const getCurrentAcceptTypes = () => {
    if (options.fromFormat === 'more') return undefined; // Accept all
    return acceptedTypes[options.fromFormat as keyof typeof acceptedTypes];
  };

  return (
    <div>
      <FileDropzone
        onDrop={onUpload}
        accept={getCurrentAcceptTypes()}
        disabled={isUploading}
        className="mb-8"
      />

      {uploadedFiles.length > 0 && (
        <div className="border rounded-lg overflow-hidden mb-8">
          <div className="px-4 py-3 bg-gray-50 border-b flex justify-between items-center">
            <h3 className="font-medium">
              Files to {options.operation.charAt(0).toUpperCase() + options.operation.slice(1)}
              {options.operation === 'convert' && ` (${getConversionLabel()})`}
            </h3>
            <span className="text-xs text-gray-500">
              {uploadedFiles.length} {uploadedFiles.length === 1 ? 'file' : 'files'}
            </span>
          </div>
          <div className="p-4 space-y-2">
            {uploadedFiles.map((file) => (
              <div key={file.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="flex items-center">
                  {getFileIcon(file.type)}
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700">{file.name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-700"
                    onClick={() => {/* TODO: Implement file settings */}}
                  >
                    <Settings className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-red-500"
                    onClick={() => onRemoveFile(file.id)}
                    disabled={isUploading}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {uploadedFiles.length > 0 && (
        <div className="flex justify-center space-x-4">
          <Button 
            disabled={isUploading} 
            className="px-6 py-3 bg-primary text-white"
            type="submit"
          >
            {isUploading ? (
              <>
                <LoadingSpinner size="sm" className="mr-2" />
                Processing...
              </>
            ) : (
              <>
                {options.operation.charAt(0).toUpperCase() + options.operation.slice(1)} Files
              </>
            )}
          </Button>
          
          <Button
            variant="outline"
            onClick={() => {/* TODO: Implement clear all */}}
            disabled={isUploading}
            className="px-6 py-3"
          >
            Clear All
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploadArea;
