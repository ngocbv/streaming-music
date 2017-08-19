import WatchMovie from "../Movies/WatchMovie";
import Conversation from "./Conversation";

class Cinema extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cinema: {},
    };
  }

  componentDidMount() {
    CallAPI.Cinema.get(this.handleGetCinemaCallback, this.props.params.id);

    // window.onbeforeunload = function() {
    //   console.log("GAGAAG");
    //   return "sdf";
    // }
    // window.addEventListener("beforeunload", (ev) => {
    //   ev.preventDefault();
    //   console.log("ABCDE")
    //   ev.returnValue = "efefe";
    //   return null;
    // }, false);
  }

  handleGetCinemaCallback = (status, data) => {
    if (!status) return;
    this.setState({
      cinema: data.cinema,
    }, () => CallAPI.Cinema.joinCinema(() => {}, this.props.params.id));
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
        <Conversation
          cinemaId={cinema.unique_token}
        />
      </div>
    );
  }
}

export default Cinema;
