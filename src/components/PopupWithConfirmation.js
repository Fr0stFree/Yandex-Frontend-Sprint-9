import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._submitButton = this._popup.querySelector('.popup__input_type_submit');
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', evt => {
            evt.preventDefault();
            this._handleFormSubmit(this._id);
        });
    }

    open({id}) {
      this._id = id;
      super.open();
    }

    renderLoading(isLoading) {
      if (isLoading) {
        this._submitButton.textContent = 'Удаление...';
        this._submitButton.disabled = true;
      } else {
        this._submitButton.textContent = 'Да';
        this._submitButton.disabled = false;
      }
    }
}