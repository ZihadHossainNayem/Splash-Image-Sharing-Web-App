"use server";

import UserModel from "@/models/userModel";
import {
  deleteFromCloudinary,
  imageUploadToCloudinary,
} from "@/utils/cloudinary";
import { revalidatePath } from "next/cache";

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

/* profile information update */

export async function updateUser({ formData, name, user }) {
  try {
    const files = formData.getAll("files");

    if (!files.length) {
      /* only name change here...*/
      await UserModel.findByIdAndUpdate(user?._id, { name });
    } else {
      /* avatar change here... */
      const [response] = await imageUploadToCloudinary(files, user?._id);
      /* upload to cloudinary -> change it in mongodb -> delete old avatar on cloudinary */
      await Promise.all([
        UserModel.findByIdAndUpdate(user?._id, {
          name,
          avatar: response?.secure_url,
          public_id: response?.public_id,
        }),
        deleteFromCloudinary(user?.public_id),
      ]);
    }
    console.log({ files, name, user });

    revalidatePath("/");
    return { message: "Update success..." };
  } catch (error) {
    return { errorMessage: error.message };
  }
}
