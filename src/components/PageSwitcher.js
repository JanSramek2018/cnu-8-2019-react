import React from 'react';
import Listing from './listing/Listing';
import Detail from './detail/Detail';

const PAGE_LISTING = 'Listing';
const PAGE_DETAIL = 'Detail';
const API_URL = 'https://cookbook.jakubricar.cz/api/recipes/';

class PageSwitcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: PAGE_LISTING,
      detailId: false,
      data: [],
    };
  }

  componentDidMount = () => {
    fetch(API_URL)
      .then(response => response.json())
      .then(dataFromApi => {
        this.setState({ data: dataFromApi });
      });
  };

  goToDetail = itemId => {
    this.setState({
      currentPage: PAGE_DETAIL,
      detailId: itemId,
    });
  };

  goToListingAfterDelete = (itemId) => {
    console.log('GoToListing after delete running', this.state.data);
    const newRecipeDB = this.state.data.filter(item => item._id !== itemId);
    this.setState({ 
      data: newRecipeDB,
      currentPage: PAGE_LISTING,
      detailId: false,
     }, () => { console.log('Updating state', this.state.data) });
  };

/* Myslel jsem, ze pujde rovnou refetchnout API, ale bohuzel se tak nedelo, vubec se nespojilo.
    Reseno zmenou statu, a API se refreshne po obnoveni stranky*/


    goToListing = () => {
      console.log('GoToListing running', this.state.data);
      this.setState({
        currentPage: PAGE_LISTING,
        detailId: false,
      });
    };

  render() {
    const { currentPage, detailId } = this.state;
    const { data } = this.state;

    return (
      <div>
        <h2>This is page Switcher</h2>
        <h3>Currently on page: {currentPage}</h3>
        <button className="btn btn-success">Create new recipe!</button>
        <br />

        {currentPage === PAGE_LISTING && (
          <Listing goToDetail={this.goToDetail} data={data} />
        )}
        {currentPage === PAGE_DETAIL && (
          <Detail goToListing={this.goToListing} detailId={detailId} goToListingAfterDelete={this.goToListingAfterDelete} />
        )}
      </div>
    );
  }
}

export default PageSwitcher;
