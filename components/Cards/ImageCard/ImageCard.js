import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import { BiDownload } from "react-icons/bi";
import { handleDownloadImage } from "@/utils/downloadImage";
import { deleteImage, favoriteImage } from "@/actions/imageActions";
import { toast } from "react-toastify";
import UploadCard from "../UploadCard/UploadCard";
import { signIn } from "next-auth/react";

const ImageCard = React.memo(({ image, setImages, index, setImageIndex }) => {
  const [isEdit, setIsEdit] = useState(false);

  /* favorite image button handle */
  async function handleFavoriteImage() {
    /* authenticated user check or return to sign in page*/
    if (!image?.myUserId) return signIn("google");

    /* clone the current image and toggle favorite */
    const newImage = { ...image, isFavorite: !image?.isFavorite };
    setImages((images) =>
      images.map((item) => (item._id === newImage?._id ? newImage : item))
    );
    const response = await favoriteImage(image);

    if (response?.errorMessage) toast.error(response.errorMessage);
  }

  /* for editing image */
  if (isEdit)
    return (
      <UploadCard
        file={image}
        setFiles={setImages}
        index={index}
        setIsEdit={setIsEdit}
      />
    );

  /* for deleting image */
  async function handleDeleteImage() {
    if (confirm("Are you sure you want to delete this image? ")) {
      setImages((images) => images.filter((_, i) => i !== index));

      const response = await deleteImage(image);

      if (response?.errorMessage) toast.error(response.errorMessage);
    }
  }

  return (
    <div
      className="w-full min-h-[120px] mb-4 shadow overflow-hidden 
    flex justify-center items-center relative group"
    >
      <Image
        src={image?.imgUrl}
        alt="image?.title"
        width={280}
        height={280}
        sizes="60vw"
        placeholder="blur"
        blurDataURL={image?.blurHash}
        className="object-cover w-full h-auto"
      />
      {/* top section */}
      <div
        className="absolute left-0 top-0 z-[2] w-full px-4 py-2 flex items-center gap-2 justify-end
       transition-transform transform -translate-y-full group-hover:translate-y-0"
      >
        {image?.myUserId === image?.user?._id ? (
          <>
            {/* delete button */}
            <button
              onClick={handleDeleteImage}
              className="bg-white bg-opacity-80 p-1 rounded"
            >
              <AiOutlineDelete size={22} />
            </button>
            {/* edit button */}
            <button
              onClick={() => setIsEdit(true)}
              className="bg-white bg-opacity-80  p-1 rounded"
            >
              <AiOutlineEdit size={22} />
            </button>
          </>
        ) : null}
        {/*  favorite image button */}
        <button
          onClick={handleFavoriteImage}
          className="bg-white bg-opacity-80  p-1 rounded "
        >
          {image?.isFavorite ? (
            <MdOutlineFavorite className="text-red-500" size={22} />
          ) : (
            <MdOutlineFavoriteBorder size={22} />
          )}
        </button>
      </div>
      {/* bottom section */}
      <div
        className="absolute left-0 bottom-0 z-[2] w-full px-4 py-2 flex items-center gap-2 justify-between 
      transition-transform transform translate-y-full group-hover:translate-y-0"
      >
        {/* user details */}
        <Link
          href={`/profile/${image?.user?._id}`}
          className="flex items-center gap-2"
          title={image?.user?.name}
        >
          <div>
            <Image
              src={image?.user?.avatar}
              alt={image?.user?.name}
              width={40}
              height={40}
              sizes="25vw"
              className="rounded-full w-10 h-10"
            />
          </div>
          <span className="line-clamp-1 font-medium text-white">
            {image?.user?.name}
          </span>
        </Link>
        {/* download button */}
        <button
          onClick={() => handleDownloadImage(image)}
          className="bg-white bg-opacity-80  p-1 rounded"
        >
          <BiDownload size={22} />
        </button>
      </div>
      <button
        className="w-full h-full absolute top-0 left-0 z-[1]"
        onClick={() => setImageIndex(index)}
      />
    </div>
  );
});

export default ImageCard;
