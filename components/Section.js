// класс Секшен отвечает за отрисовку элементов на странице

export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._itemsArray = items; //это массив данных, которые нужно добавить на страницу при инициализации класса
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer; // это функция, которая отвечает за создание и отрисовку данных на странице.

  }

  //публичный метод, который отвечает за отрисовку всех элементов.
  renderItems() {
    this._itemsArray.forEach(item => {
      this._renderer(item);
    });
  }


  //публичный метод, который принимает DOM-элемент и добавляет его в контейнер.
  addItem(element) {
    this._container.append(element);
  }

}
