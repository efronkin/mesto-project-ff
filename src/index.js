import '../pages/index.css';
import './cards.js';

import initialCards from './cards.js';
import {deleteCard, likeCard, createCard} from './components/card.js';
import {openPopup, closePopup, colsePopupListener} from './components/modal.js';

const container = document.querySelector('.content')
const placesList = container.querySelector('.places__list');
const addCardButton = container.querySelector('.profile__add-button');
const editProfileButton = container.querySelector('.profile__edit-button')
const newCardPopup = document.querySelector('.popup_type_new-card');
const editProfilePopup = document.querySelector('.popup_type_edit');
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupLink = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');
const popups = document.querySelectorAll('.popup');
const editProfileForm = document.forms["edit-profile"];
const addCardForm = document.forms["new-place"];
const nameInput = editProfileForm.querySelector('.popup__input_type_name');
const jobInput = editProfileForm.querySelector('.popup__input_type_description');

//функция открытия картинки(нужна, чтобы без ифов получить данные)

const openImagePopup = (evt) => {
  getImageDate(evt);
  openPopup(imagePopup);
}

const cardFunctions = {
  delete: deleteCard,
  like: likeCard,
  openImage: openImagePopup
};

// слушатель для функции открытия поп-апа

addCardButton.addEventListener('click', () => openPopup(newCardPopup));

// слушатель для функции появления поп-апа редактирования профиля

editProfileButton.addEventListener('click', () => {
  nameInput.value = container.querySelector('.profile__title').textContent;
  jobInput.value = container.querySelector('.profile__description').textContent;
  openPopup(editProfilePopup);
});

//функция получения данных по выбранной картинке

const getImageDate = (evt) => {
  const targetImage = evt.currentTarget;

  imagePopupLink.src = targetImage.src;
  imagePopupLink.alr = targetImage.alt;
  imagePopupCaption.textContent = targetImage.alt;
}

//вызов слушателя закрытия для всех поп-апов

popups.forEach((popup) => {
  colsePopupListener(popup);
});

// Создание карточек из файла 

initialCards.forEach((newCard) => {
  const cardData = {name: newCard.name, link: newCard.link}
  const cardElement = createCard(cardData, cardFunctions);
  placesList.append(cardElement);
});

// добавление новой карточки

const addCardFormSubmit = (evt) => {
  evt.preventDefault();
  const cardTitle = document.querySelector('.popup__input_type_card-name');
  const cardImageLink = document.querySelector('.popup__input_type_url');
  const cardData = {name: cardTitle.value, link: cardImageLink.value}
  
  placesList.prepend(createCard(cardData, cardFunctions));

  const popup = document.querySelector(".popup_is-opened");
  closePopup(popup);
  addCardForm.reset();
};

// добавление слушателя сабмита на форму создания карточки 

addCardForm.addEventListener('submit', addCardFormSubmit); 

// Функция редактирования профиля

const editProfileFormSubmit = (evt) => {
  evt.preventDefault();
  container.querySelector('.profile__title').textContent = nameInput.value;
  container.querySelector('.profile__description').textContent = jobInput.value;

  const popup = document.querySelector(".popup_is-opened");
  closePopup(popup);
};

editProfileForm.addEventListener('submit', editProfileFormSubmit); 