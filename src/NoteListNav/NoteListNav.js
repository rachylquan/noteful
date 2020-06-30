import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { countNotesForFolder } from '../notes-helpers.js';
import './NoteListNav.css';
import NotefulContext from '../NotefulContext.js';

export default class NoteListNav extends Component{
  static contextType = NotefulContext;

  render() {
    const { folders=[], notes=[] } = this.context
    return (
      <div className="NoteListNav">
        <ul className="NoteListNav__list">
          {folders.map(folder => 
            <li key={folder.id}>
              <NavLink
                className="NoteListNav__folder-link"
                to={`/folder/${folder.id}`}
              >
                <span className="NoteListNav__num-notes">
                  {countNotesForFolder(notes, folder.id)}
                </span>
                {folder.name}
              </NavLink>
            </li>
          )}
        </ul>
        <div className="NoteListNav__button-wrapper">
          <button className="NoteListNav__add-folder-btn" type="button">
            <Link to='/add-folder'>Add Folder</Link>
          </button>
        </div>
      </div>
    );
  }
}