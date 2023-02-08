export default class Section {
    constructor({items, renderer}, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }
    
    renderItems() {
        this._container.innerHTML = '';
        this._items.forEach(item => this._renderer(item));
    }
    
    addItem(element) {
        this._container.prepend(element);
    }

    removeItem(element) {
      // iterate and console log each element in container
      console.log(this._container.children);
    }
}
