import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, {id}, handleFormSubmit) {
        super(popupSelector);
        this._id = id;
        this._handleFormSubmit = handleFormSubmit;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', evt => {
            evt.preventDefault();
            this._handleFormSubmit();
        });
    }
}