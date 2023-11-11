"use server";

import getServerUser from "./getServerUser";
import { Types } from "mongoose";

export async function generateUsersPipeline({ match, sort, limit }) {
  const user = await getServerUser();
  const userId = user ? new Types.ObjectId(user?._id) : undefined;

  const base_pipeline = [
    {
      $sort:
        sort === "_id"
          ? { _id: -1 }
          : { updatedAt: -1 } /* sort before match */,
    },
    { $match: match } /* finding match */,
    {
      $limit: limit /* limit after match */,
    },
    {
      // new fields
      $addFields: {
        myUserId: userId,
        isFollowing: {
          $cond: [{ $in: [userId, "$followers"] }, true, false],
        },
      },
    },
    {
      $project: {
        followers: 0,
        followings: 0,
      },
    },
  ];

  return base_pipeline;
}
