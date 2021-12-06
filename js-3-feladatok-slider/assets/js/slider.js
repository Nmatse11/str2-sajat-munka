const dots = document.querySelectorAll('.circle')
const slider = document.querySelector('.slider')
const images = document.querySelectorAll('.image')
const left = document.querySelector('.leftBtn')
const right = document.querySelector('.rightBtn')
let index = 0
let interval

const imgHeight = (value) => {
  for (let i = 0; i < images.length; i++) {
    images[i].style.height = value
  }
}

const dotClick = () => {
  for (let k = 0; k < dots.length; k++) {
    dots[k].addEventListener('click', function() {
      clearInterval(interval)
      for (let i = 0; i < dots.length; i++) {
        slider.children[i].classList.remove('visible')
        slider.children[i].classList.add('hidden')
        dots[i].classList.remove('active')
      }
      slider.children[k].classList.remove('hidden')
      slider.children[k].classList.add('visible')
      index = k
      dots[index].classList.add('active')
      automaticSlider()
    })
  }
}

const leftClick = () => {
  left.addEventListener('click', function() {
      clearInterval(interval)
      for (let i = 0; i < dots.length; i++) {
        slider.children[i].classList.remove('visible')
        slider.children[i].classList.add('hidden')
        dots[i].classList.remove('active')
      }
      if (index == 0) {
        index = 3
      } else {
        index = index-1
      }
      dots[index].classList.add('active')
      slider.children[index].classList.remove('hidden')
      slider.children[index].classList.add('visible')
      automaticSlider()
  })
}

const rightClick = () => {
  right.addEventListener('click', function() {
      clearInterval(interval)
      for (let i = 0; i < dots.length; i++) {
        slider.children[i].classList.remove('visible')
        slider.children[i].classList.add('hidden')
        dots[i].classList.remove('active')
      }
      if (index == 3) {
        index = 0
      } else {
        index = index+1
      }
      dots[index].classList.add('active')
      slider.children[index].classList.remove('hidden')
      slider.children[index].classList.add('visible')
      automaticSlider()
  })
}

const automaticSlider = () => {
  interval = setInterval(function(){
    for (let i = 0; i < dots.length; i++) {
      slider.children[i].classList.remove('visible')
      slider.children[i].classList.add('hidden')
      dots[i].classList.remove('active')
    }
  if (index == 3) {
    index = 0
  } else {
    index = index+1
  }
  dots[index].classList.add('active')
  slider.children[index].classList.remove('hidden')
  slider.children[index].classList.add('visible')
}, 4000)
}

window.onload = () => {
  imgHeight('25vw')
  dotClick()
  leftClick()
  rightClick()
  automaticSlider()
}