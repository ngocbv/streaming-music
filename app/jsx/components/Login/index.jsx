import {browserHistory} from 'react-router';
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: "",
        password: "",
      },
    }
  }

  handleChangeInputField = (fieldName, value) => {
    let newState = update(this.state.user, {[fieldName]: {$set: value}});
    this.setState({user: newState});
  }

  handleSubmit = () => {
    CallAPI.Authentication.logIn(this.handleSubmitCallBack, this.state.user);
  }

  handleKeyDownSubmit = (event) => {
    if (event.keyCode === 13) {
      this.handleSubmit();
    }
  }

  handleSubmitCallBack = (status, data) => {
    if (status) {
      browserHistory.replace("/");
    }
    // else {
    //   this.setState({
    //     error: data,
    //   });
    // }
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div className="form-login">
          <h2 className="text-center img-logo"><img src="/images/music_together.jpg"></img></h2>
          <div className="col-md-4 col-md-offset-4 form-group">
            <mui.TextField
              fullWidth={true}
              floatingLabelText="Email"
              hintText="Email"
              value={this.state.user.email}
              onKeyDown={this.handleKeyDownSubmit}
              onChange={(event, value) => this.handleChangeInputField("email", value)}
            /><br />
            <mui.TextField
              fullWidth={true}
              hintText="Password"
              floatingLabelText="Password"
              type="Password"
              value={this.state.user.password}
              onKeyDown={this.handleKeyDownSubmit}
              onChange={(event, value) => this.handleChangeInputField("password", value)}
            /><br />
          </div>
          <div className="col-md-4 col-md-offset-4 form-group text-center login-button">
            <mui.RaisedButton
              fullWidth={true}
              primary={true}
              label="Login"
              onClick={this.handleSubmit}
            />
          </div>
          <div className="col-md-4 col-md-offset-4 form-group text-center error-login-message">
            {this.state.error}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
