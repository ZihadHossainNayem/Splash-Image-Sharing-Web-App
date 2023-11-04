const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "http://localhost:3000";

export async function dynamicBlurDataUrl(url) {
  // Fetch the smallest version of the image and convert it to base64
  const base64str = await fetch(
    `${baseURL}/_next/image?url=${url}&w=16&q=75`
  ).then(async (res) =>
    Buffer.from(await res.arrayBuffer()).toString("base64")
  );
  // Define an SVG image with a Gaussian blur effect applied to the base64 image data
  const blurSvg = `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 5'>
      <filter id='b' color-interpolation-filters='sRGB'>
        <feGaussianBlur stdDeviation='1'/>
      </filter>

      <image preserveAspectRatio='none' filter='url(#b)' x='0' y='0' height='100%' width='100%' href='data:image/webp;base64,${base64str}'/> 
    </svg>
  `;
  /* avif, webp */
  /*   convert a string to base64 */
  const toBase64 = (str) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);
  /* return the data URL of the SVG image with blur effect applied */
  return `data:image/svg+xml;base64,${toBase64(blurSvg)}`;
}
