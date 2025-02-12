//Функция удаления карточки
export const deleteCard = (targetCard) => {
  targetCard.remove();
};
  
// функция лайка карточки
export const likeCard = (targetLikeButton) => {
  targetLikeButton.classList.toggle('card__like-button_is-active');
};

//Темплейт карточки NEW

export const createCard = (cardData, cardFunctions) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
    
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  
  deleteButton.addEventListener('click', () => cardFunctions.delete(cardElement));
  likeButton.addEventListener('click', () => cardFunctions.like(likeButton));
  cardImage.addEventListener('click', cardFunctions.openImage);
  
  return cardElement;
}