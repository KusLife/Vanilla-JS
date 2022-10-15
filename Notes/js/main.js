// import NotesAPI from "./Notes-API.js";
import NotesView from "./NotesView.js";

const app = document.getElementById('app')
const view = new NotesView(app, {
    // onNoteSelect() {
    //     console.log('The note selected.')
    // }

    onNoteAdd() {
        console.log('Add note.')
    },

    onNoteEdit(newTitle, newBody) {
        console.log(newTitle)
        console.log(newBody)
        }
})


// NotesAPI.saveNote({
//     title: 'New note',
//     body: 'It\'s new note body'
// })

// console.log(NotesAPI.getAllNotes())

