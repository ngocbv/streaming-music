import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "./AppBar";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    global.App = this;
  }

  componentDidMount() {
    CallAPI.Authentication.index(this.handleGetAuthenticationCallback);
  }

  handleGetAuthenticationCallback = (status, data) => {
    if (!status) return;
    this.auth = data;
    this.forceUpdate();
  }

  render() {
    if (!this.auth) return null;

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <AppBar />
          {this.props.children}
        </div>
      </MuiThemeProvider>
   );
 }
}
