let dayList = []
const bookPicture = document.querySelector(".bookPicture")
const day = document.querySelector(".day")
const text = document.querySelector(".text")
const author = document.querySelector(".author")
const title = document.querySelector(".title")
const modalPage = document.querySelector(".modal__page");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelectorAll(".close-btn")
const linkBtn = document.querySelector(".link-btn");
const aBtn = document.querySelector('.modal-footer').children[0]
const now = new Date();
const christmas = new Date("december 24, 2021")
  now.setHours(0);
  now.setMinutes(0);
  now.setSeconds(0);
  now.setMilliseconds(0);
  const untilChristmas = (christmas.getTime() - now.getTime()) / 1000 / 60 / 60 / 24;

const closeClick = () => {
   modal.classList.add("animation-close");
   setTimeout (function () {
       modal.style.display = "none";
       modalPage.style.display = "none";
       modal.classList.remove("animation-close");
   }, 1250);
   aBtn.removeAttribute("href")
  }

window.onclick = function(event) {
    if (event.target == modalPage) {
      modal.classList.add("animation-close");
      setTimeout (function () {
          modal.style.display = "none";
          modalPage.style.display = "none";
          modal.classList.remove("animation-close");
      }, 1250);
      let days = document.querySelectorAll('.picture')
          days.forEach(item => item.classList.remove('picture-focus'));
      aBtn.removeAttribute("href")
  }
  }

closeBtn.forEach (function(element) {
  element.addEventListener ('click', closeClick);
});
  


const getList = async (url = '') => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data
  } catch (error) {
    console.error('Error: ', error)
  }};
  
  const createdayList = async () => {
    let list = await getList('./json/calendar.json');
    for (let i = 0; i< list.length; i++) {
      dayList.push(list[i])
    }
    createBoard();
    dayClick();
  };

  
const createBoard = async () => {
  const boardDiv = document.querySelector(".board")
  for (let i = 0; i < dayList.length; i++) {
  const p = document.createElement("p")
  p.classList.add("picture")
  boardDiv.appendChild(p);
  const img = document.createElement("img");
  img.setAttribute('src', `${dayList[i].box}`);
  img.setAttribute('class', 'image');
  p.appendChild(img)
  }
}

const dayClick = () => {
  let days = document.querySelectorAll('.picture')
  for (let i = 0; i < dayList.length; i++) {
    days[i].addEventListener ('click', function () {
      const boardDay = `${dayList[i].date}`
      const numberOfDay = boardDay.substring(9)
      const untilDays = 24-numberOfDay
      if (untilDays >= untilChristmas) {
      days.forEach(item => item.classList.remove('picture-focus'))
      days[i].classList.add('picture-focus');
      createDay(i);
      createText(i);
      createImg(i);
      createBook(i);
      createLink(i);
      modalVisible();
    }
    }
    )}
};

const modalVisible = () => {
  modal.classList.add("animation-open");
  modal.style.display = "block";
  modalPage.style.display = "block";
  setTimeout (function () {
  modal.classList.remove("animation-open");
  }, 1500);
}
    
const createImg = (i) => {
  const bookPictureLength = document.querySelector(".bookPicture").children
  if (bookPictureLength.length > 0) {
    bookPicture.removeChild(bookPicture.childNodes[0])}
        const a = document.createElement("a");
        a.setAttribute('href', `https://www.anyacipo.hu/konyvajanlok/${dayList[i].link}`)
        a.setAttribute('target', '_blank')
        bookPicture.appendChild(a)
        const image = document.createElement("img");
        image.setAttribute('src', `./assets/pictures/${dayList[i].picture}`);
        image.setAttribute('class', 'bookPic');
        a.appendChild(image)    
}

const createDay = (i) => {
  const dayLength = document.querySelector(".day").children
  if (dayLength.length > 0) {
    let delName = document.querySelector(".name")
    day.removeChild(delName)}
      const div = document.createElement("div");
      div.classList.add("name")
      div.textContent = `${dayList[i].name}`
      day.appendChild(div)
}

const createText= (i) => {
    text.textContent = `${dayList[i].text}`
}

const createBook = (i) => {
  const authorLength = document.querySelector(".author").children
  const titleLength = document.querySelector(".title").children
  if (authorLength.length > 0) {
    authorLength.removeChild(author.childNodes[0])}
  if (titleLength.length > 0) {
    titleLength.removeChild(title.childNodes[0])}
    author.textContent = `${dayList[i].author}`
    title.textContent = `${dayList[i].title}`
}

const createLink = (i) => {
  linkBtn.addEventListener ('click', function () {
      aBtn.setAttribute('href', `https://www.anyacipo.hu/konyvajanlok/${dayList[i].link}`)
      modal.classList.remove("animation-close");
      modal.style.display = "block";
      modalPage.style.display = "block";
  })
}
  

window.onload = () => {
  createdayList();

}


export {getList}