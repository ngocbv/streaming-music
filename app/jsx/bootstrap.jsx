import ReactDOM from "react-dom";
import {Router, Route, Link, browserHistory} from "react-router"

import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

global.CallAPI = require("./CallAPI");

import App from "./app";
import Uploader from "./Uploader";
import Movie from "./Movie";

const router = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
    	<Route path="/movies" component={Movie} />
    	<Route path="/uploader" component={Uploader} />
    </Route>
  </Router>
);

$(document).on("ready page:load", function() {
 ReactDOM.render(router, document.getElementById("react-wrapper"));
});
