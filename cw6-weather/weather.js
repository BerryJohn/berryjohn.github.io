class WeatherCity {
  constructor(city = 'Krakow') {
    this.apiKey = 'eb713f0ad1136c3db5b6a516a71eee0c'; // apikey
    this.lang = 'PL';
    this.city = city;
  }
  async getJSON() {
    let cityInfo = `http://api.openweathermap.org/data/2.5/weather?q=${this.city}&lang=${this.lang}&units=metric&appid=${this.apiKey}`;

    let dataPromise = fetch(cityInfo).then((response) => {
      if (response.ok) return response.json();
      else if (response.status === 404) return Promise.reject('404 Wrong city!');
      else return Promise.reject('Unknown error: ' + response.status);
    });

    return await dataPromise;
  }

  async getJSONfor() {
    //5day focast
    let cityInfo = `http://api.openweathermap.org/data/2.5/forecast?q=${this.city}&lang=${this.lang}&units=metric&appid=${this.apiKey}`;

    let dataPromise = fetch(cityInfo).then((response) => {
      if (response.ok) return response.json();
      else if (response.status === 404) return Promise.reject('404 Wrong city!');
      else return Promise.reject('Unknown error: ' + response.status);
    });

    return await dataPromise;
  }
}
