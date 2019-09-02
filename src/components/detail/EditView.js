import React from 'react';
import IngredientsEdit from './IngredientsEdit';
import { isTemplateElement } from '@babel/types';
import IngredientsAdd from './IngredientsAdd';

const API_URL = 'https://cookbook.jakubricar.cz/api/recipes/';

class EditView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataToUpdate: props.data,
    };


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
    let newIngredients = this.state.dataToUpdate.ingredients.concat(newIngredient);
    console.log('test ', newIngredients);
    this.setState({ dataToUpdate: { ...this.state.dataToUpdate, ingredients: newIngredients } }, () => { console.log(this.state.dataToUpdate.ingredients) })
  };

  handleDelete = itemId => {
    console.log('handling delete in EDITVIEW id: ' + itemId);
    const newIngredients = this.state.dataToUpdate.ingredients.filter(item => item._id !== itemId);
    console.log(newIngredients);
    this.setState({ dataToUpdate: { ...this.state.dataToUpdate, ingredients: newIngredients } }, () => { console.log(this.state.dataToUpdate.ingredients) })
    /*.then(() => console.log(this.state.dataToUpdate.ingredients))
    Zkouska .then, setState je asynchronni, value je jeste undefined
    */;
  };

  submitData = () => {
    const { dataToUpdate } = this.state;
    console.log('SUBMITTING', dataToUpdate);

    const detailUrl = `${API_URL}${dataToUpdate._id}`;

    fetch(detailUrl, {
      body: JSON.stringify(dataToUpdate),
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
    })
      .then(response => response.json())
      .then(resData => console.log('API returned', resData));
  };

  render() {
    const { dataToUpdate } = this.state;
    const { title } = dataToUpdate;
    const { preparationTime } = dataToUpdate;
    const { servingCount } = dataToUpdate;
    const { sideDish } = dataToUpdate;
    const { ingredients } = dataToUpdate;
    const { directions } = dataToUpdate;
    const { _id } = dataToUpdate;

    return (
      <div>
        <h3>EDIT</h3>
        <form action="#" onSubmit={this.submitData}>
          <div>
            <h2>Edit Basic info</h2>
            <label>ID </label>
            <input type="text" name="_id" value={_id} onChange={this.handleChange} />
            <label>Title </label>
            <input type="text" name="title" value={title} onChange={this.handleChange} />
          </div>
          <div>
            <label>Preparation time </label>
            <input type="text" name="preparationTime" value={preparationTime} onChange={this.handleChange} />
          </div>
          <div>
            <label>Number of portions </label>
            <input type="text" name="servingCount" value={servingCount} onChange={this.handleChange} />
          </div>
          <div>
            <label>Side dish </label>
            <input type="text" name="sideDish" value={sideDish} onChange={this.handleChange} />
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

export default EditView;
