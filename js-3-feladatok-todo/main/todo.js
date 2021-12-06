'use strict';

const time = document.querySelector('.time')
const now = new Date()
const today = document.querySelector('.now')
const dayName = document.querySelector('.day')
let input = document.querySelector('.add')
const submitButton = document.querySelector('.add__button')
const showButton = document.querySelector('.show')
const clearButton = document.querySelector('.clear')
const readyHidden = document.querySelector('.ready-none')
const chill = document.querySelector('.chill')
const text = document.querySelector('.text')
let toDoUl = document.querySelector('.todo-list-item')
let toDoLi = document.querySelectorAll('.todo-li')
let readyUl = document.querySelector('.ready-list-item')
let readyLi = document.querySelectorAll('.ready-li')
let toDoList = []
let readyList = []


const date = () => {
  let dateString = now.toLocaleDateString('en-US')
  return today.textContent = dateString
}

const day = () => {
  let dayString = now.toLocaleDateString('en-US', { weekday: 'long' })
  return dayName.textContent = dayString
}

const pushToDoList = () => {
    if (localStorage.todo != undefined) {
    let items = JSON.parse(localStorage.getItem('todo'))
    for (let i = 0; i < items.length; i++) {
    toDoList.push(JSON.parse(localStorage.getItem('todo'))[i])
    }
  }
}

const pushreadyList = () => {
  if (localStorage.ready != undefined) {
  let items = JSON.parse(localStorage.getItem('ready'))
  for (let i = 0; i < items.length; i++) {
  readyList.push(JSON.parse(localStorage.getItem('ready'))[i])
  }
}
}

const updateLocalStorageToDo = () => {
  if (toDoList != []) {
    localStorage.setItem('todo', JSON.stringify(toDoList))
    allFunction()
  }
}

const updateLocalStorageReady = () => {
  if (readyList != []) {
    localStorage.setItem('ready', JSON.stringify(readyList))
    allFunction()
  }
}

const refreshManagerText = () => {
  listLength()
  percent()
  empty()
}


const allFunction = () => {
  deleteToDoItem()
  deleteReadyItem()
  checkedToDoItem()
  checkedReadyItem()
}

const clickHandler = () => {
  submitButton.addEventListener ('click', function () {
    if (input.value != '') {
    chill.style.display = "none"
    text.style.visibility = "visible"
    let newValue = input.value
    input.value = '';
    toDoList.push(newValue);
    createNewToDo()
    updateLocalStorageToDo()
    refreshManagerText()
    } else {alert('Data is not valid!')}
    })
  }

const createNewItemToDo = () => {
  const input = document.createElement("input")
  input.setAttribute("type", "checkbox")
  input.setAttribute("class", "checkbox incomplete")
  const span = document.createElement("span")
  span.setAttribute("class", "list")
  const i = document.createElement("i")
  i.setAttribute("class", "fas fa-trash-alt incompleteBtn")
  const li = document.createElement("li")
  li.setAttribute("class", "todo-li")
  li.appendChild(input)
  li.appendChild(span)
  li.appendChild(i)
  toDoUl.appendChild(li)
  itemToToDoList()
}

const createNewToDo = () => {
  createNewItemToDo()
  let toDoLi = document.querySelectorAll('.todo-li')
  let animatedItem = toDoUl.children[toDoLi.length-1]
  animatedItem.classList.add("animation-newItem");
  setTimeout (function () {
    animatedItem.classList.remove("animation-newItem");
  }, 1200);
}

const createToDoList = () => {
  if (localStorage.key('todo') != null) {
  for (let j = 0; j < toDoList.length; j++) {
    createNewItemToDo()
  }
}
}

const itemToToDoList = () => {
let toDoLi = document.querySelectorAll('.todo-li')
  for (let i = 0; i < toDoLi.length; i++) {
    toDoLi[i].children[1].textContent = toDoList[i]
  }
}

const createNewReady = (value) => {
  const input = document.createElement("input")
  input.setAttribute("type", "checkbox")
  input.setAttribute("class", "checkbox check")
  const span = document.createElement("span")
  span.setAttribute("class", "list")
  span.textContent = value
  const i = document.createElement("i")
  i.setAttribute("class", "fas fa-trash-alt readyBtn")
  const li = document.createElement("li")
  li.setAttribute("class", "ready-li")
  li.appendChild(input)
  li.appendChild(span)
  li.appendChild(i)
  readyUl.appendChild(li)
  itemToReadyList()
}

const createReadyList = () => {
  if (localStorage.key('ready') != null) {
  for (let j = 0; j < readyList.length; j++) {
    const input = document.createElement("input")
    input.setAttribute("type", "checkbox")
    input.setAttribute("class", "checkbox check")
    const span = document.createElement("span")
    span.setAttribute("class", "list")
    const i = document.createElement("i")
    i.setAttribute("class", "fas fa-trash-alt readyBtn")
    const li = document.createElement("li")
    li.setAttribute("class", "ready-li")
    li.appendChild(input)
    li.appendChild(span)
    li.appendChild(i)
    readyUl.appendChild(li)
  }
  itemToReadyList()
  }
}

