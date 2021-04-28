const isNotesKey = 'notes';

let notes = [];

const notesCont = document.querySelector('main');
const notesContPinned = document.querySelector('.pinnedNotes');
//form 
const noteTitle = document.querySelector('#noteTitle');
const noteText = document.querySelector('#noteText');
const notePinned = document.querySelector('#notePinned');
const noteColour = document.querySelector('#noteColour');
//edit notes

const editFormBg = document.querySelector('.editNoteBg');
const editForm = editFormBg.querySelector('.editNote');

const removeNote = (e) => {
    editFormBg.classList.toggle('editNoteBgDisplayed');
    const editFormTitle = editForm.querySelector('#editNoteTitle');
    const editFormText = editForm.querySelector('#editNoteText');
    const editFormPinned = editForm.querySelector('#editNotePinned');
    const editFormColour = editForm.querySelector('#editNoteColour');

    const currNote = e.target.parentElement;
    const noteLocalization = e.target.parentElement.parentElement.tagName; // localization

    const currNoteTitle = currNote.querySelector('h1');
    const currNoteText = currNote.querySelector('p');
    const currColour = window.getComputedStyle(currNote).getPropertyValue('background-color');

    editFormTitle.value = currNoteTitle.innerText;
    editFormText.value = currNoteText.innerText;
    editFormPinned.checked = noteLocalization == 'MAIN' ? false : true;

    editFormTitle.style.backgroundColor = currColour;
    editFormText.style.backgroundColor = currColour;
    editFormColour.value = currColour;

    editForm.dataset.currid = currNote.dataset.id;
}

editForm.querySelector('#editNoteSubmit').addEventListener('click', ev => { // edit
    const currID = editForm.dataset.currid;

    const allNotes = Array.from(document.querySelectorAll('section'));
    const currNote = allNotes.find(el => el.dataset.id == currID);

    currNote.querySelector('h1').innerHTML = editForm.querySelector('#editNoteTitle').value;
    currNote.querySelector('p').innerHTML = editForm.querySelector('#editNoteText').value;
    currNote.style.backgroundColor = editForm.querySelector('#editNoteColour').value;
    const currNoteToEdit = notes.find(el => el.id === currID);

    currNoteToEdit.title = editForm.querySelector('#editNoteTitle').value;
    currNoteToEdit.content = editForm.querySelector('#editNoteText').value;
    currNoteToEdit.colour = editForm.querySelector('#editNoteColour').value;
    currNoteToEdit.pinned = JSON.stringify(editForm.querySelector('#editNotePinned').checked);

    localStorage.setItem(isNotesKey, JSON.stringify(notes)); // UPDATE LOCAL STORAGE
    drawNotesFromStorage();
    editFormBg.classList.toggle('editNoteBgDisplayed');
});

editForm.querySelector('#removeNote').addEventListener('click', ev => { //remove
    const currID = editForm.dataset.currid;

    const allNotes = Array.from(document.querySelectorAll('section'));
    const currNote = allNotes.find(el => el.dataset.id == currID);
    currNote.remove();

    const currNoteToRemove = notes.find(el => el.id === currID);
    notes.splice(notes.indexOf(currNoteToRemove), 1); // REMOVE FROM NOTES TAB
    localStorage.setItem(isNotesKey, JSON.stringify(notes)); // UPDATE LOCAL STORAGE

    editFormBg.classList.toggle('editNoteBgDisplayed');
});

