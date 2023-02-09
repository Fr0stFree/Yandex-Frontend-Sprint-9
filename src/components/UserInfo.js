export default class UserInfo {
    constructor({nameElementSelector, aboutElementSelector, avatarElementSelector}) {
      this._nameElement = document.querySelector(nameElementSelector);
      this._aboutElement = document.querySelector(aboutElementSelector);
      this._avatarElement = document.querySelector(avatarElementSelector);
    }

    set info({_id=null, name=this._nameElement.textContent, about=this._aboutElement.textContent, avatar=this._avatarElement.src}) {
      this._id = _id;
      this._nameElement.textContent = name;
      this._aboutElement.textContent = about;
      this._avatarElement.src = avatar;
    }

    get info() {
      return {
        id: this._id,
        name: this._nameElement.textContent,
        about: this._aboutElement.textContent,
        avatar: this._avatarElement.src
      };
    }

}