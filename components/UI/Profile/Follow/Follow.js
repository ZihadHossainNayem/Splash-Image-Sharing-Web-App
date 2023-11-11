import { getUsers } from "@/actions/userActions";
import Error from "@/components/Error/Error";
import React from "react";
import ListOfUsers from "../../ListOfUsers/ListOfUsers";
import Modal from "../../Modal/Modal";

const ProfileFollow = async ({ id, page }) => {
  /* show follower and following  */
  if (page !== "follower" && page !== "following") return null;

  const sort = "updateAt";
  const response = await getUsers({ id, page, sort });

  return (
    <Modal url={`/profile/${id}`}>
      <div className="w-[95vw] max-w-[1600px] min-h-[95vh] bg-white border border-gray-100">
        <h1 className="text-center capitalize pt-5 text-2xl font-semibold">
          {page}
        </h1>
        {response?.errorMessage ? (
          <Error errorMessage={errorMessage} />
        ) : (
          <ListOfUsers
            data={response?.data}
            next_cursor={response?.next_cursor}
            fetchingData={getUsers}
            query={{ id, page, sort }}
          />
        )}
      </div>
    </Modal>
  );
};

export default ProfileFollow;
