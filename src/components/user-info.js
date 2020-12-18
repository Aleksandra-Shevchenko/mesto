// --- КЛАСС ОТОБРАЖЕНИЯ ИНФОРМАЦИИ О ПОЛЬЗОВАТЕЛЕ НА СТРАНИЦЕ ---

export default class UserInfo {
  constructor({ selectorName, selectorJob }) {
    this._elementName =  document.querySelector(selectorName);
    this._elementJob = document.querySelector(selectorJob);
  }

  //который возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии
  getUserInfo() {
    return this._profileData = {
      popupName: this._elementName.textContent,
      popupJob: this._elementJob.textContent,
    };
  }

  //который принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo({ popupName, popupJob }) {
    this._elementName.textContent = popupName;
    this._elementJob.textContent = popupJob;
  }
}
