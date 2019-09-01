import React from 'react';

class IngredientsAdd extends React.Component {

  handleIngAddAmount = event => {
    amount = event.target.value;
  };
  handleIngAddAmountUnit = event => {
    amountUnit = event.target.value;
  };
  handleIngAddName = event => {
    name = event.target.value;
  };

  render() {
    var amount = "Amount";
    var amountUnit = "Unit";
    var name = "Name";

    return (
      <table>
      <thead>
        <tr>
          <th>Amount</th>
          <th>Unit</th>
          <th>Name</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><input type="text" name="amount" value={amount} onChange={this.handleIngAddAmount} /></td>
          <td><input type="text" name="amountUnit" value={amountUnit} onChange={this.handleIngAddAmountUnit} /></td>
          <td><input type="text" name="name" value={name} onChange={this.handleIngAddName} /></td>
          <td><button onClick={() => this.props.onIngredientAdd(name, amount, amountUnit)}>Add</button></td>
        </tr>
      </tbody>
      </table>
    );
  }
}

export default IngredientsAdd;
