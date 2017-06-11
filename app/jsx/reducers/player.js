const defaultState = {
  playing: false,
  played: 0,
  volume: 0.8,
  mute: 0,
  playingMedia: {id: null, url: null},
}

const player = (state = defaultState, action) => {
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
    case "CHANGE_SONG":
      return update(state, {
        playingMedia: {$set: action.media},
      });
    default:
      return state;
  }
}

export default player;
