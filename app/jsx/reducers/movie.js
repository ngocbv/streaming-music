const defaultState = {
  movies: [],
};

const movie = (state = defaultState, action) => {
  switch(action.type) {
    case "SET_MOVIE_LIST":
      state.movies = action.movies;
      return state;
    default:
      return state;
  }
}

export default movie;
