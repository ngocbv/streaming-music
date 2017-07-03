import PlayIcon from "material-ui/svg-icons/av/play-arrow";
import PauseIcon from "material-ui/svg-icons/av/pause";
import VolumeDown from "material-ui/svg-icons/av/volume-down";
import VolumeUp from "material-ui/svg-icons/av/volume-up";
import VolumeOff from "material-ui/svg-icons/av/volume-off";
import FullScreen from "material-ui/svg-icons/navigation/fullscreen";

class ControlBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      played: 0,
      volume: 0.8,
      mute: false,
    }
  }

  formatTime(time = 0) {
    let second = time%60;
    time = Math.floor(time/60);
    let minute = time%60;
    let hour = Math.floor(time/60);
    return `${hour > 0 ? `${hour}:` : ""}${minute < 10 ? `0${minute}` : minute}:${
      second < 10 ? `0${second}` : second}`;
  }

  handleDragStopSeek = () => {
    this.props.onSeek(this.state.played);
  }

  handleChangeSeek = (event, newValue) => {
    this.setState({played: newValue});
  }

  handleChangeVolume = (event, newValue) => {
    this.setState({volume: newValue, mute: newValue <= 0});
    this.props.onChangeVolume(newValue);
  }

  handleClickVolumeIcon = () => {
    const { mute, volume } = this.state;
    let volumeValue = mute ? volume : 0;
    this.props.onChangeVolume(volumeValue);

    this.setState({mute: !mute});
  }

  render() {
    let { volume, mute } = this.state;
    if (mute) volume = 0;
    const volumeIcon = volume > 0.5 ? <VolumeUp /> : (volume > 0 ? <VolumeDown /> :
      <VolumeOff />);

    return (
      <div className="control-bar">
        <span className="seek-slider">
          <mui.Slider
            onChange={this.handleChangeSeek}
            onDragStop={this.handleDragStopSeek}
            value={this.props.played}
            sliderStyle={{color: "blue"}}
            style={{color: "blue"}}
          />
        </span>
        <div className="control">
          <span className="playing">
            {this.props.playing ?
              <PauseIcon
                onClick={this.props.onPause}
              /> :
              <PlayIcon
                onClick={this.props.onPlay}
              />
            }
          </span>
          <span className="timing">
            {this.formatTime(this.props.playedSeconds)} / {this.formatTime(this.props.duration)}
          </span>
          <span className="volume">
            <div onClick={this.handleClickVolumeIcon}>{volumeIcon}</div>
          </span>
          <span className="volume-slider">
            <mui.Slider
              style={{width: 100}}
              onChange={this.handleChangeVolume}
              defaultValue={0.8}
              value={volume}
            />
          </span>
          <span className="full-screen">
            <FullScreen onClick={this.props.onFullScreen} />
          </span>
        </div>
      </div>
    );
  }
}

export default ControlBar;
