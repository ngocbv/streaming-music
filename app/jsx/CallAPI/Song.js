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

  static import(callback, attachment) {
    this.sendAjax(callback, {
      url: "songs/import",
      method: "POST",
      processData: false,
      contentType: false,
      data: attachment
    });
  }
}
