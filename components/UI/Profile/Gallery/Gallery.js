import { getImages } from "@/actions/imageActions";
import Error from "@/components/Error/Error";
import React from "react";
import ImageGallery from "../../ImageGallery/ImageGallery";

const ProfileGallery = async ({ id, page, myUserId }) => {
  const pages = ["public", "private", "favorite"];
  if (!pages.includes(page)) return null;

  /* hide private, favorite gallery for other users */
  page = id === myUserId ? page : "public";

  const sort = page === "favorite" ? "updatedAt" : "_id";
  const response = await getImages({ id, sort, page });

  return (
    <>
      {response?.errorMessage ? (
        <Error errorMessage={response.errorMessage} />
      ) : (
        <ImageGallery
          data={response?.data}
          next_cursor={response?.next_cursor}
          fetchingData={getImages}
          query={{ id, page, myUserId }}
        />
      )}
    </>
  );
};

export default ProfileGallery;
