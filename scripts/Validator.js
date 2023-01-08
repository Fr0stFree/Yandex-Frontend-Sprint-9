class FormValidator {
  constructor(configData, formElement) {
    this._formElement = formElement;
    this._submitButtonSelector = configData.submitButtonSelector;
    this._inactiveButtonClass = configData.inactiveButtonClass;
    this._inputErrorClass = configData.inputErrorClass;
    this._errorClass = configData.errorClass;
  }

  enableValidation() {
    this._setFormListeners();
    this._toggleButtonState();
  }

  _setFormListeners() {
    this._formElement.addEventListener('input', event => {
      this._toggleButtonState();
      this._checkInputValidityAndRiseError(event.target);
    });
  }

  _toggleButtonState() {
    const button = this._formElement.querySelector(this._submitButtonSelector);
    if (this._isFormValid()) {
      button.classList.remove(this._inactiveButtonClass);
      button.removeAttribute('disabled');
    } else {
      button.classList.add(this._inactiveButtonClass);
      button.setAttribute('disabled', true);
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
    const errorElement = document.querySelector(`.${input.id}-error`);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
    input.classList.remove(this._inputErrorClass);
  }
}


export default FormValidator;