import { combineReducers } from "redux";
import player from "./player";
import music from "./music";

const streaming_media = combineReducers({
	player,
	music,
});

export default streaming_media;
