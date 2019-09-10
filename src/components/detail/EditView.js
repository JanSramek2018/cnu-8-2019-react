import React from 'react';
import IngredientsEdit from './IngredientsEdit';
import IngredientsAdd from './IngredientsAdd';
import { Button, Row, Col, Label, Input } from 'reactstrap';
import './EditView.css';

const API_URL = 'https://cookbook.jakubricar.cz/api/recipes/';

class EditView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dataToUpdate: props.data,
    };
  }

  create_UUID = () => {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[x]/g, function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      dataToUpdate: {
        ...this.state.dataToUpdate,
        [name]: value,
      },
    });
  };

  handleIngredientAdd = (newAmount, newAmountUnit, newName) => {
    newAmount = Number(newAmount);
    let _id = this.create_UUID();
    let newIngredient =
    {
      '_id': _id,
      'name': newName,
      'amount': newAmount,
      'amountUnit': newAmountUnit
    };
    let newIngredients = this.state.dataToUpdate.ingredients.concat(newIngredient);
    this.setState({ dataToUpdate: { ...this.state.dataToUpdate, ingredients: newIngredients } })
  };

  handleIngredientDelete = itemId => {
    const newIngredients = this.state.dataToUpdate.ingredients.filter(item => item._id !== itemId);
    this.setState({ dataToUpdate: { ...this.state.dataToUpdate, ingredients: newIngredients } })
  };

  submitData = () => {
    const { dataToUpdate } = this.state;
    const detailUrl = `${API_URL}${dataToUpdate._id}`;

    fetch(detailUrl, {
      body: JSON.stringify(dataToUpdate),
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
    }).then(() => this.props.onRecipeEdit(dataToUpdate._id));
  };


  render() {

    const { dataToUpdate } = this.state;
    const { title, preparationTime,
      servingCount,
      sideDish,
      ingredients,
      directions } = dataToUpdate;

    return (

      <div className="container-fluid">

        <h3 className="container-fluid d-block text-left">Edit recipe</h3>
        <h5 className="container-fluid d-block text-left">
          <Label>Title: </Label> <Input type="text" name="title" value={title} onChange={this.handleChange} />
        </h5>

        <div className="container-fluid d-block text-left">
          <Label>Number of portinons:</Label><Input type="text" name="servingCount" value={servingCount} onChange={this.handleChange} />
        </div>
        <div className="container-fluid d-block text-left">
          <Label>Preparation time: </Label><Input type="text" name="preparationTime" value={preparationTime} onChange={this.handleChange} />
        </div>
        <div className="container-fluid d-block text-left">
          <Label>Side dish: </Label><Input type="text" name="sideDish" value={sideDish} onChange={this.handleChange} />
        </div>

        <div className="container-fluid justify-content-start d-flex mt-3 text-left">
          <Row>
            <Col>
              <h5>Delete Ingredients:</h5>
              <IngredientsEdit ingredients={ingredients} onIngredientDelete={this.handleIngredientDelete} />
              <h5>Add new ingredients</h5>
              <IngredientsAdd ingredients={ingredients} onIngredientAdd={this.handleIngredientAdd} />
            </Col>
            <Col className="d-block">
              <h5>Preparation:</h5>
              <Input type="text" size="2000" name="directions" value={directions} onChange={this.handleChange} />
            </Col>
          </Row>
        </div>
        <div className="container-fluid d-block text-center mt-5"><Button outline color="success" onClick={this.submitData}>Finish editing</Button></div>


      </div>

    );
  }
}

export default EditView;
