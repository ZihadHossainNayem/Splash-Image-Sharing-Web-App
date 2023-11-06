export async function handleDownloadImage(image) {
  fetch(image?.imgUrl)
    /* convert into blob object for raw data */
    .then((response) => response.blob())
    /* blob object converted into url, for download */
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = image?.imgName;
      document.body.appendChild(a);
      a.click();

      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    });
}
