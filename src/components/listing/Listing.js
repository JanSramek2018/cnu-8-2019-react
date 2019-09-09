import React from 'react';
import { Button } from 'reactstrap';
import { Card, CardBody, CardTitle } from 'reactstrap';

class Listing extends React.Component {

  render() {

    const { data, goToDetail, goToNewRecipe } = this.props;

    const arrayProcessing = function (item, index) {
      const { _id, title, preparationTime } = item;
      const output = `Recipe: "${title}" Preparation time: ${(preparationTime - preparationTime % 60) / 60} h ${preparationTime % 60} min`;

      return (
        <Card key={index} onClick={() => { goToDetail(_id); }}>
          <CardBody>
            <CardTitle>{output}</CardTitle>
          </CardBody>
        </Card>
      );
    };

    return (
      <div>
        <Button color="success" onClick={goToNewRecipe}>Create a recipe!</Button>
        <div>{data.map(arrayProcessing)}</div>
      </div>
      
    );
  }
}

export default Listing;
