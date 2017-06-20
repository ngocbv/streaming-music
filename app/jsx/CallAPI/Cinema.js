import BaseAPI from "./BaseAPI";

export default class Cinema extends BaseAPI {
  static create(callback, cinema) {
    this.sendAjax(callback, {
      url: "cinemas",
      method: "POST",
      data: cinema,
    });
  }

  static get(callback, token) {
    this.sendAjax(callback, {
      url: `cinemas/${token}`,
    });
  }
}
