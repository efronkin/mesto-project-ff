const container = document.querySelector('.content')
const card = container.querySelector('.places__list');
const addButton = container.querySelector('.profile__add-button');
//const newCardPopup = document.querySelector('.popup_type_new-card');
//const createButton = newCardPopup.querySelector('.popup__button');
//const closePopupButton = document.querySelectorAll('.popup__close');

// функция появления поп-апа добавления карточки
//addButton.addEventListener('click', () => newCardPopup.classList.add('popup_is-opened'));

// функция закрытия поп-апа добавления карточки
/*function closePopup(closeButton) {
  closeButton.addEventListener('click', () => {
    const popup = closeButton.closest('.popup');
    if (popup) {
      popup.classList.remove('popup_is-opened');
    }
  });
}

closePopupButton.forEach(closeButton => {
  closeButton.addEventListener('click', closePopup(closeButton));
});*/

// @todo: Темплейт карточки

function addCard(cardTitleValue, cardImageLinkValue) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__image').src = cardImageLinkValue;
  cardElement.querySelector('.card__image').alt = 'test-text';
  cardElement.querySelector('.card__title').textContent = cardTitleValue;

  renderCard(cardElement);

  deleteCard(cardElement);

  likeCard(cardElement);
}

// @todo: DOM узлы

// @todo: Функция создания карточки
//createButton.addEventListener('click', function () {
addButton.addEventListener('click', function () {

  //взятие значений из полей, пригодится потом
  //const cardTitle = document.querySelector('.popup__input_type_card-name');
  //const cardImageLink = document.querySelector('.popup__input_type_url');

  //addCard(cardTitle, cardImageLink);

  initialCards.forEach(newCard => {
    const cardTitle = newCard.name;
    const cardImageLink = newCard.link;

    addCard(cardTitle, cardImageLink);
  });

  //closePopup(createButton);
});

// @todo: Функция удаления карточки
function deleteCard(targetCard) {
  targetCard.querySelector('.card__delete-button').addEventListener('click', () => targetCard.remove());
}

// функция лайка карточки
function likeCard(targetCard) {
  targetCard.querySelector('.card__like-button').addEventListener('click', (likeButton) => likeButton.target.classList.toggle('card__like-button_is-active'));
}

// @todo: Вывести карточки на страницу
function renderCard(newCard) {
  card.append(newCard);
}