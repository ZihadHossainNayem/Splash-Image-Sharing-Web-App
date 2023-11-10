import { getUserById } from "@/actions/userActions";
import Error from "@/components/Error/Error";
import React from "react";
import Info from "./Info";

const ProfileInfo = async ({ myUser, id }) => {
  const response = await getUserById({ myUser, id });

  return (
    <>
      {response?.errorMessage ? (
        <Error errorMessage={response.errorMessage} />
      ) : (
        <Info user={response?.user} />
      )}
    </>
  );
};

export default ProfileInfo;
