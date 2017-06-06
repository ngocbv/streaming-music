import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

export default class App extends React.Component {
 render() {
   return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        {this.props.children}
      </MuiThemeProvider>
   );
 }
}
