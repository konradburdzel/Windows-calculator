class Display {
    constructor() {
        this.input = document.querySelector('.input-data');
        this.inputStorage = document.querySelector('.input-storage');
    }

    displayInput(valueInput) {
        this.input.textContent = valueInput;
    }

    displayStorage(valueStorage) {
        this.inputStorage.textContent = valueStorage;
    }
}