import React from 'react';
import Listing from './listing/Listing';
import Detail from './detail/Detail';
import NewRecipeView from './detail/NewRecipeView';

const PAGE_LISTING = 'Recipes Listing';
const PAGE_DETAIL = 'Recipe Detail';
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

  goToListing = () => {
    fetch(API_URL)
      .then(response => response.json())
      .then(dataFromApi => {
        this.setState({
          data: dataFromApi,
          currentPage: PAGE_LISTING,
          detailId: false
        });
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


  render() {

    const { currentPage, detailId, data } = this.state;

    return (

      <div className="container-fluid">
        <div className="pageSwitcherHeading d-flex d-inline justify-content-start  ml-3">
          <h4 className=""> {currentPage}</h4>
        </div>
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
