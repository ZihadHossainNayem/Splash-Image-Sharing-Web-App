"use client";
import React from "react";
import { signIn, signOut } from "next-auth/react";

const NavBar = ({ user }) => {
  return (
    <div className="flex gap-12">
      {user ? (
        <button onClick={signOut}>{user?.name}Log Out</button>
      ) : (
        <button onClick={() => signIn("google")}>login</button>
      )}
    </div>
  );
};

export default NavBar;
