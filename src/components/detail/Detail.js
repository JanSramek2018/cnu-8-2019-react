import React from 'react';

const API_URL = 'https://cookbook.jakubricar.cz/api/recipes/';

class Detail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: false,
    };
  }

  componentDidMount = () => {
    const { detailId } = this.props;

    const detailUrl = `${API_URL}${detailId}`;

    fetch(detailUrl)
      .then(response => response.json())
      .then(dataFromApi => {
        this.setState({ data: dataFromApi });
      });
  };

  render() {
    const { goToListing } = this.props;

    const { data } = this.state;
    console.log('Data from state are', data);

    const {
      title,
      servingCount,
      preparationTime,
      directions,
      ingredients = [],
    } = data;

    const generateIngredientRow = ingredient => {
      const { name, amount, amountUnit } = ingredient;
      return (
        <tr>
          <td>{name}</td>
          <td>{amount}</td>
          <td>{amountUnit}</td>
        </tr>
      );
    };

    return (
      <div>
        <button onClick={goToListing}>Go to Listing</button>
        <h2>{title}</h2>
        <div>Serving count: {servingCount}</div>
        <div>Preparation time: {preparationTime} seconds</div>
        <br />

        <table>
          <thead>
            <th>Name</th>
            <th>Množství</th>
            <th>Jednotka</th>
          </thead>
          <tbody>{ingredients.map(generateIngredientRow)}</tbody>
        </table>
        <br />

        <div>{directions}</div>
      </div>
    );
  }
}

export default Detail;
