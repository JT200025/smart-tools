async function compressPDF() {

  const input = document.getElementById("pdfInput");
  const status = document.getElementById("status");

  if (input.files.length === 0) {
    status.innerText = "Please upload a PDF file.";
    return;
  }

  status.innerText = "Compressing PDF...";

  const file = input.files[0];

  const reader = new FileReader();

  reader.onload = async function () {

    const pdfjsLib = window['pdfjs-dist/build/pdf'];

    // Load PDF
    const pdf = await pdfjsLib.getDocument({ data: reader.result }).promise;

    const { PDFDocument } = PDFLib;
    const newPdf = await PDFDocument.create();

    // Loop pages
    for (let i = 1; i <= pdf.numPages; i++) {

      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 1 });

      // Create canvas
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // LOWER SCALE = MORE COMPRESSION
      canvas.width = viewport.width * 0.7;
      canvas.height = viewport.height * 0.7;

      await page.render({
        canvasContext: ctx,
        viewport: page.getViewport({ scale: 0.7 })
      }).promise;

      // Convert to compressed image (JPEG)
      const imgData = canvas.toDataURL("image/jpeg", 0.6);

      const jpgImage = await newPdf.embedJpg(imgData);

      const pageNew = newPdf.addPage([
        jpgImage.width,
        jpgImage.height
      ]);

      pageNew.drawImage(jpgImage, {
        x: 0,
        y: 0,
        width: jpgImage.width,
        height: jpgImage.height
      });
    }

    const pdfBytes = await newPdf.save();

    const blob = new Blob([pdfBytes], { type: "application/pdf" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "compressed.pdf";
    link.click();

    status.innerText = "PDF compressed successfully!";
  };

  reader.readAsArrayBuffer(file);
}
