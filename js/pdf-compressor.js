async function compressPDF(){

const { PDFDocument } = PDFLib;

const input = document.getElementById("pdfInput");
const status = document.getElementById("status");

if(input.files.length === 0){
status.innerText = "Please upload a PDF file.";
return;
}

status.innerText = "Compressing PDF...";

const file = input.files[0];

const arrayBuffer = await file.arrayBuffer();

const pdfDoc = await PDFDocument.load(arrayBuffer);

const compressedPdfBytes = await pdfDoc.save({
useObjectStreams: true
});

const blob = new Blob([compressedPdfBytes],{type:"application/pdf"});

const url = URL.createObjectURL(blob);

const link = document.createElement("a");

link.href = url;
link.download = "compressed.pdf";

link.click();

status.innerText = "PDF compressed successfully!";

}