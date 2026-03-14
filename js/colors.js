function generateColors(){
  let palette = document.getElementById("colorResult");
  palette.innerHTML = "";
  for(let i=0;i<5;i++){
    let color = "#"+Math.floor(Math.random()*16777215).toString(16);
    let div = document.createElement("div");
    div.style.background=color;
    div.style.width="100px";
    div.style.height="100px";
    div.style.borderRadius="8px";
    div.title=color;
    palette.appendChild(div);
  }
}