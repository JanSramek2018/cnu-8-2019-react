import React from 'react';

const API_URL = 'https://cookbook.jakubricar.cz/api/recipes/';

class EditView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.data.title,
    };
  }

  handleChange = event => {
    this.setState({
      title: event.target.value,
    });
  };

  submitData = () => {
    const { title } = this.state;
    console.log('SUBMITTING', title);
  };

  render() {
    const { title } = this.state;

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
