"use client";
import React, { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const Slider = ({
  setImageIndex,
  currentIndex,
  latestIndex,
  next,
  handleLoadMore,
}) => {
  const [loading, setLoading] = useState(false);

  async function handlePreviousImage() {
    if (currentIndex > 0) {
      setImageIndex((prev) => prev - 1);
    }
  }

  async function handleNextImage() {
    if (currentIndex + 1 <= latestIndex) {
      setImageIndex((prev) => prev + 1);
    } else if (next !== "stop") {
      setLoading(true);
      const images = await handleLoadMore();
      setLoading(false);

      if (currentIndex < images?.length - 1) {
        setImageIndex((prev) => prev + 1);
      }
    }
  }

  return (
    <div className="bg-white">
      {/* left button */}
      <button
        onClick={handlePreviousImage}
        className={`absolute top-[50%] left-5 z-[100] p-3 bg-black bg-opacity-30 hover:bg-opacity-70 text-white ${
          currentIndex <= 0 ? "hidden" : "block"
        }`}
      >
        <FaAngleLeft size={30} />
      </button>

      {/* right button */}
      <button
        onClick={handleNextImage}
        disabled={loading}
        className={`absolute top-[50%] right-5 z-[100] p-3 bg-black bg-opacity-30 hover:bg-opacity-70 text-white ${
          currentIndex >= latestIndex && next === "stop" ? "hidden" : "block"
        }`}
      >
        <FaAngleRight size={30} />
      </button>
    </div>
  );
};

export default Slider;
