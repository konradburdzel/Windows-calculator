class Display {
    constructor(input, operation) {
        this.input = input;
        this.operation = operation;
    }

    display() {
        let displayInput = document.querySelector('.input-data');
        let displayOperation = document.querySelector('.operation');

        displayInput.textContent = this.input;
        displayOperation.textContent = this.operation;
    }
}