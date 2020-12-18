// --- КЛАСС ОТВЕЧАЮЩИЙ ЗА ОТРИСОВКУ ЭЛЕМЕНТОВ НА СТРАНИЦЕ ---

export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._itemsArray = items; // массив данных, который нужно добавить на страницу при инициализации класса
    this._renderer = renderer; // функция, которая отвечает за создание и отрисовку данных на странице
    this._container = document.querySelector(containerSelector);
  }

  //метод, который отвечает за отрисовку всех элементов
  renderItems() {
    this._itemsArray.forEach(item => this._renderer(item));
  }

  //метод, который принимает DOM-элемент и добавляет его в начало контейнера
  addItem(element) {
    this._container.prepend(element);
  }
}
