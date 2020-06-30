import React from 'react';
import { Link } from 'react-router-dom';
import './Note.css';

export default function Note(props) {
  return (
    <div className="Note">
      <h2 className="Note__name">
        <Link to={`/note/${props.id}`}>
          {props.name}
        </Link>
      </h2>
      <button className="Note__delete-btn" type="button">Delete Note</button>
      <div className="Note__date">
        <div className="Note__date-modified">
          Modified {props.modified}
        </div>
      </div>
    </div>
  );
}