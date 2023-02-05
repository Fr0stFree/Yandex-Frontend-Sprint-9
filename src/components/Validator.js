export default class FormValidator {
  constructor(configData, formElement) {
    this._formElement = formElement;
    this._submitButton = formElement.querySelector(configData.submitButtonSelector);
    this._inactiveButtonClass = configData.inactiveButtonClass;
    this._inputErrorClass = configData.inputErrorClass;
    this._errorClass = configData.errorClass;
  }

  enableValidation() {
    this._setFormListeners();
    this._toggleButtonState();
  }

  resetValidation() {
    this._toggleButtonState();
    Array.from(this._formElement.elements).forEach(input => this._hideInputError(input));
  }

  _setFormListeners() {
    this._formElement.addEventListener('input', event => {
      this._checkInputValidityAndRiseError(event.target);
      this._toggleButtonState();
    });
  }

  _toggleButtonState() {
    if (this._isFormValid()) {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.removeAttribute('disabled');
    } else {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.setAttribute('disabled', true);
    }
  }

  _isFormValid() {
    return Array.from(this._formElement.elements).every(input => input.validity.valid);
  }

  _checkInputValidityAndRiseError(input) {
    input.validity.valid ? this._hideInputError(input) : this._showInputError(input);
  }

  _showInputError(input) {
    const errorElement = document.querySelector(`.${input.id}-error`);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = input.validationMessage;
    input.classList.add(this._inputErrorClass);
  }

  _hideInputError(input) {
    if (input.type === 'submit') return;
    const errorElement = document.querySelector(`.${input.id}-error`);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
    input.classList.remove(this._inputErrorClass);
  }
}
