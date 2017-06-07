import ReactPlayer from "react-player";
import ControlBar from "../ControlBar";
import screenfull from "screenfull";
import { findDOMNode } from "react-dom";

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

  handleFullScreen = () => {
    screenfull.request(findDOMNode(this.refs.player))
  }

  render() {
    let { playing, volume, played } = this.state;

    return (
      <div style={{marginLeft: "10%", width: "80%", marginBottom: "50px", float: "left"}}>
        <ReactPlayer
          controls={false}
          ref="player"
          width="100%"
          height="600px"
          playing={playing}
          volume={volume}
          url={"http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"}
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
          onFullScreen={this.handleFullScreen}
          played={played}
        />
      </div>
    );
  };
}

export default Movie;
