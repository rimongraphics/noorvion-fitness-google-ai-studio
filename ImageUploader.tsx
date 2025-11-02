
import React, { useRef } from 'react';
import { CameraIcon } from './icons/CameraIcon';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  imagePreview: string | null;
  onAnalyze: () => void;
  isLoading: boolean;
  onReset: () => void;
  hasAnalysis: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  onImageUpload, 
  imagePreview, 
  onAnalyze, 
  isLoading,
  onReset,
  hasAnalysis
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  if (hasAnalysis) {
     return (
        <div className="text-center">
            <button
                onClick={onReset}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-semibold rounded-md text-white bg-brand-green hover:bg-brand-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green-dark shadow-md hover:shadow-lg focus:shadow-lg uppercase tracking-wider transition-all duration-200"
            >
                Scan Another Food
            </button>
        </div>
     )
  }

  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />
      {!imagePreview ? (
        <button
          onClick={handleUploadClick}
          className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-brand-green transition-colors"
        >
          <CameraIcon className="w-12 h-12 mb-2" />
          <span className="font-semibold">Tap to take a picture of your food</span>
        </button>
      ) : (
        <div className="w-full flex flex-col items-center">
          <div className="w-full max-w-sm h-auto overflow-hidden rounded-lg shadow-md mb-4">
            <img src={imagePreview} alt="Food preview" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <button
                onClick={handleUploadClick}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-semibold rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green shadow-md hover:shadow-lg focus:shadow-lg uppercase tracking-wider transition-all duration-200"
            >
                Change Image
            </button>
            <button
                onClick={onAnalyze}
                disabled={isLoading}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-semibold rounded-md text-white bg-brand-green hover:bg-brand-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green-dark disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md hover:shadow-lg focus:shadow-lg uppercase tracking-wider transition-all duration-200"
            >
                {isLoading ? 'Analyzing...' : 'Analyze Food'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
