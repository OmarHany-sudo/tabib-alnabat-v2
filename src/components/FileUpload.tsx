import { useState, useCallback, useRef } from "react";
import { Upload, X, ImagePlus } from "lucide-react";

interface FileUploadProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
  maxFiles?: number;
}

export default function FileUpload({
  files,
  onFilesChange,
  maxFiles = 3,
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    (newFiles: FileList | null) => {
      if (!newFiles) return;
      const validFiles = Array.from(newFiles).filter((f) =>
        f.type.startsWith("image/")
      );
      const combined = [...files, ...validFiles].slice(0, maxFiles);
      onFilesChange(combined);
    },
    [files, maxFiles, onFilesChange]
  );

  const removeFile = useCallback(
    (index: number) => {
      onFilesChange(files.filter((_, i) => i !== index));
    },
    [files, onFilesChange]
  );

  const remaining = maxFiles - files.length;

  return (
    <div className="space-y-3">
      {/* Upload Area */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragOver(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={`relative min-h-[200px] rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-3 p-6 ${
          isDragOver
            ? "border-olive bg-olive/5"
            : files.length === 0
            ? "border-gray-300 bg-sage/30 animate-pulse-border"
            : "border-gray-200 bg-sage/20"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        {files.length === 0 ? (
          <>
            <div className="w-14 h-14 rounded-2xl bg-olive/10 flex items-center justify-center">
              <ImagePlus className="w-7 h-7 text-olive" />
            </div>
            <div className="text-center">
              <p className="text-charcoal font-medium text-base mb-1">
                اسحب الصور هنا أو اضغط للاختيار
              </p>
              <p className="text-medium-gray text-sm">
                JPG, PNG — لغاية {maxFiles} صور
              </p>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Upload className="w-6 h-6 text-olive" />
            <p className="text-medium-gray text-sm">
              {remaining > 0
                ? `يمكنك إضافة ${remaining} صور أخرى`
                : "وصلت للحد الأقصى"}
            </p>
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {files.length > 0 && (
        <div className="flex gap-3 flex-wrap">
          {files.map((file, index) => (
            <div
              key={index}
              className="relative w-20 h-20 rounded-xl overflow-hidden border border-gray-200 group"
            >
              <img
                src={URL.createObjectURL(file)}
                alt={`صورة ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
                className="absolute top-1 left-1 w-5 h-5 bg-error-red text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
