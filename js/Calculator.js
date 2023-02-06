class Calculator {
    constructor() {
        document.querySelector('#keys').addEventListener('click', e => this.startCalculator(e));
        this.input = document.querySelector('.input-data');
        this.inputStorage = document.querySelector('.input-storage');
        this.firstValue = true;
    }

    startCalculator(e) {
        const valueButton = e.target.textContent;
        const operation = e.target.dataset.operation;
        this.button = new Buttons(valueButton, operation);
        this.display();
    }

    display() {
        if (this.button.operation === 'number') {
            this.input.textContent += this.button.value;
        };  
        
        // displayInputStorage.textContent = this.inputStorage;

        console.log(this.button);
    }
}