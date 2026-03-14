function compressImage(){
  let input = document.getElementById("imgInput").files[0];
  if(!input){ alert("Select an image"); return; }

  let reader = new FileReader();
  reader.onload = function(e){
    let img = new Image();
    img.src = e.target.result;

    img.onload = function(){
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      let scale = 0.5; // reduce to 50%
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      ctx.drawImage(img,0,0,canvas.width,canvas.height);
      let compressed = canvas.toDataURL("image/jpeg",0.7);
      let resultDiv = document.getElementById("compressedResult");
      resultDiv.innerHTML = `<img src="${compressed}" style="max-width:100%"><a href="${compressed}" download="compressed.jpg" class="btn-secondary">Download</a>`;
    }
  }
  reader.readAsDataURL(input);
}