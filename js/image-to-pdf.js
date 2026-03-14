function convertToPDF(){

const fileInput = document.getElementById("imageInput");
const status = document.getElementById("status");

if(fileInput.files.length === 0){
status.textContent = "Please select an image first.";
return;
}

const file = fileInput.files[0];
const reader = new FileReader();

reader.onload = function(e){

const imgData = e.target.result;

const { jsPDF } = window.jspdf;

const pdf = new jsPDF();

const img = new Image();

img.onload = function(){

const width = pdf.internal.pageSize.getWidth();
const height = (img.height * width) / img.width;

pdf.addImage(imgData, "JPEG", 0, 0, width, height);

pdf.save("converted.pdf");

status.textContent = "PDF downloaded successfully.";

};

img.src = imgData;

};

reader.readAsDataURL(file);

}