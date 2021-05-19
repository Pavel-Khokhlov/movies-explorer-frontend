import { BASE_URL, BEATFILM_URL } from "./config";
class MovieApi {
  constructor(config) {
    this.url = config.url;
  }

  getSavedMovies(token) {
    return fetch(`${this.url}/movies`, {
      headers: { 
        'Content-Type': 'application/json',
        "Authorization": `${token}`, 
      },
    }).then(this._checkPromise);
  }

  saveMovie({ movie }, token) {
    return fetch(`${this.url}/movies`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `${token}`,
      },
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `${BEATFILM_URL}${movie.image ? movie.image.url : ""}`,
        trailer: movie.trailerLink,
        thumbnail: `${BEATFILM_URL}${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: `${movie.nameEN ? movie.nameEN : "No EN Title"}`,
      }),
    }).then(this._checkPromise);
  }

  deleteMovie({ savedMovie }, token) {
    const path = savedMovie._id;
    return fetch(`${this.url}/movies/${path}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `${token}`,
      },
    }).then(this._checkPromise);
  }

  _checkPromise(res) {
    return res.ok ? res.json() : Promise.reject(`Файл не найден!`);
  }
}

const movieApi = new MovieApi({
  url: `${BASE_URL}`,
});

export default movieApi;
