export default class Card {
  constructor({title, link, id}, cardTemplateSelector, {handleCardClick, handleDeleteClick, handleLikeClick}) {
    this._id = id;
    this._title = title;
    this._link = link;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
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
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._title, this._link));
    this._cardElement.querySelector('.card__remove-button')
                     .addEventListener('click', evt => this._deletionClickHandler(evt));
    this._cardElement.querySelector('.card__like-button')
                     .addEventListener('click', evt => this._likeClickHandler(evt));
  }

  _deletionClickHandler(evt) {
    this._handleDeleteClick(this._id);
    // evt.target.closest('.elements__element').remove();
  }

  _likeClickHandler(evt) {
    this._handleLikeClick(evt);
    evt.target.classList.toggle('card__like-button_active');
  }
}
