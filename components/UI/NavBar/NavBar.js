"use client";
import React from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { BiUser, BiUpload } from "react-icons/bi";
import SearchForm from "@/components/Forms/SearchForm/SearchForm";

const NavBar = ({ user }) => {
  return (
    <nav className="w-[100%] bg-white p-4 sticky top-0 left-0 z-[100]">
      <div className="w-[95%] max-w-[1600px] mx-auto h-10 flex justify-between items-center md:gap-8 gap-3">
        {/* logo */}
        <Link
          href="/"
          className="uppercase font-bold md:text-2xl text-xl flex items-center"
        >
          <b
            className="bg-black md:bg-transparent md:text-black text-white md:w-auto w-10 min-w-10 
          md:block flex items-center justify-center rounded-md relative py-[6px]"
          >
            S
          </b>
          <b className="hidden md:block">plash</b>
        </Link>

        {/* search */}
        <div className="flex-1 h-full min-w-[100px] max-w-2xl bg-gray-50 rounded-3xl overflow-hidden">
          <SearchForm />
        </div>

        {/* navbar menu */}
        <div className="flex h-full items-center gap-2">
          {!user ? (
            <>
              {/* login button */}
              <button
                onClick={() => signIn("google")}
                className="flex justify-center items-center gap-2 rounded px-[10px] py-2 border hover:border-black  whitespace-nowrap shadow-sm"
              >
                <BiUser className="block md:hidden text-xl" />
                <span className="md:block hidden">Log in</span>
              </button>
              {/* image upload button */}
              <button
                onClick={() => signIn("google", { callbackUrl: "/upload" })}
                className="flex justify-center items-center gap-2 rounded px-[10px] py-2 border hover:border-black whitespace-nowrap shadow-sm"
              >
                <BiUpload className="block md:hidden text-xl" />
                <span className="md:block hidden">Upload Image</span>
              </button>
            </>
          ) : (
            <>
              {/* image upload button */}
              <button className="flex justify-center items-center gap-2 rounded px-[10px] py-2 border hover:border-black whitespace-nowrap shadow-sm">
                <Link href="/upload">
                  <BiUpload className="block md:hidden text-xl" />
                  <span className="md:block hidden">Upload Image</span>
                </Link>
              </button>
              {/* profile avatar */}
              <Link href={`/profile/${user?._id}`}>
                <Image
                  src={user?.avatar}
                  alt={user?.name}
                  width={40}
                  height={40}
                  priority={true}
                  className="w-10 h-10 rounded-full object-cover overflow-hidden border border-gray-50"
                />
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
