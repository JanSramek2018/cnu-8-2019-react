import React from 'react';
import IngredientsEdit from './IngredientsEdit';
import IngredientsAdd from './IngredientsAdd';
import { Button } from 'reactstrap';

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

  handleDelete = itemId => {
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

      <div>

        <h3>EDIT</h3>

        <h2>Edit Basic info</h2>
        <div>
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
          <IngredientsEdit ingredients={ingredients} onIngredientDelete={this.handleDelete} />
          <h3>Add new ingredients</h3>
          <IngredientsAdd ingredients={ingredients} onIngredientAdd={this.handleIngredientAdd} />
          <h2>Edit Description</h2>
          <input type="text" name="directions" value={directions} onChange={this.handleChange} />
        </div>

        <Button color="success" onClick={this.submitData}>Finish editing</Button>

      </div>

    );
  }
}

export default EditView;
