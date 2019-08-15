import React from 'react';

import Listing from './listing/Listing';
import Detail from './detail/Detail';

const PAGE_LISTING = 'listing';
const PAGE_DETAIL = 'detail';

class PageSwitcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: PAGE_LISTING,
      detailId: false,
    };
  }

  goToDetail = itemId => {
    this.setState({
      currentPage: PAGE_DETAIL,
      detailId: itemId,
    });
  };

  goToListing = () => {
    this.setState({
      currentPage: PAGE_LISTING,
      detailId: false,
    });
  };

  render() {
    const { currentPage, detailId } = this.state;

    return (
      <div>
        <h2>This is page Switcher</h2>
        <h3>Currently on page: {currentPage}</h3>

        {currentPage === PAGE_LISTING && (
          <Listing goToDetail={this.goToDetail} />
        )}
        {currentPage === PAGE_DETAIL && (
          <Detail goToListing={this.goToListing} detailId={detailId} />
        )}
      </div>
    );
  }
}

export default PageSwitcher;
