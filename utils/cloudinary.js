import path from "path";
import fs from "fs/promises";
import os from "os";
import cloudinary from "cloudinary";

/* cloudify configuration */
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export async function saveImagesToLocal(files) {
  /* array of promises */
  const buffersPromise = files.map((file) =>
    file.arrayBuffer().then((data) => {
      /* array buffer to a buffer object */
      const buffer = Buffer.from(data);
      /* random unique name for the file */
      const name = crypto.randomUUID();
      /* extract file extension */
      const extension = file.type.split("/")[1];
      /* temporary directory path */
      const tempDir = os.tmpdir();
      /* complete file path in the temporary folder */
      const uploadDir = path.join(tempDir, `${name}.${extension}`);

      /* write buffer data to the file path */
      fs.writeFile(uploadDir, buffer);
      return { filepath: uploadDir };
    })
  );
  return await Promise.all(buffersPromise);
}

export async function imageUploadToCloudinary(files, userId) {
  /* save images to a temp folder */
  const newFiles = await saveImagesToLocal(files);

  /* upload to cloudinary after saving the images to local temp folder */
  const imagesPromise = newFiles.map((file) =>
    cloudinary.v2.uploader.upload(file.filepath, {
      folder: `splash_image/${userId}`,
    })
  );
  const results = await Promise.all(imagesPromise);

  /* remove images from temp folder after uploading to cloudinary */
  newFiles.map((file) => fs.unlink(file.filepath));
  return results;
}
