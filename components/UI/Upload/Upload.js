"use client";
import UploadCard from "@/components/Cards/UploadCard/UploadCard";
import UploadForm from "@/components/Forms/UploadForm/UploadForm";
import React, { useState } from "react";

const Upload = () => {
  const [files, setFiles] = useState([]);
  return (
    <div className="w-[95%] max-w-[1600px] m-auto">
      <UploadForm setFiles={setFiles} />

      {/* card for uploaded files */}
      <div style={{ columns: "5 280px", gap: "16px" }}>
        {files.map((file, index) => (
          <UploadCard
            key={index}
            file={file}
            setFiles={setFiles}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Upload;
