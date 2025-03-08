import "../pages/index.css";
import "./cards.js";

//import initialCards from './cards.js';
import { likeCard, createCard } from "./components/card.js";
import {
  openPopup,
  closePopup,
  addClosePopupListeners,
} from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getCardsData,
  getUserData,
  editProfile,
  postNewCards,
  deleteCardRequest,
  putLike,
  deleteLike,
  editAvatar,
  isValidImageUrl
} from "./components/api.js";

const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

const container = document.querySelector(".content");
const profileName = container.querySelector(".profile__title");
const profileDescription = container.querySelector(".profile__description");
const profileImage = container.querySelector(".profile__image");
const placesList = container.querySelector(".places__list");
const addCardButton = container.querySelector(".profile__add-button");
const editProfileButton = container.querySelector(".profile__edit-button");

const newCardPopup = document.querySelector(".popup_type_new-card");
const editProfilePopup = document.querySelector(".popup_type_edit");
const editAvatarPopup = document.querySelector(".popup_type_update-avatar");
const deleteCardPopup = document.querySelector(".popup_type_delete-card");
const deleteCardSubmitButton = deleteCardPopup.querySelector(".popup__button");
const deleteCardErrorField = deleteCardPopup.querySelector(".delete-card-error");

const imagePopup = document.querySelector(".popup_type_image");
const imagePopupLink = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");
const popups = document.querySelectorAll(".popup");

const editProfileForm = document.forms["edit-profile"];
const nameInput = editProfileForm.querySelector(".popup__input_type_name");
const jobInput = editProfileForm.querySelector(".popup__input_type_description");
const editProfileSubmitButton = editProfileForm.querySelector(".popup__button");

const deleteCardForm = document.forms["delete-card"];
const addCardForm = document.forms["new-place"];
const updateAvatarForm = document.forms["update-avatar"];

const cardTitleInput = addCardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = addCardForm.querySelector(".popup__input_type_url");
const cardLinkInputError = addCardForm.querySelector(".url-input-error")
const addCardSubmitButton = addCardForm.querySelector(".popup__button");

const avatarLinkInput = editAvatarPopup.querySelector(".popup__input_type_avatar_url");
const avatarLinkErrorField = editAvatarPopup.querySelector(".url-input-avatar-error");
const updateAvatarSubmitButton = editAvatarPopup.querySelector(".popup__button");

let userId;

const cardToDelete = {};

//функция открытия картинки(нужна, чтобы без ифов получить данные)

const openImagePopup = (evt) => {
  fillImagePopupData(evt);
  openPopup(imagePopup);
};

//функция открытия поп-апа удаления карточки

const openDeletePopup = (cardId, targetCard) => {
  openPopup(deleteCardPopup);

  cardToDelete.targetCard = targetCard;
  cardToDelete.cardId = cardId;
};

//функция удаления карточки
const deleteCardFormSubmit = (evt) => {
  evt.preventDefault();

  deleteCardSubmitButton.textContent = 'Удаление...';
  deleteCardSubmitButton.disabled = true;

  deleteCardRequest(cardToDelete.cardId)
    .then((res) => {
      if (!res) {
        deleteCardErrorField.textContent = 'Не удалось удалить карточку. Попробуйте позже';
        return;
      }
      cardToDelete.targetCard.remove();
      closePopup(deleteCardPopup);
    })
    .catch((res) => {
      console.log(`Не удалось удалить карточку. Ошибка: ${res.status} ${res.statusText}`);
    })
    .finally(() => {
        deleteCardSubmitButton.textContent = 'Да';
        deleteCardSubmitButton.disabled = false;
    })
};

const cardFunctions = {
  delete: openDeletePopup,
  like: likeCard,
  openImage: openImagePopup,
  putLike,
  deleteLike
};

//добавления слушателя сабмита на форму удаления

deleteCardForm.addEventListener("submit", deleteCardFormSubmit);

// слушатель для функции открытия поп-апа добавления карточки

addCardButton.addEventListener("click", () => {
  cardTitleInput.value = "";
  cardLinkInput.value = "";
  openPopup(newCardPopup);
  clearValidation(newCardPopup, validationSettings);
});

// слушатель для функции открытия поп-апа смены аватара

profileImage.addEventListener("click", () => {
  avatarLinkInput.value = "";
  openPopup(editAvatarPopup);
  clearValidation(editAvatarPopup, validationSettings);
});

// слушатель для функции появления поп-апа редактирования профиля

editProfileButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(editProfilePopup);
  clearValidation(editProfilePopup, validationSettings);
});

//функция получения данных по выбранной картинке

const fillImagePopupData = (evt) => {
  const targetImage = evt.currentTarget;

  imagePopupLink.src = targetImage.src;
  imagePopupLink.alr = targetImage.alt;
  imagePopupCaption.textContent = targetImage.alt;
};

//вызов слушателя закрытия для всех поп-апов

popups.forEach((popup) => {
  addClosePopupListeners(popup);
});

// Создание карточек с сервера

const appendCards = (cardsList) => {
  cardsList.forEach((newCard) => {
    const cardElement = createCard(userId, newCard, cardFunctions);
    const deleteButton = cardElement.querySelector(".card__delete-button");
    
    placesList.append(cardElement);

    hideDeleteButton(newCard.owner._id, userId, deleteButton);
  });
};

const hideDeleteButton = (cardOwnerId, currentUserId, deleteButton) => {
  if (cardOwnerId !== currentUserId) {
    deleteButton.style.display = "none";
  }
};

// добавление новой карточки

const addCardFormSubmit = (evt) => {
  evt.preventDefault();

  addCardSubmitButton.textContent = 'Сохраненение...';
  addCardSubmitButton.disabled = true;

  isValidImageUrl(cardLinkInput.value)
    .then((res) => {
      if (!res) {
        cardLinkInputError.textContent = 'По указанному адресу изображение не найдена. Пожалуйста, проверьте правильно ли указана ссылка';
        return;
      }

      postNewCards(cardTitleInput.value, cardLinkInput.value)
        .then((res) => {
          placesList.prepend(createCard(userId, res, cardFunctions));
        })
        .catch((errorStatus) => console.log(errorStatus));

      closePopup(newCardPopup);
      addCardForm.reset();
  })
  .finally(() => {
    addCardSubmitButton.textContent = 'Сохранить';
    addCardSubmitButton.disabled = false;
  })
};

// добавление слушателя сабмита на форму создания карточки

addCardForm.addEventListener("submit", addCardFormSubmit);

// обновление аватара

const updateAvatarFormSubmit = (evt) => {
  evt.preventDefault();

  updateAvatarSubmitButton.textContent = 'Сохраненение...';
  updateAvatarSubmitButton.disabled = true;

  isValidImageUrl(avatarLinkInput.value)
    .then((res) => {
      if (!res) {
        avatarLinkErrorField.textContent = 'По указанному адресу изображение не найдена. Пожалуйста, проверьте правильно ли указана ссылка';
        return;
      }

      editAvatar(avatarLinkInput.value)
        .then((res) => {
          profileImage.style.backgroundImage = `url(${res.avatar})`;
        })
        .catch((errorStatus) => console.log(errorStatus));

      closePopup(editAvatarPopup);
      updateAvatarForm.reset();
    })
    .finally(() => {
      updateAvatarSubmitButton.textContent = 'Сохранить';
      updateAvatarSubmitButton.disabled = false;
    })
};

// добавление слушателя сабмита на форму обновления аватара

updateAvatarForm.addEventListener("submit", updateAvatarFormSubmit);

// Функция редактирования профиля

const editProfileFormSubmit = (evt) => {
  evt.preventDefault();

  editProfileSubmitButton.textContent = 'Сохраненение...';
  editProfileSubmitButton.disabled = true;

  editProfile(nameInput.value, jobInput.value)
    .then((res) => {
      profileName.textContent = res.name;
      profileDescription.textContent = res.about;
      closePopup(editProfilePopup);
    })
    .catch((errorStatus) => console.log(errorStatus))
    .finally(() => {
      editProfileSubmitButton.textContent = 'Сохранить';
      editProfileSubmitButton.disabled = false;
    })
};

editProfileForm.addEventListener("submit", editProfileFormSubmit);

//Включение валидации
enableValidation(validationSettings);

//получаем карточки и данные по юзеру
Promise.all([getUserData(), getCardsData()]).then(([userData, cardsData]) => {
  profileImage.style.backgroundImage = `url(${userData.avatar})`;
  userId = userData._id;
  profileName.textContent = userData.name;
  profileDescription.textContent = userData.about;
  appendCards(cardsData);
  
}).catch(res => {
  profileName.textContent = ''
  profileDescription.textContent = 'Не удалось загрузить данные.'
  console.log(`Не удалось загрузить данные. Ошибка: ${res.status} ${res.statusText}`)
})