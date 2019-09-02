import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';

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

    const arrayProcessing = function (item, index) {
      const { _id, title, preparationTime } = item;

      const output = `Recipe: "${title}" Preparation time: ${(preparationTime - preparationTime % 60) / 60} h ${preparationTime % 60} min`;

      return (
        <Card
          key={index}
          onClick={() => {
            goToDetail(_id);
          }}
        >
          <CardBody>
            <CardTitle>{output}</CardTitle>
          </CardBody>
        </Card>
      );

    };

    return (
      <div>
        <div>{data.map(arrayProcessing)}</div>
      </div>
    );
  }
}

export default Listing;
