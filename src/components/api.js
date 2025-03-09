//----------------------------------------------------
//Работа с API
//----------------------------------------------------

const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-33",
  headers: {
    authorization: "d7e284f7-ccb3-4c92-801c-3656478f851f",
    "Content-Type": "application/json",
  },
};

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
  }
};

//получение карточек
export const getCardsData = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  }).then(checkResponse);
};

//получение информации о юзере
export const getUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  }).then(checkResponse);
};

//редактирование профиля
export const editProfile = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name,
      about,
    }),
  }).then(checkResponse);
};

//отправка новых карточек на сервер
export const postNewCards = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
    }),
  }).then(checkResponse);
};

//запрос на удаление карточки
export const deleteCardRequest = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
};

//Поставить лайк
export const putLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  })
    .then(checkResponse);
};

//удалить лайк
export const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then(checkResponse);
};

//смена аватара
export const editAvatar = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: link,
    }),
  }).then(checkResponse);
};

// Проверка на наличие картинки по урлу
export const isValidImageUrl = (url) => {
  return fetch(url, {
    method: "HEAD",
  }).then((res) => {
    if (res.ok) {
      const contentType = res.headers.get("Content-Type");
      if (!contentType || !contentType.startsWith("image/")) {
        throw new Error(`Некорректный MIME-тип: ${contentType}`);
      }
      return true;
    } else {
      console.log(`Ошибка при проверке URL: ${res.status} ${res.statusText}`);
    }
  });
};
