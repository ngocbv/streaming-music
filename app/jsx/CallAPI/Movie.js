import BaseAPI from "./BaseAPI";

export default class Movie extends BaseAPI {
  static getList(callback, options = {}) {
    this.sendAjax(callback, {
      url: "movies",
      data: options,
    });
  }

  static create(callback, movie) {
    this.sendAjax(callback, {
      url: "movies",
      method: "POST",
      data: movie,
    });
  }
}
