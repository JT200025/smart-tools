function convertUnit(){
  let val = parseFloat(document.getElementById("unitInput").value);
  let from = document.getElementById("fromUnit").value;
  let to = document.getElementById("toUnit").value;
  let result;

  if(isNaN(val)){
    document.getElementById("unitResult").innerText = "Please enter a number!";
    return;
  }

  // Distance
  if(from=="km" && to=="miles") result = val * 0.621371;
  else if(from=="miles" && to=="km") result = val / 0.621371;
  // Weight
  else if(from=="kg" && to=="lbs") result = val * 2.20462;
  else if(from=="lbs" && to=="kg") result = val / 2.20462;
  // Temperature
  else if(from=="c" && to=="f") result = (val * 9/5) + 32;
  else if(from=="f" && to=="c") result = (val -32) * 5/9;
  else result = val; // same unit

  document.getElementById("unitResult").innerText = `${val} ${from} = ${result.toFixed(2)} ${to}`;
}