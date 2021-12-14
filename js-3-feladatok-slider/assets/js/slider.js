'use strict';
import {images, caption} from "./elements.js";

const slider = document.querySelector('.slider')
const left = document.querySelector('.leftBtn')
const right = document.querySelector('.rightBtn')
const sliderManager = document.querySelector('.sliderManager')
let index = 0
let interval

const imgHeight = (value) => {
  const image = document.querySelectorAll('.image')
  for (let i = 0; i < image.length; i++) {
    image[i].style.height = value
  }
}
const addVisibleAndHiddenProperty = () => {
  slider.children[2].classList.add("visible")
  for (let i = 3; i < slider.children.length; i++) {
    slider.children[i].classList.add("hidden")
  }
}

const createSliderImages = () => {
  for (let i = 0; i < images.length; i++) {
      const div = document.createElement("div")
      div.classList.add("images")
      slider.appendChild(div)
        const div2 = document.createElement("div")
        div2.classList.add("listNumber")
        div2.textContent = i+1 + " / " + images.length
        div.appendChild(div2);
          const img = document.createElement("img");
          img.setAttribute('src', `${images[i]}`);
          img.setAttribute('class', 'image');
          div.appendChild(img)
            const div3 = document.createElement("div")
            div3.classList.add("caption")
            div3.textContent = `${caption[i]}`
            div.appendChild(div3);
}
addVisibleAndHiddenProperty()
imgHeight('30vw')
}

const addActiveClassToDot = () => {
  const dots = document.querySelectorAll('.circle')
    dots[0].classList.add('active')
}

const createDots = () => {
  for (let i = 0; i < images.length; i++) {
    const span = document.createElement("span")
    span.classList.add("dot")
    span.innerHTML = '<i class="fas fa-circle circle"></i>'
    sliderManager.appendChild(span)
  }
  addActiveClassToDot()
}

const dotClick = () => {
  const images = document.querySelectorAll('.images')
  const dots = document.querySelectorAll('.circle')
  for (let k = 0; k < dots.length; k++) {
    dots[k].addEventListener('click', function() {
      clearInterval(interval)
      for (let i = 0; i < dots.length; i++) {
        images[i].classList.remove('visible')
        images[i].classList.add('hidden')
        dots[i].classList.remove('active')
      }
      images[k].classList.remove('hidden')
      images[k].classList.add('visible')
      index = k
      dots[index].classList.add('active')
      automaticSlider()
    })
  }
}

const leftClick = () => {
  const images = document.querySelectorAll('.images')
  const dots = document.querySelectorAll('.circle')
  left.addEventListener('click', function() {
      clearInterval(interval)
      for (let i = 0; i < images.length; i++) {
        images[i].classList.remove('visible')
        images[i].classList.add('hidden')
        dots[i].classList.remove('active')
      }
      if (index == 0) {
        index = images.length-1
      } else {
        index = index-1
      }
      dots[index].classList.add('active')
      images[index].classList.remove('hidden')
      images[index].classList.add('visible')
      automaticSlider()
  })
}

const rightClick = () => {
  const images = document.querySelectorAll('.images')
  const dots = document.querySelectorAll('.circle')
  right.addEventListener('click', function() {
      clearInterval(interval)
      for (let i = 0; i < images.length; i++) {
        images[i].classList.remove('visible')
        images[i].classList.add('hidden')
        dots[i].classList.remove('active')
      }
      if (index == images.length-1) {
        index = 0
      } else {
        index = index+1
      }
      dots[index].classList.add('active')
      images[index].classList.remove('hidden')
      images[index].classList.add('visible')
      automaticSlider()
  })
}

const automaticSlider = () => {
  const images = document.querySelectorAll('.images')
  const dots = document.querySelectorAll('.circle')
  interval = setInterval(function(){
    for (let i = 0; i < dots.length; i++) {
      images[i].classList.remove('visible')
      images[i].classList.add('hidden')
      dots[i].classList.remove('active')
    }
  if (index == 3) {
    index = 0
  } else {
    index = index+1
  }
  dots[index].classList.add('active')
  images[index].classList.remove('hidden')
  images[index].classList.add('visible')
}, 4000)
}

window.onload = () => {
  createSliderImages()
  createDots()
  dotClick()
  leftClick()
  rightClick()
  automaticSlider()
}