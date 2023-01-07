const profileEditButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_type_profile');
const profileNameElement = document.querySelector('.profile__name');
const profileDescriptionElement = document.querySelector('.profile__description');
const profileNameInputElement = profilePopup.querySelector('.popup__input_type_name');
const profileDescriptionInputElement = profilePopup.querySelector('.popup__input_type_description');

const cardAddButton = document.querySelector('.profile__add-button');
const cardPopup = document.querySelector('.popup_type_card');
const cardPlaceInputElement = cardPopup.querySelector('.popup__input_type_place');
const cardLinkInputElement = cardPopup.querySelector('.popup__input_type_link');
const cardList = document.querySelector('.elements__element-list');

const imagePopup = document.querySelector('.popup_type_image');
const imageZoomedLinkElement = imagePopup.querySelector('.popup__image');
const imageZoomedCaptionElement = imagePopup.querySelector('.popup__image-caption');



// Функция рендеринга карточки в DOM
const renderCard = (instance, append=true) => append ? cardList.append(instance)
                                                             : cardList.prepend(instance);

// Функция закрытия попапа по Escape
const closeByEscape = evt => evt.key === 'Escape' && closePopup(document.querySelector('.popup_opened'));

// Функции открытия попапа
const openPopup = popup => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
};

// Функция закрытия попапа
const closePopup = popup => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
};

// Слушатели событий на закрытие попапов при клике на оверлей или по крестику.
document.querySelectorAll('.popup')
  .forEach(popup =>
    popup.addEventListener('mousedown', evt =>
      (evt.target.classList.contains('popup_opened') ||
        evt.target.classList.contains('popup__close-button')) && closePopup(popup)));

// Слушатель события на кнопку открытия формы создания новой карточки
cardAddButton.addEventListener('click', () => openPopup(cardPopup));

// Слушатель события на кнопку редактирования данных профиля
profileEditButton.addEventListener('click', () => {
  profileNameInputElement.value = profileNameElement.textContent;
  profileDescriptionInputElement.value = profileDescriptionElement.textContent;
  openPopup(profilePopup);
});

// Слушатель события на кнопку сохранения данных профиля
profilePopup.addEventListener('submit', evt => {
  evt.preventDefault();
  profileNameElement.textContent = profileNameInputElement.value;
  profileDescriptionElement.textContent = profileDescriptionInputElement.value;
  closePopup(evt.submitter.closest('.popup'));
});

// Слушатель события на кнопку сохранения новой карточки
cardPopup.addEventListener('submit', evt => {
  evt.preventDefault();
  renderCard(createCard(cardPlaceInputElement.value, cardLinkInputElement.value), false);
  evt.target.reset();
  toggleButtonState(evt.submitter, false, validationElementsData.inactiveButtonClass);
  closePopup(evt.submitter.closest('.popup'));
});

// Рендеринг исходных карточек
initialCards.forEach(card => renderCard(createCard(card.name, card.link)));
