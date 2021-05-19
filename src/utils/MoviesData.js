import { BEATFILM_URL, PATH } from "./config";

class MovieData {
  constructor(config) {
    this.url = config.url;
  }

  getMovies() {
    return fetch(`${this.url}${PATH}`, {
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
  url: `${BEATFILM_URL}`
});

export default moviesData;
