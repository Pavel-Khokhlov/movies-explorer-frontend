export const BASE_URL = "https://api.pavel-khokhlov.nomoredomains.club";
class Api {
  constructor(config) {
    this.url = config.url;
  }

  // Done
  // getPlaces(token) {
  //   return fetch(`${this.url}/cards`, {
  //     headers: { 
  //       'Content-Type': 'application/json',
  //       "Authorization": `${token}`, 
  //     },
  //   }).then(this._checkPromise);
  // }
// 
  // newCard({ name, link }, token) {
  //   return fetch(`${this.url}/cards`, {
  //     method: "POST",
  //     headers: { 
  //       'Content-Type': 'application/json',
  //       "Authorization": `${token}`, 
  //     },
  //     body: JSON.stringify({
  //       name,
  //       link,
  //     }),
  //   }).then(this._checkPromise);
  // }
// 
  // // Done
  // getUserInfo(token) {
  //   return fetch(`${this.url}/users/me`, {
  //     headers: { 
  //       'Content-Type': 'application/json',
  //       "Authorization": `${token}`, 
  //     },
  //   }).then(this._checkPromise);
  // }
// 
  // patchUserInfo(name, about, token) {
  //   return fetch(`${this.url}/users/me`, {
  //     method: "PATCH",
  //     headers: { 
  //       'Content-Type': 'application/json',
  //       "Authorization": `${token}`, 
  //     },
  //     body: JSON.stringify({
  //       name: `${name}`,
  //       about: `${about}`,
  //     }),
  //   }).then(this._checkPromise);
  // }
// 
  // patchUserAvatar(link, token) {
  //   return fetch(`${this.url}/users/me/avatar`, {
  //     method: "PATCH",
  //     headers: { 
  //       'Content-Type': 'application/json',
  //       "Authorization": `${token}`, 
  //     },
  //     body: JSON.stringify({
  //       avatar: `${link}`
  //     }),
  //   }).then(this._checkPromise);
  // }
// 
  // changeLikeCardStatus(cardId, isLiked, token) {
  //   if (isLiked) {
  //     return this.removeLike(cardId, token);
  //   }
  //   return this.addLike(cardId, token);
  // }
// 
  // addLike(cardId, token) {
  //   return fetch(`${this.url}/cards/${cardId}/likes`, {
  //     method: "PUT",
  //     headers: { 
  //       'Content-Type': 'application/json',
  //       "Authorization": `${token}`, 
  //     },
  //   }).then(this._checkPromise);
  // }
// 
  // removeLike(cardId, token) {
  //   return fetch(`${this.url}/cards/${cardId}/likes`, {
  //     method: "DELETE",
  //     headers: { 
  //       'Content-Type': 'application/json',
  //       "Authorization": `${token}`, 
  //     },
  //   }).then(this._checkPromise);
  // }
// 
  // deleteCard(cardId, token) {
  //   return fetch(`${this.url}/cards/${cardId}`, {
  //     method: "DELETE",
  //     headers: { 
  //       'Content-Type': 'application/json',
  //       "Authorization": `${token}`, 
  //     },
  //   }).then(this._checkPromise);
  // }

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
