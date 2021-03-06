const apiResponse = (res) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Error: ${res.status}`);
};

class Api {
  constructor({ baseUrl, authToken }) {
    this._baseUrl = baseUrl;
    this._authToken = authToken;
  }

  // methods for working with the API

  // GET https://around.nomoreparties.co/v1/groupId/cards
  getCardList() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._authToken,
      },
    }).then(apiResponse);
  }

  // GET https://around.nomoreparties.co/v1/groupId/users/me
  getInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._authToken,
      },
    }).then(apiResponse);
  }

  // make everything show up at once
  getInitialData() {
    return Promise.all([this.getInfo(), this.getCardList()]);
  }

  // POST https://around.nomoreparties.co/v1/groupId/cards
  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: this._authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(apiResponse);
  }

  // DELETE https://around.nomoreparties.co/v1/groupId/cards/cardId
  removeCard(cardID) {
    return fetch(`${this._baseUrl}/cards/${cardID}`, {
      method: "DELETE",
      headers: {
        authorization: this._authToken,
      },
    }).then(apiResponse);
  }

  // PUT https://around.nomoreparties.co/v1/groupId/cards/likes/cardId
  // DELETE https://around.nomoreparties.co/v1/groupId/cards/likes/cardId

  deleteLike(cardID) {
    return fetch(`${this._baseUrl}/cards/likes/${cardID}`, {
      method: "DELETE",
      headers: {
        authorization: this._authToken,
      },
    }).then(apiResponse);
  }

  changeLikeCardStatus(cardID) {
    return fetch(`${this._baseUrl}/cards/likes/${cardID}`, {
      method: "PUT",
      headers: {
        authorization: this._authToken,
      },
    }).then(apiResponse);
  }

  // PATCH https://around.nomoreparties.co/v1/groupId/users/me
  updateUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(apiResponse);
  }

  // PATCH https://around.nomoreparties.co/v1/groupId/users/me/avatar
  setUserAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(apiResponse);
  }
}

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-7",
  authToken: "47c83c4f-319d-4409-b351-cc8f7164bc50",
});

export default api;
