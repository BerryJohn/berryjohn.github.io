const navBar = document.querySelector('nav');

window.addEventListener('scroll', () => {
    if (window.pageYOffset >= 100 && !navBar.classList.contains('menuScrolled'))
        navBar.classList.toggle('menuScrolled');
    if (window.pageYOffset < 100 && navBar.classList.contains('menuScrolled'))
        navBar.classList.toggle('menuScrolled');
});

const hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', () => {
    navBar.classList.toggle('rwdMenuOpen');
    hamburger.classList.toggle('hamburgerActive');
});