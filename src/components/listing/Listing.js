import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';

class Listing extends React.Component {

  render() {
    const { data } = this.props;
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
