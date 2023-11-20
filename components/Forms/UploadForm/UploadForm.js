"use client";
import { validFiles } from "@/utils/validFiles";
import Image from "next/image";
import React, { useRef } from "react";

const UploadForm = React.memo(({ setFiles }) => {
  const formRef = useRef();

  const handleInputFiles = (files) => {
    if (!files.length) return;
    [...files].map((file) => {
      const result = validFiles(file);
      setFiles((prev) => [...prev, result]);
    });

    formRef.current.reset();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer;
    handleInputFiles(data.files);
  };

  return (
    <form
      ref={formRef}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="w-full mt-8 mb-6 p-8 flex items-center justify-center text-center rounded border-2 border-dashed"
    >
      <input
        type="file"
        id="upload"
        accept=".jpg, .png"
        onChange={(e) => handleInputFiles(e.target.files)}
        multiple
        hidden
      />
      <label
        htmlFor="upload"
        className="max-w-lg cursor-pointer flex flex-col items-center justify-center"
      >
        <Image
          src="/placeholderImage0.png"
          alt="add image"
          width={130}
          height={40}
          sizes="25vw"
          className="w-32 h-24"
        />
        <p className="mx-3 md:text-lg font-medium">
          <span className="font-semibold text-blue-500">Drag &amp; drop</span>{" "}
          up to 10 images or{" "}
          <span className="font-semibold text-blue-500">browse</span> to choose
          files
        </p>
        <p className="text-sm text-gray-500">
          jpeg, &amp; png files only - Max 2MB
        </p>
      </label>
    </form>
  );
});

export default UploadForm;
