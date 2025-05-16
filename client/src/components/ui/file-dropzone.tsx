import * as React from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { UploadCloud, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface FileDropzoneProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  onDrop: (acceptedFiles: File[]) => void;
  maxFiles?: number;
  maxSize?: number;
  accept?: Record<string, string[]>;
  className?: string;
  disabled?: boolean;
}

export const FileDropzone = React.forwardRef<HTMLDivElement, FileDropzoneProps>(
  (
    {
      onDrop,
      maxFiles = 20,
      maxSize = 100 * 1024 * 1024, // 100MB
      accept,
      className,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const [error, setError] = React.useState<string | null>(null);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop: (acceptedFiles) => {
        setError(null);
        onDrop(acceptedFiles);
      },
      onDropRejected: (fileRejections) => {
        const errors = fileRejections.map((rejection) => {
          if (rejection.errors[0].code === "file-too-large") {
            return `File "${rejection.file.name}" is too large. Max size is ${Math.round(
              maxSize / 1024 / 1024
            )}MB.`;
          }
          if (rejection.errors[0].code === "file-invalid-type") {
            return `File "${rejection.file.name}" has an invalid file type.`;
          }
          return rejection.errors[0].message;
        });
        setError(errors[0]);
      },
      maxFiles,
      maxSize,
      accept,
      disabled,
    });

    return (
      <div ref={ref} {...props}>
        <div
          {...getRootProps()}
          className={cn(
            "file-drop-area p-8 border-2 border-dashed border-gray-200 rounded-md transition-all text-center cursor-pointer",
            isDragActive &&
              "border-primary bg-primary/5",
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
        >
          <input {...getInputProps()} />
          <div className="mb-4">
            <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
          </div>
          <h3 className="font-medium text-lg mb-2">
            {isDragActive ? "Drop Files Here" : "Drag & Drop Files Here"}
          </h3>
          <p className="text-gray-500 text-sm mb-4">
            Or click to browse from your device
          </p>
          <button
            type="button"
            className="px-4 py-2 bg-primary text-white font-medium rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-sm transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            Select Files
          </button>
          <p className="text-xs text-gray-500 mt-4">
            Maximum file size: {Math.round(maxSize / 1024 / 1024)}MB. Batch
            upload up to {maxFiles} files.
          </p>
        </div>
        {error && (
          <Card className="mt-4 border-red-200 bg-red-50">
            <CardContent className="p-4 flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }
);

FileDropzone.displayName = "FileDropzone";
