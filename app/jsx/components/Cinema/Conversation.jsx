class Conversation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chats: [
        {by: "other", content: "Messages show here!"},
      ],
      message: "",
    };
  }

  componentDidMount() {
    this.scrollToBottom();

    RailsApp.cable.subscriptions.create({channel: "ConversationChannel", id: this.props.cinemaId}, {
      received: (data) => {
        let chats = update(this.state.chats, {$unshift: [data.message]});
        this.setState({
          chats: chats,
        }, () => {this.scrollToBottom()});
      }
    });
  }

  scrollToBottom = () => {
    // const node = document.getElementById("chat-list");
    // node.scrollIntoView(false);
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

  render() {
    return (
      <div style={{width: "15%", float: "right", marginTop: "50px"}}>
        <div className="awesome-scroll conversation">
          <div className="chat-list" id="chat-list">
            {
              this.state.chats.map((chat, index) => (
                <div key={index} className={`chat ${parseInt(chat.by) === App.auth.id ? "owner" : "other"}`}>
                  {chat.content}
                </div>
              ))
            }
          </div>
        </div>
          <div className="type-box">
            <mui.TextField
              hintText="Enter something..."
              className="input"
              value={this.state.message}
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
