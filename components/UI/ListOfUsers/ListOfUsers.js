"use client";
import UsersCard from "@/components/Cards/UsersCard/UsersCard";
import useInView from "@/hooks/useInView";
import React, { useEffect, useState } from "react";

const ListOfUsers = ({ data, next_cursor, fetchingData, query }) => {
  const [files, setFiles] = useState(data);
  const [next, setNext] = useState(next_cursor);
  const [loading, setLoading] = useState(false);

  const { ref, inView } = useInView();

  async function handleLoadMore() {
    if (next === "stop" || loading) return;
    setLoading(true);
    const response = await fetchingData({ next, ...query });
    setLoading(false);

    const newData = [...files, ...response?.data];

    setFiles(newData);
    setNext(response?.next_cursor);
  }

  /* for auto load more images */
  useEffect(() => {
    if (inView) {
      handleLoadMore();
    }
  }, [inView]);

  return (
    <div className="w-[95%] max-w-[1600px] m-auto">
      <div
        className="w-full grid gap-8 my-10 mx-auto"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        }}
      >
        {files.map((file) => (
          <UsersCard key={file._id} user={file} />
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
    </div>
  );
};

export default ListOfUsers;
