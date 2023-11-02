"use client";
import React from "react";
import { BiSearch } from "react-icons/bi";
import { useRouter } from "next/navigation";

const SearchForm = () => {
  const router = useRouter();

  const handleForm = (data) => {
    const value = data.get("search");
    const searchTerm = value.toLowerCase().trim().replaceAll(/\s+/g, " ");
    router.push(`/search/images/${searchTerm}`);
  };
  return (
    <form action={handleForm} className="w-full h-full flex items-center">
      <button
        className="w-12 h-full text-gray-500 flex items-center justify-center"
        title="search"
      >
        <BiSearch />
      </button>
      <input
        type="search"
        name="search"
        className="h-full pr-4 outline-none border-none min-w-0 bg-transparent flex-1"
        placeholder="Search here..."
        autoComplete="off"
        required
      />
    </form>
  );
};

export default SearchForm;
