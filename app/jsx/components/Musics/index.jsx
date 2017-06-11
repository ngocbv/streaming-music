import Player from "../Player";
import { connect } from "react-redux";
import { setSongList, play, changeSong } from "../../actions";

class Musics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
    }
  }

  componentDidMount() {
    CallAPI.Song.getList(this.handleGetListCallback);
    RailsApp.cable.subscriptions.create("PlayersChannel", {
      received: (data) => {
        switch(data["type"]) {
          case "change_song":
            this.props.onChangeSong(data.value);
            this.props.onPlay();
            break;
        }
      }
    });
  }

  handleGetListCallback = (status, data) => {
    this.props.onSetSongList(data.songs);
    this.setState({
      songs: data.songs,
    });
  }

  handleClickSong = (id, url) => {
    this.props.onChangeSong({id, url});
    this.props.onPlay();
    CallAPI.Player.changeSong(() => {}, id);
    let song = this.state.songs.find(song => song.id === id);
    if (song) document.title = song.name;
  }

  handleEndSong = () => {
    let index = this.state.songs.findIndex(song => song.id === this.props.playingSong.id);
    let nextSong = this.state.songs[index + 1];
    if (nextSong) {
      this.handleClickSong(nextSong.id, nextSong.url);
    }
  }

  render() {
    let playingSong = this.props.playingSong;

    return (
      <div>
        <mui.Table className="song-list">
          <mui.TableBody>
            {this.state.songs.map((song, index) => (
              <mui.TableRow
                key={index}
                className={`pointer ${playingSong.id === song.id ? "playing-song" : null}`}
                selected={true}
                onTouchTap={() => this.handleClickSong(song.id, song.url)}
              >
                <mui.TableRowColumn>{song.id}</mui.TableRowColumn>
                <mui.TableRowColumn>{song.name}</mui.TableRowColumn>
              </mui.TableRow>
              ))
            }
          </mui.TableBody>
        </mui.Table>

        <Player
          url={playingSong.url}
          playing={this.state.playing}
          onEndSong={this.handleEndSong}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state)
  console.log(state.music)
  console.log(state.music.songs)
  return {
    songs: state.music.songs || [{name: "Shape of you"}],
    playingSong: state.player.playingMedia,
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSetSongList: (songs) => {dispatch(setSongList(songs))},
    onPlay: () => {dispatch(play())},
    onChangeSong: (song) => {dispatch(changeSong(song))},
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Musics);
