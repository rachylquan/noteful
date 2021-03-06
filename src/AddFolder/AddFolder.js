import React, { Component } from 'react';
import config from '../config';
import './AddFolder.css';
import NotefulContext from '../NotefulContext';
import PropTypes from 'prop-types';

export default class AddFolder extends Component {
  state = {
    newFolder: {
      hasError: false,
      touched: false,
      name: '',
    },
  };

  static contextType = NotefulContext;

  addFolder = (name) => {
    fetch(`${config.API_Endpoint}/folders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ name }),
    })
      .then((resp) => resp.json())
      .then((data) => this.context.addFolder(data));
  };

  handleSubmit(event) {
    event.preventDefault();
    const newFolder = event.target.newFolder.value;
    this.addFolder(newFolder);
    this.props.history.goBack();
  }

  updateNewFolderName = (event) => {
    const newName = event.target.value;
    this.setState({
      newFolder: {
        hasError: false,
        touched: true,
        name: newName,
      },
    });
  };

  validateFolderName() {
    const newFolder = this.state.newFolder.name.trim();
    if (newFolder.length === 0) {
      return 'Name is required';
    } else if (newFolder.length < 3) {
      return 'Name must be 3 characters long';
    }
  }

  render() {
    return (
      <>
        <h2 className="AddFolder__header">Add Folder</h2>
        <form
          className="AddFolder__form"
          onSubmit={(e) => this.handleSubmit(e)}
        >
          <label htmlFor="newFolder">
            Name:
            {this.state.newFolder.touched && <p>{this.validateFolderName()}</p>}
          </label>
          <input
            type="text"
            name="newFolder"
            id="newFolder"
            aria-required="true"
            aria-label="Name"
            onChange={(event) => this.updateNewFolderName(event)}
            placeholder="folder name"
          />
          <button className="submit__btn" type="submit">
            Add
          </button>
        </form>
      </>
    );
  }
}

AddFolder.propTypes = {
  history: PropTypes.object,
};
