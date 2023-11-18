"use client";
import formatNumber from "@/utils/formatNumber";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineShareAlt } from "react-icons/ai";
import { BiDownload } from "react-icons/bi";
import {
  MdOutlineDateRange,
  MdOutlineFavorite,
  MdOutlineFavoriteBorder,
} from "react-icons/md";
import { LuTags } from "react-icons/lu";
import { handleDownloadImage } from "@/utils/downloadImage";
import { signIn } from "next-auth/react";
import { useOptimistic } from "react";
import { favoriteImage } from "@/actions/imageActions";
import { toast } from "react-toastify";

const ImageDetails = ({ image, setImages, type }) => {
  const [isFavorite, setIsFavorite] = useOptimistic(image?.isFavorite);

  /* favorite image button handle */
  async function handleFavoriteImage() {
    /* authenticated user check or return to sign in page*/
    if (!image?.myUserId) return signIn("google");

    if (setImages) {
      /* clone the current image and toggle favorite */
      const newImage = { ...image, isFavorite: !image?.isFavorite };

      setImages((images) =>
        images.map((item) => (item._id === newImage?._id ? newImage : item))
      );
    } else {
      setIsFavorite((prev) => !prev);
    }

    const response = await favoriteImage(image);
    if (response?.errorMessage) {
      toast.error(res.errorMessage);
    } else {
      setIsFavorite(!isFavorite);
    }
  }

  return (
    <div className={`w-[95%] max-w-[1600px] m-auto ${type}`}>
      {/* top section - user avatar, username, share icon, fav icon, download icon */}
      <div
        className={`flex justify-between items-center flex-wrap sticky gap-2 ${
          type ? "top-0" : "top-12"
        } left-0 z-[9] bg-white pt-8 pb-4`}
      >
        <Link
          href={`/profile/${image?.user?._id}`}
          className="flex items-center gap-2"
        >
          {/* user avatar of the image owner */}
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <Image
              src={image?.user?.avatar}
              alt={image?.user?.name}
              width={40}
              height={40}
              sizes="25vw"
            />
          </div>
          {/* image owner name */}
          <span className="font-medium text-lg">{image?.user?.name}</span>
        </Link>

        <div className="flex items-center gap-2">
          {/* share link */}
          {type ? (
            <Link
              href={`/image/${image._id}?s=${image?.slug}`}
              className="border px-2 py-1 rounded-sm border-gray-400 hover:border-black"
            >
              <AiOutlineShareAlt size={22} />
            </Link>
          ) : null}

          {/* favorite button */}
          <button
            onClick={handleFavoriteImage}
            className="border px-2 py-1 rounded-sm border-gray-400 hover:border-black"
          >
            {isFavorite ? (
              <MdOutlineFavorite className="text-red-500" size={22} />
            ) : (
              <MdOutlineFavoriteBorder size={22} />
            )}
          </button>
          {/* download button */}
          <button
            onClick={() => handleDownloadImage(image)}
            className="border px-2 py-1 rounded-sm border-gray-400 hover:border-black"
          >
            <BiDownload size={23} />
          </button>
        </div>
      </div>

      {/* middle section - image section */}
      <div className="overflow-hidden ">
        <Image
          src={image?.imgUrl}
          alt={image?.title}
          width={1280}
          height={1280}
          size="70vw"
          placeholder="blur"
          blurDataURL={image?.blurHash}
          className="w-full"
        />
      </div>

      {/* bottom section */}
      <div className="py-4 flex flex-col gap-2 overflow-hidden">
        {/* title */}
        <h1 className="font-medium text-lg mb-2 capitalize">{image?.title}</h1>
        {/* favorite counter */}
        <div
          title="favorite"
          className="flex items-center gap-2 text-[#6b6b6b]"
        >
          <MdOutlineFavoriteBorder size={22} />
          <span>{formatNumber(image?.total_favorite)}</span>
        </div>
        {/* upload date */}
        <div
          title="published"
          className="flex items-center gap-2 text-[#6b6b6b]"
        >
          <MdOutlineDateRange size={22} />
          <span>{new Date(image?.createdAt).toDateString()}</span>
        </div>
        {/* tags */}
        <div className="text-[#6b6b6b] flex items-center gap-2 mt-2">
          <LuTags size={22} />
          {image?.tags?.map((tag) => (
            <Link
              key={tag}
              href={`/search/images/${tag}`}
              className="py-1 px-2 rounded bg-[#ececec] hover:bg-[#cccccc] hover:text-black"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageDetails;
