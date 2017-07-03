import ReactPlayer from "react-player";
import ControlBar from "../ControlBar";
import screenfull from "screenfull";
import { findDOMNode } from "react-dom";
import { connect } from "react-redux";
import { togglePlay, play, pause, progress, setDuration } from "../../actions";

class Player extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      volume: 0.8,
      duration: 0,
    }
  }

  componentDidMount() {
    RailsApp.cable.subscriptions.create({channel: "PlayersChannel", party: this.props.partyId}, {
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
    CallAPI.Player.play(() => {}, {party_id: this.props.partyId});
  }

  handlePause = () => {
    CallAPI.Player.pause(() => {}, {party_id: this.props.partyId});
  }

  handleSeek = (value) => {
    this.refs.player.seekTo(value);
    CallAPI.Player.seek(() => {}, {seek_value: value, party_id: this.props.partyId});
  }

  handleProgress = (data) => {
    this.props.onProgress(data.played || 0, Math.floor(data.playedSeconds || 0));
    if (this.props.played === 1) {
      this.props.onEndSong();
    }
  }

  handleDuration = (data) => {
    this.props.onDuration(Math.floor(data));
  }

  handleChangeVolume = (volume) => {
    this.setState({volume: volume});
  }

  handleFullScreen = () => {
    screenfull.request(findDOMNode(this.refs.player))
  }

  render() {
    let { volume } = this.state;
    let { playing, played, url, playedSeconds, duration } = this.props;

    return (
      <div style={{float: "left", width: "100%"}}>
        <ReactPlayer
          controls={false}
          ref="player"
          height={this.props.height || "0px"}
          width="100%"
          style={{backgroundColor: "black",}}
          playing={playing}
          volume={volume}
          url={url}
          onPlay={this.handlePlay}
          onPause={this.handlePause}
          onProgress={this.handleProgress}
          onDuration={this.handleDuration}
        />
        <ControlBar
          onSeek={this.handleSeek}
          playing={playing}
          onPlay={this.handlePlay}
          onPause={this.handlePause}
          onChangeVolume={this.handleChangeVolume}
          onFullScreen={this.handleFullScreen}
          played={played}
          playedSeconds={playedSeconds}
          duration={duration}
        />
      </div>
    );
  };
}

const mapStateToProps = (state, ownProps) => {
  return {
    playing: state.player.playing,
    played: state.player.played,
    playedSeconds: state.player.playedSeconds,
    duration: state.player.duration,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onTogglePlay: () => {dispatch(togglePlay())},
    onPlay: () => {dispatch(play())},
    onPause: () => {dispatch(pause())},
    onProgress: (played, playedSeconds) => {dispatch(progress(played, playedSeconds))},
    onDuration: (duration) => {dispatch(setDuration(duration))},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
