import Player from "../Player";
import { connect } from "react-redux";
import { setMovieList, play, changeMovie } from "../../actions";
import StarBorder from "material-ui/svg-icons/toggle/star-border";

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
  },
  gridList: {
    overflowY: 'auto',
    width: '100%',
  },
};

class Movies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      textSearch: "",
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

  handleChangeTextSearch = (event) => {
    this.textSearch = event.target.value;
  }

  handleSubmitSearch = () => {
    CallAPI.Movie.getList(this.handleGetListCallback, {query: this.textSearch});
  }

  handleKeyDownSubmit = (event) => {
    if (event.keyCode === 13) {
      this.handleSubmitSearch();
    }
  }

  render() {
    let playingMovie = this.props.playingMovie;
    let movies = this.state.movies.map(movie => ({
      id: movie.id,
      img: movie.background_url,
      title: movie.name,
    }));

    return (
      <div style={{margin: 30}}>
        <div>
          <mui.TextField
            hintText="Search film as you want..."
            onChange={this.handleChangeTextSearch}
            onKeyDown={this.handleKeyDownSubmit}
          />
          <mui.RaisedButton
            label="GO"
            primary={true}
            style={{margin: 12}}
            onClick={this.handleSubmitSearch}
          />
        </div>
        <div style={styles.root}>
          <mui.GridList
            className="row"
            cellHeight={200}
            style={styles.gridList}
            cols={5}
          >
            {movies.map((movie) => (
              <mui.GridTile className="pointer"
                key={movie.id}
                title={<div title={movie.title}>{movie.title}</div>}
                actionIcon={<mui.IconButton><StarBorder color="white" /></mui.IconButton>}
                titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
              >
                <img src={movie.img || "http://phimmoi.newsuncdn.com/film/938/poster.thumb.jpg"} />
              </mui.GridTile>
            ))}
          </mui.GridList>
        </div>
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
