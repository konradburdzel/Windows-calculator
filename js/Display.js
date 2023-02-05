class Display {
    constructor(input, inputStorage) {
        this.input = input;
        this.inputStorage = inputStorage;
    }

    display() {
        let displayInput = document.querySelector('.input-data');
        let displayInputStorage = document.querySelector('.input-storage');

        displayInput.textContent = this.input;
        displayInputStorage.textContent = this.inputStorage;
    }
}