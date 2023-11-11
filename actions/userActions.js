"use server";

import UserModel from "@/models/userModel";
import {
  deleteFromCloudinary,
  imageUploadToCloudinary,
} from "@/utils/cloudinary";
import { generateUsersMatch } from "@/utils/generateUsersMatch";
import { generateUsersPipeline } from "@/utils/generateUsersPipeline";
import { nextCursor } from "@/utils/nextCursor";
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
      isFollowing: user?.followers.includes(myUser?._id),
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

/* function for follow user */

export async function followUser({ myUserId, _id, isFollowing }) {
  try {
    if (isFollowing) {
      /* unfollow the otherUser */
      await Promise.all([
        /* remove otherUser's from myUser's followings*/
        UserModel.findByIdAndUpdate(myUserId, {
          $pull: { followings: _id },
        }),
        /* remove myUser from otherUser's followers */
        UserModel.findByIdAndUpdate(_id, {
          $pull: { followers: myUserId },
        }),
      ]);
    } else {
      /* follow the otherUser */
      await Promise.all([
        /* add otherUser's to myUser's followings */
        UserModel.findByIdAndUpdate(myUserId, {
          $push: { followings: _id },
        }),
        /* add myUser to otherUser's followers */
        UserModel.findByIdAndUpdate(_id, {
          $push: { followers: myUserId },
        }),
      ]);
    }
    revalidatePath("/");
    return { message: "Follow success..." };
  } catch (error) {
    return { errorMessage: error.message };
  }
}

/* function for follow user */

export async function getUsers(query) {
  try {
    /* extract sort and limit parameter from query */
    const sort = query?.sort || "_id";
    const limit = query?.limit * 1 || 15;

    const match = generateUsersMatch(query);

    const pipeline = await generateUsersPipeline({ match, limit, sort });

    const users = JSON.parse(
      JSON.stringify(await UserModel.aggregate(pipeline))
    );

    // calculate the next cursor for pagination based on retrieved image, sort ,limit
    const next_cursor = nextCursor({ data: users, sort, limit });

    return { data: users, next_cursor };
  } catch (error) {
    return { errorMessage: error.message };
  }
}
