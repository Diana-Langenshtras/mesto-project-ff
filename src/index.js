import './pages/index.css'; // добавьте импорт главного файла стилей 
import { createCard, deleteCard, likeCard} from './components/card.js';
import { closePopup, openPopup, addPopupAnimated } from './components/modal.js';
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
const name = document.querySelector('.popup__input_type_card-name');
const link = document.querySelector('.popup__input_type_url');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const addForm = document.forms['new-place'];

function showCards(cards){
  cards.forEach(card => {
      const newCard = createCard(card, deleteCard, likeCard, openImagePopup);
      cardsContainer.append(newCard);
  });
}

showCards(initialCards);

  editButton.addEventListener('click', function (evt) {
    addPopupAnimated(editPopup);
    openPopup(editPopup);
    if (evt.target.classList.contains('profile__edit-button'))
    {
      const form = document.forms['edit-profile'];
      const name = form.elements.name;
      name.value = profileTitle.textContent;
      const description = form.elements.description;
      description.value = profileDescription.textContent;
    }
  });

  addButton.addEventListener('click', function (evt) {
    addPopupAnimated(addPopup);
    openPopup(addPopup);
    addForm.reset(); 
  });

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function submitEditProfile(evt) {
    evt.preventDefault(); 
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    const openedPopup = document.querySelector('.popup_type_edit');
    closePopup(openedPopup);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
document.forms['edit-profile'].addEventListener('submit', submitEditProfile);

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleAddCard(evt) {
  evt.preventDefault(); 
  const card = {
    name: name.value,
    link: link.value,
  }
  cardsContainer.prepend(createCard(card, deleteCard, likeCard, openImagePopup));
  const openedPopup = document.querySelector('.popup_type_new-card');
  closePopup(openedPopup);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
addForm.addEventListener('submit', handleAddCard);

function openImagePopup(card){
  popupImagePicture.src = card.querySelector('.card__image').src; 
  popupImageText.textContent = card.querySelector('.card__title').textContent; 
  popupImageText.alt = card.querySelector('.card__image').alt; 
  
  openModal(card.querySelector('.card__image'), popupImage);
}