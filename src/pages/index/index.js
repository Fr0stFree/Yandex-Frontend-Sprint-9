import Card from '../../components/Card.js';
import FormValidator from '../../components/Validator.js';
import Section from '../../components/Section.js';
import PopupWithForm from '../../components/PopupWithForm.js';
import PopupWithImage from '../../components/PopupWithImage.js';
import UserInfo from '../../components/UserInfo.js';
import cards from './cards.js';
import './index.css';


// Кнопки
const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');

// Селекторы
const cardListSelector = '.elements__element-list';
const baseCardTemplateSelector = '#card-template';
const cardPopupSelector = '.popup_type_card';
const profilePopupSelector = '.popup_type_profile';
const profileNameElementSelector = '.profile__name';
const profileDescriptionElementSelector = '.profile__description';
const imagePopupSelector = '.popup_type_image';

// Элементы
const profileNameInputElement = document.querySelector('.popup__input_type_name');
const profileDescriptionInputElement = document.querySelector('.popup__input_type_description');

// Формы
const profileForm = document.querySelector('.popup__profile-form');
const cardForm = document.querySelector('.popup__card-form');

// Конфиг валидации
const validationConfig = {
  submitButtonSelector: '.popup__input_type_submit',
  inputErrorClass: 'popup__input_type_error',
  inactiveButtonClass: 'popup__input_type_submit-disabled',
  errorClass: 'popup__input-error_active'
};

// Функция создания экземпляра карточки
const createCard = data => new Card(data, baseCardTemplateSelector, () => imagePopup.open(data));

// Попап для увеличения изображения
const imagePopup = new PopupWithImage(imagePopupSelector);

// Секция с карточками
const cardSection = new Section(
  {items: cards, renderer: item => cardSection.addItem(createCard(item).buildElement())},
  cardListSelector
);

// Класс для работы с полями пользователя
const user = new UserInfo({nameSelector: profileNameElementSelector, descriptionSelector: profileDescriptionElementSelector});

// Попап с формой редактирования данных профиля
const profilePopup = new PopupWithForm(profilePopupSelector, data => {
  user.setUserInfo(data);
  profilePopup.close();
});

// Валидаторы
const profileFormValidator = new FormValidator(validationConfig, profileForm);
const cardFormValidator = new FormValidator(validationConfig, cardForm);

// Попап с формой создания новой карточки
const cardPopup = new PopupWithForm(cardPopupSelector, data => {
  const card = createCard({title: data.place, link: data.link});
  cardSection.addItem(card.buildElement());
  cardPopup.close();
});

// Рендеринг карточек
cardSection.renderItems();

// Установка слушателей на попапы и кнопки
[profilePopup, cardPopup, imagePopup].forEach(popup => popup.setEventListeners());
cardAddButton.addEventListener('click', () => {
  cardFormValidator.resetValidation();
  cardPopup.open();
})
profileEditButton.addEventListener('click', () => {
  const {name, description} = user.getUserInfo();
  profileNameInputElement.value = name;
  profileDescriptionInputElement.value = description;
  profileFormValidator.resetValidation();
  profilePopup.open();
});

// Активация валидации форм
[profileFormValidator, cardFormValidator].forEach(validator => validator.enableValidation());
