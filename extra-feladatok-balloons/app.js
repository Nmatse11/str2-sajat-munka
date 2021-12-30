const gallery = document.querySelector('#balloon-gallery')
const endText = document.querySelector('#yay-no-balloons')
let balloonsNumber = 24
let popItNumber = balloonsNumber - 1

const generateBalloons = () => {
  for (let i = 0; i < balloonsNumber; i++) {
    const div = document.createElement('div')
    div.classList.add('balloon')
    gallery.appendChild(div)
  }
}

const balloonHover = () => {
  const balloons = document.querySelectorAll('.balloon')
  console.log(balloonsNumber)
  for (let i = 0; i < balloons.length; i++) {
    balloons[i].addEventListener("mouseover", hoverEvent)
    }
  }
  
  const hoverEvent = function(){
    this.removeEventListener("mouseover", hoverEvent)
    this.style.background = '#ededed';
    this.textContent = 'POP!';
    if (popItNumber != 0) {
      popItNumber -= 1
      console.log(popItNumber)
    }
    else {
      gallery.textContent = '';
      endText.style.display = 'block';
    }
  }

generateBalloons()
balloonHover()