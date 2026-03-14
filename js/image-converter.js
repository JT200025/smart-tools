function convertImage(){

const fileInput = document.getElementById("imageInput");
const format = document.getElementById("formatSelect").value;
const canvas = document.getElementById("canvas");
const status = document.getElementById("status");
const downloadLink = document.getElementById("downloadLink");

if(fileInput.files.length === 0){
status.innerText = "Please upload an image.";
return;
}

const file = fileInput.files[0];

const reader = new FileReader();

reader.onload = function(e){

const img = new Image();

img.onload = function(){

canvas.width = img.width;
canvas.height = img.height;

const ctx = canvas.getContext("2d");

ctx.drawImage(img,0,0);

const converted = canvas.toDataURL(format);

downloadLink.href = converted;

if(format === "image/png") downloadLink.download = "converted-image.png";
if(format === "image/jpeg") downloadLink.download = "converted-image.jpg";
if(format === "image/webp") downloadLink.download = "converted-image.webp";

downloadLink.style.display = "inline-block";

status.innerText = "Image converted successfully.";

};

img.src = e.target.result;

};

reader.readAsDataURL(file);

}