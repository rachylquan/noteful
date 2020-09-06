import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NotefulContext from '../NotefulContext';
import config from '../config';

class EditNote extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  };

  static contextType = NotefulContext;

  state = {
    error: null,
    id: '',
    name: '',
    content: '',
    folderId: '',
  };

  componentDidMount() {
    const { noteId } = this.props.match.params;
    fetch(config.API_ENDPOINT + `/notes/${noteId}`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${config.API_KEY}`,
      },
    })
      .then((res) => {
        if (!res.ok) return res.json().then((error) => Promise.reject(error));

        return res.json();
      })
      .then((responseData) => {
        this.setState({
          id: responseData.id,
          name: responseData.name,
          content: responseData.content,
          folderId: responseData.folderId,
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ error });
      });
  }

  handleChangeName = (e) => {
    this.setState({ name: e.target.value });
  };

  handleChangeContent = (e) => {
    this.setState({ content: e.target.value });
  };

  handleChangeFolderId = (e) => {
    this.setState({ folderId: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { noteId } = this.props.match.params;
    const { id, name, content, folderId } = this.state;
    const newNote = { id, name, content, folderId };
    fetch(config.API_ENDPOINT + `/notes/${noteId}`, {
      method: 'PATCH',
      body: JSON.stringify(newNote),
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) return res.json().then((error) => Promise.reject(error));
      })
      .then(() => {
        this.resetFields(newNote);
        this.context.updateNote(newNote);
        this.props.history.push('/');
      })
      .catch((error) => {
        console.error(error);
        this.setState({ error });
      });
  };

  resetFields = (newFields) => {
    this.setState({
      id: newFields.id || '',
      name: newFields.name || '',
      content: newFields.content || '',
      folderId: newFields.folderId || '',
    });
  };

  handleClickCancel = () => {
    this.props.history.push('/');
  };

  render() {
    const { error, name, content, folderId } = this.state;
    return (
      <section className="EditNote">
        <h2>Edit note</h2>
        <form className="EditNote__form" onSubmit={this.handleSubmit}>
          <div className="EditNote__error" role="alert">
            {error && <p>{error.message}</p>}
          </div>
          <input type="hidden" name="id" />
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Great website!"
              value={name}
              onChange={this.handleChangeName}
            />
          </div>

          <div>
            <label htmlFor="content">Content</label>
            <textarea
              name="content"
              id="content"
              value={content}
              onChange={this.handleChangeContent}
            />
          </div>
          <div>
            <label htmlFor="folderId">Folder Id</label>
            <input
              type="number"
              name="folderId"
              id="folderId"
              value={folderId}
              onChange={this.handleChangeFolderId}
            />
          </div>
          <div className="EditNote__buttons">
            <button type="button" onClick={this.handleClickCancel}>
              Cancel
            </button>{' '}
            <button type="submit">Save</button>
          </div>
        </form>
      </section>
    );
  }
}

export default EditNote;
