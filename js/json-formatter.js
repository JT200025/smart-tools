function formatJSON() {

let input = document.getElementById("jsonInput").value;
let output = document.getElementById("jsonOutput");

try {

let parsed = JSON.parse(input);

let formatted = JSON.stringify(parsed, null, 4);

output.textContent = formatted;

}
catch (error) {

output.textContent = "Invalid JSON format";

}

}

function clearJSON(){

document.getElementById("jsonInput").value = "";
document.getElementById("jsonOutput").textContent = "";

}