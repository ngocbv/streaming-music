import { combineReducers } from "redux";
import movie from "./movie";

const player = combineReducers({
	movie,
});

export default player;
