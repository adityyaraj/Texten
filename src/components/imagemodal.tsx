import React from "react";

interface ImageModalProps {
  imageUrl: string;
  title?: string;
  content?: string;
  uploadDate?: Date;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ 
  imageUrl, 
  title, 
  content, 
  uploadDate, 
  onClose 
}) => {
  return (
    <div className="fixed inset-0 bg-primary bg-opacity-90 flex items-center justify-center z-50">
      {/* Close button */}
      <button
        className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 z-60"
        onClick={onClose}
      >
        &times;
      </button>
      
      {/* Main content container */}
      <div className="flex flex-col items-center justify-center h-screen w-full max-w-4xl mx-auto p-4">
        {/* Image container */}
        <div className="flex-1 flex items-center justify-center w-full">
          <img
            src={imageUrl}
            alt={title || "Post image"}
            className="max-w-full max-h-full object-contain"
          />
        </div>
        
        {/* Post details (optional) */}
        {(title || content || uploadDate) && (
          <div className="bg-white rounded-lg p-4 mt-4 max-w-md w-full">
            {title && (
              <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
            )}
            {content && (
              <p className="text-sm text-gray-600 mb-2">{content}</p>
            )}
            {uploadDate && (
              <p className="text-xs text-gray-400">
                Uploaded on: {new Date(uploadDate).toLocaleDateString()}
              </p>
            )}
          </div>
        )}
      </div>
      
      {/* Click outside to close */}
      <div 
        className="absolute inset-0 -z-10" 
        onClick={onClose}
      />
    </div>
  );
};

export default ImageModal;