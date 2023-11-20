import { updateUser } from "@/actions/userActions";
import { validFiles } from "@/utils/validFiles";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";

const ProfileEdit = ({ user, setIsEdit }) => {
  const [file, setFile] = useState();
  const [name, setName] = useState(user?.name);
  const [loading, setLoading] = useState(false);
  const formRef = useRef();

  /* profile picture update */
  const handleInputFiles = (files) => {
    if (!files.length) return;
    [...files].map((file) => {
      const result = validFiles(file);
      if (result?.errorMessage) return toast.error(result.errorMessage);
      setFile(result);
    });

    formRef.current.reset();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer;
    handleInputFiles(data.files);
  };

  /* handle edit form submit */
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    if (file) {
      formData.append("files", file.fileUpload);
      URL.revokeObjectURL(file.imgUrl);
    }
    const response = await updateUser({ formData, name, user });
    setLoading(false);

    if (response?.errorMessage) toast.error(errorMessage);

    setIsEdit(false);
  };

  return (
    <form
      ref={formRef}
      className="w-full max-w-[600px] bg-white p-6 border"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onSubmit={handleUpdateUser}
    >
      {/* container */}
      <div className="w-full flex gap-4">
        {/* avatar */}
        <label
          htmlFor="upload"
          className="w-36 h-36 rounded-full overflow-hidden cursor-pointer flex items-center justify-center"
        >
          <Image
            src={file?.imgUrl || user?.avatar}
            alt={name}
            width={144}
            height={144}
            sizes="50vw"
          />
          <input
            type="file"
            id="upload"
            accept=".png, .jpg, .jpeg"
            hidden
            onChange={(e) => handleInputFiles(e.target.files)}
          />
        </label>

        {/* text */}
        <div className="flex-1">
          {/* email */}
          <input
            type="text"
            defaultValue={user?.email}
            disabled={true}
            className="w-full h-16 px-2 rounded overflow-hidden border mb-4"
          />
          {/* name */}
          <input
            type="text"
            defaultValue={name}
            required
            className="w-full h-16 px-2 rounded overflow-hidden border mb-4"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
      {/* button */}
      <button
        className="px-[10px] py-2 rounded bg-black text-white w-full h-12 mt-2"
        disabled={loading}
      >
        {loading ? "Loading..." : "Update"}
      </button>
    </form>
  );
};

export default ProfileEdit;