// read
const drawNotesFromStorage = () => {
    if (localStorage.getItem(isNotesKey) === null) {
        localStorage.setItem(isNotesKey, JSON.stringify(notes));
        return;
    }
    notes = JSON.parse(localStorage.getItem(isNotesKey));
    const notesFromLocalStorage = JSON.parse(localStorage.getItem(isNotesKey));

    const convertedNotes = notesFromLocalStorage.map(note => { // converting notes from local storage (date)
        note.createDate = new Date(note.createDate);
        return note;
    })

    notesCont.innerHTML = ''; // cleaning notes before adding news
    notesContPinned.innerHTML = ''; // cleaning notes before adding news

    for (const note of convertedNotes) {
        const innerNote = `
        <section class="note" data-id=${note.id}>
            <h1>${note.title}</h1>
            <p >${note.content}</p>
            <time>${note.createDate.toLocaleString()}</time>
            <button>-</button>
        </section>
        `;
        if (note.pinned == 'true')
            notesContPinned.innerHTML += innerNote;
        else
            notesCont.innerHTML += innerNote;

        document.querySelectorAll(`[data-id="${note.id}"]`).forEach(el => el.style.background = note.colour);
    }

    notesCont.querySelectorAll('button').forEach(el => el.addEventListener('click', removeNote));
    notesContPinned.querySelectorAll('button').forEach(el => el.addEventListener('click', removeNote));
}


// anim 
const addNoteButton = document.querySelector('.addNote');
const addNoteMenu = document.querySelector('.createNoteBg');

addNoteButton.addEventListener('click', e => {
    addNoteMenu.classList.toggle('createNoteBgDisplayed');
    addNoteButton.classList.toggle('buttonActive');
})

addNoteMenu.addEventListener('click', e => {
    if (e.target.classList.contains('createNoteBgDisplayed'))
        addNoteMenu.classList.toggle('createNoteBgDisplayed');
    addNoteButton.classList.toggle('buttonActive');
});

editFormBg.addEventListener('click', e => {
    if (e.target.classList.contains('editNoteBg'))
        editFormBg.classList.toggle('editNoteBgDisplayed');
});

// adding new note
const noteSubmit = document.querySelector('#noteSubmit');

noteSubmit.addEventListener('click', (e) => {
    const lastElementId = notes[notes.length - 1];
    const noteId = lastElementId == undefined ? 1 : parseInt(lastElementId.id) + 1;

    const newNote = {
        id: `${noteId}`,
        title: `${noteTitle.value}`,
        content: `${noteText.value}`,
        colour: `${noteColour.value}`,
        pinned: `${notePinned.checked}`,
        createDate: new Date()
    };
    notes.push(newNote);

    const newEl = document.createElement('section');
    newEl.classList.add('note');
    newEl.dataset.id = noteId;
    newEl.style.background = noteColour.value;

    newEl.innerHTML = `
    <h1>${noteTitle.value}</h1>
    <p >${noteText.value}</p>
    <time>${new Date().toLocaleString()}</time>
    <button>-</button>
    `;

    if (notePinned.checked)
        notesContPinned.appendChild(newEl); // adding note to  pinned
    else
        notesCont.appendChild(newEl); // adding note to main

    newEl.querySelector('button').addEventListener('click', removeNote); // event listener to new element
    addNoteMenu.classList.toggle('createNoteBgDisplayed');
    localStorage.setItem(isNotesKey, JSON.stringify(notes)); // update local storage 
});

//Color Picker
const colorPicker = document.querySelector('.colorPicker');
const colorButton = document.querySelector('#noteColour');
const allColors = colorPicker.querySelectorAll('div');

allColors.forEach(color => {
    color.addEventListener('click', color => {
        const newColor = window.getComputedStyle(color.target).getPropertyValue('background-color');
        colorButton.checked = false;
        colorButton.value = newColor;
        noteText.style.backgroundColor = newColor;
        noteTitle.style.backgroundColor = newColor;
    });
});
// Edit Color Picker
const editColorPicker = document.querySelector('.editColorPicker');
const editColorButton = document.querySelector('#editNoteColour');
const editAllColors = editColorPicker.querySelectorAll('div');

editAllColors.forEach(color => {
    color.addEventListener('click', color => {
        const newColor = window.getComputedStyle(color.target).getPropertyValue('background-color');
        editColorButton.checked = false;
        editColorButton.value = newColor;
        editNoteText.style.backgroundColor = newColor;
        editNoteTitle.style.backgroundColor = newColor;
    });
});
// draw
drawNotesFromStorage();