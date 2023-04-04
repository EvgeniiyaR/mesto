export default class Section {
  constructor({ renderer }, selectorContainer) {
    this._selectorContainer = document.querySelector(selectorContainer);
    this._renderer = renderer;
    this.isDefault = true;
  }

  renderItems(items) {
    this._items = items;
    this._items.forEach((initialCard) => this._renderer(initialCard, this.isDefault));
  }

  addItem(cardElement) {
    this._selectorContainer.prepend(cardElement);
  }

  addItems(cardElement) {
    this._selectorContainer.append(cardElement);
  }
}
