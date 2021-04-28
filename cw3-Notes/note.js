class Note {
    constructor(id, title, content, colour, pinned = "false") {
        this.id = id;
        this.title = title;
        this.content = content;
        this.colour = colour;
        this.pinned = pinned;
        this.createDate = new Date().toLocaleString();
    }
}