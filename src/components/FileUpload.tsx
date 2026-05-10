import React, { useCallback, useState } from 'react';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import { cn } from '../lib/utils';

interface FileUploadProps {
  onFileSelect: (base64: string) => void;
  className?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, className }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      setPreview(base64);
      onFileSelect(base64);
    };
    reader.readAsDataURL(file);
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, []);

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const clear = () => {
    setPreview(null);
  };

  return (
    <div className={cn("relative", className)}>
      {!preview ? (
        <label
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          className={cn(
            "flex flex-col items-center justify-center w-full h-80 border border-white/10 rounded overflow-hidden cursor-pointer transition-all duration-300 relative group",
            isDragging
              ? "bg-emerald-500/5 border-emerald-500/40"
              : "bg-[#0a0a0a] hover:bg-white/5 hover:border-white/20"
          )}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000_100%)] opacity-40" />
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
            <div className="w-12 h-12 mb-6 rounded bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500 group-hover:text-emerald-400 transition-colors">
              <Upload size={20} />
            </div>
            <p className="mb-2 text-sm text-white font-serif italic">
              Import Technical Chart
            </p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-mono">
              Drag & Drop or Click to Browse
            </p>
          </div>
          <input type="file" className="hidden" accept="image/*" onChange={onInputChange} />
        </label>
      ) : (
        <div className="relative group rounded border border-white/10 bg-[#0a0a0a] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000_100%)] opacity-40 pointer-events-none" />
          <img src={preview} alt="Upload preview" className="w-full h-full object-contain max-h-[500px] relative z-0" />
          <button
            onClick={clear}
            className="absolute top-2 right-2 p-1.5 bg-zinc-900/80 rounded-full hover:bg-red-500 text-white transition-colors opacity-0 group-hover:opacity-100"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
};
