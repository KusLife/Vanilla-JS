import NotesView from './NotesView.js';
import NotesAPI from './NotesAPI.js';

// class component which band 'view' and 'API' 
export default class App {
  constructor(root) {
    this.notes = [];
    this.activeNote = null;
    this.view = new NotesView(root, this._handlers());

    this._refreshNotes();
  }

  _refreshNotes() {
    const notes = NotesAPI.getAllNotes();

    this._setNotes(notes);
    if (notes.length > 0) {
      this._setActiveNote(notes[0]);
    }
  }

  _setNotes(notes) {
    this.notes = notes;
    this.view.updateNoteList(notes);
    this.view.updateNotePreviewVisibility(notes.length > 0);
  }

  // Pass arguments while updating a note
  _setActiveNote(note) {
    this.activeNote = note;
    this.view.updateActiveNote(note);
  }

  // These handlers help us to interact with our functions of notes
  _handlers() {
    return {
      onNoteSelect: (noteId) => {
        const selectedNote = this.notes.find((note) => note.id == noteId);
        this._setActiveNote(selectedNote);
      },
      onNoteAdd: () => {
        const newNote = {
          title: 'New title',
          body: 'Somthing important...',
        };

        NotesAPI.saveNote(newNote);
        this._refreshNotes();
      },
      onNoteEdit: (title, body) => {
        NotesAPI.saveNote({
          id: this.activeNote.id,
          title,
          body,
        });
        this._refreshNotes()
      },
      onNoteDelete: (noteId) => {
        NotesAPI.deleteNote(noteId);

        this._refreshNotes()
      },
    };
  }
}
