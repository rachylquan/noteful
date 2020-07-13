import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NotefulContext from '../NotefulContext';
import config from '../config';
import './Note.css';
import PropTypes from 'prop-types';

export default class Note extends Component {
  
  static contextType = NotefulContext;

  handleClickDelete = e => {
    e.preventDefault();
    const noteId = this.props.id;

    fetch(`${config.API_Endpoint}notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(res => {
      if (!res.ok) {
        return res.json().then(e => Promise.reject(e))
      }
      return res.json()
    })
    .then(() => {
      console.log('note deleted')
      this.context.deleteNote(noteId);
    })
    .catch(err => {
      console.log({err})
    })
  }

  render() {
    const { name, id, modified } = this.props;
    return (
      <div className="Note">
        <h2 className="Note__name">
          <Link to={`/note/${id}`}>
            {name}
          </Link>
        </h2>
        <button className="Note__delete-btn" type="button" onClick={this.handleClickDelete}>Delete Note</button>
        <div className="Note__date">
          <div className="Note__date-modified">
            Modified {modified}
          </div>
        </div>
      </div>
    );
  }
}

Note.propTypes = {
  onDeleteNote: PropTypes.func,
  id: PropTypes.string,
  name: PropTypes.string,
  modified: PropTypes.string
}