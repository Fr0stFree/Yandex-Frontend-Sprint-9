import Card from './Card.js';
import FormValidator from './Validator.js';


const profilePopup = document.querySelector('.popup_type_profile');
const profileForm = profilePopup.querySelector('.popup__profile-form');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileNameElement = document.querySelector('.profile__name');
const profileDescriptionElement = document.querySelector('.profile__description');
const profileNameInputElement = profilePopup.querySelector('.popup__input_type_name');
const profileDescriptionInputElement = profilePopup.querySelector('.popup__input_type_description');

const baseCardTemplateSelector = '#card-template';
const cardPopup = document.querySelector('.popup_type_card');
const cardForm = cardPopup.querySelector('.popup__card-form');
const cardAddButton = document.querySelector('.profile__add-button');
const cardPlaceInputElement = cardPopup.querySelector('.popup__input_type_place');
const cardLinkInputElement = cardPopup.querySelector('.popup__input_type_link');
const cardList = document.querySelector('.elements__element-list');
const initialCards = [
  {
    name: 'Карачаевск',
    link: 'https://images.unsplash.com/photo-1538819285938-6a9b4eda500b'
  },
  {
    name: 'Гора Эльбрус',
    link: 'https://images.unsplash.com/photo-1521311587563-6a3fb9fbaff7'
  },
  {
    name: 'Домбай',
    link: 'https://images.unsplash.com/photo-1556780183-f523058dc29b'
  },
  {
    name: 'Озеро Байкал',
    link: 'https://images.unsplash.com/photo-1602256976419-c82585fe73a7'
  },
  {
    name: 'Алтай',
    link: 'https://images.unsplash.com/photo-1658898294566-b3fa4f8241cd'
  },
  {
    name: 'Сибирь',
    link: 'https://images.unsplash.com/photo-1590414731158-459a3c3d98ca'
  }
];

const validationConfig = {
  submitButtonSelector: '.popup__input_type_submit',
  inputErrorClass: 'popup__input_type_error',
  inactiveButtonClass: 'popup__input_type_submit-disabled',
  errorClass: 'popup__input-error_active'
};


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
  const cardObj = new Card({name: cardPlaceInputElement.value, link: cardLinkInputElement.value},
                           baseCardTemplateSelector);
  renderCard(cardObj.buildElement(), false);
  evt.target.reset();
  _resetButton(evt);
  closePopup(evt.submitter.closest('.popup'));
});

// Вспомогательная функция для сброса состояния кнопки
const _resetButton = evt => {
  const button = evt.target.querySelector(validationConfig.submitButtonSelector);
  button.classList.add(validationConfig.inactiveButtonClass);
  button.setAttribute('disabled', true);
}

// Рендеринг исходных карточек
initialCards.forEach(card => {
  const cardObj = new Card({name: card.name, link: card.link}, baseCardTemplateSelector);
  renderCard(cardObj.buildElement());
});

// Создание экземпляров валидатора для каждой формы и их активация
const profileFormValidator = new FormValidator(validationConfig, profileForm);
const cardFormValidator = new FormValidator(validationConfig, cardForm);
[profileFormValidator, cardFormValidator].forEach(validator => validator.enableValidation());
