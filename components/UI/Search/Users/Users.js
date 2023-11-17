import { getUsers } from "@/actions/userActions";
import Error from "@/components/Error/Error";
import React from "react";
import ListOfUsers from "../../ListOfUsers/ListOfUsers";

const SearchUsers = async ({ page, search }) => {
  if (page !== "users") return null;

  const response = await getUsers({ page, search });
  return (
    <div>
      {response?.errorMessage ? (
        <Error errorMessage={response.errorMessage} />
      ) : (
        <ListOfUsers
          data={response?.data}
          next_cursor={response?.next_cursor}
          fetchingData={getUsers}
          query={{ page, search }}
        />
      )}
    </div>
  );
};

export default SearchUsers;
