import React from 'react';

class Ingredients extends React.Component {
  render() {
    const { ingredients } = this.props;

    const generateIngredientRow = (ingredient, index) => {
      const { name, amount, amountUnit } = ingredient;
      return (
        <tr key={index}>
          <td>{name}</td>
          <td>{amount}</td>
          <td>{amountUnit}</td>
        </tr>
      );
    };

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Množství</th>
            <th>Jednotka</th>
          </tr>
        </thead>
        <tbody>{ingredients.map(generateIngredientRow)}</tbody>
      </table>
    );
  }
}

export default Ingredients;
