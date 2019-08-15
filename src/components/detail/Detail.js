import React from 'react';

function Detail(props) {
  const { goToListing, detailId } = props;
  console.log('detailId', detailId);
  return (
    <div>
      <h2>This is detail</h2>
      <button onClick={goToListing}>Go to Listing</button>
    </div>
  );
}

export default Detail;
