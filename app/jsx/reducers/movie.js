const defaultState = {
  playing: false,
  played: 0,
  volume: 0.8,
  mute: 0,
}

const movie = (state = defaultState, action) => {
  switch(action.type) {
    case "TOGGLE_PLAY":
      return update(state, {
        playing: {$set: !state.playing},
      });
    case "PLAY":
      return update(state, {
        playing: {$set: true},
      });
    case "PAUSE":
      return update(state, {
        playing: {$set: false},
      });
    case "PROGRESS":
      return update(state, {
        played: {$set: action.value},
      });
    default:
      return state;
  }
}

export default movie;