const itemToReadyList = () => {
  let readyLi = document.querySelectorAll('.ready-li')
  for (let i = 0; i < readyLi.length; i++) {
    readyLi[i].children[1].textContent = readyList[i]
}
}

const deleteToDoItem = () => {
  let deleteButton = document.querySelectorAll('.incompleteBtn')
  for (let i = 0; i < deleteButton.length; i++) {
    deleteButton[i].addEventListener ('click', function () {
        let value = this.parentElement.children[1].textContent
        this.parentElement.remove()
        let delIndex = toDoList.indexOf(value)
        if (delIndex >= 0) {
          toDoList.splice(delIndex, 1)
          updateLocalStorageToDo()}
          refreshManagerText()
    })
  }
}

const deleteReadyItem = () => {
  let deleteButton = document.querySelectorAll('.readyBtn')
  for (let i = 0; i < deleteButton.length; i++) {
    deleteButton[i].addEventListener ('click', function () {
      let value = this.parentElement.children[1].textContent
      this.parentElement.remove()
      let delIndex = readyList.indexOf(value)
      if (delIndex >= 0) {
          readyList.splice(delIndex, 1)
          updateLocalStorageReady()}
      refreshManagerText()
  })
  }
}
  
const checkedToDoItem = () => {
  let input = document.querySelectorAll('.incomplete')
  input.forEach (function(element) {
    element.addEventListener('change', () => {
      if (element.classList.contains('incomplete')) {
        element.classList.remove('incomplete')
        element.parentElement.classList.remove('todo-li')
        toDoUl.removeChild(element.parentElement)
        let value = element.parentElement.children[1].textContent
        checkedItemDelFromToDoList(value);
        checkedItemToReadyItem(value);
        createNewReady(value);
      }
      refreshManagerText()
      updateLocalStorageToDo()
      updateLocalStorageReady()
    })
  })
}

const checkedItemDelFromToDoList = (value) => {
  let delIndex = toDoList.indexOf(value)
  if (delIndex >= 0) {
      toDoList.splice(delIndex, 1)
    }
}

const checkedItemToReadyItem = (value) => {
    readyList.push(value);
}

const checkedReadyItem = () => {
  let input = document.querySelectorAll('.check')
  input.forEach (function(element) {
    element.addEventListener('change', () => {
      if (element.classList.contains('check')) {
        element.classList.remove('check')
        element.parentElement.classList.remove('ready-li')
        readyUl.removeChild(element.parentElement)
        let value = element.parentElement.children[1].textContent
        checkedItemDelFromReadyList(value);
        checkedItemToToDoList(value);
        createNewToDo()
      }
      refreshManagerText()
      updateLocalStorageToDo()
      updateLocalStorageReady()
    })
    })
}

const checkedItemDelFromReadyList = (value) => {
  let delIndex = readyList.indexOf(value)
  if (delIndex >= 0) {
    readyList.splice(delIndex, 1)
  }
}
  
const checkedItemToToDoList = (value) => {
    toDoList.push(value);
}

const listLength = () => {
  document.querySelector('.piece').textContent = toDoUl.children.length
}

const percent = () => {
  let a = readyUl.children.length
  let b = toDoUl.children.length
  let count = (a * 100/(a + b)).toFixed(0) + '%';
  const readyPercent = document.querySelector('.percent')
  if (count != 'NaN%') { readyPercent.textContent = count }
  else { readyPercent.textContent = 0 + '%' }
}

const showComplete = () => {
  showButton.addEventListener ('click', function () {
    if (showButton.textContent == 'Show Complete') {
    readyHidden.classList.remove('ready-none')
    readyHidden.classList.add('ready')
    showButton.textContent = 'Hide Complete'
  }
  else if (showButton.textContent == 'Hide Complete') {
    readyHidden.classList.remove('ready')
    readyHidden.classList.add('ready-none')
    showButton.textContent = 'Show Complete'
  }
  refreshManagerText()
  allFunction()
})
}

const clear = () => {
  clearButton.addEventListener ('click', function () {
    clearAll()
    percent()
  })
}


const empty = () => {
  if (toDoUl.textContent == "") {
    clearAll()
  }
  else if (readyUl.textContent == "") {
    localStorage.removeItem('ready')
  }
}

const clearAll = () => {
  chill.classList.add("animation-newItem");
  chill.style.display = "block"
  text.style.visibility = "hidden"
  setTimeout (function () {
    chill.classList.remove("animation-newItem");
  }, 1500);
  toDoList = []
  toDoUl.textContent = ""
  readyList = []
  readyUl.textContent = ""
  localStorage.clear();
}

window.onload = () => {
  day()
  date()
  pushToDoList()
  pushreadyList()
  createToDoList()
  createReadyList()
  clickHandler()
  allFunction()
  listLength()
  percent()
  clear()
  showComplete()
}



