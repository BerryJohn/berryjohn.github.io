class Colors {
    constructor(colorPicker = '.colorPicker', colorButton = '#noteColour', menu = '.createNote') {
        this.menu = document.querySelector(colorPicker);
        this.button = document.querySelector(colorButton);
        this.allColors = this.menu.querySelectorAll('div');
        this.menuNote = document.querySelector(menu);
    }
    newNoteColors() {
        this.allColors.forEach(color => {
            color.addEventListener('click', evColor => {
                const newColor = window.getComputedStyle(evColor.target).getPropertyValue('background-color');
                this.button.checked = false;
                this.button.value = newColor;
                this.menuNote.querySelector('input[type="text"]').style.backgroundColor = newColor;
                this.menuNote.querySelector('textarea').style.backgroundColor = newColor;
            });
        });
    }
}