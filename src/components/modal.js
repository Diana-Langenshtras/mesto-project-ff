export function openModal(button, popup) {
    button.addEventListener('click', function (evt) {
      addPopupAnimated(popup);
      addPopupOpened(popup);
      if (evt.target.classList.contains('profile__edit-button'))
      {
        const form = document.forms['edit-profile'];
        const name = form.elements.name;
        name.value = document.querySelector('.profile__title').textContent;
        const description = form.elements.description;
        description.value = document.querySelector('.profile__description').textContent;
      }
    });
  }

function addPopupOpened(popup) {
    popup.classList.add('popup_is-opened');
    popup.addEventListener('click', closeModal);
    document.addEventListener('keydown', closeModalByEsc); 
}

export function removePopupOpened(popup) {
    popup.classList.remove('popup_is-opened');
    popup.removeEventListener('click', closeModal);
    document.removeEventListener('keydown', closeModalByEsc);
} 

export function closeModal(evt) {
  if (evt.target === evt.currentTarget ||evt.target.classList.contains('popup__close')) {
    const popupToClose = document.querySelector('.popup_is-opened');
    removePopupOpened(popupToClose);
  }
}

function addPopupAnimated(popup) {
  popup.classList.add('popup_is-animated');
}

function closeModalByEsc(evt) { 
    if (evt.key === 'Escape') { 
      const openedPopup = document.querySelector('.popup_is-opened');
      removePopupOpened(openedPopup);
  } 
}
