import BaseAPI from "./BaseAPI";

export default class Authentication extends BaseAPI {
  static index(callback) {
    this.sendAjax(callback, {
      url: "authentication",
    });
  }

  static logIn(callback, user) {
    this.sendAjax(callback, {
      url: "sessions",
      method: "POST",
      data: user
    });
  }
}
