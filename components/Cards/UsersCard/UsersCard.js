"use client";
import { followUser } from "@/actions/userActions";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineLogout, AiOutlinePlus } from "react-icons/ai";
import { MdDone } from "react-icons/md";

const UsersCard = React.memo(({ user }) => {
  const [isFollowing, setIsFollowing] = useState(user?.isFollowing);

  /* function for handling follow */
  const handleFollow = async () => {
    /* send to sign in page if not a user */
    if (!user?.myUserId) return signIn("google");

    /* toggle state of isFollowing */
    setIsFollowing((prev) => !prev);

    const response = await followUser({ ...user, isFollowing });

    if (response?.errorMessage) toast.error(response.errorMessage);
  };

  return (
    /* user card */
    <div
      className="w-full rounded-md grid place-items-center gap-4 
    text-center py-8 px-5 cursor-pointer relative border shadow"
    >
      {/* avatar */}
      <div className="w-24 h-24 border-2 border-gray-800 rounded-full overflow-hidden">
        <Image
          src={user?.avatar}
          alt="user?.name"
          width={100}
          height={100}
          sizes="25vw"
        />
      </div>

      {/* user info */}
      <div className="w-full overflow-hidden">
        <span className="line-clamp-1 text-xl font-semibold">{user?.name}</span>
        <span className="line-clamp-1 text-gray-500">{user?.email}</span>
      </div>

      {user?._id === user?.myUserId ? (
        <button
          onClick={signOut}
          className="px-6 py-1 flex items-center gap-1 border border-gray-300 hover:border-black rounded-full shadow static z-[2]"
        >
          <AiOutlineLogout />
          <span>Logout</span>
        </button>
      ) : (
        <button
          onClick={handleFollow}
          className={`px-6 py-1 flex items-center gap-1 border border-gray-300 hover:border-black rounded-full shadow static z-[2] ${
            isFollowing ? "following" : ""
          }`}
        >
          {isFollowing ? <MdDone /> : <AiOutlinePlus />}
          <span>{isFollowing ? "Following" : "Follow"}</span>
        </button>
      )}

      <Link
        href={`/profile/${user?._id}`}
        className="w-full h-full absolute top-0 left-0 z-[1]"
      />
    </div>
  );
});

export default UsersCard;
