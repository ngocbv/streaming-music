import { combineReducers } from "redux";
import player from "./player";
import music from "./music";
import movie from "./movie";

const streaming_media = combineReducers({
  player,
  music,
  movie,
});

export default streaming_media;
