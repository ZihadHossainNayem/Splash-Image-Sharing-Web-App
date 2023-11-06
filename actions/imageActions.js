"use server";

import ImageModel from "@/models/imageModel";
import { imageUploadToCloudinary } from "@/utils/cloudinary";
import { dynamicBlurDataUrl } from "@/utils/dynamicBlurDataUrlGenerator";
import { generateImagesMatch } from "@/utils/generateImagesMatch";
import { generateImagesPipeline } from "@/utils/generateImagesPipeline";
import getServerUser from "@/utils/getServerUser";
import { slugify } from "@/utils/slugify";
import { revalidatePath } from "next/cache";

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

export async function getImages(query) {
  try {
    const match = generateImagesMatch(query);

    const pipeline = await generateImagesPipeline({ match });

    const images = JSON.parse(
      JSON.stringify(await ImageModel.aggregate(pipeline))
    );
    return { data: images };
  } catch (error) {
    return { errorMessage: error.message };
  }
}
