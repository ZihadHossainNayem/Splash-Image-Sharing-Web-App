import React from "react";

const Loading = () => {
  return (
    <div className="w-full h-[100vh] fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-60 text-white z-[1000]">
      <svg
        width={205}
        height={250}
        viewBox="0 0 40 50"
        className="text-[6px] font-semibold uppercase tracking-wide animate-pulse"
      >
        <polygon
          stroke="#fff"
          strokeWidth={1}
          fill="none"
          points="20,1 40,40 1,40"
          className="dash animate-dash"
        />
        <text fill="#fff" x="5" y="50" className="animate-pulse">
          Loading
        </text>
      </svg>
    </div>
  );
};

export default Loading;
