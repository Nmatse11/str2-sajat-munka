const navbar = document.querySelector('.navbar');
const link = document.querySelector('.link');
const startLinks = document.querySelectorAll('.smooth');

$('[data-toggle="tooltip"]').tooltip()

window.onscroll = () => {
 if (screen.width > 768) {
    if (window.scrollY > 0) {
      for (let i = 0; i < startLinks.length; i++) {
        startLinks[i].classList.remove('smooth')
        startLinks[i].classList.add('smooth-active')}
        link.classList.remove('link');
        link.classList.add('link-active');
        navbar.classList.remove('nav');
        navbar.classList.add('nav-active');
    } else {
      navbar.classList.remove('nav-active');
      navbar.classList.add('nav');
      link.classList.remove('link-active');
      link.classList.add('link');
      for (let i = 0; i < startLinks.length; i++) {
        startLinks[i].classList.remove('smooth-active')
        startLinks[i].classList.add('smooth')
    }
  }}
  else {
    mobilMenu()
  }
};

const mobilMenu = () => {
    for (let i = 0; i < startLinks.length; i++) {
      startLinks[i].classList.remove('smooth')
      startLinks[i].classList.add('smooth-active')}
      navbar.classList.remove('nav');
      navbar.classList.add('nav-active');
      link.classList.remove('link-active');
      link.classList.add('link');
}

const desktopMenu = () => {
  for (let i = 0; i < startLinks.length; i++) {
    startLinks[i].classList.remove('smooth-active')
    startLinks[i].classList.add('smooth')}
    navbar.classList.remove('nav-active');
    navbar.classList.add('nav');
    link.classList.add('link');
}

window.onload = () => {
  if (screen.width < 768) {
  mobilMenu()} else {desktopMenu()}
}  
