import React from 'react';

const API_URL = 'https://cookbook.jakubricar.cz/api/recipes/';

/**
 * What do need
 * Data - DONE
 * output them in a list - DONE
 * add ability to go to detail
 */
class Listing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: ['One', 'two'],
      poky: 'doky',
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
    console.log('Data from state are', data);

    const arrayProcessing = function(item) {
      const { _id, title, preparationTime } = item;

      const output = `Recepie "${title}" preparation time: ${preparationTime}`;

      return <li key={_id}>{output}</li>;
    };

    return (
      <div>
        <ul>{data.map(arrayProcessing)}</ul>
      </div>
    );
  }
}

export default Listing;
