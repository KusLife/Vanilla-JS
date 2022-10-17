// Module which setting to the interface notes

export default class NotesView {
  constructor(
    root,
    { onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete } = {}
  ) {
    this.root = root;
    this.onNoteSelect = onNoteSelect;
    this.onNoteAdd = onNoteAdd;
    this.onNoteEdit = onNoteEdit;
    this.onNoteDelete = onNoteDelete;
    // As a js file we implement HTML markup
    this.root.innerHTML = `
    <div class="notes__sidebar">
        <button class="notes__add" type="button">Add note</button>
        <div class="notes__list">
            <div class="notes__list-item notes__list-item--selected">
            </div>
        </div>
    </div>
    <div class="notes__preview">
        <input type="text" class="notes__title" placeholder="New note...">
        <textarea class="notes__body">Type your note</textarea>
    </div>
        `;

    // New variables to access HTML elements
    const btnAddNote = document.querySelector('.notes__add');
    const inputTitle = document.querySelector('.notes__title');
    const inputBody = document.querySelector('.notes__body');

    // The button add a note
    btnAddNote.addEventListener('click', () => {
      this.onNoteAdd();
    });

    // Use the JS methods to apply evListener and pass updated inputs  farther
    [inputTitle, inputBody].forEach((inputField) => {
      inputField.addEventListener('blur', () => {
        const updatedTitle = inputTitle.value.trim();
        const updatedBody = inputBody.value.trim();

        this.onNoteEdit(updatedTitle, updatedBody);
      });
    });

    // Hide or now show a non selected note
    this.updateNotePreviewVisibility(false)

  }

  // Privet method creating a container of a note
  _createListItemHTML(id, title, body, updated) {
    // Varisble for comparing langht of the note body
    const BODY_LENGTH_DISPALY = 60;
    // HTML element in JS, multiline string in backticks ``
    return `
    <div class='notes__list-item' data-note-id='${id}'>
        <div class='notes__small-title'>${title}</div>
        <div class='notes__small-body'>
        ${body.substring(0, BODY_LENGTH_DISPALY)}
        ${body.length > BODY_LENGTH_DISPALY ? '...' : ''}
        </div>
        
        <div class='notes__small-updated'>
        ${updated.toLocaleString(undefined, {
          dataStyle: 'full',
          timeStyle: 'short',
        })}
        </div>
    </div>
    `;
  }

  // Updating notes if neaded
  updateNoteList(notes) {
    // Axcesing note list container
    const notesListContainer = this.root.querySelector('.notes__list');

    // Empty list in the beggining
    notesListContainer.innerHTML = '';

    for (const note of notes) {
      const html = this._createListItemHTML(
        note.id,
        note.title,
        note.body,
        new Date(note.updated)
      );
        // Each new note will take place on top of the list
      notesListContainer.insertAdjacentHTML('beforeend', html);
    }

    // Listen for clicks to select it and get id
    notesListContainer.querySelectorAll('.notes__list-item').forEach(noteListItem => {
      noteListItem.addEventListener('click', () => {
        this.onNoteSelect(noteListItem.dataset.noteId)
      })

      // Deleting a choosen note 
      noteListItem.addEventListener('dblclick', () => {
        const doDelete = confirm('Are you sure to delete the note?')

        if (doDelete) {
          this.onNoteDelete(noteListItem.dataset.noteId)
        }
      })
    })


  }


  updateActiveNote(note) {
    this.root.querySelector('.notes__title').value = note.title
    this.root.querySelector('.notes__body').value = note.body

    this.root.querySelectorAll('.notes__list-item').forEach(noteListItem => {
      noteListItem.classList.remove('notes__list-item--selected')
    })

    this.root.querySelector(`.notes__list-item[data-note-id='${note.id}']`).classList.add('notes__list-item--selected')
  }

  updateNotePreviewVisibility(visible) {
    this.root.querySelector('.notes__preview').style.visibility = visible ? 'visible' : 'hidden';
  }
}
