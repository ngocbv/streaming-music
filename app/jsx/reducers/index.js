import { combineReducers } from "redux";
import movie from "./movie";
import music from "./music";

const player = combineReducers({
	movie,
	music,
});

export default player;
