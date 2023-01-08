const imagePopup = document.querySelector('.popup_type_image');
const imageZoomedLinkElement = imagePopup.querySelector('.popup__image');
const imageZoomedCaptionElement = imagePopup.querySelector('.popup__image-caption');

class Card {
  constructor(data, cardTemplateSelector) {
    this._title = data.title;
    this._link = data.link;
    this._cardTemplateSelector = cardTemplateSelector;
  }

  buildElement() {
    this._cardElement = document.querySelector(this._cardTemplateSelector)
                                .content.cloneNode(true);
    this._cardTitle = this._cardElement.querySelector('.card__title');
    this._cardImage = this._cardElement.querySelector('.card__image');
    this._cardTitle.textContent = this._title;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._title;
    this._setEventListeners();
    return this._cardElement;
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => this._handleCardClick());
    this._cardElement.querySelector('.card__remove-button')
                     .addEventListener('click', evt => this._handleDeleteClick(evt));
    this._cardElement.querySelector('.card__like-button')
                     .addEventListener('click', evt => this._handleLikeClick(evt));
  }

  _handleCardClick() {
    imageZoomedLinkElement.src = this._link;
    imageZoomedLinkElement.alt = this._title;
    imageZoomedCaptionElement.textContent = this._title;
    openPopup(imagePopup);
  }

  _handleDeleteClick(evt) {
    evt.target.closest('.elements__element').remove();
  }

  _handleLikeClick(evt) {
    evt.target.classList.toggle('card__like-button_active');
  }
}

export default Card;