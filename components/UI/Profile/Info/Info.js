"use client";
import formatNumber from "@/utils/formatNumber";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineSetting, AiOutlineLogout } from "react-icons/ai";

const Info = ({ user }) => {
  const [isFollowing, setIsFollowing] = useState(user?.isFollowing);
  const [totalFollower, setTotalFollower] = useState(user?.total_followers);

  return (
    <div className="w-[95%] m-auto mx-10 my-10 max-w-[1600px]">
      {/* profile information  */}
      <div className="flex items-center gap-8">
        {/* avatar */}
        <div className="w-32 h-32 rounded-full overflow-hidden flex items-center justify-center">
          <Image
            src={user?.avatar}
            alt={user?.name}
            width={128}
            height={128}
            sizes="50vw"
            priority
          />
        </div>

        <div className="flex-1 max-w-[480px]">
          {/* name email */}
          <h1 className="text-3xl font-semibold" title={user?.name}>
            {user?.name}
          </h1>
          <h2 className="text-gray-500 mb-3" title={user?.email}>
            {user?.email}
          </h2>
          {/* buttons */}
          <div className="flex items-center gap-4">
            {user?.my_user ? (
              <>
                {/* edit button */}
                <button className="px-2 py-1 flex items-center gap-1 border border-gray-300 hover:border-black rounded shadow">
                  <AiOutlineSetting />
                  <span>Edit</span>
                </button>
                {/* logout button */}
                <button className="px-2 py-1 flex items-center gap-1 border border-gray-300 hover:border-black rounded shadow">
                  <AiOutlineLogout />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <button className="px-2 py-1 flex items-center gap-1 border border-gray-300 hover:border-black rounded shadow">
                {isFollowing ? "done" : "add"}
                <span>{isFollowing ? "Following" : "Follow"}</span>
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 mt-5">
        {/* following section */}
        <Link
          href={`/profile/${user?._id}/following`}
          className="flex gap-1 items-center hover:underline"
        >
          <span>{formatNumber(user?.total_followings)}</span>
          <span className="text-gray-600">Followings</span>
        </Link>

        {/* follower section */}
        <Link
          href={`/profile/${user?._id}/following`}
          className="flex gap-1 items-center hover:underline"
        >
          <span>{formatNumber(user?.total_followers)}</span>
          <span className="text-gray-600">Follower</span>
        </Link>
      </div>
    </div>
  );
};

export default Info;
