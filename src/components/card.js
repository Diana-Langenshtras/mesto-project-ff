import { deleteCardFromServer, likeCardFromServer, unlikeCardFromServer } from "./api";
// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');

function getCardTemplate(selector) {
  const card = cardTemplate.querySelector(selector).cloneNode(true); 
  return card
}

// @todo: Функция создания карточки
export function createCard(cardData, onDelete, onLike, onImage, userId)
{
  const card = getCardTemplate('.places__item');
  const cardImage = card.querySelector('.card__image');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  card.querySelector('.card__title').textContent = cardData.name;

  const deleteButton = card.querySelector('.card__delete-button');
  const cardOwnerId = cardData.owner._id;
  if (cardOwnerId !== userId) { 
    deleteButton.hidden = true;
  };
  deleteButton.addEventListener('click', () => {onDelete(card, cardData);})

  const likeButton = card.querySelector('.card__like-button');
  for (let i = 0; i < cardData.likes.length; i++) {
    if (cardData.likes[i]._id === userId) {
      likeButton.classList.add('card__like-button_is-active');
    } 
  }
  const likesNumber = cardData.likes.length;
  const likeCount = card.querySelector('.card__like-count'); 
  likeCount.innerHTML = likesNumber;
  likeButton.addEventListener('click', () => {onLike(likeButton, likeCount, cardData);});

  const imageButton = cardImage;
  imageButton.addEventListener('click', () => {onImage(card);});

  return card;
}
// @todo: Функция удаления карточки
export function deleteCard(card, cardData){
  deleteCardFromServer(cardData._id).then((data) => {
    card.remove();
  })
  .catch((err) => {
    console.log(err)
  })    
}

export function likeCard(button, count, cardData){
  if (button.classList.contains('card__like-button_is-active')) {
    unlikeCardFromServer(cardData._id).then((data) => {             
      count.textContent = Number(data.likes.length);
    })
    .then(() => {
      button.classList.remove('card__like-button_is-active');
    })
    .catch((err) => {
      console.log(err)
    })      
  } else {
    likeCardFromServer(cardData._id).then((data) => {
      count.textContent = Number(data.likes.length);
    })
    .then(() => {
      button.classList.add('card__like-button_is-active');
    })
    .catch((err) => {
      console.log(err)
    })
  }
}


