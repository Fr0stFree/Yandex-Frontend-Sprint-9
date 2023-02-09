export default class Section {
    constructor({items = [], renderer}, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }
    
    renderItems() {
      this._container.innerHTML = '';
      this._container.append(...this._items.map(item => this._renderer(item)));
    }

    addItem(item) {
      this._items.unshift(item);
      this._container.prepend(this._renderer(item));
    }

    removeItem(id) {
      this._items = this._items.filter(item => item._id !== id);
      this.renderItems();
    }

    set items(items) {
      this._items = items;
    }
}
