"use client";
import React, { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/navigation";

const Modal = ({ children, open, url }) => {
  const router = useRouter();

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style = "";
    };
  }, []);

  function handleClose() {
    if (open) return open(false);
    router.push(url || "/");
  }

  return (
    <div className="w-full h-[100vh] backdrop-blur-sm fixed top-0 left-0 z-[99] flex justify-center items-center">
      <div
        onClick={handleClose}
        className="w-full h-[100vh] absolute top-0 left-0 z-[99]"
      />
      {/* container */}
      <div className="relative z-[100] shadow-md">
        <button
          onClick={handleClose}
          className="w-6 h-6 absolute -top-2 -right-2 rounded-[50%] overflow-hidden flex justify-center items-center 
          bg-red-500 bg-opacity-80 text-white"
        >
          <AiOutlineClose />
        </button>
        {/* content */}
        <div className="max-w-[95vw] max-h-[95vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
