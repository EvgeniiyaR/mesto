export default class Section {
  constructor({ items, renderer }, selectorContainer) {
    this._selectorContainer = document.querySelector(selectorContainer);
    this._items = items;
    this._renderer = renderer;
  }

  renderItems() {
    this._items.reverse().forEach((initialCard) => this._renderer(initialCard));

  }

  addItem(cardElement) {
    this._selectorContainer.prepend(cardElement);
  }
}
