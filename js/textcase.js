function toUpper(){
  let text = document.getElementById("caseInput").value;
  document.getElementById("caseOutput").innerText = text.toUpperCase();
}

function toLower(){
  let text = document.getElementById("caseInput").value;
  document.getElementById("caseOutput").innerText = text.toLowerCase();
}

function toTitle(){
  let text = document.getElementById("caseInput").value;
  let titled = text.toLowerCase().split(' ').map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(' ');
  document.getElementById("caseOutput").innerText = titled;
}