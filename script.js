const select = document.querySelectorAll(".currency");
const btn = document.getElementById("convert");
const clearBtn = document.getElementById("clear");
const input = document.getElementById("input");
const result = document.getElementById("result");

fetch("https://api.frankfurter.app/currencies")
  .then((data) => data.json())
  .then((data) => {
    display(data);
  });

function display(data) {
  const entries = Object.entries(data);
  for (let i = 0; i < entries.length; i++) {
    select[0].innerHTML += `<option value="${entries[i][0]}">${entries[i][1]}</option>`;
    select[1].innerHTML += `<option value="${entries[i][0]}">${entries[i][1]}</option>`;
  }
}

btn.addEventListener("click", () => {
  let currency1 = select[0].value;
  let currency2 = select[1].value;
  let value = input.value;

  if (currency1 !== currency2) {
    convert(currency1, currency2, value);
  } else {
    alert("Choose different currencies");
  }
});

function convert(currency1, currency2, value) {
  const host = "api.frankfurter.app";
  fetch(`https://${host}/latest?amount=${value}&from=${currency1}&to=${currency2}`)
    .then((val) => val.json())
    .then((val) => {
      console.log(val.rates[currency2]);
      result.value = val.rates[currency2];
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function clearInput() {
  input.value = "";
  result.value = "";
}

clearBtn.addEventListener("click", clearInput);
