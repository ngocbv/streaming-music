import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Movie from "./Movie";

export default class App extends React.Component {
 render() {
   return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Movie />
      </MuiThemeProvider>
   );
 }
}
