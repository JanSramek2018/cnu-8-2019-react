import React from 'react';
import IngredientsEdit from './IngredientsEdit';
import { isTemplateElement } from '@babel/types';

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

  handleDelete = itemId => {
    console.log('handling delete in EDITVIEW id: ' + itemId);
    const newIngredients = this.state.dataToUpdate.ingredients.filter(item => item._id !== itemId);
    console.log(newIngredients);
    this.setState({...this.state.dataToUpdate, ingredients: newIngredients});
    const ingredients = this.state.dataToUpdate.ingredients
    console.log(ingredients);
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
            <h2>Edit Ingredients</h2>
            <IngredientsEdit ingredients={ingredients} onDelete={this.handleDelete} />
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
