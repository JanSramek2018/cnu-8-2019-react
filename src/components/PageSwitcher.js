import React from 'react';
import Listing from './listing/Listing';
import Detail from './detail/Detail';
import NewRecipeView from './detail/NewRecipeView';

const PAGE_LISTING = 'Listing';
const PAGE_DETAIL = 'Detail';
const PAGE_NEW_RECIPE = 'New Recipe';
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

  goToNewRecipe = () => {
    this.setState({
      currentPage: PAGE_NEW_RECIPE,
      detailId: false,
    });
  };

  /* Nefunguje fetch delete then fetch get. Musim upravit lokalne pres state

  handleRecipeDelete = itemId => {
    const { detailId } = this.props;
    const detailUrl = `${API_URL}${detailId}`;
    console.log(itemId);
    console.log(API_URL);
    console.log(JSON.stringify(itemId));
    fetch(detailUrl, {
      method: 'DELETE'
    }).then.
    fetch(API_URL,
      {method: 'get'})
      .then(response => response.json())
      .then(dataFromApi => {
        this.setState({ 
          data: dataFromApi,
          currentPage: PAGE_LISTING,
          detailId: false,
         });
      });
    console.log(`Deleted`);
  };
*/


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

        {currentPage === PAGE_LISTING && (
          <Listing goToDetail={this.goToDetail} data={data} goToNewRecipe={this.goToNewRecipe} />
        )}
        {currentPage === PAGE_DETAIL && (
          <Detail goToListing={this.goToListing} detailId={detailId} goToListingAfterDelete={this.goToListingAfterDelete} />
        )}
        {currentPage === PAGE_NEW_RECIPE && (
          <NewRecipeView goToListing={this.goToListing} />
        )}
      </div>
    );
  }
}

export default PageSwitcher;
