import React, { Component } from 'react';
import NotefulContext from '../NotefulContext';
import './AddNote.css';
import config from '../config';

export default class AddNote extends Component {
  static contextType = NotefulContext;

  addNewNote = note => {
    note.modified = new Date(note.modified);

    fetch(`${config.API_Endpoint}notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(note),
    })
    .then(res => {
      return res.json()
    })
    .then(resJSON => this.context.handleAddNote(resJSON))
  }

  parseFolders = () => {
    return this.context.folders.map(folder => (
     <option key={folder.id} name={folder.id} value={folder.id}>{folder.name}</option>
    ))
  }

  handleFormSubmit = e => {
    e.preventDefault(e);
    const newNote = {
      name: e.target.name.value,
      content: e.target.content.value,
      folderId: e.target.folders.value,
      modified: new Date(),
    }
    console.log(newNote);
    this.addNewNote(newNote);
    this.props.history.push('/');
  }

  validateName = () => {
    if (this.context.newNote.name.value.length === 0) {
      return 'Note is required'
    }
  }

  validateContent = () => {
    if (this.context.newNote.content.value.length === 0) {
      return 'Description is required'
    }
  }

  render() {
    return (
      <>
        <h2 className="addNote__header">Add a Note</h2>
        <form className="addNote__form" onSubmit={e => this.handleFormSubmit(e)}>
          <label htmlFor="name">
            Name:
            {this.context.newNote.name.touched && <p>{this.validateName()}</p>}
          </label>
          <input
            type="text"
            name="name"
            id="name"
            aria-required="true"
            aria-label="Name"
            placeholder="Name note"
            onChange={e => this.context.updateNewNoteData(e.target.name, e.target.value)}
          />

          <label htmlFor="content">
            Description:
            {this.context.newNote.content.touched && (
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
            onChange={e => 
              this.context.updateNewNoteData(e.target.name, e.target.value)
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

          <button className="submit__btn" type="submit">Add</button>
        </form>
      </>
    );
  }
}