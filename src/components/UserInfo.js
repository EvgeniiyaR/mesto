export default class UserInfo {
  constructor(selectorName, selectorAbout, selectorAvatar) {
    this._selectorName = selectorName;
    this._selectorAbout = selectorAbout;
    this._selectorAvatar = selectorAvatar;
    this._name = document.querySelector(this._selectorName);
    this._about = document.querySelector(this._selectorAbout);
    this._avatar = document.querySelector(this._selectorAvatar);
  }

  getUserInfo() {
    return {author: this._name.textContent, about: this._about.textContent};
  }

  setUserInfo(newName, newAbout) {
    this._name.textContent = newName;
    this._about.textContent = newAbout;
  }

  setUserAvatar(newName, newAvatar) {
    this._avatar.src = newAvatar;
    this._avatar.alt = newName;
  }

  setUserId(id) {
    this._id = id;
  }

  getUserId() {
    return this._id;
  }
}
