class WeatherGlobal {
  constructor() {
    this.htmlCreator = new weatherHTML();
    this.db = new Localdb();
    this.charts = new ChartGen();
    /////////////////////////////////////////////////////
    this.allCitiesLocalStorage = this.db.getCities();
    /////////////////////////////////////////////////////
    this.searchInput = document.querySelector('#cityName');
    this.searchBtn = document.querySelector('#citySubmit');
    this.pinsDoc = document.querySelector('.allPins');
    this.interval;
  }

  searchCity() {
    const city = this.searchInput.value;
    this.searchInput.value = '';
    this.addCity(city);
  }

  addCity(city) {
    //Protection, adding already added city is forbidden
    if (this.allCitiesLocalStorage.includes(city)) return;
    const newCity = new WeatherCity(city);
    const cityData = newCity.getJSON();
    cityData.then((data) => {
      //data.name -> another check if city already exist in our local storage
      //i created this because api search can have different language
      if (this.allCitiesLocalStorage.includes(data.name)) return;
      this.addToLocalStorage(data.name);
      this.addPin(data);
    });
  }
  //from local storage
  addCityLS(city) {
    const newCity = new WeatherCity(city);
    const cityData = newCity.getJSON();
    cityData.then((data) => {
      this.addPin(data);
    });
  }
  addToLocalStorage(city) {
    this.allCitiesLocalStorage.push(city);
    this.db.addToLS(this.allCitiesLocalStorage);
    //charts
    this.charts.genCityButtons(this.allCitiesLocalStorage);
  }
  citiesFromLocalStorage() {
    for (const city of this.allCitiesLocalStorage) {
      this.addCityLS(city);
    }
  }
  /// end of local storage
  createHTMLElement(data) {
    const pin = this.htmlCreator.createPin(data);
    this.pinsDoc.appendChild(pin);
    const pinBtn = pin.querySelector('.closeBtn');

    pinBtn.addEventListener('click', (e) => this.removePin(e.target.parentElement));
  }
  removePin(pin) {
    const pinCity = pin.querySelector('.cityName');
    const cityToRemove = pinCity.outerText;
    //find
    const newAllCities = this.allCitiesLocalStorage.filter((el) => el != cityToRemove);
    this.allCitiesLocalStorage = newAllCities;
    this.db.addToLS(this.allCitiesLocalStorage);
    pin.remove();
    //charts
    this.charts.genCityButtons(this.allCitiesLocalStorage);
  }
  addPin(data) {
    const weatherData = {
      cityName: data.name,
      cityHour: data.timezone,
      cityTemp: data.main.temp,
      cityWind: data.wind.speed,
      cityHum: data.main.humidity,
      cityPress: data.main.pressure,
      cityWeatherDesc: data.weather[0].main,
      icon: data.weather[0].icon,
    };
    this.createHTMLElement(weatherData);
  }
  updatePins() {
    this.pinsDoc.innerHTML = '';
    this.citiesFromLocalStorage();
  }
  updatePinsInit(time = 60000) {
    this.interval = setInterval(() => this.updatePins(), time);
  }
  ///
  init() {
    this.citiesFromLocalStorage();
    this.searchBtn.addEventListener('click', () => {
      this.searchCity();
    });
    this.updatePinsInit();
    this.charts.genCityButtons(this.allCitiesLocalStorage);
  }
}

const weatherApp = new WeatherGlobal();
weatherApp.init();
