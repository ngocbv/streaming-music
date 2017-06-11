import Player from "../Player";

class Movie extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Player
        url={"ShapeOfYou.mp3"}
      />
    );
  };
}

export default Movie;
