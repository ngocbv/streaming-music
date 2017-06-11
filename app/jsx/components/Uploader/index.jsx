import FileCloudUpload from "material-ui/svg-icons/file/cloud-upload";

class Uploader extends React.Component {
  constructor(props) {
    super(props);
  }

  getAttachmentId() {
    return this.attachmentId;
  }

  handleUploadFiles = (event) => {
    var file = event.target.files[0];
    var attachment = new FormData();

    attachment.append("attachment", file);
    CallAPI.Attachment.create(this.handleSaveCallback, attachment);
  }

  handleSaveCallback = (status, data) => {
    this.attachmentId = data.attachment.id;
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
            multiple="multiple"
          />
        </mui.RaisedButton>
      </div>
    );
  }
}

export default Uploader;
