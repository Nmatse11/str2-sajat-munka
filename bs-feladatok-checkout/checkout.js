import hunStates from "/hungary-states.js";
import usaStates from "/usa-states.js";

const state = document.querySelector('.state')
const country = document.querySelector('.choose')

const countrySelected = () => {
country.addEventListener('change', function() {
  deleteOptions()
  if (country.value === "USA") {
    createUSAOptions();
  } else if (country.value === "Hungary") {
    createHunOptions();
  }
})
}

const deleteOptions = () => {
  while (state.firstChild) {
    state.removeChild(state.firstChild)
  }
  const startOption = document.createElement("option");
  startOption.addAttribute = "selected";
  startOption.textContent = "Choose..."
  state.appendChild(startOption)
}

const createHunOptions = () => {
  for (let i = 0; i < hunStates.length; i++) {
    const option = document.createElement("option");
    option.setAttribute('value', hunStates[i]);
    option.textContent = hunStates[i];
    state.appendChild(option);
  }
};

const createUSAOptions = () => {
  for (let i = 0; i < usaStates.length; i++) {
    const option = document.createElement("option");
    option.setAttribute('value', usaStates[i]);
    option.textContent = usaStates[i];
    state.appendChild(option);
  }
};



countrySelected();



