import { getImages } from "@/actions/imageActions";
import Hero from "@/components/UI/Hero/Hero";
import ImageGallery from "@/components/UI/ImageGallery/ImageGallery";
import React from "react";

const Home = async () => {
  const response = await getImages({ page: "home" });
  console.log(response);
  return (
    <>
      <Hero />
      {response?.errorMessage ? (
        <Error errorMessage={response.errorMessage} />
      ) : (
        <ImageGallery data={response?.data} />
      )}
    </>
  );
};

export default Home;
