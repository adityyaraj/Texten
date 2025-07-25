import React, { useState } from "react";
import { UploadButton } from "@/utils/uploadthing";

type PostUploadModalProps = {
  onClose: () => void;
};

const PostUploadModal: React.FC<PostUploadModalProps> = ({ onClose }) => {
  const [content, setContent] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handlePostSave = async (imageUrl: string) => {
    try {
      const response = await fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({content, imageUrl }),
      });

      if (!response.ok) {
        alert("Failed to save post");
        return;
      }

      alert("Post uploaded successfully");
      onClose();
    } catch (error) {
      console.error("Error saving post:", error);
      alert("An error occurred while saving the post");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-40">
      <div className="relative bg-primary rounded-lg shadow-lg p-6 w-96 z-50 border border-primary-foreground">
        <button
          className="absolute top-2 left-2 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-lg font-bold mb-4 text-primary-foreground">Upload Post</h2>
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border border-primary-foreground rounded p-2 mb-4 text-primary-foreground"
        ></textarea>
        <UploadButton
          endpoint="postUploader" // Updated endpoint for post uploads
          onClientUploadComplete={async (res) => {
            if (res && res.length > 0) {
              const imageUrl = res[0].ufsUrl; // Corrected property name
              await handlePostSave(imageUrl);
            } else {
              alert("Upload failed");
            }
          }}
          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`);
          }}
        />
      </div>
    </div>
  );
};

export default PostUploadModal;
