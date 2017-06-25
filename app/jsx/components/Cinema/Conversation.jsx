class Conversation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chats: [
        {by: "other", content: "Hello world!"},
        {by: "other", content: "Hello world!"},
        {by: "other", content: "Hello world!"},
        {by: "other", content: "Hello world!"},
        {by: "other", content: "Hello world!"},
        {by: "other", content: "Hello world!"},
      ],
      message: "",
    };
  }

  componentDidMount() {
    this.scrollToBottom();
    CallAPI.Cinema.get(this.handleGetCinemaCallback, 1);
    console.log(this.props.cinemaId)

    RailsApp.cable.subscriptions.create({channel: "ConversationChannel", id: this.props.cinemaId}, {
      received: (data) => {
        console.log(data)
        // switch(data["type"]) {
        //   case "play":
        //     this.props.onPlay();
        //     break;
        //   case "pause":
        //     this.props.onPause();
        //     break;
        //   case "seek":
        //     this.refs.player.seekTo(data["value"]);
        //     break;
        // }
      }
    });
  }

  shouldComponentUpdate() {
    this.scrollToBottom();
    return true;
  }

  scrollToBottom = () => {
    const node = document.getElementById("chat-list");
    node.scrollIntoView(false);
  }

  handleChangeMessage = (event) => {
    this.setState({
      message: event.target.value,
    });
  }

  handleKeyDownMessage = (event) => {
    if (event.keyCode === 13) {
      let message = event.target.value;
      let chats = update(this.state.chats, {$push: [{by: "me", content: message}]});
      CallAPI.Cinema.sendMessage(() => {}, this.props.cinemaId, message);

      this.setState({
        chats: chats,
        message: "",
      }, () => {this.scrollToBottom()});
    }
  }

  render() {
    return (
      <div style={{width: "15%", float: "right"}}>
        <div className="awesome-scroll conversation">
          <div className="chat-list" id="chat-list">
            {
              this.state.chats.map((chat, index) => (
                <div key={index} className={`chat ${chat.by === "me" ? "owner" : null}`}>
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
              />
            </div>
      </div>
    );
  }
}

export default Conversation;
