let engTexts = []
let hunTexts = []
const engBtn = document.querySelector(".eng");
const hunBtn = document.querySelector(".hun");
let textPlace = document.querySelectorAll(".text");
let placeholderPlace = document.querySelectorAll(".textPlaceholder");
let submitPlace = document.querySelector("#submit");
localStorage.setItem('id', 0)


const getLanguage = async (url = '') => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data
  } catch (error) {
    console.error('Error: ', error)
  }};
  
const createTextsList = async () => {
  let engLang = await getLanguage('./assets/json/eng.json');
  for (let i = 0; i< engLang.length; i++) {
    engTexts.push(engLang[i])
  }
  let hunLang = await getLanguage('./assets/json/hun.json');
  for (let i = 0; i< hunLang.length; i++) {
    hunTexts.push(hunLang[i])
  }
};

const engClick = () => {
  engBtn.addEventListener ('click', function () {
    localStorage.setItem('id', 0)
    langChange();
  })
}


const hunClick = () => {
  hunBtn.addEventListener ('click', function () {
    localStorage.setItem('id', 1)
    langChange();
  })
}


const langChange = () => {
  if (localStorage.getItem('id') == 1) {
  for (let i = 0; i< textPlace.length; i++) {
    textPlace[i].textContent = `${hunTexts[i].text}`}
  for (let i = 0; i< placeholderPlace.length; i++) {
    placeholderPlace[i].setAttribute('placeholder', `${hunTexts[i+10].text}`)}
  submit.setAttribute('value', `${hunTexts[13].text}`)
  }
  if (localStorage.getItem('id') == 0) {
    for (let i = 0; i< textPlace.length; i++) {
      textPlace[i].textContent = `${engTexts[i].text}`
    }
    for (let i = 0; i< placeholderPlace.length; i++) {
      placeholderPlace[i].setAttribute('placeholder', `${engTexts[i+10].text}`)}
    submit.setAttribute('value', `${engTexts[13].text}`)
    }
}

createTextsList();
engClick();
hunClick();