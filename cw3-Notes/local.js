class localdb {
    constructor() {
        this.isNotesKey = 'notes';
    }
    saveNotes(notes) {
        localStorage.setItem(this.isNotesKey, JSON.stringify(notes));
    }
    getNotes() {
        if (localStorage.getItem(this.isNotesKey) === null) {
            return [];
        } else
            return JSON.parse(localStorage.getItem(this.isNotesKey));
    }
}