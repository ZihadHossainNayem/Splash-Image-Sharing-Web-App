export const slugify = (str) => {
  return (
    str
      /* lowercase */
      .toLowerCase()
      /* remove white space */
      .trim()
      /* Replace any characters that are not alphanumeric, whitespace, or hyphen with an empty string */
      .replace(/[^\w\s-]/g, "")
      // Replace sequences of whitespace or underscores with a single hyphen
      .replace(/[\s_-]+/g, " ")
      // Remove any leading or trailing hyphens
      .replace(/^-+|-+$/g, "")
  );
};
