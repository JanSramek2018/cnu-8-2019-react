import React from 'react';
import { Button } from 'reactstrap';

import RecepieView from './RecepieView';
import EditView from './EditView';

const API_URL = 'https://cookbook.jakubricar.cz/api/recipes/';

const EDIT_VIEW = 'edit';
const RECEPIE_VIEW = 'recepie';

class Detail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: false,
      currentView: RECEPIE_VIEW,
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

  render() {
    const { goToListing } = this.props;
    const { data, currentView } = this.state;

    return (
      <div>
        <Button color="success" onClick={goToListing}>
          Go to Listing
        </Button>

        {currentView === RECEPIE_VIEW && (
          <button
            onClick={() => {
              this.switchView(EDIT_VIEW);
            }}
          >
            Switch to EDIT
          </button>
        )}

        {currentView === EDIT_VIEW && (
          <button
            onClick={() => {
              this.switchView(RECEPIE_VIEW);
            }}
          >
            Switch to RECEPIE
          </button>
        )}

        {currentView === RECEPIE_VIEW && <RecepieView data={data} />}
        {currentView === EDIT_VIEW && <EditView data={data} />}
      </div>
    );
  }
}

export default Detail;
