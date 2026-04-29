function convertImage() {

  const fileInput = document.getElementById("imageInput");
  const format = document.getElementById("formatSelect").value;
  const canvas = document.getElementById("canvas");
  const status = document.getElementById("status");
  const downloadLink = document.getElementById("downloadLink");

  if (!fileInput.files.length) {
    status.innerText = "Please upload an image.";
    return;
  }

  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {

    const img = new Image();

    img.onload = function () {

      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      // ✅ SHOW CANVAS (FIX)
      canvas.style.display = "block";

      let converted;

      try {
        converted = canvas.toDataURL(format, 0.9);

        if (format === "image/webp" && !converted.startsWith("data:image/webp")) {
          throw new Error("WEBP not supported");
        }

      } catch (err) {
        status.innerText = "WEBP not supported in this browser. Using PNG instead.";
        converted = canvas.toDataURL("image/png");
      }

      downloadLink.href = converted;

      if (format === "image/png") downloadLink.download = "converted-image.png";
      else if (format === "image/jpeg") downloadLink.download = "converted-image.jpg";
      else if (format === "image/webp") downloadLink.download = "converted-image.webp";

      downloadLink.style.display = "inline-block";

      status.innerText = "Image converted successfully.";
    };

    img.onerror = function () {
      status.innerText = "Error loading image.";
    };

    img.src = e.target.result;
  };

  reader.readAsDataURL(file);
}
