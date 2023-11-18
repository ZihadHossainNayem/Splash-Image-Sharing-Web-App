import { getImageById } from "@/actions/imageActions";
import Error from "@/components/Error/Error";
import ImageDetails from "@/components/UI/Image/Image";
import React from "react";

/* webpage title update with image open */
export async function generateMetadata({
  params: { id },
  searchParams: { s },
}) {
  return {
    title: `${s} | Splash`,
    description: `${s} | Splash`,
    alternates: {
      canonical: `/image/${id}?s=${s}`,
      languages: {
        "en-US": `/en-US/image/${id}?${s}`,
      },
    },
  };
}

const ImagePage = async ({ params: { id } }) => {
  const response = await getImageById(id);

  return (
    <>
      {response?.errorMessage ? (
        <Error errorMessage={response.errorMessage} />
      ) : (
        <ImageDetails image={response?.data} />
      )}
    </>
  );
};

export default ImagePage;
