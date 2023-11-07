"use server";

import getServerUser from "./getServerUser";
import { Types } from "mongoose";

export async function generateImagesPipeline({ match, sort, limit }) {
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
      $lookup: {
        from: "users",
        let: { user_id: "$user" },
        pipeline: [
          { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
          { $project: { name: 1, avatar: 1 } },
        ],
        as: "user",
      },
    },
    { $unwind: "$user" }, // deconstruct array here
    {
      // new fields
      $addFields: {
        myUserId: userId,
        total_favorite: { $size: "$favorite_users" },
        isFavorite: {
          $cond: [{ $in: [userId, "$favorite_users"] }, true, false],
        },
      },
    },
    {
      $project: {
        favorite_users: 0, // exclude
      },
    },
  ];

  return base_pipeline;
}
