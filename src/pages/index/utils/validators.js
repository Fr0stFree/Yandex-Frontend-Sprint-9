import FormValidator from "../../../components/Validator";
import {validationConfig, avatarFormSelector, cardFormSelector, profileFormSelector} from "./constants";


const avatarFormValidator = new FormValidator(validationConfig, document.querySelector(avatarFormSelector));
const profileFormValidator = new FormValidator(validationConfig, document.querySelector(profileFormSelector));
const cardFormValidator = new FormValidator(validationConfig, document.querySelector(cardFormSelector));

export {avatarFormValidator, profileFormValidator, cardFormValidator};