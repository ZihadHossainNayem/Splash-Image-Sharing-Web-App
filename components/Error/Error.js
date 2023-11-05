"use client";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const Error = ({ errorMessage }) => {
  useEffect(() => {
    if (errorMessage) toast.error(errorMessage);
  }, [errorMessage]);

  return (
    <div>
      <h1 className="text-center my-8 uppercase text-red-500">
        {errorMessage}
      </h1>
    </div>
  );
};

export default Error;
