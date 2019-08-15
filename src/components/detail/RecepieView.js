import React from 'react';

import Ingredients from './Ingredients';

class RecepieView extends React.Component {
  render() {
    const { data } = this.props;

    const {
      title,
      servingCount,
      preparationTime,
      directions,
      ingredients = [],
    } = data;

    return (
      <>
        <h2>{title}</h2>
        <div>Serving count: {servingCount}</div>
        <div>Preparation time: {preparationTime} seconds</div>
        <br />

        <Ingredients ingredients={ingredients} />
        <br />

        <div>{directions}</div>
      </>
    );
  }
}

export default RecepieView;
