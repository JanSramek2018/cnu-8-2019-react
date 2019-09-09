import React from 'react';

class IngredientsEdit extends React.Component {

  render() {
    const { ingredients } = this.props;
    const generateIngredientRow = (ingredient, index) => {
      const { _id, name, amount, amountUnit } = ingredient;
      if (_id !== "") {
      return (
        <tr key={index} value={_id}>
          <td>{amount}</td>
          <td>{amountUnit}</td>
          <td>{name}</td>
          <td><button className="btn btn-danger" onClick={() => this.props.onIngredientDelete(_id)}>Delete</button></td>
        </tr>
      );
    };
  };

  return(
      <table>
  <thead>
    <tr>
      <th>Amount</th>
      <th>Unit</th>
      <th>Name</th>
      <th></th>
    </tr>
  </thead>
  <tbody>{ingredients.map(generateIngredientRow)}</tbody>
      </table >
    );
  }
}

export default IngredientsEdit;
