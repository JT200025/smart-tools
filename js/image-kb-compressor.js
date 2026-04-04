let selectedFile;

document.getElementById("imageInput").addEventListener("change", function(e){
    selectedFile = e.target.files[0];
});

function quickCompress(size){
    document.getElementById("targetSize").value = size;
    compressImage();
}

function compressImage(){

    if(!selectedFile){
        alert("Please select an image");
        return;
    }

    let targetKB = parseInt(document.getElementById("targetSize").value);

    if(!targetKB){
        alert("Enter target size");
        return;
    }

    let status = document.getElementById("status");
    status.innerText = "Compressing...";

    let reader = new FileReader();

    reader.onload = function(e){

        let img = new Image();

        img.onload = function(){

            let canvas = document.getElementById("canvas");
            let ctx = canvas.getContext("2d");

            canvas.width = img.width;
            canvas.height = img.height;

            ctx.drawImage(img, 0, 0);

            let quality = 0.9;
            let targetBytes = targetKB * 1024;

            function compressLoop(){

                let dataUrl = canvas.toDataURL("image/jpeg", quality);

                let size = atob(dataUrl.split(',')[1]).length;

                if(size <= targetBytes || quality <= 0.1){

                    let link = document.getElementById("downloadLink");
                    link.href = dataUrl;
                    link.download = "compressed.jpg";
                    link.style.display = "inline-block";

                    status.innerText = "Done ✅";
                    return;
                }

                quality -= 0.05;
                setTimeout(compressLoop, 10);
            }

            compressLoop();
        };

        img.src = e.target.result;
    };

    reader.readAsDataURL(selectedFile);
}