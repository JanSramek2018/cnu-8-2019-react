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
      dataRecipesList: [],
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
    fetch(API_URL)
      .then(response => response.json())
      .then(dataFromApi => {
        this.setState({ dataRecipesList: dataFromApi });
      });
  };

  handleRecipeDelete = itemId => {
    const { dataRecipesList } = this.state;
    console.log('handling recipe delete in EDITVIEW id: ' + itemId);
    console.log('DataRecipesList ' + this.state.dataRecipesList.length);
    const newRecipeDB = this.state.dataRecipesList.filter(item => item._id !== itemId);
    console.log('creating recipe DB in EDITVIEW: ' + newRecipeDB.length);
    this.setState({ dataRecipesList: newRecipeDB }, () => { console.log('Submitting', this.state.dataRecipesList) });

    /* Bohuzel, tady toto se mi nepodarilo rozlousknout... uvedomil jsem si, ze do dataToUpdate nahravame jen vzdy dany 1 recept a je potreba ziskat array receptu (objektu),
       tak jako v Listing, asi by to slo udelat jen jednou a neduplikovat to, ale kvuli nedostatku casu jsem sel cestou nejmensiho odporu.
       Podari se mi nacist sadu receptu, vyfiltrovat smazany recept a nahrat novou sadu do variably, ale vubec jsem nemohl prijit na problem s Fetch.
       Respektive to vypisuje CORS problem (problem s cross-origin-resource-sharing), ktery ale nevypisuje, kdyz saham na data jednotlivych receptu a pripadne mazu, 
       edituju nebo pridavam ingredience. Proto mi to nedava smysl, ze to nekdy funguje a nekdy ne.
       CORS problem jsem se pokousel obejit pres nastaveni proxy, ale nepodarilo se mi to. Nasel jsem jeste moznost vyuzit JSONP, ale tu problematiku jsem nestihl precist.
       */

    console.log(API_URL);
    fetch(API_URL, {
      body: JSON.stringify(dataRecipesList),
      headers: {
        'content-type': 'application/json',
        'access-Control-Allow-Origin': '*',
      },
      method: 'POST',
    })
      .then(response => response.json())
      .then(resData => console.log('API returned', resData));
  };

  switchView = target => {
    this.setState({
      currentView: target,
    });
  };

  render() {
    const { goToListing } = this.props;
    const { data, currentView } = this.state;
    const { detailId } = this.props;

    return (
      <div>
        <Button color="primary" onClick={goToListing}>Go to Listing</Button>

        {currentView === RECIPE_VIEW && (
          <>
            <button className="btn btn-primary" onClick={() => { this.switchView(EDIT_VIEW); }}>Switch to EDIT</button>
            <button className="btn btn-danger" onClick={() => this.handleRecipeDelete(detailId)}>Delete recipe</button>
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
