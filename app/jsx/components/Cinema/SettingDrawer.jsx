import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class SettingDrawer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    }
  }

  handleToggleDrawer = () => {
    this.setState({
      open: !this.state.open,
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props)
    console.log(nextProps)
  }

  render() {
    let { open } = this.state;
    let { capitalize, ontoggleCapitalize } = this.props;

    return (
      <div>
        <MoreVertIcon
          onClick={this.handleToggleDrawer}
        />
        <mui.Drawer
          width={200}
          open={open}
          docked={true}
        >
          <mui.Toggle
            label="Capitalize"
            onTouchTap={ontoggleCapitalize}
          />
        </mui.Drawer>
      </div>
    );
  }
}

export default SettingDrawer;
