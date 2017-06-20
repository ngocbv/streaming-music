import WatchMovie from "../Movies/WatchMovie";

class Cinema extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cinema: {},
    };
  }

  componentDidMount() {
    CallAPI.Cinema.get(this.handleGetCinemaCallback, this.props.params.id);
  }

  handleGetCinemaCallback = (status, data) => {
    if (!status) return;
    this.setState({
      cinema: data.cinema,
    });
  }

  render() {
    let cinema = this.state.cinema;
    if (!cinema.unique_token) return null;
    let movie = cinema.movie;
    return (
      <div>
        <WatchMovie
          movie={movie}
          partyId={cinema.unique_token}
        />
      </div>
    );
  }
}

export default Cinema;
