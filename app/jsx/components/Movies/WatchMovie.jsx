import Player from "../Player";
import { connect } from "react-redux";
import { play } from "../../actions";

class WatchMovie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {},
    };
  }

  componentDidMount() {
    CallAPI.Movie.get(this.handleGetMovieCallback, this.props.params.id);
  }

  handleGetMovieCallback = (status, data) => {
    if (!status) return;
    this.setState({
      movie: data["movie"],
    });
  }

  render() {
    let { movie } = this.state;
    let url = movie.url || movie.stream_media && movie.stream_media.stream_url
    return (
      <div>
        <Player
          url={url}
          height="760px"
        />
      </div>
    );
  }
}

export default connect(null, null)(WatchMovie);
