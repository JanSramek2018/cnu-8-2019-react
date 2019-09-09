import React from 'react';
import IngredientsEdit from './IngredientsEdit';
import IngredientsAdd from './IngredientsAdd';
import { Button } from 'reactstrap';

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

      <div>

        <Button color="primary" onClick={goToListing}>Go to Listing</Button>

        <h3>EDIT</h3>

        <div>
          <h2>Edit Basic info</h2>
          <label>Title </label>
          <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
        </div>
        <div>
          <label>Preparation time </label>
          <input type="text" name="preparationTime" value={this.state.preparationTime} onChange={this.handleChange} />
        </div>
        <div>
          <label>Number of portions </label>
          <input type="text" name="servingCount" value={this.state.servingCount} onChange={this.handleChange} />
        </div>
        <div>
          <label>Side dish </label>
          <input type="text" name="sideDish" value={this.state.sideDish} onChange={this.handleChange} />
        </div>

        <div>
          <h2>Edit ingredients</h2>
          <IngredientsEdit ingredients={ingredients} onIngredientDelete={this.handleIngredientDelete} />
          <h3>Add new ingredients</h3>
          <IngredientsAdd ingredients={ingredients} onIngredientAdd={this.handleIngredientAdd} />
          <h2>Edit Description</h2>
          <input type="text" name="directions" value={this.state.directions} onChange={this.handleChange} />
        </div>

        <Button color="primary" onClick={this.submitData}>Create new recipe</Button>

      </div>

    );
  }
}

export default NewRecipeView;
