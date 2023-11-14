import React from "react";
import NavBar from "./NavBar";
import getServerUser from "@/utils/getServerUser";

const Nav = async () => {
  const user = await getServerUser();
  console.log(user);
  return (
    <div className="sticky top-0 left-0 z-[100]">
      <NavBar user={user} />
    </div>
  );
};

export default Nav;
