import React, { Component } from 'react';
import NotefulContext from '../NotefulContext';
import './AddNote.css';
import config from '../config';

export default class AddNote extends Component {
  state = {
    newNote: {
      name: {
        touched: false,
        value: '',
      },
      folderId: {
        touched: false,
        value: '',
      },
      content: {
        touched: false,
        value: '',
      },
    },
  };

  static contextType = NotefulContext;

  addNewNote = (note) => {
    note.modified = new Date(note.modified);

    fetch(`${config.API_Endpoint}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    })
      .then((res) => {
        return res.json();
      })
      .then((resJSON) => this.context.handleAddNote(resJSON));
  };

  parseFolders = () => {
    return this.context.folders.map((folder) => (
      <option key={folder.id} name={folder.id} value={folder.id}>
        {folder.name}
      </option>
    ));
  };

  handleFormSubmit = (event) => {
    event.preventDefault(event);
    const newNote = {
      name: event.target.name.value,
      content: event.target.content.value,
      folderId: event.target.folders.value,
      modified: new Date(),
    };
    console.log(newNote);
    this.addNewNote(newNote);
    this.props.history.push('/');
  };

  updateNewNoteData = (name, value) => {
    this.setState({
      newNote: {
        ...this.state.newNote,
        [name]: {
          touched: true,
          value,
        },
      },
    });
  };

  validateName = () => {
    if (this.state.newNote.name.value.length === 0) {
      return 'Note is required';
    }
  };

  validateContent = () => {
    if (this.state.newNote.content.value.length === 0) {
      return 'Description is required';
    }
  };

  render() {
    return (
      <>
        <h2 className="addNote__header">Add a Note</h2>
        <form
          className="addNote__form"
          onSubmit={(e) => this.handleFormSubmit(e)}
        >
          <label htmlFor="name">
            Name:
            {this.state.newNote.name.touched && <p>{this.validateName()}</p>}
          </label>
          <input
            type="text"
            name="name"
            id="name"
            aria-required="true"
            aria-label="Name"
            placeholder="Name note"
            onChange={(event) =>
              this.updateNewNoteData(event.target.name, event.target.value)
            }
          />

          <label htmlFor="content">
            Description:
            {this.state.newNote.content.touched && (
              <p>{this.validateContent()}</p>
            )}
          </label>
          <input
            type="text"
            name="content"
            id="content"
            aria-required="true"
            aria-label="Description"
            placeholder="Write note here."
            onChange={(event) =>
              this.updateNewNoteData(event.target.name, event.target.value)
            }
          />

          <label htmlFor="folders">Select a folder:</label>
          <select
            name="folders"
            id="folders"
            aria-required="true"
            aria-label="Select a folder"
          >
            {this.parseFolders()}
          </select>

          <button className="submit__btn" type="submit">
            Add
          </button>
        </form>
      </>
    );
  }
}
