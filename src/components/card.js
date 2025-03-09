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
  const likeMethod = isLiked(cardData, userId) ? deleteLike : putLike;
  likeMethod(cardData._id)
    .then((res) => {
      cardData.likes = res.likes;
      likeCounter.textContent = res.likes.length;
      targetLikeButton.classList.toggle("card__like-button_is-active");
    })
    .catch((err) => console.log(err));
};

const hideDeleteButton = (cardOwnerId, currentUserId, deleteButton) => {
  if (cardOwnerId !== currentUserId) {
    deleteButton.style.display = "none";
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
    cardFunctions.like(likeCounter, likeButton, userId, cardData)
  );

  hideDeleteButton(cardData.owner._id, userId, deleteButton);

  cardImage.addEventListener("click", cardFunctions.openImage);

  if (isLiked(cardData, userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  return cardElement;
};
