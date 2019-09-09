import React from 'react';

class Ingredients extends React.Component {


  render() {

    const { ingredients } = this.props;

    const generateIngredientRow = (ingredient, index) => {
      const { name, amount, amountUnit } = ingredient;
      return (
        <tr key={index}>
          <td>{amount}</td>
          <td>{amountUnit}</td>
          <td>{name}</td>
        </tr>
      );
    };

    return (

      <table>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Unit</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>{ingredients.map(generateIngredientRow)}</tbody>
      </table>

    );
  }
}

export default Ingredients;
