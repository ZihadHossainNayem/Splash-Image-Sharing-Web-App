import { getImagesCount } from "@/actions/imageActions";
import { getUsersCount } from "@/actions/userActions";
import formatNumber from "@/utils/formatNumber";
import Link from "next/link";
import React from "react";
import { BiSolidLock, BiSolidUser } from "react-icons/bi";
import { BsImages } from "react-icons/bs";

const SearchMenu = async ({ page, search, id }) => {
  const [images_count, users_count, private_count] = await Promise.all([
    getImagesCount({ page: "images", search }),
    getUsersCount({ page: "users", search }),
    id ? getImagesCount({ page: "private", search, id }) : 0,
  ]);

  console.log({ images_count, users_count, private_count });

  return (
    <div className="w-full border-b bg-white sticky top-16 left-0 z-[10]">
      {/* container */}
      <div className="w-[95%] max-w-[1600px] m-auto flex md:gap-8 gap-4">
        {/* for  images */}
        <li className={page === "images" ? "active" : ""}>
          <Link
            href={`/search/images/${search}`}
            className="flex flex-col md:flex-row justify-center items-center gap-2 md:text-lg text-sm"
          >
            <BsImages />
            <div className="flex items-center md:gap-2 gap-1">
              <span>Images</span>
              {formatNumber(images_count)}
            </div>
          </Link>
        </li>

        {/* for users */}
        <li className={page === "users" ? "active" : ""}>
          <Link
            href={`/search/users/${search}`}
            className="flex flex-col md:flex-row justify-center items-center gap-2 md:text-lg text-sm"
          >
            <BiSolidUser />
            <div className="flex items-center md:gap-2 gap-1">
              <span>Users</span>
              {formatNumber(users_count)}
            </div>
          </Link>
        </li>

        {id ? (
          <li className={page === "private" ? "active" : ""}>
            <Link
              href={`/search/private/${search}`}
              className="flex flex-col md:flex-row justify-center items-center gap-2 md:text-lg text-sm"
            >
              <BiSolidLock />
              <div className="flex items-center md:gap-2 gap-1">
                <span>Private</span>
                {formatNumber(private_count)}
              </div>
            </Link>
          </li>
        ) : null}
      </div>
    </div>
  );
};

export default SearchMenu;
