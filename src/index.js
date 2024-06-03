import './pages/index.css'; // добавьте импорт главного файла стилей 
import { createCard, deleteCard, likeCard} from './components/card.js';
import { openModal, removePopupOpened } from './components/modal.js';
import { initialCards } from './components/cards.js';

const cardsContainer = document.querySelector('.places__list');
const popupImage = document.querySelector('.popup_type_image'); 
const popupImagePicture = popupImage.querySelector('.popup__image');
const popupImageText = popupImage.querySelector('.popup__caption');
const editButton = document.querySelector('.profile__edit-button'); 
const addButton = document.querySelector('.profile__add-button'); 
const editPopup = document.querySelector('.popup_type_edit'); 
const addPopup = document.querySelector('.popup_type_new-card'); 
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');


function showCards(cards){
  cards.forEach(card => {
      const newCard = createCard(card, deleteCard, likeCard, imageCard);
      cardsContainer.append(newCard);
  });
}

showCards(initialCards);

openModal(editButton, editPopup);
openModal(addButton, addPopup);


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); 
    document.querySelector('.profile__title').textContent = nameInput.value;
    document.querySelector('.profile__description').textContent = jobInput.value;
    const openedPopup = document.querySelector('.popup_is-opened');
    removePopupOpened(openedPopup);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
document.forms['edit-profile'].addEventListener('submit', handleFormSubmit);

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleAddCard(evt) {
  const name = document.querySelector('.popup__input_type_card-name');
  const link = document.querySelector('.popup__input_type_url');
  evt.preventDefault(); 
  const card = {
    name: name.value,
    link: link.value,
  }
  cardsContainer.prepend(createCard(card, deleteCard, likeCard, imageCard));
  const openedPopup = document.querySelector('.popup_is-opened');
  removePopupOpened(openedPopup);
  name.value ='';
  link.value = '';
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
document.forms['new-place'].addEventListener('submit', handleAddCard);


function imageCard(card){
  popupImagePicture.src = card.querySelector('.card__image').src; 
  popupImageText.textContent = card.querySelector('.card__title').textContent; 
  popupImageText.alt = card.querySelector('.card__image').alt; 
  
  openModal(card.querySelector('.card__image'), popupImage);
}