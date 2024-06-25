import './pages/index.css'; // добавьте импорт главного файла стилей 
import { createCard, deleteCard, likeCard} from './components/card.js';
import { closePopup, openPopup, addPopupAnimated } from './components/modal.js';
import { enableValidation, clearValidation, validationConfig } from './components/validation.js';
import { initialCards } from './components/cards.js';
import { getUser, getInitialCards, updateUser, addCardFromServer, updateAvatar } from './components/api.js';

const cardsContainer = document.querySelector('.places__list');

const popupImage = document.querySelector('.popup_type_image'); 
const popupImagePicture = popupImage.querySelector('.popup__image');
const popupImageText = popupImage.querySelector('.popup__caption');

const buttonOpenEditProfileForm = document.querySelector('.profile__edit-button'); 
const buttonOpenAddCardForm = document.querySelector('.profile__add-button'); 
const buttonOpenUpdateAvatarForm = document.querySelector('.profile__image'); 

const editPopup = document.querySelector('.popup_type_edit'); 
const addPopup = document.querySelector('.popup_type_new-card'); 
const updateAvatarPopup = document.querySelector('.popup_type_new-avatar'); 

const name = document.querySelector('.popup__input_type_card-name');
const link = document.querySelector('.popup__input_type_url');
const avatarLink = document.querySelector('.popup__input_type_url_avatar');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const nameInput = document.querySelector('.popup__input_type_name');
nameInput.value = profileTitle.textContent;
const jobInput = document.querySelector('.popup__input_type_description');
jobInput.value = profileDescription.textContent;

const formEditProfile = document.forms['edit-profile'];
const formAddCard = document.forms['new-place'];
const formUpdateAvatar = document.forms['new-avatar'];

const profileImage = document.querySelector('.profile__image');

function showCards(cards, userId){
  cards.forEach(card => {
    const newCard = createCard(card, deleteCard, likeCard, openImagePopup, userId);
    cardsContainer.append(newCard);
  });
}

addPopupAnimated(editPopup);
addPopupAnimated(addPopup);
addPopupAnimated(updateAvatarPopup);
enableValidation(validationConfig);

buttonOpenEditProfileForm.addEventListener('click', function (evt) {
  openPopup(editPopup);
  if (evt.target.classList.contains('profile__edit-button'))
  {
    clearValidation(formEditProfile, validationConfig);
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
  clearValidation(formAddCard, validationConfig);
});

buttonOpenUpdateAvatarForm.addEventListener('click', function (evt) {
  openPopup(updateAvatarPopup);
  formUpdateAvatar.reset(); 
  clearValidation(formUpdateAvatar, validationConfig);
});

// Обработчик редактирования информации профиля
function submitEditProfile(evt) {
  evt.preventDefault(); 
  const submitButton = formEditProfile.querySelector('.popup__button');
  submitButton.textContent = 'Сохранение...';
  updateUser(nameInput.value, jobInput.value)
    .then((user) => {
      profileTitle.textContent = user.name; 
      profileDescription.textContent = user.about;
      closePopup(editPopup);
    })
    .catch((err) => console.log(err))
    .finally(() => (submitButton.textContent = 'Сохранить'));
}

document.forms['edit-profile'].addEventListener('submit', submitEditProfile);

//обработчик обновления аватара
function submitUpdateAvatar(evt) {
  evt.preventDefault(); 
  const submitButton = formUpdateAvatar.querySelector('.popup__button');
  submitButton.textContent = 'Сохранение...';
  updateAvatar(avatarLink.value)
    .then((user) => {
      profileImage.style.backgroundImage = `url(${user.avatar})`;
      closePopup(updateAvatarPopup);
    })
    .catch((err) => console.log(err))
    .finally(() => (submitButton.textContent = 'Сохранить'));
}

formUpdateAvatar.addEventListener('submit', submitUpdateAvatar);

// обработчик добавления новой карточки
function submitAddCard(evt) {
  evt.preventDefault(); 
  const card = {
    name: name.value,
    link: link.value,
  }

  const submitButton = formAddCard.querySelector('.popup__button');
  submitButton.textContent = 'Сохранение...';

  addCardFromServer(card)
    .then((serverCard) => {
      cardsContainer.prepend(createCard(serverCard, deleteCard, likeCard, openImagePopup, serverCard.owner._id));
      closePopup(addPopup);
    })
    .catch((err) => console.log(err))
    .finally(() => (submitButton.textContent = 'Сохранить'));
}

formAddCard.addEventListener('submit', submitAddCard);

// функция для открытия попапа с карточкой
function openImagePopup(card){
  popupImagePicture.src = card.querySelector('.card__image').src; 
  popupImageText.textContent = card.querySelector('.card__title').textContent; 
  popupImageText.alt = card.querySelector('.card__image').alt; 
  openPopup(popupImage);
}

// Промис для api
Promise.all([getUser(), getInitialCards()])
.then(([userData, initialCards]) => {
    
  profileTitle.textContent = userData.name;
  profileDescription.textContent = userData.about;
  profileImage.style.backgroundImage = (`url(${userData.avatar})`);

  const userId = userData._id; 
  
  showCards(initialCards, userId);
})
.catch((err) => console.log(err));
