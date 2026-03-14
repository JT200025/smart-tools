function convertTime(){

const zone = document.getElementById("timezone").value;

const time = new Date().toLocaleString("en-US",{timeZone: zone});

document.getElementById("timeResult").textContent = "Current time: " + time;

}