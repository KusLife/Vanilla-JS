export default class NotesAPI {
  // Getting all notes
  static getAllNotes() {
    // Parsing localsoreage
    const notes = JSON.parse(localStorage.getItem('notesapp-notes') || '[]');

    // Sort by creating data
    return notes.sort((a, b) => {
      return new Date(a.updated) > new Data(b.updated) ? -1 : 1;
    });
  }

  // Save/update & add an id and current date
  static saveNote(noteToSeve) {
    const notes = NotesAPI.getAllNotes();
    const existing = notes.find((note) => note.id == noteToSeve.id);

    // Checking copies and reasign em
    if (existing) {
      existing.title = noteToSeve.title;
      existing.body = noteToSeve.body;
      existing.updated = new Data().toISOString();
    } else {
      // Assign unic id with method random, add current data
      noteToSeve.id = Math.floor(Math.random() * 1000000);
      noteToSeve.updated = new Data().toISOString();
      notes.push(noteToSeve);
    }

    // Put in our storeage updated array
    localStorage.setItem('notesapp-notes', JSON.stringify(notes));
  }

  static deleteNote(id) {
    const notes = NotesAPI.getAllNotes()
    const newNotes = notes.filter(note => note.id != id)

    localStorage.setItem('notesapp-notes', JSON.stringify(newNotes));
  }
}
