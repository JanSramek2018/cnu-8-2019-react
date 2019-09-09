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

  switchView = target => {
    this.setState({
      currentView: target,
    });
  };

  switchToRecipeView = itemId => {
    const detailUrl = `${API_URL}${itemId}`;
    fetch(detailUrl)
      .then(response => response.json())
      .then(dataFromApi => {
        this.setState({ data: dataFromApi,
                        currentView: RECIPE_VIEW,
                        detailId: itemId, });
      });
  };

  render() {
    const { goToListing, detailId } = this.props;
    const { data, currentView } = this.state;

    return (

      <div>
        <Button color="primary" onClick={goToListing}>Go to Listing</Button>

        {currentView === RECIPE_VIEW && (
          <>
            <button className="btn btn-primary" onClick={() => { this.switchView(EDIT_VIEW) }}>Switch to EDIT</button>
            <button className="btn btn-danger" onClick={() => { this.props.onRecipeDelete(detailId) }}>Delete recipe</button>
          </>
        )}

        {currentView === EDIT_VIEW && (
          <button className="btn btn-primary" onClick={() => { this.switchView(RECIPE_VIEW); }}>Switch to recipe</button>
        )}

        {currentView === RECIPE_VIEW && <RecipeView data={data} />}
        {currentView === EDIT_VIEW && <EditView data={data} onRecipeEdit={this.switchToRecipeView}/>}
      </div>

    );
  }
}

export default Detail;
