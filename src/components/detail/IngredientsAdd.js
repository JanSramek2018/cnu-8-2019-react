import React from 'react';
import { Button, Input, Table } from 'reactstrap';

class IngredientsAdd extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      newIngAmount: "",
      newIngAmountUnit: "",
      newIngName: "",
    };
  }

  handleIngAdd = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  nullAfterIngAdd = () => {
    this.setState({
      newIngAmount: "",
      newIngAmountUnit: "",
      newIngName: "",
    });
  };


  render() {

    const { newIngAmount, newIngAmountUnit, newIngName } = this.state;

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
        <tbody>
          <tr>
            <td><Input type="number" name="newIngAmount" value={this.state.newIngAmount} onChange={this.handleIngAdd} /></td>
            <td><Input type="text" name="newIngAmountUnit" value={this.state.newIngAmountUnit} onChange={this.handleIngAdd} /></td>
            <td><Input type="text" name="newIngName" value={this.state.newIngName} onChange={this.handleIngAdd} /></td>
            <td><Button outline color="success"
              onClick={
                () => this.props.onIngredientAdd(newIngAmount, newIngAmountUnit, newIngName,
                  this.nullAfterIngAdd())}>Add</Button></td>
          </tr>
        </tbody>
      </Table>

    );
  }
}

export default IngredientsAdd;
