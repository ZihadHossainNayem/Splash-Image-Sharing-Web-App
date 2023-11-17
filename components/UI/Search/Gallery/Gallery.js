import { getImages } from "@/actions/imageActions";
import Error from "@/components/Error/Error";
import React from "react";
import ImageGallery from "../../ImageGallery/ImageGallery";

const SearchGallery = async ({ page, search, id }) => {
  if (page !== "images" && page !== "private") return null;

  const response = await getImages({ page, search, id });

  return (
    <>
      {response?.errorMessage ? (
        <Error errorMessage={response.errorMessage} />
      ) : (
        <ImageGallery
          data={response?.data}
          next_cursor={response?.next_cursor}
          fetchingData={getImages}
          query={{ page, search, id }}
        />
      )}
    </>
  );
};

export default SearchGallery;
