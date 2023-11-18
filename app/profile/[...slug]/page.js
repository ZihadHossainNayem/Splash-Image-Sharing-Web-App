import ProfileFollow from "@/components/UI/Profile/Follow/Follow";
import ProfileGallery from "@/components/UI/Profile/Gallery/Gallery";
import ProfileInfo from "@/components/UI/Profile/Info";
import ProfileMenu from "@/components/UI/Profile/Menu/Menu";
import getServerUser from "@/utils/getServerUser";
import React from "react";

const ProfilePage = async ({ params: { slug } }) => {
  /* extract id and page from slug parameter */
  const id = slug[0],
    page = slug[1] || "public";

  /* fetching user data from server */
  const myUser = await getServerUser();
  return (
    <>
      <ProfileInfo myUser={myUser} id={id} />
      <ProfileFollow id={id} page={page} />
      <ProfileMenu id={id} page={page} myUserId={myUser?._id} />
      <ProfileGallery id={id} page={page} myUserId={myUser?._id} />
    </>
  );
};

export default ProfilePage;
