"use client";
import UploadForm from "@/components/Forms/UploadForm/UploadForm";
import React, { useState } from "react";

const Upload = () => {
  const [files, setFiles] = useState([]);
  return (
    <div className="w-[95%] max-w-[1600px] m-auto">
      <UploadForm setFiles={setFiles} />
    </div>
  );
};

export default Upload;
