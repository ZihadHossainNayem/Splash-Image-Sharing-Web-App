import React from "react";
import NavBar from "./NavBar";
import getServerUser from "@/utils/getServerUser";

const Nav = async () => {
  const user = await getServerUser();
  console.log(user);
  return (
    <div>
      <NavBar user={user} />
    </div>
  );
};

export default Nav;
