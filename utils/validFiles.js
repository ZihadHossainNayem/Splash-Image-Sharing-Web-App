export const validFiles = (file) => {
  const imgTypes = ["image/jpeg", "image/png"];

  /* 3 criteria - is it image?  is it jpeg and png? and is it less than 1mb? */

  if (!file.type.startsWith("image")) {
    return {
      status: "error",
      errorMessage: `This is not an image - ${file.types}`,
      title: file.name,
      imgUrl: "/placeholderImage1.jpg",
    };
  }

  if (!imgTypes.includes(file.type)) {
    return {
      status: "error",
      errorMessage: `Incorrect Image format - only jpeg and png files`,
      title: file.name,
      imgUrl: URL.createObjectURL(file),
    };
  }

  if (file.size > 2 * 1024 * 1024) {
    return {
      status: "error",
      errorMessage: `Image size is larger than 2MB`,
      title: file.name,
      imgUrl: URL.createObjectURL(file),
    };
  }

  return {
    status: "success",
    title: file.name.replace(/.(jpeg|jpg|png)$/gi, ""),
    tags: ["Nayem"],
    public: false,
    imgUrl: URL.createObjectURL(file),
    fileUpload: file,
  };
};
