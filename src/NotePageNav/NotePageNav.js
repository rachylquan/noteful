import React, {Component} from 'react';
import NotefulContext from '../NotefulContext';
import { findNote, findFolder } from '../notes-helpers';
import './NotePageNav.css';
import PropTypes from 'prop-types';

export default class NotePageNav extends Component {
  static defaultProps = {
    history: {
      goBack: () => { }
    },
    match: {
      params: {}
    }
  }

  static contextType = NotefulContext;
  
  render () {
    const { notes, folders } = this.context;
    const { noteId } = this.props.match.params;
    const note = findNote(notes, noteId) || {};
    const folder = findFolder(folders, note.folderId);
    return (
      <div className="NotePageNav">
        <button type="button" className="NotePageNav__back-btn" onClick={() => this.props.history.goBack()}>
          {folder && (
            <h3 className="NotePageNav__folder-name">
              {folder.name}
            </h3>
          )}
        </button>
      </div>
    );
  }
}

NotePageNav.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object
}