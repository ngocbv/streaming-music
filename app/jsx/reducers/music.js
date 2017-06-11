const defaultState = {
  songs: [],
};

const music = (state = defaultState, action) => {
  switch(action.type) {
    case "SET_SONG_LIST":
      state.songs = action.songs;
      return state;
    default:
      return state;
  }
}

export default music;
