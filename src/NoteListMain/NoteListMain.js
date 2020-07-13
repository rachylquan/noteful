import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Note from '../Note/Note';
import { getNotesForFolder } from '../notes-helpers';
import NotefulContext from '../NotefulContext'
import './NoteListMain.css';
import PropTypes from ' prop-types';

export default class NoteListMain extends Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }

  static contextType = NotefulContext;

  render() {  
    const { folderId } = this.props.match.params;
    const { notes=[] } = this.context;
    const notesForFolder = getNotesForFolder(notes, folderId);
    return (
      <section className="NoteListMain">
        <ul>
          {notesForFolder.map(note => 
            <li key={note.id}>
              <Note
                id={note.id}
                name={note.name}
                modified={note.modified}
              />
            </li>
          )}
        </ul>
        <div className="NoteListMain__add-note-container">
          <button className="NoteListMain__add-note-btn" type="button">
            <Link to='/add-note'>Add Note</Link>
          </button>
        </div>
      </section>
    );
  }
}

NoteListMain.propTypes = {
  match: PropTypes.object
}