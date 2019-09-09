import React from 'react';
import './Listing.css';
import { Button } from 'reactstrap';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';

class Listing extends React.Component {

  render() {

    const { data, goToDetail, goToNewRecipe } = this.props;

    const arrayProcessing = function (item, index) {
      const { _id, title, preparationTime } = item;
      const cardText = `${(preparationTime - preparationTime % 60) / 60} h ${preparationTime % 60} min`;

      return (
        <Col sm={12} md={6} lg={3}>
          <Card className="recipeCard" key={index} onClick={() => { goToDetail(_id); }}>
            <CardBody className="">
              <CardTitle className="recipeCardTitle">{title}</CardTitle>
              <CardText className="recipeCardText">{cardText}</CardText>
            </CardBody>
          </Card>
        </Col>
      );
    };

    return (
      <>
        <Button color="success" onClick={goToNewRecipe}>Create a recipe!</Button>
        <Container fluid className="d-flex d-block justify-content-center p-5">
          <Row>
            {data.map(arrayProcessing)}
          </Row>
        </Container>
      </>

    );
  }
}

export default Listing;
