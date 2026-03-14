async function splitPDF(){

const { PDFDocument } = PDFLib;

const fileInput = document.getElementById("pdfInput");
const pagesInput = document.getElementById("pagesInput").value;
const status = document.getElementById("status");

if(fileInput.files.length === 0){
status.innerText = "Please upload a PDF file.";
return;
}

if(!pagesInput){
status.innerText = "Please enter page numbers.";
return;
}

status.innerText = "Processing...";

const file = fileInput.files[0];
const arrayBuffer = await file.arrayBuffer();

const pdfDoc = await PDFDocument.load(arrayBuffer);
const newPdf = await PDFDocument.create();

const pages = pagesInput.split(",");

for(let page of pages){

const index = parseInt(page.trim()) - 1;

const [copiedPage] = await newPdf.copyPages(pdfDoc,[index]);

newPdf.addPage(copiedPage);

}

const pdfBytes = await newPdf.save();

const blob = new Blob([pdfBytes],{type:"application/pdf"});

const url = URL.createObjectURL(blob);

const link = document.createElement("a");

link.href = url;
link.download = "split-pages.pdf";

link.click();

status.innerText = "PDF pages extracted successfully.";

}