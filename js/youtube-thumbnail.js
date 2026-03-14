function getThumbnail(){

const url = document.getElementById("videoURL").value;
const status = document.getElementById("status");
const output = document.getElementById("thumbnailOutput");

output.innerHTML = "";

if(!url){
status.innerText = "Please enter a YouTube URL.";
return;
}

let videoId = "";

if(url.includes("youtube.com")){
videoId = url.split("v=")[1];
if(videoId.includes("&")){
videoId = videoId.split("&")[0];
}
}

else if(url.includes("youtu.be")){
videoId = url.split("/").pop();
}

if(!videoId){
status.innerText = "Invalid YouTube URL.";
return;
}

const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

const img = document.createElement("img");
img.src = thumbnail;
img.style.width = "100%";
img.style.marginTop = "20px";

const link = document.createElement("a");
link.href = thumbnail;
link.download = "youtube-thumbnail.jpg";
link.innerText = "Download Thumbnail";
link.className = "btn-secondary";
link.style.display = "inline-block";
link.style.marginTop = "15px";

output.appendChild(img);
output.appendChild(link);

status.innerText = "Thumbnail ready.";

}