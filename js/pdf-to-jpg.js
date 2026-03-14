async function convertPDF(){

const fileInput = document.getElementById("pdfInput");
const status = document.getElementById("status");
const output = document.getElementById("imageOutput");

output.innerHTML = "";

if(fileInput.files.length === 0){
status.innerText = "Please upload a PDF file.";
return;
}

status.innerText = "Converting PDF...";

const file = fileInput.files[0];
const arrayBuffer = await file.arrayBuffer();

const pdf = await pdfjsLib.getDocument({data:arrayBuffer}).promise;

for(let pageNum=1; pageNum<=pdf.numPages; pageNum++){

const page = await pdf.getPage(pageNum);

const viewport = page.getViewport({scale:2});

const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");

canvas.height = viewport.height;
canvas.width = viewport.width;

await page.render({
canvasContext:context,
viewport:viewport
}).promise;

const imgData = canvas.toDataURL("image/jpeg");

const link = document.createElement("a");
link.href = imgData;
link.download = "page-"+pageNum+".jpg";
link.innerText = "Download Page "+pageNum;

const img = document.createElement("img");
img.src = imgData;
img.style.width = "100%";
img.style.marginTop = "20px";

output.appendChild(img);
output.appendChild(link);

}

status.innerText = "Conversion complete.";

}