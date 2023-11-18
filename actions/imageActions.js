"use server";

import ImageModel from "@/models/imageModel";
import {
  deleteFromCloudinary,
  imageUploadToCloudinary,
} from "@/utils/cloudinary";
import { dynamicBlurDataUrl } from "@/utils/dynamicBlurDataUrlGenerator";
import { generateImagesMatch } from "@/utils/generateImagesMatch";
import {
  generateImagesCountPipeline,
  generateImagesPipeline,
} from "@/utils/generateImagesPipeline";
import getServerUser from "@/utils/getServerUser";
import { nextCursor } from "@/utils/nextCursor";
import { slugify } from "@/utils/slugify";
import { revalidatePath } from "next/cache";

/* function for uploadImage action */
export async function uploadImages(formData, filesUpload) {
  try {
    /* get authenticated user from the server */
    const user = await getServerUser();
    if (!user) throw new Error("Unauthorized!");
    /* extract files from formData */
    const files = formData.getAll("files");

    /* upload images to cloudinary here...*/
    const images = await imageUploadToCloudinary(files, user?._id);
    /* generate a dynamic blur when images are loading */
    const blurDataPromise = images.map((image) =>
      dynamicBlurDataUrl(image.secure_url)
    );
    const blurData = await Promise.all(blurDataPromise);

    /* create new image object with relevant data */
    const newImages = images.map((image, index) => ({
      user: user?._id,
      public_id: image.public_id,
      imgUrl: image.secure_url,
      title: filesUpload[index].title,
      tags: filesUpload[index].tags,
      slug: slugify(filesUpload[index].title),
      imgName: `${slugify(filesUpload[index].title)}.${image.format}`,
      public: filesUpload[index].public,
      blurHash: blurData[index],
    }));

    /* insert new images into the mongoDB database */
    await ImageModel.insertMany(newImages);

    /* revalidate the home page to reflect the changes */
    revalidatePath("/");
    return { message: "Upload Successfully!" };
  } catch (error) {
    return { errorMessage: error.message };
  }
}

/* function for getting image action */

export async function getImages(query) {
  try {
    /* extract sort and limit parameter from query */
    const sort = query?.sort || "_id";
    const limit = query?.limit * 1 || 25;

    const search = query?.search;

    const match = generateImagesMatch(query);

    const pipeline = await generateImagesPipeline({
      match,
      limit,
      sort,
      search,
    });

    const images = JSON.parse(
      JSON.stringify(await ImageModel.aggregate(pipeline))
    );

    /* calculate the next cursor for pagination based on retrieved image, sort ,limit */
    const next_cursor = nextCursor({ data: images, sort, limit });

    return { data: images, next_cursor };
  } catch (error) {
    return { errorMessage: error.message };
  }
}

/* function for favorite image status in mongoDB*/

export async function favoriteImage({ myUserId, _id, isFavorite }) {
  try {
    if (isFavorite) {
      /* if favorite, remove the user id from the favorite_users array */
      await ImageModel.findByIdAndUpdate(_id, {
        $pull: { favorite_users: myUserId },
      });
    } else {
      /* If it's not a favorite, add the user id to the favorite_users array */
      await ImageModel.findByIdAndUpdate(_id, {
        $push: { favorite_users: myUserId },
      });
    }
    revalidatePath("/");
    return { message: "Favorite success.." };
  } catch (error) {
    return { errorMessage: error.message };
  }
}

/* function for image count */

export async function getImagesCount(query) {
  try {
    const search = query?.search;
    const match = generateImagesMatch(query);

    const pipeline = await generateImagesCountPipeline({ match, search });
    console.log(pipeline);
    const [result] = JSON.parse(
      JSON.stringify(await ImageModel.aggregate(pipeline))
    );
    console.log(result);

    return result?.total || 0;
  } catch (error) {
    return { errorMessage: error.message };
  }
}

/* function for update or edit in mongoDB*/

export async function updateImage(image) {
  try {
    await ImageModel.findByIdAndUpdate(image?._id, {
      title: image?.title,
      tags: image?.tags,
      public: image?.public,
    });

    revalidatePath("/");
    return { message: "Update success.." };
  } catch (error) {
    return { errorMessage: error.message };
  }
}

/* function for delete in mongoDB*/

export async function deleteImage({ _id, public_id }) {
  try {
    await Promise.all([
      ImageModel.findByIdAndDelete(_id),
      deleteFromCloudinary(public_id),
    ]);

    revalidatePath("/");
    return { message: "Update success.." };
  } catch (error) {
    return { errorMessage: error.message };
  }
}

/* function for getting image by id*/

export async function getImageById(id) {
  try {
    const [myUser, image] = await Promise.all([
      getServerUser(),
      ImageModel.findById(id).populate("user", "name avatar"),
    ]);
    console.log({ myUser, image });

    if (!image) throw new Error("Image does not exist!");

    const newImage = {
      ...image._doc,
      isFavorite: image.favorite_users.includes(myUser?._id),
      total_favorite: image.favorite_users.length,
      favorite_users: [],
      myUserId: myUser?._id,
    };
    console.log(newImage);

    return { data: JSON.parse(JSON.stringify(newImage)) };
  } catch (error) {
    return { errorMessage: error.message };
  }
}
