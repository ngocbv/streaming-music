import Musics from "../Musics";

class Party extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Musics
          partyId={this.props.params.id}
        />
      </div>
    );
  }
}

export default Party;
