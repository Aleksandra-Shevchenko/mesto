export class UserInfo {
  constructor({ selectorName, selectorJob }) {
    this._elementName =  document.querySelector(selectorName);
    this._elementJob = document.querySelector(selectorJob);
  }

  //который возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии
  getUserInfo() {
    return this._profileData = {
      popupName: this._elementName.textContent,
      popoupJob: this._elementJob.textContent,
    };
  }


  //который принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo({ name, job }) {
    this._elementName.textContent = name;
    this._elementJob.textContent = job;
  }
}
