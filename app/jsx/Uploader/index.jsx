import FileCloudUpload from "material-ui/svg-icons/file/cloud-upload";

class Uploader extends React.Component {
	constructor(props) {
		super(props);
	}

	handleUploadFiles = () => {
		console.log("ABC");
	}

	render() {
		return (
			<div className="upload-component">
        <mui.RaisedButton
          primary={true}
          labelPosition="after"
          icon={<FileCloudUpload color="white" />}
          label="Upload"
          className="upload-button"
        >
          <input
            type="file"
            onChange={this.handleUploadFiles}
            className="file-input"
          />
        </mui.RaisedButton>
      </div>
		);
	}
}

export default Uploader;
