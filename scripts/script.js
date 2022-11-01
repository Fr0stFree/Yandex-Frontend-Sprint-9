let popupElement = document.querySelector('.popup');
let formElement = popupElement.querySelector('.popup__form');
let nameElement = document.querySelector('.profile__name');
let descriptionElement = document.querySelector('.profile__description');
let popupOpenButton = document.querySelector('.profile__edit-button');
let nameInputElement = formElement.querySelector('.popup__input_type_name');
let descriptionInputElement = formElement.querySelector('.popup__input_type_description');
let popupCloseButton = popupElement.querySelector('.popup__close-button');


function openForm() {
  fillForm();
  showPopup();
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  setProfileInfo(nameInputElement.value, descriptionInputElement.value);
  hidePopup();
}

function fillForm() {
  nameInputElement.value = nameElement.textContent;
  descriptionInputElement.value = descriptionElement.textContent;
}

function setProfileInfo(name, description) {
  nameElement.textContent = name;
  descriptionElement.textContent = description;
}

function showPopup() {
  popupElement.classList.add('popup_opened');
}

function hidePopup() {
  popupElement.classList.remove('popup_opened');
}

popupOpenButton.addEventListener('click', openForm);
popupCloseButton.addEventListener('click', hidePopup);
formElement.addEventListener('submit', formSubmitHandler);