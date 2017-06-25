export default class AppBar extends React.Component {
  constructor(props) {
    super(props);
  }

  handleLogout = () => {
    $.ajax({
      url: "/users/sign_out",
      method: "DELETE",
      success(response) {
        window.location.href = "/";
      }
    });
  }

  render() {
    let icons =(
      <div>
        {App.auth.id ?
          <mui.FlatButton label="Sign out" onClick={this.handleLogout} /> :
          <mui.FlatButton label="Log in" onClick={() => Helper.transitionTo("/users/sign_in")} />
        }
      </div>
    );

    return (
      <mui.AppBar
        title="Streaming Media"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
        iconElementRight={icons}
      />
    );
  }
}
