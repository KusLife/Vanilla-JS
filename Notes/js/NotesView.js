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
    this.root.innerHTML = `
        <div class="notes__sidebar">
        <button class="notes__add" type="button">Add note</button>
        <div class="notes__list-item notes__list-item--selected">
            
        </div>
    </div>
    <div class="notes__preview">
        <input type="text" class="notes__title" placeholder="New note...">
        <textarea class="notes__body">Type your note</textarea>
    </div>
        `;

        // New variables to access HTML elements
        const btnAddNote = document.querySelector('.notes__add')
        const inputTitle = document.querySelector('.notes__title')
        const inputBody = document.querySelector('.notes__body')

        // The button add a note
        btnAddNote.addEventListener('click', () => {
            this.onNoteAdd()
        });

        // Use the JS methods to apply evListener and pass updated inputs  farther
        [inputTitle, inputBody].forEach( inputField => {
            inputField.addEventListener('blur', () => {
                const updatedTitle = inputTitle.value.trim()
                const updatedBody = inputBody.value.trim()

                this.onNoteEdit(updatedTitle, updatedBody)
            })
        })

  }

}
