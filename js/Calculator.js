class Calculator {
    constructor() {
        document.querySelector('#keys').addEventListener('click', e => this.startCalculator(e));
        this.input = document.querySelector('.input-data');
        this.inputStorage = document.querySelector('.input-storage');
        this.firstValue = false;
        this.secondValue = false;
        this.comma = false;
    }

    startCalculator(e) {
        const valueButton = e.target.textContent;
        const operation = e.target.dataset.operation;
        this.button = new Buttons(valueButton, operation);
        this.display();
    }

    display() {

        if (this.button.operation === 'number') {
            if (this.firstValue === false && this.secondValue === false) {
                this.input.textContent = '';
            };
            this.firstValue = true;
            this.input.textContent += this.button.value;
        };  

        // adding one comma to input
        if (this.button.operation === 'comma' && this.comma === false) {
            this.input.textContent += this.button.value;
            this.comma = true;
        };

        if (this.button.operation === 'backspace') {
            this.input.textContent = this.input.textContent.slice(0,-1);
            console.log(this.input.textContent.length);
        };
        
        // displayInputStorage.textContent = this.inputStorage;

        console.log(this.button);
    }
}