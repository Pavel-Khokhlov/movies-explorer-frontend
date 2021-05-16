// export const BASE_URL = "https://api.pavel-khokhlov.nomoredomains.monster";
export const BASE_URL = "http://localhost:3000";

class UserApi {
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

  _checkPromise(res) {
    console.log(res);
    return res.ok ? res.json() : Promise.reject(`Пользователь не найден!`);
  }
}

const userApi = new UserApi({
  url: `${BASE_URL}`,
});

export default userApi;
