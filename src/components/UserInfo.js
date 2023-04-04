export default class UserInfo {
  constructor(selectorName, selectorAbout) {
    this._selectorName = selectorName;
    this._selectorAbout = selectorAbout;
    this._name = document.querySelector(this._selectorName);
    this._about = document.querySelector(this._selectorAbout);
  }

  getUserInfo() {
    return {name: this._name.textContent, about: this._about.textContent};
  }

  setUserInfo(newName, newAbout) {
    this._name.textContent = newName;
    this._about.textContent = newAbout;
  }
}
