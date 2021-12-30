const feetInput = document.querySelector('#feet');
const inchInput = document.querySelector('#inches');
const result = document.querySelector('#results');
const button = document.querySelector('#button');
const inputRegex = /^\d+([\.]{1}\d+)*$/;

button.addEventListener ('click', function (event) {
  event.preventDefault()
  result.textContent = ""
  if (inputRegex.test(feetInput.value) && inputRegex.test(inchInput.value)) {
    const feetConvert = parseFloat(feetInput.value)*30.48;
    const inchConvert = parseFloat(inchInput.value)*2.54;
    result.textContent = feetConvert + inchConvert + " cm";

  }
  else {
    result.textContent = "Please enter a valid number!"
  }
  feetInput.value = '';
  inchInput.value = '';
})