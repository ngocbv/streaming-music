import PlayIcon from "material-ui/svg-icons/av/play-circle-filled";
import PauseIcon from "material-ui/svg-icons/av/pause-circle-filled";
import VolumeDown from "material-ui/svg-icons/av/volume-down";
import VolumeUp from "material-ui/svg-icons/av/volume-up";
import VolumeOff from "material-ui/svg-icons/av/volume-off";

class ControlBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      played: 0,
      volume: 0.8,
      mute: false,
    }
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
      <div>
        {this.props.playing ?
          <PauseIcon
            onClick={this.props.onPause}
          /> :
          <PlayIcon
            onClick={this.props.onPlay}
          />
        }
        <div onClick={this.handleClickVolumeIcon}>{volumeIcon}</div>
        <mui.Slider
          style={{width: 100}}
          onChange={this.handleChangeVolume}
          defaultValue={0.8}
          value={volume}
        />
        <mui.Slider
          onChange={this.handleChangeSeek}
          onDragStop={this.handleDragStopSeek}
          value={this.props.played}
        />
      </div>
    );
  }
}

export default ControlBar;
