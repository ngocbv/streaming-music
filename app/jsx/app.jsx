import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

class AppBarExampleComposition extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      logged: true,
    };
  }

  handleChange = (event, logged) => {
    this.setState({logged: logged});
  };

  render() {
    return (
      <div>
        <h3>AppBar</h3>
        <mui.Toggle
          label="Logged"
          defaultToggled={true}
          onToggle={this.handleChange}
          labelPosition="right"
          style={{margin: 20}}
        />
        <mui.AppBar
          title="Title"
          iconElementRight={this.state.logged ? <mui.FlatButton label="Logged" /> : <mui.FlatButton label="Login" />}
        />

        <h3>Badge</h3>
        <div>
          <mui.Badge
            badgeContent={4}
            primary={true}
          >
            <NotificationsIcon />
          </mui.Badge>
          <mui.Badge
            badgeContent={10}
            secondary={true}
            badgeStyle={{top: 12, right: 12}}
          >
            <mui.IconButton tooltip="Notifications">
              <NotificationsIcon />
            </mui.IconButton>
          </mui.Badge>
        </div>

        <h3>Date Picker</h3>
        <div>
          <mui.DatePicker hintText="Portrait Dialog" />
          <mui.DatePicker hintText="Landscape Dialog" mode="landscape" />
          <mui.DatePicker hintText="Dialog Disabled" disabled={true} />
        </div>
      </div>
    );
  }
}

import { SoundPlayerContainer } from 'react-soundplayer/addons';

const clientId = 'ngocbv';
const resolveUrl = 'https://soundcloud.com/thrilljockey/future-islands-balance';

class AppPlayer extends React.Component {
  constructor(props){
    super(props);
  }

  trackReady = () => {
    console.log('Track can be played!')
    // Enable the play button, or start playing programmatically, etc
  }

  render() {
    return (
      <div>
        <SoundPlayerContainer
          clientId={clientId}
          resolveUrl={resolveUrl}
          onReady={this.trackReady}
        >
          ABC
        </SoundPlayerContainer>
      </div>
    );
  }
}


export default class App extends React.Component {
 render() {
   return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        {/*You can replace AppBarExampleComposition to your code*/}
        <AppPlayer />
      </MuiThemeProvider>
   );
 }
}
