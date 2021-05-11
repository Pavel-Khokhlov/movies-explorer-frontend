// export const BASE_URL = "https://api.pavel-khokhlov.nomoredomains.monster";
export const BASE_URL = "http://localhost:3000";

class Api {
  constructor(config) {
    this.url = config.url;
  }

  getUserInfo(token) {
  console.log(token);
  return fetch(`${this.url}/users/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  }).then(this._checkPromise);
  }

  patchUserInfo(name, email, token) {
  return fetch(`${this.url}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify({ name, email }),
  }).then(this._checkPromise);
  }
  
    _checkPromise(res) {
      if (!res.ok) {
        Promise.reject(`Пользователь не найден!`);
      }
      return res.json();
    }
  }
  
  const api = new Api({
    url: `${BASE_URL}`
  });
  
  export default api;
  