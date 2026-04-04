let uploadedImage = null;

document.getElementById("imageInput").addEventListener("change", function(e){
    const file = e.target.files[0];
    if(file){
        const reader = new FileReader();
        reader.onload = function(event){
            uploadedImage = new Image();
            uploadedImage.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
});

function generateIcon(){

    const text = document.getElementById("iconText").value || "";
    const bgColor = document.getElementById("bgColor").value;
    const gradColor = document.getElementById("gradColor").value;
    const textColor = document.getElementById("textColor").value;
    const size = parseInt(document.getElementById("size").value);
    const shape = document.getElementById("shape").value;

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = size;
    canvas.height = size;

    // CLEAR
    ctx.clearRect(0,0,size,size);

    // SHAPE
    ctx.beginPath();

    if(shape === "circle"){
        ctx.arc(size/2, size/2, size/2, 0, Math.PI*2);
    } else if(shape === "rounded"){
        let r = size * 0.2;
        ctx.moveTo(r,0);
        ctx.lineTo(size-r,0);
        ctx.quadraticCurveTo(size,0,size,r);
        ctx.lineTo(size,size-r);
        ctx.quadraticCurveTo(size,size,size-r,size);
        ctx.lineTo(r,size);
        ctx.quadraticCurveTo(0,size,0,size-r);
        ctx.lineTo(0,r);
        ctx.quadraticCurveTo(0,0,r,0);
    } else {
        ctx.rect(0,0,size,size);
    }

    ctx.closePath();
    ctx.clip();

    // GRADIENT BG
    let gradient = ctx.createLinearGradient(0,0,size,size);
    gradient.addColorStop(0, bgColor);
    gradient.addColorStop(1, gradColor);

    ctx.fillStyle = gradient;
    ctx.fillRect(0,0,size,size);

    // IMAGE OR TEXT
    if(uploadedImage){
        ctx.drawImage(uploadedImage, 0, 0, size, size);
    } else {
        ctx.fillStyle = textColor;
        ctx.font = size/2 + "px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(text.toUpperCase(), size/2, size/2);
    }
}

function downloadPNG(){
    const canvas = document.getElementById("canvas");
    const link = document.createElement("a");
    link.download = "icon.png";
    link.href = canvas.toDataURL();
    link.click();
}

function downloadFavicon(){

    const sizes = [16,32,64,128];
    const canvas = document.getElementById("canvas");

    sizes.forEach(size=>{
        let tempCanvas = document.createElement("canvas");
        let ctx = tempCanvas.getContext("2d");

        tempCanvas.width = size;
        tempCanvas.height = size;

        ctx.drawImage(canvas, 0, 0, size, size);

        let link = document.createElement("a");
        link.download = "favicon-"+size+".png";
        link.href = tempCanvas.toDataURL();
        link.click();
    });
}