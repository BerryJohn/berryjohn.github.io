class Notes {
    constructor() {
        this.db = new localdb();
        this.notesArr = this.db.getNotes();
        this.noteui = new noteUi();
    }
    lastNoteID() {
        const notesArrLength = (this.notesArr.length) - 1
        const lastElement = this.notesArr[notesArrLength];
        const noteId = lastElement == undefined ? 1 : parseInt(lastElement.id) + 1;
        return noteId;
    }
    addNote(note) {
        this.notesArr.push(note);
        this.db.saveNotes(this.notesArr);
        const noteAddEv = this.noteui.displayNote(note);
        this.noteMenu(noteAddEv);
    }
    findNote(note) {
        return this.notesArr.find(el => el.id === parseInt(note.dataset.id));
    }
    removeNote(note) {
        const currNote = this.findNote(note); // note from array / local storage
        this.notesArr.splice(this.notesArr.indexOf(currNote), 1);
        this.db.saveNotes(this.notesArr); // saving new notes
        this.noteui.removeNote(note);
    }
    editNote(note, newNote) {
        const currNote = this.findNote(note);
        currNote.title = newNote.Title.outerText;
        currNote.content = newNote.Text.outerText;
        currNote.colour = newNote.Colour;
        currNote.pinned = newNote.Pinned;
        this.db.saveNotes(this.notesArr);
    }
    displaySavedNotes() {
        document.querySelector('main').innerHTML = '';
        document.querySelector('.pinnedNotes').innerHTML = '';
        for (const note of this.notesArr) {
            const noteAddEv = this.noteui.displayNote(note);
            this.noteMenu(noteAddEv);
        }
    }
    noteMenu(noteAddEv) {
        const editFormBg = document.querySelector('.editNoteBg');
        const editForm = editFormBg.querySelector('.editNote');
        noteAddEv.querySelector('button').addEventListener('click', (e) => {
            editFormBg.classList.toggle('editNoteBgDisplayed');
            const noteLocalization = e.target.parentElement.parentElement.tagName;

            const editFormObj = {
                Title: editForm.querySelector('#editNoteTitle'),
                Text: editForm.querySelector('#editNoteText'),
                Pinned: editForm.querySelector('#editNotePinned'),
                Colour: editForm.querySelector('#editNoteColour')
            }

            const currNoteEl = {
                Id: parseInt(noteAddEv.dataset.id),
                Title: noteAddEv.querySelector('h1'),
                Text: noteAddEv.querySelector('p'),
                Colour: window.getComputedStyle(noteAddEv).getPropertyValue('background-color'),
                Pinned: noteLocalization == 'MAIN' ? false : true
            }

            editFormObj.Title.value = currNoteEl.Title.outerText;
            editFormObj.Text.value = currNoteEl.Text.outerText;
            editFormObj.Pinned.checked = currNoteEl.Pinned;
            editFormObj.Colour.value = currNoteEl.Colour;

            const saveEditForm = () => { // add this to notesUI later
                currNoteEl.Colour = editFormObj.Colour.value
                editFormBg.classList.toggle('editNoteBgDisplayed');
                currNoteEl.Title.innerText = editFormObj.Title.value;
                currNoteEl.Text.innerText = editFormObj.Text.value;
                currNoteEl.Pinned = editFormObj.Pinned.checked;
                noteAddEv.style.background = editFormObj.Colour.value;

                this.editNote(noteAddEv, currNoteEl);
                this.displaySavedNotes();
                editForm.querySelector('#editNoteSubmit').removeEventListener('click', saveEditForm);
            }

            const removeNoteEv = () => {
                this.removeNote(noteAddEv);
                editFormBg.classList.toggle('editNoteBgDisplayed');
                editForm.querySelector('#removeNote').removeEventListener('click', removeNoteEv);
            }

            editFormObj.Title.style.background = currNoteEl.Colour;
            editFormObj.Text.style.background = currNoteEl.Colour;
            editForm.querySelector('#editNoteSubmit').addEventListener('click', saveEditForm);

            editForm.querySelector('#removeNote').addEventListener('click', removeNoteEv);
        });
    }
    noteColorsEdit() {
        const newColorsMenu = new Colors();
        newColorsMenu.newNoteColors();


        const editColorPicker = '.editColorPicker';
        const editColorButton = '#editNoteColour';
        const editColorMenu = '.editNote';

        const editColorsMenu = new Colors(editColorPicker, editColorButton, editColorMenu);
        editColorsMenu.newNoteColors();

        this.db.saveNotes(this.notesArr);
    }
}