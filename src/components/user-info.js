// --- КЛАСС ОТОБРАЖЕНИЯ ИНФОРМАЦИИ О ПОЛЬЗОВАТЕЛЕ НА СТРАНИЦЕ ---

export default class UserInfo {
  constructor({ selectorName, selectorJob, selectorAvatar }) {
    this._elementName =  document.querySelector(selectorName);
    this._elementJob = document.querySelector(selectorJob);
    this._avatar = document.querySelector(selectorAvatar);
  }

  //метод который возвращает объект с данными пользователя
  getUserInfo() {
    return this._profileData = {
      name: this._elementName.textContent,
      about: this._elementJob.textContent,
    };
  }

  //метод который принимает новые данные пользователя и добавляет их на страницу
  setUserInfo({ name, about, avatar }) {
    this._elementName.textContent = name;
    this._elementJob.textContent = about;
    this._avatar.src = avatar;
  }
}
