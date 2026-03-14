function generateQR(){

  const text = document.getElementById("qrInput").value.trim();
  const canvas = document.getElementById("qrCanvas");

  if(text === ""){
    alert("Please enter text or URL");
    return;
  }

  QRCode.toCanvas(canvas, text, {
      width:200,
      margin:2,
      color:{
        dark:"#000000",
        light:"#ffffff"
      }
  }, function (error) {
      if(error) console.error(error);
  });

}