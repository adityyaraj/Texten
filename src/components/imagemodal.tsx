import React from "react";

interface ImageModalProps {
  imageUrl: string;
  content?: string;
  uploadDate?: Date;
  username?: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ 
  imageUrl, 
  content, 
  uploadDate,
  username, 
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
      <div className="flex flex-row items-stretch justify-center h-[70vh] w-full max-w-4xl mx-auto bg-primary border border-gray-300 rounded-sm shadow-lg">
        {/* Image container */}
        <div className="flex-1 flex items-center justify-center h-full ">
          <img
            src={imageUrl}
            alt={"Post image"}
            className="max-h-full max-w-full object-contain"
          />
        </div>
        {/* Post details */}
        <div className="bg-primary flex flex-col w-1/3 h-full items-center justify-center">
          {(username || content || uploadDate) && (
            <div className="flex flex-col items-center justify-center w-full">
              {username && (
                <h3 className="text-xl text-primary-foreground font-bold text-center mb-4">@{username}</h3>
              )}
              {content && (
                <p className="text-base text-primary-foreground text-center mb-2">{content}</p>
              )}
              {uploadDate && (
                <p className="text-xs text-primary-foreground text-center">
                  Uploaded on: {new Date(uploadDate).toLocaleDateString()}
                </p>
              )}
            </div>
          )}
        </div>
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