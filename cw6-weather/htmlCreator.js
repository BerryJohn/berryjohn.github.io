class weatherHTML {
  constructor() {}
  imageSelector(icon) {
    /// https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2 ICONS
    switch (icon) {
      case '01d':
      case '01n':
        return 'sun.svg';
      case '02d':
      case '02n':
        return 'few clouds.svg';
      case '03d':
      case '03n':
      case '04d':
      case '04n':
        return 'cloud.svg';
      case '09d':
      case '09n':
      case '10d':
      case '10n':
        return 'rain.svg';
      case '13d':
      case '13n':
        return 'snow.svg';
      case '50d':
      case '50n':
        return 'mist.svg';
      case '11d':
      case '11n':
        return 'storm.svg';
    }
  }
  setTime(cityHour) {
    const dateNow = new Date();
    const timeStampUTC = dateNow.getTime() + dateNow.getTimezoneOffset() * 60 * 1000 + cityHour * 1000; // *1000 60 and cityHour because getTime() has miliseconds
    const dateUTC = new Date(timeStampUTC);
    return `${dateUTC.getHours()}`.padStart(2, '0') + `:` + `${dateUTC.getMinutes()}`.padStart(2, '0'); // padStart - leading zero
  }
  createPin(data) {
    const weatherPin = document.createElement('div');
    weatherPin.classList.add('weatherPin');
    weatherPin.innerHTML = `
    <div class="closeBtn">Remove Pin</div>
    <div class="upperBar">
      <div class="cityName"><img src="img/localization.svg" alt="Loc: " />${data.cityName}</div>
      <div class="cityHour">${this.setTime(data.cityHour)}</div>
    </div>
    <div class="middleBar">
      <div class="cityTemp"><h1>${data.cityTemp}&deg;C</h1></div>
      <span>${data.cityWeatherDesc}</span>
    </div>
    <div class="bottomBar">
      <div class="cityDetales">
        <ul>
          <li><img src="img/wind.svg" alt="Wind" />${data.cityWind} km/h</li>
          <li><img src="img/humidity.svg" alt="Humidity" />${data.cityHum}%</li>
          <li><img src="img/barometer.svg" alt="Barometer" />${data.cityPress} hPa</li>
        </ul>
      </div>
      <div class="cityWeatherImg">
      <img src="img/weather/${this.imageSelector(data.icon)}" alt="" />
      </div>
    </div>`;
    return weatherPin;
  }
  createCityRadio(city) {
    const cityId = `${city}Id`;
    const button = document.createElement('div');
    const labelCity = document.createElement('label');
    const cityRadio = document.createElement('input');

    cityRadio.id = cityId;
    cityRadio.setAttribute('type', 'radio');
    cityRadio.name = 'city';

    labelCity.htmlFor = cityId;
    labelCity.innerText = city;

    button.appendChild(cityRadio);
    button.appendChild(labelCity);
    return button;
  }
  createLoader() {
    const loader = document.createElement('div');
    loader.classList.add('loader');
    return loader;
  }
}
