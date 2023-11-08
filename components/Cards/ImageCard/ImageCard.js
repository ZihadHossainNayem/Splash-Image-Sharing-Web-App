import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import { BiDownload } from "react-icons/bi";
import { handleDownloadImage } from "@/utils/downloadImage";
import { favoriteImage } from "@/actions/imageActions";
import { toast } from "react-toastify";

const ImageCard = React.memo(({ image, setImages, index }) => {
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
        className="absolute left-0 top-0 w-full px-4 py-2 flex items-center gap-2 justify-end
       transition-transform transform -translate-y-full group-hover:translate-y-0"
      >
        {image?.myUserId === image?.user?._id ? (
          <>
            {/* delete button */}
            <button className="bg-white bg-opacity-80 p-1 rounded">
              <AiOutlineDelete size={22} />
            </button>
            {/* edit button */}
            <button className="bg-white bg-opacity-80  p-1 rounded">
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
        className="absolute left-0 bottom-0 w-full px-4 py-2 flex items-center gap-2 justify-between 
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
              className="rounded-full"
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
    </div>
  );
});

export default ImageCard;
