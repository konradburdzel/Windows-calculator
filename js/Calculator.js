class Calculator {
    constructor() {
        document.querySelector('#keys').addEventListener('click', e => this.startCalculator(e));
    }

    startCalculator(e) {
        const valueButton = e.target.textContent;
        const operation = e.target.className;
        this.button = new Buttons(valueButton, operation);
    }

}