import ReactDOM from "react-dom";
import {Router, Route, Link, browserHistory, IndexRoute} from "react-router"

import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

global.CallAPI = require("./CallAPI");

import App from "./app";
import Uploader from "./components/Uploader";
import Movie from "./components/Movie";
import MusicForm from "./components/Musics/MusicForm";
import Musics from "./components/Musics";
import ImportSong from "./components/Musics/ImportSong";

const router = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Movie} />
      <Route path="/musics" component={Musics} />
    	<Route path="/musics/uploader" component={MusicForm} />
      <Route path="/musics/import_songs" component={ImportSong} />
    	<Route path="/movies" component={Movie} />
    </Route>
  </Router>
);

import { createStore } from "redux";
import { Provider } from "react-redux";
import reducers from "./reducers";

const store = createStore(reducers);

$(document).on("ready page:load", function() {
  ReactDOM.render(
 	  <Provider store={store}>
 	    {router}
 	  </Provider>, document.getElementById("react-wrapper")
  );
});
