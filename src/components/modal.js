//функция открытия поп-апа + слушатель esc

export const openPopup = (modal) => {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupByEsc);
};

//функции закрытия поп-апа

const closePopupByEsc = (evt) => {
  if (evt.key === 'Escape') {
    const popup = document.querySelector(".popup_is-opened");
    closePopup(popup);
  }
};

export const closePopup = (openedPopup) => {
  openedPopup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupByEsc);
};

//функциия слушателя закрытия поп-апа

export const addClosePopupListeners = (popup) => {
  const cross = popup.querySelector('.popup__close');
  cross.addEventListener('click', () => closePopup(popup));

  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closePopup(popup);
    }
  });
}