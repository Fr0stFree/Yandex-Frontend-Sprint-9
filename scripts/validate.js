// Функция показа ошибки валидации поля
const showInputError = (input, inputErrorClass, errorClass) => {
  const errorElement = document.querySelector(`.${input.id}-error`);
  errorElement.classList.add(errorClass);
  errorElement.textContent = input.validationMessage;
  input.classList.add(inputErrorClass);
};

// Функция скрытия ошибки валидации поля
const hideInputError = (input, inputErrorClass, errorClass) => {
  const errorElement = document.querySelector(`.${input.id}-error`);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
  input.classList.remove(inputErrorClass);
};

// Функция валидации поля
const validateInput = (input, ...args) => input.validity.valid ? hideInputError(input, ...args) : showInputError(input, ...args);

// Функция проверки формы на валидность
const isFormValid = form => Array.from(form.elements).every(input => input.validity.valid);

// Функция изменения состояния кнопки в зависимости от параметра isValid
const toggleButtonState = (button, isValid, inactiveButtonClass) => {
  if (isValid) {
    button.classList.remove(inactiveButtonClass);
    button.removeAttribute('disabled');
  } else {
    button.classList.add(inactiveButtonClass);
    button.setAttribute('disabled', true);
  }
}

// Функция установки слушателей на форму
const setFormListeners = (form, submitButtonSelector, inputErrorClass, inactiveButtonClass, errorClass)  => form.addEventListener('input', event => {
  toggleButtonState(form.querySelector(submitButtonSelector), isFormValid(form), inactiveButtonClass);
  validateInput(event.target, inputErrorClass, errorClass);
});

const enableValidation = ({formSelector, submitButtonSelector, inputErrorClass, inactiveButtonClass, errorClass}) => {
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach(form => setFormListeners(form, submitButtonSelector, inputErrorClass, inactiveButtonClass, errorClass));
}

enableValidation({
  formSelector: '.popup__base-form',
  submitButtonSelector: '.popup__input_type_submit',
  inputErrorClass: 'popup__input_type_error',
  inactiveButtonClass: 'popup__input_type_submit-disabled',
  errorClass: 'popup__input-error_active'
});