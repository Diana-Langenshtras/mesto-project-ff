// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');
// @todo: Функция создания карточки
function addCard(cardData, onDelete)
{
    const card = cardTemplate.querySelector('.places__item').cloneNode(true);

    card.querySelector('.card__image').src = cardData.link;
    card.querySelector('.card__image').alt = cardData.name;
    card.querySelector('.card__title').textContent = cardData.name;

    const deleteButton = card.querySelector('.card__delete-button');

    deleteButton.addEventListener('click', () => {onDelete(card);})

    return card;
}
// @todo: Функция удаления карточки
function deleteCard(card){
     card.remove();
}
// @todo: Вывести карточки на страницу
function showCards(cards){
    cards.forEach(card => {
        const newCard = addCard(card, deleteCard);
        cardsContainer.append(newCard);
    });
}

showCards(initialCards);
