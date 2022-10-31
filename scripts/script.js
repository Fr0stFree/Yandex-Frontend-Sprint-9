let formElement = document.querySelector('.edit-form');
let popupElement = document.querySelector('.popup');
let nameElement = document.querySelector('.profile__name');
let descriptionElement = document.querySelector('.profile__description');
let popupOpenButton = document.querySelector('.profile__edit-button');
let nameInputElement = formElement.querySelector('.edit-form__input_type_text[name="name"]');
let descriptionInputElement = formElement.querySelector('.edit-form__input_type_text[name="description"]');
let popupCloseButton = popupElement.querySelector('.popup__close-button');


function openForm() {
  nameInputElement.value = nameElement.textContent;
  descriptionInputElement.value = descriptionElement.textContent;
  _toggleForm();
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameElement.textContent = nameInputElement.value;
  descriptionElement.textContent = descriptionInputElement.value;
  _toggleForm();
}

function _toggleForm() {
  popupElement.classList.toggle('popup_opened');
}

popupOpenButton.addEventListener('click', openForm);
popupCloseButton.addEventListener('click', _toggleForm);
formElement.addEventListener('submit', formSubmitHandler);