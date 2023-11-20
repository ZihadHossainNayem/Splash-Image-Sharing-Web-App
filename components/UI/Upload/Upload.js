"use client";
import { uploadImages } from "@/actions/imageActions";
import UploadCard from "@/components/Cards/UploadCard/UploadCard";
import UploadForm from "@/components/Forms/UploadForm/UploadForm";
import React, { useMemo, useState } from "react";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";

const Upload = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  /* total uploadable image amount */
  const count = useMemo(() => {
    /* filter the files that are eligible for upload */
    return files.filter((file) => file?.status === "success").length;
  }, [files]);

  /* handle file upload function */
  const handleFilesUpload = async () => {
    const filesUpload = files.filter((file) => file?.status === "success");
    const formData = new FormData();
    /* append each file to formData object with key "files", */
    filesUpload.forEach((file) => {
      formData.append("files", file.fileUpload);

      /* if not title, generate one based ont he file name */
      if (!file.title) {
        file.title = file.name.replace(/.(jpeg|jpg|png)$/gi, "");
      }
    });
    /* create a new array of files with specific properties reset for upload */
    const newFiles = filesUpload.map((file) => ({
      ...file,
      fileUpload: "",
      imgUrl: "",
    }));

    /* nextJs server Action */
    setLoading(true);
    const response = await uploadImages(formData, newFiles);
    setLoading(false);

    if (response?.errorMessage) toast.error(response.errorMessage);
    /* clears memory */
    files.map((file) => URL.revokeObjectURL(file.imgUrl));
    setFiles([]);
  };

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

      {/* upload images, max 10 at once*/}
      <button
        onClick={handleFilesUpload}
        className={`block py-3 px-6 my-4 cursor-pointer text-white rounded font-semibold ${
          count <= 0 || count > 10 || loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-black "
        }`}
        disabled={count <= 0 || count > 10 || loading}
      >
        {loading
          ? "Loading..."
          : count
          ? `Upload ${count} image`
          : `Upload to Splash`}
      </button>
      {loading ? <Loading /> : null}
    </div>
  );
};

export default Upload;
