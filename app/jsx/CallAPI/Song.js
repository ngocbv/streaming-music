import BaseAPI from "./BaseAPI";

export default class Song extends BaseAPI {
  static getList(callback, options = {}) {
    this.sendAjax(callback, {
      url: "songs",
      data: options
    });
  }

  static create(callback, song) {
    this.sendAjax(callback, {
      url: "songs",
      method: "POST",
      data: song
    });
  }
}
