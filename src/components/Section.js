// --- КЛАСС ОТВЕЧАЮЩИЙ ЗА ОТРИСОВКУ ЭЛЕМЕНТОВ НА СТРАНИЦЕ ---

export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer; // функция, которая отвечает за создание и отрисовку данных на странице
    this._container = document.querySelector(containerSelector);
  }

  //метод, который отвечает за отрисовку всех элементов
  renderItems(arr, id) {
    arr.forEach((item)=> this._renderer(item, id));
  }

  //метод, который принимает DOM-элемент и добавляет его в начало контейнера
  addItem(element) {
    this._container.append(element);
  }

  addItemPrepend(element) {
    this._container.prepend(element);
  }
}
