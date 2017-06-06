import BaseAPI from "./BaseAPI";

export default class Movie extends BaseAPI {
  static play(callback, options = {}) {
    this.sendAjax(callback, {
      url: "movies/play",
      method: "POST",
      data: options,
    });
  }

  static pause(callback, options = {}) {
    this.sendAjax(callback, {
      url: "movies/pause",
      method: "POST",
      data: options,
    });
  }

  static seek(callback, options = {}) {
    this.sendAjax(callback, {
      url: "movies/seek",
      method: "POST",
      data: options,
    });
  }

}
