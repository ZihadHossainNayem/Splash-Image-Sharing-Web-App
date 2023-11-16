import { Types } from "mongoose";
/* users match */

export function generateUsersMatch(query) {
  /* Extract page and next parameters from the query object */
  const page = query?.page;
  const next = query?.next;
  const id = query?.id;

  /* Create pagination conditions based on _id and updatedAt fields */
  const paginate_id = {
    _id: next ? { $lt: new Types.ObjectId(next) } : { $exists: true },
  };
  const paginate_updatedAt = {
    updatedAt: next ? { $lt: new Date(next) } : { $exists: true },
  };

  if (page === "following")
    return { followers: new Types.ObjectId(id), ...paginate_updatedAt };

  if (page === "follower")
    return { followings: new Types.ObjectId(id), ...paginate_updatedAt };

  /* search users */
  if (page === "users") return paginate_id;
}
