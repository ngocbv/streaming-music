import SettingDrawer from "./SettingDrawer";

class Conversation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chats: [
        {by: "other", content: "Messages show here!"},
      ],
      message: "",
      openSetting: false,
      capitalize: true,
    };
  }

  componentDidMount() {
    this.scrollToBottom();

    RailsApp.cable.subscriptions.create({channel: "ConversationChannel", id: this.props.cinemaId}, {
      received: (data) => {
        let chats = update(this.state.chats, {$push: [data.message]});
        this.setState({
          chats: chats,
        }, () => {this.scrollToBottom()});
      }
    });
  }

  scrollToBottom = () => {
    const node = document.getElementById("chat-list");
    node.scrollTop = node.scrollHeight;

  }

  handleChangeMessage = (event) => {
    this.setState({
      message: event.target.value,
    });
  }

  handleKeyDownMessage = (event) => {
    if (event.keyCode === 13) {
      let message = this.state.message;
      this.setState({
        message: "",
      });
      if (message !== "") {
        CallAPI.Cinema.sendMessage(() => {}, this.props.cinemaId, {by: App.auth.id, content: message});
      }
    }
  }

  handleToggleCapitalize = (event, value) => {
    console.log(value);
    this.setState({
      capitalize: !this.state.capitalize,
    });
  }

  render() {
    let { capitalize, chats, message } = this.state;

    return (
      <div style={{width: "15%", float: "right", marginTop: "50px"}}>
        <div>
          {/*<SettingDrawer
            capitalize={capitalize}
            onToggleCapitalize={this.handleToggleCapitalize}
          />*/}
        </div>
        <div className="awesome-scroll conversation" id="chat-list">
          <div className="chat-list">
            {
              chats.map((chat, index) => (
                <div key={index} className={`chat ${parseInt(chat.by) === App.auth.id ? "owner" : "other"}`}>
                  <span className="chat-content">
                    {chat.content}
                  </span>
                </div>
              ))
            }
          </div>
        </div>
        <div className="type-box">
          <mui.TextField
            hintText="Enter something..."
            className="input"
            value={message}
            onChange={this.handleChangeMessage}
            onKeyDown={this.handleKeyDownMessage}
            disabled={!App.auth.id}
          />
        </div>
      </div>
    );
  }
}

export default Conversation;
