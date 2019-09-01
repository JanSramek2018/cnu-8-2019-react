import React from 'react';

class IngredientsAdd extends React.Component {

  constructor(props) {
    super(props);

    this.state = { 
     newIngAmount: 'Amount',
     newIngAmountUnit: 'Unit',
     newIngName: 'Name',
    };
  }

  handleIngAdd = event => {
    const { name, value } = event.target;
    this.setState({
        [name]: value,}, () => {console.log(this.state)});
  };

  render() {
    const { newIngAmount } = this.state;
    const { newIngAmountUnit } = this.state;
    const { newIngName } = this.state;

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
          <td><input type="text" name="newIngAmount" value={this.state.value} onChange={this.handleIngAdd} /></td>
          <td><input type="text" name="newIngAmountUnit" value={this.state.value} onChange={this.handleIngAdd} /></td>
          <td><input type="text" name="newIngName" value={this.state.value} onChange={this.handleIngAdd} /></td>
          <td><button onClick={() => this.props.onIngredientAdd(newIngAmount, newIngAmountUnit, newIngName)}>Add</button></td>
        </tr>
      </tbody>
      </table>
    );
  }
}

export default IngredientsAdd;
