import React from 'react';

function Detail(props) {
  const { goToListing } = props;
  return (
    <div>
      <h2>This is detail</h2>
      <button onClick={goToListing}>Go to Listing</button>
    </div>
  );
}

export default Detail;
