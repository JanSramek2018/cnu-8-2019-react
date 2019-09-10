import React from 'react';
import Ingredients from './Ingredients';
import { Row, Col } from 'reactstrap';

class RecipeView extends React.Component {


  render() {

    const { data } = this.props;

    const {
      title,
      servingCount,
      preparationTime,
      directions,
      ingredients = [],
      lastModifiedDate,
      sideDish,
    } = data;

    return (

      <div className="container-fluid">

        <h3 className="container-fluid d-block text-left">{title}</h3>
        <div className="container-fluid d-block text-left">Serving count: {servingCount}</div>
        <div className="container-fluid d-block text-left">Preparation time: {(preparationTime - preparationTime % 60) / 60} h {preparationTime % 60} min</div>
        <div className="container-fluid d-block text-left">Side dish: {sideDish}</div>

        <div className="container-fluid justify-content-start d-flex mt-3 text-left">
          <Row>
            <Col>
              <h5>Ingredients:</h5>
              <Ingredients ingredients={ingredients} />
            </Col>
            <Col>
              <h5>Preparation:</h5>
              <div>{directions}</div>
            </Col>
          </Row>
        </div>
        <div className="container-fluid d-block text-center mt-5">Modified: {String(lastModifiedDate).slice(0, 10)}</div>


      </div>

    );
  }
}

export default RecipeView;
