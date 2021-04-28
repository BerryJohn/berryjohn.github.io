class ChartGen {
  constructor() {
    this.myChart = document.getElementById('myChart');
    this.ctx = myChart.getContext('2d');
    this.htmlCreator = new weatherHTML();
    this.currChart = new Chart(this.ctx, {});
    this.loader = this.htmlCreator.createLoader();
    this.chartDiv = document.querySelector('.chart');
  }
  generateChart(data, cityName) {
    this.currChart = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: data.dates,
        datasets: [
          {
            data: data.data,
            label: cityName,
            borderColor: '#3e95cd',
            fill: false,
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: 'Forecast for next 5 days',
        },
        elements: {
          line: {
            tension: 0.2,
          },
        },
        maintainAspectRatio: false,
      },
    });
  }

  genCityButtons(citiesArr) {
    const citiesBox = document.querySelector('.chartCities');
    citiesBox.innerHTML = '';
    for (const city of citiesArr) {
      const cityRadio = this.htmlCreator.createCityRadio(city);
      cityRadio.addEventListener('click', (e) => {
        this.genNewData(e);
      });
      cityRadio.querySelector('input').addEventListener('click', (ev) => {
        // to reduce twice event propagation
        ev.stopPropagation();
      });
      citiesBox.appendChild(cityRadio);
    }
  }
  genNewData(e) {
    const tempData = [];
    const dateData = [];
    const city = e.target.outerText;
    const newForecast = new WeatherCity(city);
    const currForecast = newForecast.getJSONfor();
    this.currChart.destroy();
    const currLoader = this.chartDiv.appendChild(this.loader);
    currForecast.then((data) => {
      for (let i = 0; i < data.list.length; i += 8) {
        tempData.push(data.list[i].main.temp);
        dateData.push(data.list[i].dt_txt); // dt_txt -> dates
      }
      const chartData = {
        dates: dateData,
        data: tempData,
      };
      currLoader.remove();
      this.generateChart(chartData, city);
    });
  }
}
