import React from 'react';
import IngredientsEdit from './IngredientsEdit';
import IngredientsAdd from './IngredientsAdd';
import { Button, Row, Col, Label, Input } from 'reactstrap';

const API_URL = 'https://cookbook.jakubricar.cz/api/recipes/';
const ingredients = [];


class NewRecipeView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: "",
      title: "",
      preparationTime: "",
      servingCount: "",
      sideDish: "",
      directions: "",
      ingredients: ingredients,
    }
  };

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
      [name]: value,
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
    let newIngredients = this.state.ingredients.concat(newIngredient);
    this.setState({ ingredients: newIngredients })
  };

  handleIngredientDelete = itemId => {
    const newIngredients = this.state.ingredients.filter(item => item._id !== itemId);
    this.setState({ ingredients: newIngredients })
  };

  submitData = () => {
    let newRecipe_id = this.create_UUID();
    this.setState({ _id: newRecipe_id },
      () => {
        fetch(API_URL, {
          method: 'POST',
          body: JSON.stringify(this.state),
          headers: {
            'content-type': 'application/json',
            'authority': 'cookbook.jakubricar.cz'
          }
        })
          .then(response => response.json())
          .then(() => this.props.onNewRecipeCreate(this.state._id));
      })
  };


  render() {

    const { goToListing } = this.props;
    const { ingredients } = this.state;

    return (

      <div className="container-fluid">

        <Button outline color="primary" onClick={goToListing}>Go to Listing</Button>

        <h3 className="container-fluid d-block text-left">Create recipe</h3>
        <h5 className="container-fluid d-block text-left">
          <Label>Title: </Label> <Input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
        </h5>

        <div className="container-fluid d-block text-left">
          <Label>Number of portinons:</Label><Input type="text" name="servingCount" value={this.state.servingCount} onChange={this.handleChange} />
        </div>
        <div className="container-fluid d-block text-left">
          <Label>Preparation time: </Label><Input type="text" name="preparationTime" value={this.state.preparationTime} onChange={this.handleChange} />
        </div>
        <div className="container-fluid d-block text-left">
          <Label>Side dish: </Label><Input type="text" name="sideDish" value={this.state.sideDish} onChange={this.handleChange} />
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
              <Input type="text" size="2000" name="directions" value={this.state.directions} onChange={this.handleChange} />
            </Col>
          </Row>
        </div>
        <div className="container-fluid d-block text-center mt-5"><Button outline color="success" onClick={this.submitData}>Create new recipe</Button></div>
      </div>

    );
  }
}

export default NewRecipeView;
