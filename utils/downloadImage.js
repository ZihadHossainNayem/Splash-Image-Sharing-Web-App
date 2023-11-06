export async function handleDownloadImage(image) {
  fetch(image?.imgUrl)
    .then((response) => response.blob())
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
