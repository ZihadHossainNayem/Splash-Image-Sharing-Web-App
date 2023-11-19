"use client";
import ImageCard from "@/components/Cards/ImageCard/ImageCard";
import useInView from "@/hooks/useInView";
import React, { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import ImageDetails from "../Image/Image";
import Slider from "../Slider/Slider";

const ImageGallery = ({ data, next_cursor, fetchingData, query }) => {
  const [files, setFiles] = useState(data);
  const [next, setNext] = useState(next_cursor);
  const [loading, setLoading] = useState(false);
  const [imageIndex, setImageIndex] = useState(false);

  const { ref, inView } = useInView();

  async function handleLoadMore() {
    if (next === "stop" || loading) return;
    setLoading(true);
    const response = await fetchingData({ next, ...query });
    setLoading(false);

    const newData = [...files, ...response?.data];

    setFiles(newData);
    setNext(response?.next_cursor);

    return newData;
  }

  /* for auto load more images */
  useEffect(() => {
    if (inView) {
      handleLoadMore();
    }
  }, [inView]);

  return (
    <div className="w-[95%] max-w-[1600px] m-auto">
      <div className="m-8 mx-auto" style={{ columns: "5 280px", gap: "16px" }}>
        {files.map((file, index) => (
          <ImageCard
            key={file._id}
            image={file}
            setImages={setFiles}
            index={index}
            setImageIndex={setImageIndex}
          />
        ))}
      </div>

      {/* infinite scrolling pagination section */}
      <button
        className={`block py-3 px-6 my-4 mx-auto cursor-pointer text-white rounded font-semibold
         ${!loading ? "bg-black" : "bg-gray-700"} ${
          next && next !== "stop" ? "block" : "hidden"
        }`}
        disabled={loading}
        onClick={handleLoadMore}
        ref={ref}
      >
        {loading ? "Loading..." : "Load More"}
      </button>

      {imageIndex !== false ? (
        <Modal open={setImageIndex}>
          <ImageDetails
            image={files[imageIndex]}
            setImages={setFiles}
            type="modal_active"
          />

          <Slider
            setImageIndex={setImageIndex}
            currentIndex={imageIndex}
            latestIndex={files.length - 1}
            next={next}
            handleLoadMore={handleLoadMore}
          />
        </Modal>
      ) : null}
    </div>
  );
};

export default ImageGallery;
