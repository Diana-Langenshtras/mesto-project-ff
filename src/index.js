import './pages/index.css'; // добавьте импорт главного файла стилей 
import { createCard, deleteCard, likeCard} from './components/card.js';
import { closePopup, openPopup, addPopupAnimated } from './components/modal.js';
import { initialCards } from './components/cards.js';

const cardsContainer = document.querySelector('.places__list');
const popupImage = document.querySelector('.popup_type_image'); 
const popupImagePicture = popupImage.querySelector('.popup__image');
const popupImageText = popupImage.querySelector('.popup__caption');
const buttonOpenEditProfileForm = document.querySelector('.profile__edit-button'); 
const buttonOpenAddCardForm = document.querySelector('.profile__add-button'); 
const editPopup = document.querySelector('.popup_type_edit'); 
const addPopup = document.querySelector('.popup_type_new-card'); 
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const name = document.querySelector('.popup__input_type_card-name');
const link = document.querySelector('.popup__input_type_url');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formAddCard = document.forms['new-place'];
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');

function showCards(cards){
    cards.forEach(card => {
        const newCard = createCard(card, deleteCard, likeCard, openImagePopup);
        cardsContainer.append(newCard);
    });
}

showCards(initialCards);
addPopupAnimated(editPopup);
addPopupAnimated(addPopup);

buttonOpenEditProfileForm.addEventListener('click', function (evt) {
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

buttonOpenAddCardForm.addEventListener('click', function (evt) {
    openPopup(addPopup);
    formAddCard.reset(); 
});

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function submitEditProfile(evt) {
    evt.preventDefault(); 
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(popupEditProfile);
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
    closePopup(popupAddCard);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formAddCard.addEventListener('submit', handleAddCard);

function openImagePopup(card){
    popupImagePicture.src = card.querySelector('.card__image').src; 
    popupImageText.textContent = card.querySelector('.card__title').textContent; 
    popupImageText.alt = card.querySelector('.card__image').alt; 
    openModal(card.querySelector('.card__image'), popupImage);
}