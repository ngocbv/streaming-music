import Player from "../Player";
import { connect } from "react-redux";
import { setMovieList, play, changeMovie } from "../../actions";

class Movies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
    }
  }

  componentDidMount() {
    CallAPI.Movie.getList(this.handleGetListCallback);
    RailsApp.cable.subscriptions.create({channel: "PlayersChannel", party: this.props.partyId}, {
      received: (data) => {
        switch(data["type"]) {
          case "change_movie":
            this.props.onChangeMovie(data.value);
            this.props.onPlay();
            break;
        }
      }
    });
  }

  handleGetListCallback = (status, data) => {
    // this.props.onSetMovieList(data.movies);
    this.setState({
      movies: data.movies,
    });
  }

  handleClickMovie = (id, url) => {
    this.props.onChangeMovie({id, url});
    this.props.onPlay();
    CallAPI.Player.changeMovie(() => {}, id, this.props.partyId);
    let movie = this.state.movies.find(movie => movie.id === id);
    if (movie) document.title = movie.name;
  }

  handleEndMovie = () => {
    let index = this.state.movies.findIndex(movie => movie.id === this.props.playingMovie.id);
    let nextMovie = this.state.movies[index + 1];
    if (nextMovie) {
      this.handleClickMovie(nextMovie.id, nextMovie.url);
    }
  }

  render() {
    let playingMovie = this.props.playingMovie;

    return (
      <div>

        <mui.Table className="movie-list">
          <mui.TableBody>
            {this.state.movies.map((movie, index) => (
              <mui.TableRow
                key={index}
                className={`pointer ${playingMovie.id === movie.id ? "playing-movie" : null}`}
                selected={true}
                onTouchTap={() => this.handleClickMovie(movie.id, movie.url)}
              >
                <mui.TableRowColumn>{movie.id}</mui.TableRowColumn>
                <mui.TableRowColumn>{movie.name}</mui.TableRowColumn>
              </mui.TableRow>
              ))
            }
          </mui.TableBody>
        </mui.Table>
        <Player
          url={playingMovie.url}
          playing={this.state.playing}
          onEndMovie={this.handleEndMovie}
          partyId={this.props.partyId}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    movies: state.music.movies || [{name: "Shape of you"}],
    playingMovie: state.player.playingMedia,
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSetMovieList: (movies) => {dispatch(setMovieList(movies))},
    onPlay: () => {dispatch(play())},
    onChangeMovie: (movie) => {dispatch(changeMovie(movie))},
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
