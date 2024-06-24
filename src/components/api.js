export { getUser, getInitialCards, updateUser, addCardFromServer, deleteCardFromServer, likeCardFromServer, unlikeCardFromServer, updateAvatar }

const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-16',
    headers: {
      authorization: '345ebbfe-53e1-49aa-b52d-73b567e0cc26',
      'Content-Type': 'application/json'
    }
}
  
function checkResponse(res) {
    if (res.ok) {
      return res.json();
      }
    return Promise.reject(`Ошибка: ${res.status}`);
}

//получение информации о пользователе
function getUser(){
    return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers,
    }).then(checkResponse);
};
  
//получение информации о массиве карточек
function getInitialCards(){
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers,
    }).then(checkResponse);
};

//обновление информации о пользователе
function updateUser(name, about){
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name,
      about,
    }),
  }).then(checkResponse);
};

//добавление карточки
function addCardFromServer({ name, link }) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
    }),
  }).then(checkResponse);
};

//удаление карточки
function deleteCardFromServer(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then(checkResponse);
};

//лайк карточки
function likeCardFromServer(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  }).then(checkResponse);
};

//анлайк карточки
function unlikeCardFromServer(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then(checkResponse);
};

//обновление аватара
function updateAvatar(avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ avatar }),
  }).then(checkResponse);
};