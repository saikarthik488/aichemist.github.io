import React, { useState } from "react";
import { FileConversionOptions } from "@/lib/fileUtils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const fileFormats = {
  pdf: { label: "PDF", color: "text-red-500", bgColor: "bg-red-50", borderColor: "border-red-100" },
  docx: { label: "DOCX", color: "text-blue-500", bgColor: "bg-blue-50", borderColor: "border-blue-100" },
  xlsx: { label: "XLSX", color: "text-green-500", bgColor: "bg-green-50", borderColor: "border-green-100" },
  ppt: { label: "PPT", color: "text-orange-500", bgColor: "bg-orange-50", borderColor: "border-orange-100" },
  jpg: { label: "JPG", color: "text-purple-500", bgColor: "bg-purple-50", borderColor: "border-purple-100" },
  png: { label: "PNG", color: "text-indigo-500", bgColor: "bg-indigo-50", borderColor: "border-indigo-100" },
  txt: { label: "TXT", color: "text-gray-500", bgColor: "bg-gray-100", borderColor: "border-gray-200" },
  more: { label: "More", color: "text-gray-500", bgColor: "bg-gray-100", borderColor: "border-gray-200" },
};

interface FileFormatButtonProps {
  format: keyof typeof fileFormats;
  selected: boolean;
  onClick: () => void;
}

const FileFormatButton: React.FC<FileFormatButtonProps> = ({
  format,
  selected,
  onClick,
}) => {
  const styles = fileFormats[format];
  
  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-2 rounded border text-xs font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors ${
        selected
          ? `${styles.color} ${styles.bgColor} border-primary`
          : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
      }`}
    >
      {styles.label}
    </button>
  );
};

interface FileConversionOptionsFormProps {
  options: FileConversionOptions;
  onOptionsChange: (options: Partial<FileConversionOptions>) => void;
}

const FileConversionOptionsForm: React.FC<FileConversionOptionsFormProps> = ({
  options,
  onOptionsChange,
}) => {
  const formatOptions = Object.keys(fileFormats) as Array<keyof typeof fileFormats>;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Convert From
          </label>
          <div className="grid grid-cols-4 gap-2">
            {formatOptions.map((format) => (
              <FileFormatButton
                key={`from-${format}`}
                format={format}
                selected={options.fromFormat === format}
                onClick={() => onOptionsChange({ fromFormat: format })}
              />
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Convert To
          </label>
          <div className="grid grid-cols-4 gap-2">
            {formatOptions.map((format) => (
              <FileFormatButton
                key={`to-${format}`}
                format={format}
                selected={options.toFormat === format}
                onClick={() => onOptionsChange({ toFormat: format })}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

interface FileConversionTabsProps {
  options: FileConversionOptions;
  onOptionsChange: (options: Partial<FileConversionOptions>) => void;
}

const FileConversionTabs: React.FC<FileConversionTabsProps> = ({
  options,
  onOptionsChange,
}) => {
  return (
    <>
      <Tabs 
        defaultValue="convert" 
        value={options.operation}
        onValueChange={(value) => 
          onOptionsChange({ operation: value as FileConversionOptions["operation"] })
        }
        className="mb-6"
      >
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="convert">Convert</TabsTrigger>
          <TabsTrigger value="compress">Compress</TabsTrigger>
          <TabsTrigger value="merge">Merge</TabsTrigger>
          <TabsTrigger value="split">Split</TabsTrigger>
          <TabsTrigger value="edit">Edit PDF</TabsTrigger>
        </TabsList>
        
        <TabsContent value="convert">
          <FileConversionOptionsForm options={options} onOptionsChange={onOptionsChange} />
        </TabsContent>
        
        <TabsContent value="compress">
          <div className="py-4">
            <p className="text-sm text-gray-600">
              Compress your files to reduce file size while maintaining quality.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="merge">
          <div className="py-4">
            <p className="text-sm text-gray-600">
              Combine multiple files into a single document.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="split">
          <div className="py-4">
            <p className="text-sm text-gray-600">
              Split a document into multiple smaller files.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="edit">
          <div className="py-4">
            <p className="text-sm text-gray-600">
              Edit PDF files - add text, images, or annotations.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default FileConversionTabs;
