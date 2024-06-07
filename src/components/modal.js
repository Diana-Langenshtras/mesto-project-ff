export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  popup.addEventListener('click', closeByOverlayClick);
  document.addEventListener('keydown', closeModalByEsc); 
}

export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  popup.removeEventListener('click', closeByOverlayClick);
  document.removeEventListener('keydown', closeModalByEsc);
} 

export function closeByOverlayClick(evt) {
  if (evt.target === evt.currentTarget ||evt.target.classList.contains('popup__close')) {
    const popupToClose = document.querySelector('.popup_is-opened');
    closePopup(popupToClose);
  }
}

export function addPopupAnimated(popup) {
  popup.classList.add('popup_is-animated'); 
}

function closeModalByEsc(evt) { 
  if (evt.key === 'Escape') { 
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  } 
}
