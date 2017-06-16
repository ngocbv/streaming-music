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
    return (
      <div>
        <Player
          url={this.state.movie.url}
        />
      </div>
    );
  }
}

export default connect(null, null)(WatchMovie);
