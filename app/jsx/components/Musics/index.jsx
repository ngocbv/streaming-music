import Player from "../Player";
import { connect } from "react-redux";
import { setSongList, play } from "../../actions";

class Musics extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			playingUrl: "",
			playing: false,
			songs: [],
		}
	}

	componentDidMount() {
		CallAPI.Song.getList(this.handleGetListCallback);
	}

	// componentWillReceiveProps(nextProps) {
	// 	console.log(nextProps)
	// }

	handleGetListCallback = (status, data) => {
		this.props.onSetSongList(data.songs);
		this.setState({
			songs: data.songs,
		});
	}

	handleClickSong = (url) => {
		this.setState({
			playingUrl: url,
		});
		this.props.onPlay();
	}

	render() {
		console.log(this.props)
		return (
			<div>
				<mui.Table>
	        <mui.TableBody>
	          {this.state.songs.map((song, index) => (
	            <mui.TableRow
	            	key={index}
	            	className="pointer"
	            	onTouchTap={() => this.handleClickSong(song.url)}
	            >
	              <mui.TableRowColumn>{song.id}</mui.TableRowColumn>
	              <mui.TableRowColumn>{song.name}</mui.TableRowColumn>
	            </mui.TableRow>
	            ))
	       		}
	        </mui.TableBody>
	      </mui.Table>

	      <Player
	      	url={this.state.playingUrl}
	      	playing={this.state.playing}
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
	};
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onSetSongList: (songs) => {dispatch(setSongList(songs))},
    onPlay: () => {dispatch(play())},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Musics);
