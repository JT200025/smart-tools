function generateUUID(){

const uuid = crypto.randomUUID();

document.getElementById("uuidResult").textContent = uuid;

}