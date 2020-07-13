import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from './Header/Header'
import NoteListNav from './NoteListNav/NoteListNav';
import NotePageNav from './NotePageNav/NotePageNav';
import NoteListMain from './NoteListMain/NoteListMain';
import NotePageMain from './NotePageMain/NotePageMain';
import NotefulContext from './NotefulContext';
import AddFolder from './AddFolder/AddFolder';
import AddNote from './AddNote/AddNote';
import config from './config';
import './App.css';

class App extends Component {
  state = {
    notes: [],
    folders: [],
    newFolder: {
      hasError: false,
      touched: false,
      name: ''
    },
    newNote: {
      name: {
        touched: false,
        value: ''
      },
      folderId: {
        touched: false,
        value: ''
      },
      content: {
        touched: false,
        value: '',
      },
    },
  };


	componentDidMount() {
		Promise.all([
			fetch(`${config.API_Endpoint}notes`),
			fetch(`${config.API_Endpoint}folders`)
		])
		.then(([notesRes, foldersRes]) => {
			if (!notesRes.ok)
				return notesRes.json().then(e => Promise.reject(e));
			if (!foldersRes.ok)
				return foldersRes.json().then(e => Promise.reject(e));

			return Promise.all([notesRes.json(), foldersRes.json()]);
		})
		.then(([notes, folders]) => {
			this.setState({notes, folders})
		})
		.catch(error => {
			console.error({error});
		});
  }

  updateNewFolderName = name => {
    this.setState({
      newFolder: {
        hasError: false,
        touched: true,
        name: name
      }
    })
  }

  updateNewNoteData = (input, value) => {
    this.setState({
      newNote: {
        ...this.state.newNote,
        [input]: {
          touched: true,
          value: value,
        },
      },
    })
  }

  handleAddFolder = newFolder => {
    console.log('handling addFolder...');
    this.setState({
      folders: [...this.state.folders, newFolder],
    })
  }

  handleAddNote = note => {
    console.log('handle addNote...')
    this.setState({
      notes: [...this.state.notes, note],
    })
  }

  handleDeleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    });
  }

  renderNavRoutes() {
      return (
          <>
              {['/', '/folder/:folderId'].map(path => (
                  <Route
                      exact
                      key={path}
                      path={path}
                      component={NoteListNav}
                  />
              ))}
              <Route path="/note/:noteId" component={NotePageNav} />
              <Route path="/add-folder" component={NotePageNav} />
              <Route path="/add-note" component={NotePageNav} />
          </>
      );
  }

  renderMainRoutes() {
		return (
			<>
				{['/', '/folder/:folderId'].map(path => (
					<Route
						exact
						key={path}
						path={path}
						component={NoteListMain}
					/>
				))}
				<Route path="/note/:noteId" component={NotePageMain} />
        <Route path="/add-folder" component={AddFolder} />
        <Route path="/add-note" component={AddNote} />
			</>
		);
  }

  render() {
    console.log(this.state.notes);
      const value = {
        notes: this.state.notes,
        folders: this.state.folders,
        deleteNote:this.handleDeleteNote,
        addFolder: this.handleAddFolder,
        newFolder: this.state.newFolder,
        updateNewFolderName: this.updateNewFolderName,
        newNote: this.state.newNote,
        handleAddNote: this.handleAddNote,
        updateNewNoteData: this.updateNewNoteData
      }

      return (
        <NotefulContext.Provider value={value}>
          <div className="App">
              <nav className="App__nav">{this.renderNavRoutes()}</nav>
              <Header />
              <main className="App__main">{this.renderMainRoutes()}</main>
          </div>
        </NotefulContext.Provider>
      );
  }
}

export default App;