import React from "react";
import heroBG from "../../../public/heroBG1.jpg";
import Image from "next/image";
import SearchForm from "@/components/Forms/SearchForm/SearchForm";

const Hero = () => {
  return (
    <header className="w-full h-[90vh] max-h-[500px] bg-black relative">
      <Image
        src={heroBG}
        alt="hero background"
        fill
        placeholder="blur"
        priority
        className="object-cover"
      />
      {/* hero text container */}
      <div className="w-full h-full absolute top-0 left-0 bg-black bg-opacity-30 flex items-center justify-center">
        {/* content */}
        <div className="w-[90%] max-w-[800px] absolute z-[1]">
          <h1 className="md:text-4xl text-3xl font-black text-white  tracking-wide text-center mb-6">
            Explore{" "}
            <span className="text-orange-500 font-black">high-quality</span>,
            free stock photos shared by{" "}
            <span className="text-orange-500 font-black">
              talented creators
            </span>{" "}
            worldwide
          </h1>
          {/* search */}
          <div className="w-full h-12 bg-gray-100 overflow-hidden rounded-lg">
            <SearchForm />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
