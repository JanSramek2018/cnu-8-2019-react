import React from 'react';

import Ingredients from './Ingredients';
import RecepieView from './RecepieView';

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
    const { goToListing } = this.props;
    const { data } = this.state;

    return (
      <div>
        <button onClick={goToListing}>Go to Listing</button>
        <RecepieView data={data} />
      </div>
    );
  }
}

export default Detail;
