// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');
// @todo: Функция создания карточки
export function createCard(cardData, onDelete, onLike, onImage)
{
    const card = cardTemplate.querySelector('.places__item').cloneNode(true);

    card.querySelector('.card__image').src = cardData.link;
    card.querySelector('.card__image').alt = cardData.name;
    card.querySelector('.card__title').textContent = cardData.name;

    const deleteButton = card.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => {onDelete(card);})

    const likeButton = card.querySelector('.card__like-button');
    likeButton.addEventListener('click', () => {onLike(likeButton);});

    const imageButton = card.querySelector('.card__image');
    imageButton.addEventListener('click', () => {onImage(card);});

    return card;
}
// @todo: Функция удаления карточки
export function deleteCard(card){
     card.remove();
}

export function likeCard(button){
    button.classList.add('card__like-button_is-active');
}


