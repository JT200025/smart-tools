function generateRandom(){
  let min = parseInt(document.getElementById("minNum").value);
  let max = parseInt(document.getElementById("maxNum").value);
  if(isNaN(min) || isNaN(max) || min>max){ 
    document.getElementById("randomResult").innerText = "Invalid range!";
    return;
  }
  let num = Math.floor(Math.random()*(max-min+1))+min;
  document.getElementById("randomResult").innerText = `Random Number: ${num}`;
}