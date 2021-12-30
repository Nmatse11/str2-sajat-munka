const buttons = document.querySelectorAll('.button');
const body = document.querySelector('body');

const clickHandler = () => {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener ('click', function() {
      body.style.backgroundColor = buttons[i].getAttribute('id')
    })
  }
}

clickHandler()