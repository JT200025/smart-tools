async function mergePDF(){

const { PDFDocument } = PDFLib;

const files = document.getElementById("pdfFiles").files;
const status = document.getElementById("status");

if(files.length < 2){
status.innerText = "Please select at least 2 PDF files.";
return;
}

status.innerText = "Merging PDFs...";

const mergedPdf = await PDFDocument.create();

for(let i=0;i<files.length;i++){

const arrayBuffer = await files[i].arrayBuffer();
const pdf = await PDFDocument.load(arrayBuffer);

const pages = await mergedPdf.copyPages(pdf,pdf.getPageIndices());

pages.forEach((page)=>{
mergedPdf.addPage(page);
});

}

const mergedBytes = await mergedPdf.save();

const blob = new Blob([mergedBytes],{type:"application/pdf"});
const url = URL.createObjectURL(blob);

const link = document.createElement("a");
link.href = url;
link.download = "merged.pdf";
link.click();

status.innerText = "PDF merged successfully!";
}