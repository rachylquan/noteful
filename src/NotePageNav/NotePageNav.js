import React from 'react';
import './NotePageNav.css';

export default function NotePageNav(props) {
  return (
    <div className="NotePageNav">
      <button type="button" className="NotePageNav__back-btn" onClick={() => props.history.goBack()}>
        {props.folder && (
          <h3 className="NotePageNav__folder-name">
            {props.folder.name}
          </h3>
        )}
      </button>
    </div>
  );
}

NotePageNav.defaultProps = {
  history: {
    goBack: () => {}
  }
}