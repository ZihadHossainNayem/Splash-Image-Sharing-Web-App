"use client";
import formatNumber from "@/utils/formatNumber";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  AiOutlineSetting,
  AiOutlineLogout,
  AiOutlinePlus,
} from "react-icons/ai";
import { MdDone } from "react-icons/md";
import Modal from "../../Modal/Modal";
import ProfileEdit from "../Edit/ProfileEdit";
import { signIn, signOut } from "next-auth/react";
import { followUser } from "@/actions/userActions";
import { toast } from "react-toastify";

const Info = ({ user }) => {
  const [isFollowing, setIsFollowing] = useState(user?.isFollowing);
  const [totalFollowers, setTotalFollowers] = useState(user?.total_followers);
  const [isEdit, setIsEdit] = useState(false);

  /* function for handling follow */
  const handleFollow = async () => {
    /* send to sign in page if not a user */
    if (!user?.myUserId) return signIn("google");

    /* toggle state of isFollowing */
    setIsFollowing((prev) => !prev);
    /* update the total followers count */
    setTotalFollowers((prev) => (isFollowing ? prev - 1 : prev + 1));

    const response = await followUser({ ...user, isFollowing });
    if (response?.errorMessage) toast.error(response.errorMessage);
  };

  return (
    <div className="w-[95%] m-auto my-10 max-w-[1600px]">
      {/* profile information  */}
      <div className="flex items-center md:gap-8 gap-4">
        {/* avatar */}
        <div className="md:w-32 md:h-32 h-28 w-28 rounded-full overflow-hidden flex items-center justify-center">
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
          <h1
            className="md:text-3xl text-xl line-clamp-1 font-semibold"
            title={user?.name}
          >
            {user?.name}
          </h1>
          <h2
            className="text-gray-500 mb-3 md:text-base text-sm"
            title={user?.email}
          >
            {user?.email}
          </h2>
          {/* buttons */}
          <div className="flex items-center gap-4">
            {user?.my_user ? (
              <>
                {/* edit button */}
                <button
                  onClick={() => setIsEdit(true)}
                  className="px-2 py-1 flex items-center gap-1 border border-gray-300 hover:border-black rounded shadow"
                >
                  <AiOutlineSetting />
                  <span>Edit</span>
                </button>
                {/* logout button */}
                <button
                  onClick={signOut}
                  className="px-2 py-1 flex items-center gap-1 border border-gray-300 hover:border-black rounded shadow"
                >
                  <AiOutlineLogout />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <button
                onClick={handleFollow}
                className="px-2 py-1 flex items-center gap-1 border border-gray-300 hover:border-black rounded shadow"
              >
                {isFollowing ? <MdDone /> : <AiOutlinePlus />}
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
          href={`/profile/${user?._id}/follower`}
          className="flex gap-1 items-center hover:underline"
        >
          <span>{formatNumber(totalFollowers)}</span>
          <span className="text-gray-600">Follower</span>
        </Link>
      </div>
      {isEdit !== false && user?.my_user ? (
        <Modal open={setIsEdit}>
          <ProfileEdit user={user} setIsEdit={setIsEdit} />
        </Modal>
      ) : null}
    </div>
  );
};

export default Info;
