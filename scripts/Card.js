const cardTemplate = document.querySelector('#card-template');


class Card {
  constructor(title, link) {
    this._title = title;
    this._link = link;
  }

  createCard() {
    this._cardElement = cardTemplate.cloneNode(true).content;
    this._cardTitle = this._cardElement.querySelector('.card__title');
    this._cardImage = this._cardElement.querySelector('.card__image');
    this._cardTitle.textContent = this._title;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._title;
    this._setEventListeners();
    return this._cardElement;
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick();
    });
    this._cardElement.querySelector('.card__delete-button')
      .addEventListener('click', () => this._handleDeleteClick);
    this._cardElement.querySelector('.card__like-button')
      .addEventListener('click', evt => this._handleLikeClick(evt));

  }

  _handleCardClick() {
    imageZoomedLinkElement.src = this._link;
    imageZoomedLinkElement.alt = this._title;
    imageZoomedCaptionElement.textContent = this._title;
    openPopup(imagePopup);
  }

  _handleDeleteClick() {
    this._cardElement.remove();
  }

  _handleLikeClick(evt) {
    evt.target.classList.toggle('card__like-button_active');
  }
}
