import Movies from "../Movies";

class Cinema extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Movies
          partyId={this.props.params.id}
        />
      </div>
    );
  }
}

export default Cinema;
