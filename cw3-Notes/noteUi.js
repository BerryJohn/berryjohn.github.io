class noteUi {
    constructor() {
        this.noteBody = 'section';
    }
    createNote(note) {
        const newNote = document.createElement(this.noteBody);
        newNote.classList.add('note');
        newNote.dataset.id = note.id;
        newNote.style.background = note.colour;
        newNote.innerHTML = `
                            <h1>${note.title}</h1>
                            <p >${note.content}</p>
                            <time>${note.createDate}</time>
                            <button>-</button>
                            `;
        return newNote;
    }
    displayNote(note) {
        let containerSelector;
        if (note.pinned)
            containerSelector = '.pinnedNotes';
        else
            containerSelector = 'main';
        const notesContainer = document.querySelector(containerSelector);

        const noteToPush = this.createNote(note);
        notesContainer.appendChild(noteToPush);
        return noteToPush;
    }
    removeNote(note) {
        note.remove();
    }
}