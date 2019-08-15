import React from 'react';

const API_URL = 'https://cookbook.jakubricar.cz/api/recipes/';

class Detail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: false,
    };
  }

  componentDidMount = () => {
    const { detailId } = this.props;

    const detailUrl = `${API_URL}${detailId}`;

    fetch(detailUrl)
      .then(response => response.json())
      .then(dataFromApi => {
        this.setState({ data: dataFromApi });
      });
  };

  render() {
    const { goToListing, detailId } = this.props;
    console.log('detailId', detailId);
    const { data } = this.state;
    console.log('Data from state are', data);

    return (
      <div>
        <h2>This is detail</h2>
        <button onClick={goToListing}>Go to Listing</button>
      </div>
    );
  }
}

export default Detail;
