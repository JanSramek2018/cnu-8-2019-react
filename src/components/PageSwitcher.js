import React from 'react';

import Listing from './listing/Listing';
import Detail from './detail/Detail';

const PAGE_LISTING = 'listing';
const PAGE_DETAIL = 'detail';

class PageSwitcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: PAGE_DETAIL,
    };
  }

  goToDetail = () => {};

  goToListing = () => {
    this.setState({
      currentPage: PAGE_LISTING,
    });
  };

  render() {
    const { currentPage } = this.state;

    return (
      <div>
        <h2>This is page Switcher</h2>
        <h3>Currently on page: {currentPage}</h3>

        <button onClick={this.goToListing}>This is cool button</button>

        {currentPage === PAGE_LISTING && <Listing />}
        {currentPage === PAGE_DETAIL && <Detail />}
      </div>
    );
  }
}

export default PageSwitcher;
