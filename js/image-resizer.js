function resizeImage(){

const fileInput = document.getElementById("imageInput");
const width = document.getElementById("widthInput").value;
const height = document.getElementById("heightInput").value;
const canvas = document.getElementById("canvas");
const status = document.getElementById("status");
const downloadLink = document.getElementById("downloadLink");

if(fileInput.files.length === 0){
status.innerText = "Please upload an image.";
return;
}

if(!width || !height){
status.innerText = "Please enter width and height.";
return;
}

const file = fileInput.files[0];

const reader = new FileReader();

reader.onload = function(e){

const img = new Image();

img.onload = function(){

canvas.width = width;
canvas.height = height;

const ctx = canvas.getContext("2d");

ctx.drawImage(img,0,0,width,height);

const resizedImage = canvas.toDataURL("image/jpeg");

downloadLink.href = resizedImage;
downloadLink.download = "resized-image.jpg";
downloadLink.style.display = "inline-block";

status.innerText = "Image resized successfully.";

};

img.src = e.target.result;

};

reader.readAsDataURL(file);

}