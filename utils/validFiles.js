export const validFiles = (file) => {
  const imgTypes = ["image/jpeg", "image/png"];

  /* 2 criteria - only jpeg and png, and less than 1mb file size */

  if (!imgTypes.includes(file.type)) {
    return {
      status: "error",
      errorMessage: `Incorrect Image format - only jpeg and png files`,
      title: file.name,
      imgUrl: URL.createObjectURL(file),
    };
  }

  if (file.size > 1024 * 1024) {
    return {
      status: "error",
      errorMessage: `Image size is large than 1MB`,
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
