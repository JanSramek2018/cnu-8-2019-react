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

  handleRecipeDelete = (itemId) => {
    const detailUrl = `${API_URL}${itemId}`;
    fetch(detailUrl, {
      method: 'DELETE'
    })
      .then(() => {
        fetch(API_URL,
          { method: 'get' })
          .then(response => response.json())
          .then(dataFromApi => {
            this.setState({
              data: dataFromApi,
              currentPage: PAGE_LISTING,
              detailId: false,
            });
          });
      });
  };

  goToListing = () => {
    console.log('GoToListing running', this.state.data);
    this.setState({
      currentPage: PAGE_LISTING,
      detailId: false,
    });
  };

  render() {
    const { currentPage, detailId, data } = this.state;

    return (
      <div>
        <h2>This is page Switcher</h2>
        <h3>Currently on page: {currentPage}</h3>

        {currentPage === PAGE_LISTING && (
          <Listing goToDetail={this.goToDetail} data={data} goToNewRecipe={this.goToNewRecipe} />
        )}
        {currentPage === PAGE_DETAIL && (
          <Detail goToListing={this.goToListing} detailId={detailId} onRecipeDelete={this.handleRecipeDelete} />
        )}
        {currentPage === PAGE_NEW_RECIPE && (
          <NewRecipeView goToListing={this.goToListing} onNewRecipeCreate={this.goToDetail} />
        )}
      </div>
    );
  };
};



export default PageSwitcher;
