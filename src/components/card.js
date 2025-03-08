//Проверка на лайк
const isLiked = (cardData, userId) => {
  return cardData.likes.some((item) => item._id === userId);
};

// функция лайка карточки
export const likeCard = (
  likeCounter,
  targetLikeButton,
  userId,
  cardData,
  putLike,
  deleteLike
) => {
  if (isLiked(cardData, userId)) {
    deleteLike(cardData._id).then((res) => {
      cardData.likes = res.likes;
      likeCounter.textContent = res.likes.length;
      targetLikeButton.classList.remove("card__like-button_is-active");
    });
  } else {
    putLike(cardData._id).then((res) => {
      cardData.likes = res.likes;
      likeCounter.textContent = res.likes.length;
      targetLikeButton.classList.add("card__like-button_is-active");
    });
  }
};

//Темплейт карточки NEW

export const createCard = (userId, cardData, cardFunctions) => {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeCounter = cardElement.querySelector(".card__like-counter");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeCounter.textContent = cardData.likes.length;

  deleteButton.addEventListener("click", () =>
    cardFunctions.delete(cardData._id, cardElement)
  );
  likeButton.addEventListener("click", () =>
    cardFunctions.like(
      likeCounter,
      likeButton,
      userId,
      cardData,
      cardFunctions.putLike,
      cardFunctions.deleteLike
    )
  );
  cardImage.addEventListener("click", cardFunctions.openImage);

  if (isLiked(cardData, userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  return cardElement;
};
