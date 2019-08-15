import React from 'react';

function Detail(props) {
  console.log('Props in detail', props);
  const { goToListing } = props;
  return (
    <div>
      <h2>This is detail</h2>
      <button onClick={goToListing}>This is awesome button</button>
    </div>
  );
}

export default Detail;
