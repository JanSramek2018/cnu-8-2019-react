import React from 'react';

const API_URL = 'https://cookbook.jakubricar.cz/api/recipes/';

class EditView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataToUpdate: props.data,
    };
  }

  handleChange = event => {
    this.setState({
      dataToUpdate: {
        ...this.state.dataToUpdate,
        title: event.target.value,
      },
    });
  };

  submitData = () => {
    const { dataToUpdate } = this.state;
    console.log('SUBMITTING', dataToUpdate);

    const detailUrl = `${API_URL}${dataToUpdate._id}`;

    fetch(detailUrl, {
      body: JSON.stringify(dataToUpdate),
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
    })
      .then(response => response.json())
      .then(resData => console.log('API returned', resData));
  };

  render() {
    const { dataToUpdate } = this.state;
    const { title } = dataToUpdate;

    return (
      <div>
        <h3>EDIT</h3>
        <form action="#" onSubmit={this.submitData}>
          <div>
            <label>Edit title </label>
            <input type="text" value={title} onChange={this.handleChange} />
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default EditView;
