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
      joinedMembers: [],
    };
  }

  componentDidMount() {
    this.scrollToBottom();

    RailsApp.cable.subscriptions.create({channel: "ViewerCinemaChannel", id: this.props.cinemaId}, {
      received: (data) => {
        this.setState({
          joinedMembers: data.viewers,
        });
      }
    });

    RailsApp.cable.subscriptions.create({channel: "ConversationChannel", id: this.props.cinemaId}, {
      received: (data) => {
        console.log(data)
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

  renderMember() {
    let members = this.state.joinedMembers;
    console.log(members)

    return (
      <div>
        {members.map(member => {
          return <span key={member.id} title={member.name}><mui.Avatar src={member.image_url} /></span>
        })}
      </div>
    );
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
          {this.renderMember()}
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
