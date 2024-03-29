import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._submitButton = this._popup.querySelector('.popup__input_type_submit');
        this._inputList = this._popup.querySelectorAll('.popup__input');
        this._form = this._popup.querySelector('form')
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        return this._formValues;
    }

    prefillForm(fields) {
        this._inputList.forEach(input => input.value = fields[input.name]);
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', evt => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }

    renderLoading(isLoading) {
      if (isLoading) {
        this._submitButton.textContent = 'Сохранение...';
        this._submitButton.disabled = true;
      } else {
        this._submitButton.textContent = 'Сохранить';
        this._submitButton.disabled = false;
      }
    }

    close() {
      super.close();
      this._form.reset();
    }
}