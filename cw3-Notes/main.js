const newNotes = new Notes();
newNotes.displaySavedNotes();

const noteSubmit = document.querySelector('#noteSubmit');

noteSubmit.addEventListener('click', (e) => {
    const lastElementId = newNotes.lastNoteID();
    const newNote = new Note(lastElementId, noteTitle.value, noteText.value, noteColour.value, notePinned.checked);
    newNotes.addNote(newNote);
    addNoteMenu.classList.toggle('createNoteBgDisplayed');
    // addNoteButton.classList.toggle('buttonActive');
});


//Style
const addNoteButton = document.querySelector('.addNote');
const addNoteMenu = document.querySelector('.createNoteBg');
const editFormBg = document.querySelector('.editNoteBg');

addNoteButton.addEventListener('click', e => {
    addNoteMenu.classList.toggle('createNoteBgDisplayed');
    addNoteButton.classList.toggle('buttonActive');
});

addNoteMenu.addEventListener('click', e => {
    if (e.target.classList.contains('createNoteBgDisplayed')) {
        addNoteMenu.classList.toggle('createNoteBgDisplayed');
        addNoteButton.classList.toggle('buttonActive');
    }
});

editFormBg.addEventListener('click', e => {
    if (e.target.classList.contains('editNoteBg'))
        editFormBg.classList.toggle('editNoteBgDisplayed');
});

//Color Picker

newNotes.noteColorsEdit();