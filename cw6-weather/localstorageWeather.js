class Localdb {
  constructor() {
    this.key = 'cities';
  }
  addToLS(arr) {
    localStorage.setItem(this.key, JSON.stringify(arr));
  }
  getCities() {
    if (localStorage.getItem(this.key) === null) {
      return [];
    } else return JSON.parse(localStorage.getItem(this.key));
  }
}
