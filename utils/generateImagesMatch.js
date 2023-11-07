import { Types } from "mongoose";
/* image match */

export function generateImagesMatch(query) {
  /* Extract page and next parameters from the query object */
  const page = query?.page;
  const next = query?.next;

  /* Create pagination conditions based on _id and updatedAt fields */
  const paginate_id = {
    _id: next ? { $lt: new Types.ObjectId(next) } : { $exists: true },
  };
  const paginate_updatedAt = {
    updatedAt: next ? { $lt: new Date(next) } : { $exists: true },
  };
  /* If the page is "home", construct and return the match query object */
  if (page === "home") return { public: true, ...paginate_id };
}
