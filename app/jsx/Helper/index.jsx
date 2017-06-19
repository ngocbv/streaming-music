import {browserHistory} from "react-router";

class Helper extends React.Component {
	constructor(props) {
    super(props);
    global.Helper = this;
    this.history = browserHistory;
  }

  transitionTo(pathName, state = {}) {
    let location = {pathname: pathName};
    location["state"] = state;

    browserHistory.push(location);
  }

  render() {
  	return <div></div>
  }
}

export default Helper;
