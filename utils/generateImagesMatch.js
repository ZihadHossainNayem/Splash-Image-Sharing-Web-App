import { Types } from "mongoose";
/* image match */

export function generateImagesMatch(query) {
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

  /*  Return an object with specific properties based on the requested page, including a user ObjectId and additional properties */

  if (page === "public")
    return { public: true, user: new Types.ObjectId(id), ...paginate_id };

  if (page === "private")
    return { public: false, user: new Types.ObjectId(id), ...paginate_id };

  if (page === "favorite")
    return {
      favorite_users: new Types.ObjectId(id),
      ...paginate_updatedAt,
    };

  /* If the page is "home", construct and return the match query object */
  if (page === "home") return { public: true, ...paginate_id };
}
