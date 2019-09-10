import React from 'react';
import { Table } from 'reactstrap';

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

      <Table size="sm">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Unit</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>{ingredients.map(generateIngredientRow)}</tbody>
      </Table>

    );
  }
}

export default Ingredients;
