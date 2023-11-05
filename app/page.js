import { getImages } from "@/actions/imageActions";
import Hero from "@/components/UI/Hero/Hero";
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
        "Gallery"
      )}
    </>
  );
};

export default Home;
