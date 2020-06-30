import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { countNotesForFolder } from '../notes-helpers.js';
import './NoteListNav.css';

export default function NoteListNav(props) {
  return (
    <div className="NoteListNav">
      <ul className="NoteListNav__list">
        {props.folders.map(folder => 
          <li key={folder.id}>
            <NavLink
              className="NoteListNav__folder-link"
              to={`/folder/${folder.id}`}
            >
              <span className="NoteListNav__num-notes">
                {countNotesForFolder(props.notes, folder.id)}
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

NoteListNav.defaultProps = {
  folders: []
}