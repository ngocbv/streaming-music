import ReactPlayer from "react-player";
import ControlBar from "../ControlBar";
import screenfull from "screenfull";
import { findDOMNode } from "react-dom";
import { connect } from "react-redux";
import { togglePlay, play, pause, progress } from "../../actions";

class Player extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      volume: 0.8,
    }
  }

  componentDidMount() {
    RailsApp.cable.subscriptions.create("PlayersChannel", {
      received: (data) => {
        switch(data["type"]) {
          case "play":
            this.props.onPlay();
            break;
          case "pause":
            this.props.onPause();
            break;
          case "seek":
            this.refs.player.seekTo(data["value"]);
            break;
        }
      }
    });
  }

  handlePlay = () => {
    CallAPI.Player.play(() => {});
  }

  handlePause = () => {
    CallAPI.Player.pause(() => {});
  }

  handleSeek = (value) => {
    this.refs.player.seekTo(value);
    CallAPI.Player.seek(() => {}, {seek_value: value});
  }

  handleProgress = (data) => {
    this.props.onProgress(data.played);
    if (this.props.played === 1) {
      this.props.onEndSong();
    }
  }

  handleChangeVolume = (volume) => {
    this.setState({volume: volume});
  }

  handleFullScreen = () => {
    screenfull.request(findDOMNode(this.refs.player))
  }

  render() {
    let { volume } = this.state;
    let { playing, played, url } = this.props;
    console.log("playing")
    console.log(playing)

    return (
      <div style={{float: "left"}}>
        <ReactPlayer
          controls={false}
          ref="player"
          height="0px"
          playing={playing}
          volume={volume}
          url={url}
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

const mapStateToProps = (state, ownProps) => {
  return {
    playing: state.player.playing,
    played: state.player.played,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onTogglePlay: () => {dispatch(togglePlay())},
    onPlay: () => {dispatch(play())},
    onPause: () => {dispatch(pause())},
    onProgress: (value) => {dispatch(progress(value))},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
