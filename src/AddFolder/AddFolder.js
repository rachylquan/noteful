import React, { Component } from 'react';
import config from '../config';
import NotefulContext from '../NotefulContext';
import PropTypes from 'prop-types'

export default class AddFolder extends Component {
  static contextType = NotefulContext;

  addFolder = (name) => {
    fetch(`${config.API_Endpoint}folders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({name})
    })
    .then (resp => resp.json())
    .then(data => this.context.addFolder(data))
  }

  handleSubmit(event) {
    event.preventDefault();
    const newFolder = event.target.newFolder.value;
    this.addFolder(newFolder);
    this.props.history.goBack();
  }

  updateFolderName(e) {
    const newName = e.target.value;
    this.context.updateNewFolderName(newName);
  }

  validateFolderName() {
    if (this.context.newFolder.name.trim() === 0) {
      return 'Name is required'
    } else if ( this.context.newFolder.name.trim().length < 3 ) {
      return 'Name must be 3 characters long'
    }
  }

  render() {
    return (
      <>
        <h2 className="AddFolder__header">Add Folder</h2>
        <form className="AddFolder__form" onSubmit={e => this.handleSubmit(e)}>
          <label htmlFor="newFolder">
            Name:
            {this.context.newFolder.touched && (
              <p>{this.validateFolderName()}</p>
            )}  
          </label>
          <input 
            type="text"
            name="newFolder"
            id="newFolder"
            aria-required="true"
            aria-label="Name"
            onChange= {(e) => this.updateFolderName(e)}
          />
          <button type="submit">Add</button>
        </form>
      </>
    )
  }
}

AddFolder.propTypes = {
  history: PropTypes.object
}