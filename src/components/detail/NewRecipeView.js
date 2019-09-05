import React from 'react';
import IngredientsEdit from './IngredientsEdit';
import IngredientsAdd from './IngredientsAdd';
import { Button } from 'reactstrap';

const API_URL = 'https://cookbook.jakubricar.cz/api/recipes/';
const ingredients = [
  {
    _id: "123456789123456789123456",
    name: "test1",
    amount: "159",
    amountUnit: "g",
  }];

class NewRecipeView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: "123456789123456789123456",
      title: "Recipe title",
      preparationTime: "",
      servingCount: "",
      sideDish: "Side dish",
      directions: "Cooking directions",
      ingredients: ingredients,
    }
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    },
    );
  };

  handleIngredientAdd = (newAmount, newAmountUnit, newName) => {
    newAmount = Number(newAmount);
    let _id = newAmount + newAmountUnit + newName;

    function generate(n) {
      var add = 1, max = 12 - add;   // Stack Overflow generator  
      if (n > max) {
        return generate(max) + generate(n - max);
      }
      max = Math.pow(10, n + add);
      var min = max / 10;
      var number = Math.floor(Math.random() * (max - min + 1)) + min;

      return ("" + number).substring(add);
    };


    /* Zkousel jsem ruzne kombinace id jako let _id = newAmount + newAmountUnit + newName;
    a pote jeste dopocitat do zbytku nahodna cisla, ale nakonec funguje pouze 24 mistne nahodne cislo;
    tato funkce neni uplne idealni pro svou nedostatecnou "nahodnost", ale pro working prototype staci */

    _id = generate(24);
    let newIngredient =
    {
      '_id': _id, 'name': newName, 'amount': newAmount, 'amountUnit': newAmountUnit
    };
    console.log(newIngredient);
    let newIngredients = this.state.ingredients.concat(newIngredient);
    console.log('test ', newIngredients);
    this.setState({ ingredients: newIngredients }, () => { console.log(this.state.ingredients) })
  };

  handleDelete = itemId => {
    console.log('handling delete in EDITVIEW id: ' + itemId);
    const newIngredients = this.state.ingredients.filter(item => item._id !== itemId);
    console.log(newIngredients);
    this.setState({ ingredients: newIngredients }, () => { console.log(this.state.ingredients) })
    /*.then(() => console.log(this.state.dataToUpdate.ingredients))
    Zkouska .then, setState je asynchronni, value je jeste undefined
    */;
  };

  submitData = () => {

    /* const deleteFakeIngredient = this.state.ingredients.filter(item => item._id !== "");
     this.setState({ ingredients: deleteFakeIngredient }, () => { console.log(this.state.ingredients) });
     */
    function generate(n) {
      var add = 1, max = 12 - add;   // Stack Overflow generator  
      if (n > max) {
        return generate(max) + generate(n - max);
      }
      max = Math.pow(10, n + add);
      var min = max / 10;
      var number = Math.floor(Math.random() * (max - min + 1)) + min;

      return ("" + number).substring(add);
    };


    let newRecipe_id = generate(24);
    this.setState({ _id: newRecipe_id }, () => { console.log(`new ID is`, this.state._id) });


    console.log('SUBMITTING', this.state);
    fetch(API_URL, {
      body: JSON.stringify(this.state),
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
    })
      .then(response => response.json())
      .then(resData => console.log('API returned', resData));
  };
  /* setstate mi vypise spravne, ale na API posila stary -> error: Nazev jiz existuje */


  render() {
    const { goToListing } = this.props;
    const { title } = this.state;
    const { preparationTime } = this.state;
    const { servingCount } = this.state;
    const { sideDish } = this.state;
    const { ingredients } = this.state;
    const { directions } = this.state;

    return (
      <div>
        <Button color="primary" onClick={goToListing}>Go to Listing</Button>

        <form action="#" onSubmit={this.submitData}>

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
            <IngredientsEdit ingredients={ingredients} onDelete={this.handleDelete} />
            <h3>Add new ingredients</h3>
            <IngredientsAdd ingredients={ingredients} onIngredientAdd={this.handleIngredientAdd} />
            <h2>Edit Description</h2>
            <input type="text" name="directions" value={directions} onChange={this.handleChange} />
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default NewRecipeView;
