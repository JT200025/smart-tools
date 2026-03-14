async function convertCurrency(){

const amount = document.getElementById("amount").value;
const from = document.getElementById("from").value;
const to = document.getElementById("to").value;

const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);

const data = await response.json();

const rate = data.rates[to];

const result = amount * rate;

document.getElementById("currencyResult").textContent =
amount + " " + from + " = " + result.toFixed(2) + " " + to;

}