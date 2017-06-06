import ReactPlayer from "react-player";
import ControlBar from "../ControlBar";

class Movie extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      played: 0,
      playing: false,
      volume: 80,
    }
  }

  componentDidMount() {
    RailsApp.cable.subscriptions.create("MoviesChannel", {
      received: (data) => {
        switch(data["type"]) {
          case "play":
            this.setState({playing: true});
            break;
          case "pause":
            this.setState({playing: false});
            break;
          case "seek":
            this.refs.player.seekTo(data["value"]);
            break;
        }
      }
    });
  }

  handlePlay = () => {
    CallAPI.Movie.play(() => {});
  }

  handlePause = () => {
    CallAPI.Movie.pause(() => {});
  }

  handleSeek = (value) => {
    this.refs.player.seekTo(value);
    CallAPI.Movie.seek(() => {}, {seek_value: value});
  }

  handleProgress = (data) => {
    console.log(data);
    this.setState({
      played: data.played,
    });
  }

  handleChangeVolume = (volume) => {
    this.setState({volume: volume});
  }

  render() {
    let { playing, volume, played } = this.state;

    return (
      <div>
        <ReactPlayer
          controls={true}
          ref="player"
          width="1000px"
          height="660px"
          playing={playing}
          volume={volume}
          url={"https://www.youtube.com/watch?v=2fngvQS_PmQ"}
          onPlay={this.handlePlay}
          onPause={this.handlePause}
          onProgress={this.handleProgress}
        />
        <ControlBar
          onSeek={this.handleSeek}
          playing={playing}
          onPlay={this.handlePlay}
          onPause={this.handlePause}
          onChangeVolume={this.handleChangeVolume}
          played={played}
        />
      </div>
    );
  };
}

export default Movie;
