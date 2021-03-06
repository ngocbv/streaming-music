import ReactDOM from "react-dom";
import {Router, Route, Link, browserHistory, IndexRoute} from "react-router"

import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

global.CallAPI = require("./CallAPI");

import App from "./components/App";
import Uploader from "./components/Uploader";
import Login from "./components/Login";
import Movies from "./components/Movies";
import WatchMovie from "./components/Movies/WatchMovie";
import MusicForm from "./components/Musics/MusicForm";
import Musics from "./components/Musics";
import ImportSong from "./components/Musics/ImportSong";
import Party from "./components/Parties/Party";
import Youtube from "./components/Youtube"
import Cinema from "./components/Cinema";
import Helper from "./Helper";

const router = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Movies} />
      <Route path="/users/sign_in" component={Login} />
      <Route path="/musics" component={Musics} />
      <Route path="/musics/uploader" component={MusicForm} />
      <Route path="/musics/import_songs" component={ImportSong} />
      <Route path="/movies" component={Movies} />
      <Route path="/movies/:id" component={WatchMovie} />
      <Route path="/parties/:id" component={Party} />
      <Route path="/cinema/:id" component={Cinema} />
      <Route path="/youtube/:id" component={Youtube} />
    </Route>
  </Router>
);

import { createStore } from "redux";
import { Provider } from "react-redux";
import reducers from "./reducers";

const store = createStore(reducers);

$(document).on("ready page:load", function() {
  ReactDOM.render(<Helper />, document.getElementById("react-helper"));
  ReactDOM.render(
    <Provider store={store}>
      {router}
    </Provider>, document.getElementById("react-wrapper")
  );
});
