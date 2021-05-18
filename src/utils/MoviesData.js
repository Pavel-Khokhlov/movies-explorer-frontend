export const BASE_URL = "https://api.nomoreparties.co";
const path = "/beatfilm-movies";

class MovieData {
  constructor(config) {
    this.url = config.url;
  }

  getMovies() {
    return fetch(`${this.url}${path}`, {
      method: "GET",
      headers: {
      "Content-Type": "application/json",
    },
    }).then(this._checkPromise);
  }
  
  _checkPromise(res) {
    return res.ok ? res.json() : Promise.reject(`Фильм не найден!`);
  }
}

const moviesData = new MovieData({
  url: `${BASE_URL}`
});

export default moviesData;
