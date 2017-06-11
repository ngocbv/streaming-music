import BaseAPI from "./BaseAPI";

export default class Player extends BaseAPI {
  static play(callback, options = {}) {
    console.log(options)
    this.sendAjax(callback, {
      url: "players/play",
      method: "POST",
      data: options,
    });
  }

  static pause(callback, options = {}) {
    this.sendAjax(callback, {
      url: "players/pause",
      method: "POST",
      data: options,
    });
  }

  static seek(callback, options = {}) {
    this.sendAjax(callback, {
      url: "players/seek",
      method: "POST",
      data: options,
    });
  }

  static changeSong(callback, songId) {
    this.sendAjax(callback, {
      url: "players/change_song",
      method: "POST",
      data: {song_id: songId},
    });
  }

}
