const arrow = document.querySelector('.chartToPin');
const charts = document.querySelector('.charts');
const pins = document.querySelector('.pins');

arrow.addEventListener('click', () => {
  arrow.classList.toggle('chartToPinActive');
  charts.classList.toggle('arrowTransform');
  pins.classList.toggle('pinsActive');
});
