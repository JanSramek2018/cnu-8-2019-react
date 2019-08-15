import React from 'react';

const API_URL = 'https://cookbook.jakubricar.cz/api/recipes/';

class Listing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidMount = () => {
    fetch(API_URL)
      .then(response => response.json())
      .then(dataFromApi => {
        this.setState({ data: dataFromApi });
      });
  };

  render() {
    const { data } = this.state;
    const { goToDetail } = this.props;

    const arrayProcessing = function(item, index) {
      const { _id, title, preparationTime } = item;

      const output = `Recepie "${title}" preparation time: ${preparationTime}`;

      return (
        <li
          key={index}
          onClick={() => {
            goToDetail(_id);
          }}
        >
          {output}
        </li>
      );
    };

    return (
      <div>
        <ul>{data.map(arrayProcessing)}</ul>
      </div>
    );
  }
}

export default Listing;
