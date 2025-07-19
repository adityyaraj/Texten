import React from "react";

type ImageModalProps = {
  imageUrl: string;
  onClose: () => void;
};

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="relative">
        <button
          className="absolute top-2 right-2 text-white text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        <img
          src={imageUrl}
          alt="Expanded view"
          className="max-w-full max-h-screen rounded-lg"
        />
      </div>
    </div>
  );
};

export default ImageModal;