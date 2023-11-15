"use client";
import Image from "next/image";
import React, { useState } from "react";
import { BsX } from "react-icons/bs";
import { BiSolidLockAlt } from "react-icons/bi";
import { updateImage } from "@/actions/imageActions";
import { toast } from "react-toastify";

const UploadCard = React.memo(({ file, setFiles, index, setIsEdit }) => {
  const [loading, setLoading] = useState(false);

  /* validation function to check less than 100 character in title, 
  maximum 5 tags per image */
  const validate = ({ title, tags }) => {
    const errors = {};
    if (title.length > 100) {
      errors.title = "Title is too long";
    } else {
      errors.title = "";
    }

    if (tags.length > 5) {
      errors.tags = "Too many tags";
    } else {
      errors.tags = "";
    }
    return errors?.title || errors?.tags ? "error" : "success";
  };

  /* handle image title change */
  const handleChangeTitle = (e) => {
    const { value } = e.target;
    const newFile = {
      ...file,
      title: value,
      status: validate({ title: value, tags: file?.tags }),
    };

    setFiles((files) => files.map((item, i) => (i === index ? newFile : item)));
  };

  /* handle tags input */
  const handleInputTags = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      let tag = e.target.value
        .trim()
        .replaceAll(/\s+/g, " ")
        .replaceAll(",", "");
      if (tag.length > 1 && !file?.tags?.includes(tag)) {
        const newFile = {
          ...file,
          tags: [...file.tags, tag],
          status: validate({ title: file.title, tags: [...file.tags, tag] }),
        };
        setFiles((files) =>
          files.map((item, i) => (i === index ? newFile : item))
        );
      }
      e.target.value = "";
    }
  };

  /* handle remove tags */
  const handleRemoveTags = (tag) => {
    const newTags = file.tags.filter((t) => t !== tag);

    const newFile = {
      ...file,
      tags: newTags,
      status: validate({ title: file.title, tags: newTags }),
    };
    setFiles((files) => files.map((item, i) => (i === index ? newFile : item)));
  };

  /* handle if the image is public */
  const handleChangeIsPublic = () => {
    setFiles((files) =>
      files.map((item, i) =>
        i === index ? { ...file, public: !file.public } : item
      )
    );
  };

  /* handle remove image */
  const handleRemoveFile = () => {
    if (setIsEdit) return setIsEdit(false);
    setFiles((files) => files.filter((_, i) => i !== index));
  };

  /* handle update / edit image */
  const handleUpdateImage = async () => {
    if (loading || file?.status === "error") return;

    setLoading(false);
    const response = await updateImage(file);
    setLoading(false);

    if (response?.errorMessage) toast.error(response.errorMessage);

    setIsEdit(false);
  };

  return (
    <div
      className={`w-full border border-gray-200 hover:shadow p-4 mb-4 overflow-hidden relative group ${
        file?.status === "success"
          ? "bg-gray-100 bg-opacity-80"
          : "bg-red-100 bg-opacity-80"
      }`}
    >
      {/* image here... */}
      <Image
        src={file?.imgUrl}
        alt={file?.title || ""}
        width={280}
        height={280}
        title={file?.title}
        className="w-auto h-auto"
      />
      {file?.errorMessage ? (
        // if error
        <div className="text-lg mx-1 capitalize">
          <p>{file?.status}</p>
          <span>{file?.errorMessage}</span>
        </div>
      ) : (
        // if success
        <div className="">
          {/* image title input here... */}
          <div title={`${file?.title?.length}/100`}>
            <input
              type="text"
              autoComplete="off"
              placeholder="Add title"
              defaultValue={file?.title}
              onChange={handleChangeTitle}
              className="w-full h-10 my-2 px-3 bg-white border border-gray-300"
            />
          </div>

          {/* tags of the image here...*/}
          <div
            title={`${file?.tags?.length}/5`}
            className="w-full min-h-[40px] bg-white border border-gray-300 
            flex items-center flex-wrap gap-1 text-sm p-2"
          >
            {file?.tags.map((tag) => (
              <div
                key={tag}
                className="flex items-center gap-1 bg-gray-100 p-1 border border-gray-300"
              >
                <span>{tag}</span>
                <BsX
                  onClick={() => handleRemoveTags(tag)}
                  className="w-5 h-5 cursor-pointer rounded-full hover:bg-red-400 hover:text-white"
                />
              </div>
            ))}
            <input
              type="text"
              autoComplete="off"
              onKeyUp={handleInputTags}
              className="flex-1 outline-none px-2 min-w-0 border border-gray-50"
            />
          </div>
          {/* make the image public or not */}
          <label className="flex items-center gap-1 mt-4 mb-2">
            <input
              type="checkbox"
              checked={file?.public}
              onChange={handleChangeIsPublic}
              className="w-4 h-4 cursor-pointer"
            />
            <span>Make the Image public</span>
            <BiSolidLockAlt className="w-4 h-4 text-gray-500" />
          </label>
        </div>
      )}
      <button
        onClick={handleRemoveFile}
        className="absolute top-1 right-1 bg-red-500 rounded-full text-white hidden group-hover:block"
      >
        <BsX className="h-6 w-6" />
      </button>

      {setIsEdit ? (
        <button
          onClick={handleUpdateImage}
          className="bg-gray-700 text-white px-4 py-2"
          disabled={loading || file?.status === "error"}
        >
          {loading ? "Loading..." : "Update Image"}
        </button>
      ) : null}
    </div>
  );
});
export default UploadCard;
