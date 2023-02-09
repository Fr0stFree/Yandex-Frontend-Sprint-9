// Кнопки
import FormValidator from "../../../components/Validator";
import PopupWithImage from "../../../components/PopupWithImage";
import Api from "../../../components/Api";
import PopupWithForm from "../../../components/PopupWithForm";

const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');
const avatarUpdateButton = document.querySelector('.profile__avatar-button');

// Селекторы
const cardListSelector = '.elements__element-list';
const baseCardTemplateSelector = '#card-template';
const cardPopupSelector = '.popup_type_card';
const profilePopupSelector = '.popup_type_profile';
const confirmPopupSelector = '.popup_type_confirm';
const imagePopupSelector = '.popup_type_image';
const avatarPopupSelector = '.popup_type_avatar';
const nameElementSelector = '.profile__name';
const aboutElementSelector = '.profile__description';
const avatarElementSelector = '.profile__avatar';
const cardFormSelector = '.popup__card-form';
const profileFormSelector = '.popup__profile-form';
const avatarFormSelector = '.popup__avatar-form';

// Конфиг валидации
const validationConfig = {
  submitButtonSelector: '.popup__input_type_submit',
  inputErrorClass: 'popup__input_type_error',
  inactiveButtonClass: 'popup__input_type_submit-disabled',
  errorClass: 'popup__input-error_active'
};

export {
  profileEditButton,
  cardAddButton,
  avatarUpdateButton,
  cardListSelector,
  baseCardTemplateSelector,
  cardPopupSelector,
  profilePopupSelector,
  confirmPopupSelector,
  imagePopupSelector,
  avatarPopupSelector,
  nameElementSelector,
  aboutElementSelector,
  avatarElementSelector,
  validationConfig,
  avatarFormSelector,
  profileFormSelector,
  cardFormSelector
};

