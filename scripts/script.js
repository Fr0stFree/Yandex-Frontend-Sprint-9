let formElement = document.querySelector('.edit-form');
let popupElement = document.querySelector('.popup');
let nameElement = document.querySelector('.profile__name');
let nameInputElement = document.querySelector('input[type="text"][name="name"]');
let descriptionElement = document.querySelector('.profile__description');
let descriptionInputElement = document.querySelector('input[type="text"][name="description"]');
let formEditButton = document.querySelector('.profile__edit-button');
let formCloseButton = document.querySelector('.edit-form__close-button');


function openForm() {
  nameInputElement.value = nameElement.textContent;
  descriptionInputElement.value = descriptionElement.textContent;
  popupElement.style.display = 'block';
  popupElement.classList.toggle('overlay');
}

function closeForm() {
  popupElement.style.display = 'none';
  popupElement.classList.toggle('overlay');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameElement.textContent = nameInputElement.value;
  descriptionElement.textContent = descriptionInputElement.value;
  closeForm();
}

formEditButton.addEventListener('click', openForm);
formCloseButton.addEventListener('click', closeForm);
formElement.addEventListener('submit', formSubmitHandler);