import React from 'react';
import { Button, Table } from 'reactstrap';

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
            <td><Button outline color="danger" onClick={() => this.props.onIngredientDelete(_id)}>Delete</Button></td>
          </tr>
        );
      };
    };

    return (
      <Table size="sm">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Unit</th>
            <th>Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{ingredients.map(generateIngredientRow)}</tbody>
      </Table >

    );
  }
}

export default IngredientsEdit;
