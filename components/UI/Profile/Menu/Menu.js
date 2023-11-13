import { getImagesCount } from "@/actions/imageActions";
import formatNumber from "@/utils/formatNumber";
import Link from "next/link";
import React from "react";
import { BiSolidLock } from "react-icons/bi";
import { BsImages } from "react-icons/bs";
import { MdOutlineFavorite } from "react-icons/md";

const ProfileMenu = async ({ id, page, myUserId }) => {
  const pages = ["public", "private", "favorite"];
  if (!pages.includes(page)) return null;

  /* public , private, favorite image count for profile menu */
  const [public_count, private_count, favorite_count] = await Promise.all([
    getImagesCount({ id, page: "public" }),
    getImagesCount({ id, page: "private" }),
    getImagesCount({ id, page: "favorite" }),
  ]);

  return (
    <div className="w-full border-b bg-white sticky top-16 left-0 z-[10]">
      {/* container */}
      <div className="w-[95%] max-w-[1600px] m-auto flex md:gap-8 gap-4">
        {/* for public images */}
        <li className={page === "public" ? "active" : ""}>
          <Link
            href={`/profile/${id}`}
            className="flex flex-col md:flex-row justify-center items-center gap-2 md:text-lg text-sm"
          >
            <BsImages />
            <div className="flex items-center md:gap-2 gap-1">
              <span>
                Public <span className="hidden md:inline-block">Images</span>
              </span>
              {formatNumber(public_count)}
            </div>
          </Link>
        </li>

        {/* for private images */}
        <li className={page === "private" ? "active" : ""}>
          <Link
            href={`/profile/${id}/private`}
            className="flex flex-col md:flex-row justify-center items-center gap-2 md:text-lg text-sm"
          >
            <BiSolidLock />
            <div className="flex items-center md:gap-2 gap-1">
              <span>
                Private <span className="hidden md:inline-block">Images</span>
              </span>
              {formatNumber(private_count)}
            </div>
          </Link>
        </li>

        {/* for favorite images */}
        <li className={page === "favorite" ? "active" : ""}>
          <Link
            href={`/profile/${id}/favorite`}
            className="flex flex-col md:flex-row justify-center items-center gap-2 md:text-lg text-sm"
          >
            <MdOutlineFavorite />
            <div className="flex items-center md:gap-2 gap-1">
              <span>
                Favorite <span className="hidden md:inline-block">Images</span>
              </span>
              {formatNumber(favorite_count)}
            </div>
          </Link>
        </li>
      </div>
    </div>
  );
};

export default ProfileMenu;
