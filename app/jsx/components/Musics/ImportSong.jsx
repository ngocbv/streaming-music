import FileCloudUpload from "material-ui/svg-icons/file/cloud-upload";

class ImportSong extends React.Component {
  constructor(props) {
    super(props);
  }

  getAttachmentId() {
    return this.attachmentId;
  }

  handleImportSongs = (event) => {
    let files = event.target.files;
    console.log(files)

    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      console.log(file);
      let attachment = new FormData();
      attachment.append("attachment", file);
      CallAPI.Song.import(this.handleSaveCallback, attachment);
    }
  }

  handleSaveCallback = (status, data) => {
    console.log(status);
    console.log(data);
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
            onChange={this.handleImportSongs}
            className="file-input"
            multiple="multiple"
          />
        </mui.RaisedButton>
      </div>
    );
  }
}

export default ImportSong;
