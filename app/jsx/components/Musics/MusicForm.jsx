import Uploader from "../Uploader";

class MusicForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			song: {},
		};
	}

	onChangeText = (fieldName, value) => {
		let song = update(this.state.song, {[fieldName]: {$set: value}});
		this.setState({
			song: song,
		});
	}

	onCreateSong = () => {
		let attachmentId = this.refs.uploader.getAttachmentId();
		let song = update(this.state.song, {attachment_id: {$set: attachmentId}})
		CallAPI.Song.create(this.handleCreateSongCallback, {song: song})
	}

	handleCreateSongCallback = (status, data) => {
		console.log(data)
	}

	render() {
		console.log(this.state)
		return (
			<div>
				<label>Name</label>
				<mui.TextField
					value={this.state.song.name}
					onChange={(event, value) => this.onChangeText("name", value)}
				/>
				<Uploader ref="uploader" />
				<mui.RaisedButton
					label="Create"
					onClick={this.onCreateSong}
				/>
			</div>
		);
	}
}

export default MusicForm;
