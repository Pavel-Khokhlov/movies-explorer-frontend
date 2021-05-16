// export const BASE_URL = "https://api.pavel-khokhlov.nomoredomains.monster";
const imageURL = `https://api.nomoreparties.co`;
export const BASE_URL = "http://localhost:3000";

class Api {
  constructor(config) {
    this.url = config.url;
  }

  getUserInfo(token) {
    return fetch(`${this.url}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `${token}`,
      },
    }).then(this._checkPromise);
  }

  patchUserInfo(name, email, token) {
    return fetch(`${this.url}/users/me`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `${token}`,
      },
      body: JSON.stringify({ name, email }),
    }).then(this._checkPromise);
  }

  getSavedMovies(token) {
    console.log(token);
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
        image: `${imageURL}${movie.image ? movie.image.url : ""}`,
        trailer: movie.trailerLink,
        thumbnail: `${imageURL}${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: `${movie.nameEN ? movie.nameEN : "No EN Title"}`,
      }),
    }).then(this._checkPromise);
  }

  deleteMovie(moviedId, token) {
    return fetch(`${this.url}/movies`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `${token}`,
      },
    }).then(this._checkPromise);
  }

  _checkPromise(res) {
    console.log(res);
    return res.ok ? res.json() : Promise.reject(`Файл не найден!`);
  }
}

const api = new Api({
  url: `${BASE_URL}`,
});

export default api;
