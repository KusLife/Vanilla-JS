// Accessing DOM elements to work with through JS
const notesContainer = document.getElementById('app');
const addNotesBtn = notesContainer.querySelector('.add-note');


// Display existing notes passing them befor 'add batton'
getNotes().forEach((note) => {
  const noteElement = createNoteElement(note.id, note.content);
  notesContainer.insertBefore(noteElement, addNotesBtn);
});

// Button respons is a call of the 'addNote' function
addNotesBtn.addEventListener('click', () => addNote() )

// Calling local storeage API, getting all existing notes
function getNotes() {
  return JSON.parse(localStorage.getItem('stickynotes-notes') || '[]');
}

// Adds new note to current list 
function saveNotes(notes) {
  localStorage.setItem('stickynotes-notes', JSON.stringify(notes));
}

// Set new data
function createNoteElement(id, content) {
  // An element we have access in JS
  const element = document.createElement('textarea');
  element.classList.add('note');
  element.value = content;
  element.placeholder = 'Sticky note';

  // Check for new element and pass it to the updating
  element.addEventListener('change', () => {
    updateNote(id, element.value);
  });

  // Checking on a note if dblclicked
  element.addEventListener('dblclick', () => {
    // Asking to confirm deleting
    const doDelete = confirm('Delete the note?');
    // Checking for existing varisble and delete a note 
    if (doDelete) {
      deleteNote(id, element);
    }
  });

  return element;
}

// Getting existing notes and add a new object
function addNote() {
    const notes = getNotes()
    // Create an id to a new obj
    const noteObject = {
        id: Math.floor(Math.random() * 100000),
        content: ""
    }
    // Pass new 'id' with an empty 'content' and set the 
    const noteElement = createNoteElement(noteObject.id, noteObject.content)
    notesContainer.insertBefore(noteElement, addNotesBtn);

    // Push new created obj to our notes list and call save function
    notes.push(noteObject)
    saveNotes(notes)

}

// Get existing notes and add a new one
// Store old objects in a new variable and filter elements to save its
function updateNote(id, newContent) {
  const notes = getNotes()
  const noteTarget = notes.filter(note => note.id == id)[0]

  noteTarget.content = newContent
  saveNotes(notes)
}

// Store all objects except that id deleted, reseve the array
function deleteNote(id, element) {
  const notes = getNotes().filter(note => note.id != id)

  saveNotes(notes)
  notesContainer.removeChild(element)
}
