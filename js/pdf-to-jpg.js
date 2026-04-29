async function convertPDF() {

  const input = document.getElementById("pdfInput");
  const status = document.getElementById("status");
  const output = document.getElementById("imageOutput");

  output.innerHTML = "";

  if (!input.files.length) {
    status.innerText = "Please upload a PDF file.";
    return;
  }

  status.innerText = "Converting...";

  const file = input.files[0];
  const arrayBuffer = await file.arrayBuffer();

  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  for (let i = 1; i <= pdf.numPages; i++) {

    const page = await pdf.getPage(i);

    const viewport = page.getViewport({ scale: 1.5 });

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({
      canvasContext: context,
      viewport: viewport
    }).promise;

    const imageURL = canvas.toDataURL("image/jpeg", 0.9);

    // Create image
    const img = document.createElement("img");
    img.src = imageURL;

    // Create download button
    const link = document.createElement("a");
    link.href = imageURL;
    link.download = `page-${i}.jpg`;
    link.className = "download-btn";
    link.innerText = "Download Image";

    // Wrap
    const box = document.createElement("div");
    box.className = "image-box";

    box.appendChild(img);
    box.appendChild(link);

    output.appendChild(box);
  }

  status.innerText = "Conversion completed!";
}
