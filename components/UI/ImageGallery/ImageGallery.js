"use client";
import ImageCard from "@/components/Cards/ImageCard/ImageCard";
import React, { useState } from "react";

const ImageGallery = ({ data }) => {
  const [files, setFiles] = useState(data);

  return (
    <div className="w-[95%] max-w-[1600px] m-auto">
      <div className="m-8 mx-auto" style={{ columns: "5 280px", gap: "16px" }}>
        {files.map((file, index) => (
          <ImageCard
            key={file._id}
            image={file}
            setImages={setFiles}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
