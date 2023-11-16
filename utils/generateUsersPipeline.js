"use server";

import getServerUser from "./getServerUser";
import { Types } from "mongoose";

export async function generateUsersPipeline({ match, sort, limit, search }) {
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

  /* for user search */
  const search_pipeline = [
    {
      $search: {
        index: "userSearch",
        text: {
          query: search,
          path: "name",
          fuzzy: {
            prefixLength: 3,
          },
        },
      },
    },
  ];

  if (search) return [...search_pipeline, ...base_pipeline];

  return base_pipeline;
}

/* for user count for profile menu*/

export async function generateUsersCountPipeline({ match, search }) {
  const base_pipeline = [
    { $match: match } /* finding match */,
    {
      $count: "total",
    },
  ];

  /* for user search */
  const search_pipeline = [
    {
      $search: {
        index: "usersSearch",
        text: {
          query: search,
          path: "name",
          fuzzy: {
            prefixLength: 3,
          },
        },
      },
    },
  ];

  if (search) return [...search_pipeline, ...base_pipeline];

  return base_pipeline;
}
