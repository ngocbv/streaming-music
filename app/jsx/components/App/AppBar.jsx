import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

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
    let icons = (
      <div>
        <mui.IconMenu
          iconButtonElement={<mui.IconButton><MoreVertIcon /></mui.IconButton>}
          anchorOrigin={{horizontal: 'left', vertical: 'top'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
        >
          {App.auth.id ?
            <mui.MenuItem primaryText="Sign out" onClick={this.handleLogout} /> :
            <mui.MenuItem primaryText="Log in" onClick={() => Helper.transitionTo("/users/sign_in")} />
          }
        </mui.IconMenu>
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
