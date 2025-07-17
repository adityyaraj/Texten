"use client";

import { UploadButton } from "@/utils/uploadthing";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Uploadertbn = () => {
  const router = useRouter();
  const { update } = useSession();

  return (
    <main className="flex flex-col items-center justify-between p-2 text-primary-foreground">
      <UploadButton
        endpoint="profileImageUploader"
        onClientUploadComplete={async (res) => {
          console.log("Files: ", res);
          alert("Upload Completed");
          
          // Update the session to reflect the new profile image
          await update();
          
          router.refresh();
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}

export default Uploadertbn;