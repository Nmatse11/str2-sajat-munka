let calculator = [];
const zeroButton = document.querySelector('.zero');
const oneButton = document.querySelector('.one');
const twoButton = document.querySelector('.two');
const threeButton = document.querySelector('.three');
const fourButton = document.querySelector('.four');
const fiveButton = document.querySelector('.five');
const sixButton = document.querySelector('.six');
const sevenButton = document.querySelector('.seven');
const eightButton = document.querySelector('.eight');
const nineButton = document.querySelector('.nine');
const dotButton = document.querySelector('.dot');
const sumButton = document.querySelector('.sum');
const subButton = document.querySelector('.sub');
const multiButton = document.querySelector('.multi');
const diviButton = document.querySelector('.divi');
const clearButton = document.querySelector('.clear');
const amountButton = document.querySelector('.amount');
const calcImput = document.querySelector('.calculation');
const buttons = [zeroButton, oneButton, twoButton, threeButton, fourButton, fiveButton, sixButton, sevenButton, eightButton, nineButton, dotButton, sumButton, subButton, multiButton, diviButton];
const zero = 0;
const one = 1;
const two = 2;
const three = 3;
const four = 4;
const five = 5;
const six = 6;
const seven = 7;
const eight = 8;
const nine = 9;
const dot = '.';
const sum = '+';
const sub = '-';
const multi = '*';
const divi = '/';
const values = [zero, one, two, three, four, five, six, seven, eight, nine, dot, sum, sub, multi, divi];

const clickHandler = () => {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', () => {
      calculator.push(buttons[i].textContent)
      calcImput.textContent = calculator.join("")
    clearButton.addEventListener('click', () => {
      calcImput.textContent = 0
      calculator = []})
    amountButton.addEventListener('click', () => {
      calcImput.textContent = addbits(calculator.join(""))
    if (calcImput.textContent == "NaN") {calcImput.textContent = "ERROR"}}
      )
    })
    }
}

clickHandler()

const addbits = (string) => {
  string = string.match(/[x ÷ + -]*(\.\d+|\d+(\.\d+)?)/g) || []
  total = parseFloat(string.shift())
  for (let j = 0; j < string.length; j++) {
    if (string[j].startsWith('+') == true) {
      total = total + parseFloat(string[j].substring(1))
    }
    if (string[j].startsWith('-') == true) {
        total = total - parseFloat(string[j].substring(1))
    }
    if (string[j].startsWith('x') == true) {
        total = total * parseFloat(string[j].substring(1))
    }
    if (string[j].startsWith('÷') == true) {
      total = total / parseFloat(string[j].substring(1))
    }
    if (string[j].startsWith('-+') == true) {
      total = "NaN"
    }
    if (string[j].startsWith('+-') == true) {
        total = "NaN"
    }
    if (string[j].startsWith('++') == true) {
      total = "NaN"
    }
    if (string[j].startsWith('--') == true) {
      total = "NaN"
    }
}
return total
}



  