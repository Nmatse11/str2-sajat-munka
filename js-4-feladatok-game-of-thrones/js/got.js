let characterList = []
const searchButton = document.querySelector(".far")
let input = document.querySelector('.input')
let searchList = []
const divPicture = document.querySelector(".divPicture")
const divInfo = document.querySelector(".info")
const divBio = document.querySelector(".bio")
const divOrg = document.querySelector(".org")
const error = document.querySelector(".notFound")

const getList = async (url = '') => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.filter(item => item.dead != true).filter(item => item.pictures != 'assets/pictures/jorah_mormont.jpg').sort((a,b) => {return a.name < b.name ? -1 : 1})
  } catch (error) {
    console.error('Error: ', error)
  }};
  
const createCharacterList = async () => {
  let list = await getList('./json/got.json');
  for (let i = 0; i< list.length; i++) {
    characterList.push(list[i])
  }
  createBoard()
  characterClick()
};

const createBoard = async () => {
  const boardDiv = document.querySelector(".board")
  for (let i = 0; i < characterList.length; i++) {
  const p = document.createElement("p")
  p.classList.add("picture")
  boardDiv.appendChild(p);
  const img = document.createElement("img");
  img.setAttribute('src', `${characterList[i].portrait}`);
  img.setAttribute('class', 'image');
  p.appendChild(img)
  const div = document.createElement("div")
  div.classList.add("name")
  div.textContent = `${characterList[i].name}`
  p.appendChild(div)
  }
}

const characterClick = () => {
  let character = document.querySelectorAll('.picture')
  for (let i = 0; i < characterList.length; i++) {
    character[i].addEventListener ('click', function () {
      error.style.display = "none"
      character.forEach(item => item.classList.remove('picture-focus'))
      character[i].classList.add('picture-focus')
      createImg(i)
      createName(i)
      createHouse(i)
      createBio(i)
      createOrg(i)
      input.value = ""
    }
    )}
};
    
const createImg = (i) => {
  const divPictureLength = document.querySelector(".divPicture").children
  if (divPictureLength.length > 0) {
    divPicture.removeChild(divPicture.childNodes[0])}
        const image = document.createElement("img");
        image.setAttribute('src', `${characterList[i].picture}`);
        image.setAttribute('class', 'charPicture');
        divPicture.appendChild(image)    
}

const createName = (i) => {
  const divInfoLength = document.querySelector(".info").children
  if (divInfoLength.length > 0) {
    let delName = document.querySelector(".name2")
    divInfo.removeChild(delName)}
      const div = document.createElement("div");
      div.classList.add("name2")
      div.textContent = `${characterList[i].name}`
      divInfo.appendChild(div)
}

const createHouse = (i) => {
  const divInfoLength = document.querySelector(".info").children
  if (divInfoLength.length > 1) {
  let delHouse = document.querySelector(".house")
   divInfo.removeChild(delHouse)}
   const div = document.createElement("div");
   div.setAttribute('class', 'house');
   divInfo.appendChild(div)    
   const image = document.createElement("img");
  if (`${characterList[i].house}`!= 'undefined')
   {image.setAttribute('src', `assets/houses`+`/${characterList[i].house}`+`.png`);}
   else {''}
   div.appendChild(image)  
}

const createBio= (i) => {
  const divBioLength = document.querySelector(".bio").children
  if (divBioLength.length > 0) {
    divBio.removeChild(divBio.childNodes[0])}
      divBio.textContent = `${characterList[i].bio}`
}

const createOrg = (i) => {
  const divOrgLength = document.querySelector(".org").children
  if (divOrgLength.length > 0) {
    divOrg.removeChild(divOrg.childNodes[0])}
    if (`${characterList[i].organization}`!= 'undefined')
    {divOrg.textContent = `Organization: `+`${characterList[i].organization}`}
    else {divOrg.textContent = ''}
}

const search = async (url = '') => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.filter(item => item.name.toLowerCase() == searchList[0])
  } catch (error) {
    console.error('Error: ', error)
  }};
  
const inputValue = () => {
  searchButton.addEventListener ('click', function () {
      searchList[0] = input.value.toLowerCase()
      searchCharacter()
})}

window.onload = () => {
  inputValue()
  createCharacterList()
}

const searchCharacter = async () => {
  let list = await search('./json/got.json');
  let character = document.querySelectorAll('.picture')
  character.forEach(item => item.classList.remove('picture-focus'))
  if (list.length != 0) {
  divPicture.textContent = ''
  for (let i = 0; i < characterList.length; i++) {
    if (character[i].childNodes[1].textContent.toLowerCase() == list[0].name.toLowerCase()) {
      error.style.display = "none"
      character[i].classList.add('picture-focus')
      createImg(i);
      createName(i);
      createHouse(i);
      createBio(i);
      createOrg(i);
    } 
  } 
} else {
  error.style.display = "block";
  divPicture.textContent = '';
  divInfo.textContent = '';
  divBio.textContent = '';
  divOrg.textContent = '';
}
input.value = ""
}

export {getList}