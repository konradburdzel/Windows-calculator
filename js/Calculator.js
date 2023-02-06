class Calculator {
    constructor() {
        document.querySelector('#keys').addEventListener('click', e => this.Calculator(e));
        this.input = document.querySelector('.input-data');
        this.inputStorage = document.querySelector('.input-storage');
        this.firstValue = false;
        this.secondValue = false;
        this.comma = false;
    }

    Calculator(e) {
        const valueButton = e.target.textContent;
        const operation = e.target.dataset.operation;
        this.button = new Buttons(valueButton, operation);
        this.display();
    }

    display() {

        if (this.button.operationButton() === 'number') {
            if (this.firstValue === false && this.secondValue === false) {
                this.input.textContent = '';
            };
            this.firstValue = true;
            this.input.textContent += this.button.valueButton();
        };  

        // adding one comma to input
        if (this.button.operationButton() === 'comma' && this.comma === false) {
            this.input.textContent += this.button.valueButton();
            this.comma = true;
        };

        if (this.button.operationButton() === 'backspace') {
            this.input.textContent = this.input.textContent.slice(0,-1);
            if (this.input.textContent.length === 0) {
                this.input.textContent = '0';
                this.firstValue = false;
            };
            if (this.input.textContent.indexOf(',') === -1) {
                this.comma = false;
            };  
        };
        
        // displayInputStorage.textContent = this.inputStorage;

        console.log(this.button);
    }
}