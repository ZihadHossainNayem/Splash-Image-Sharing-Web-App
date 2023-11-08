"use server";

import UserModel from "@/models/userModel";

export async function getUserById({ myUser, id }) {
  try {
    /* requested user === logged in user */
    if (myUser?._id === id) return { user: myUser };
    /* find user by ID in mongodb */
    const user = await UserModel.findById(id);
    if (!user) throw new Error("User does not exist!");

    /* creating new user object with necessary property */
    const newUser = {
      ...user._doc,
      _id: user?._id.toString(),
      total_followers: user?.followers.length,
      total_followings: user?.followings.length,
      followers: [],
      followings: [],
      isFollowing: user?.followers.include(myUser?._id),
      myUserId: myUser?._id,
    };

    return { user: newUser };
  } catch (error) {
    return { errorMessage: error.message };
  }
}
