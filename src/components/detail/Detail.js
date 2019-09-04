import React from 'react';
import { Button } from 'reactstrap';
import RecipeView from './RecipeView';
import EditView from './EditView';

const API_URL = 'https://cookbook.jakubricar.cz/api/recipes/';

const EDIT_VIEW = 'Edit';
const RECIPE_VIEW = 'Recipe';

class Detail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: false,
      currentView: RECIPE_VIEW,
    };
  }

  componentDidMount = () => {
    const { detailId } = this.props;
    const detailUrl = `${API_URL}${detailId}`;

    fetch(detailUrl)
      .then(response => response.json())
      .then(dataFromApi => {
        this.setState({ data: dataFromApi });
      });
  };

  handleRecipeDelete = itemId => {
    const { detailId } = this.props;
    const detailUrl = `${API_URL}${detailId}`;
    console.log(itemId);
    console.log(API_URL);
    console.log(JSON.stringify(itemId));
    fetch(detailUrl, {
      method: 'DELETE'
    })
    console.log(`Deleted`)
  };

  /* Nakonec vyreseno pomoci metody DELETE, misto POST nove databaze. Nevim, proc me to nenapadlo driv.
  Mozna, kdybych si lepe prosel dokumentaci k API Fetch.
  */

  switchView = target => {
    this.setState({
      currentView: target,
    });
  };

  render() {
    const { goToListing } = this.props;
    const { goToListingAfterDelete } = this.props;
    const { data, currentView } = this.state;
    const { detailId } = this.props;

    return (
      <div>
        <Button color="primary" onClick={goToListing}>Go to Listing</Button>

        {currentView === RECIPE_VIEW && (
          <>
            <button className="btn btn-primary" onClick={() => { this.switchView(EDIT_VIEW) }}>Switch to EDIT</button>
            <button className="btn btn-danger" onClick={() => {
              this.handleRecipeDelete(detailId);
              goToListingAfterDelete(detailId);
              }}>Delete recipe</button>
          </>
      )}

        {currentView === EDIT_VIEW && (
          <button className="btn btn-primary" onClick={() => { this.switchView(RECIPE_VIEW); }}>Switch to recipe</button>
        )}

        {currentView === RECIPE_VIEW && <RecipeView data={data} />}
        {currentView === EDIT_VIEW && <EditView data={data} />}
      </div>
    );
  }
}

export default Detail;
