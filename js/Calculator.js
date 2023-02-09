class Calculator {
    constructor() {
        document.querySelector('#keys').addEventListener('click', e => this.Calculator(e));
        this.input = document.querySelector('.input-data');
        this.inputStorage = document.querySelector('.input-storage');
        // firstValue - false and secondValue - false => before enter firstValue use to delete default 0 and when backspace all sign enter 0
        // firstValue - true and secondValue - false => firstValue is entering and secondValue is not enter
        // firstValue - true and secondValue - true => firstValue is ready and secondValue is entering - after equal is done and transfer data to Operations with firstValue and secondValue and operator
        this.operations = ['division', 'multiplication', 'addition', 'subtraction'];
        this.firstValueFlag = false;
        this.secondValueFlag = false;
        this.firstValue = 0;
        this.secondValue = 0;
        this.operator = '';
        this.commaFlag = false;
    }

    Calculator(e) {
        const valueButton = e.target.textContent;
        const operation = e.target.dataset.operation;
        this.button = new Buttons(valueButton, operation);
        this.display();
    }

    display() {
        if (this.operations.includes(this.button.operationButton())) {
            console.log(this.firstValueFlag);
            console.log(this.secondValueFlag);
            if (this.operator && this.firstValueFlag !== true && this.secondValueFlag !== true) {
                return this.inputStorage.textContent = `${this.input.textContent} ${this.button.valueButton()} `;
            };

            if (this.secondValueFlag === false) {
                this.firstValue = parseFloat(this.input.textContent);
                this.operator = this.button.operationButton();
                this.commaFlag = false;
                this.inputStorage.textContent = `${this.input.textContent} ${this.button.valueButton()} `;
                this.secondValueFlag = true;
                this.firstValueFlag = false;
            };

            if (this.firstValueFlag === true && this.secondValueFlag === true) {
                console.log('bedzie wykonywane działanie');
                this.secondValue = parseFloat(this.input.textContent);
                this.results = new Operations(this.firstValue, this.secondValue, this.operator);
                try {
                    this.input.textContent = this.results.choice();
                } catch (e) {
                    this.input.textContent = e;
                }
            };
        };
        
        // entry firstValue 
        if (this.button.operationButton() === 'number' && this.secondValueFlag === false) {
            if (this.firstValueFlag === false && this.secondValueFlag === false) {
                this.input.textContent = '';
            };
            this.firstValueFlag = true;
            this.input.textContent += this.button.valueButton();
        };  

        // entry second value
        if (this.button.operationButton() === 'number' && this.secondValueFlag === true) {
            if (this.firstValueFlag === false && this.secondValueFlag === true) {
                this.input.textContent = '';
            };
            this.firstValueFlag = true;
            this.input.textContent += this.button.valueButton();
        };

        // adding one comma to input
        if (this.button.operationButton() === 'comma' && this.commaFlag === false) {
            this.input.textContent += this.button.valueButton();
            this.commaFlag = true;
        };

        //backspace
        if (this.button.operationButton() === 'backspace') {
            this.input.textContent = this.input.textContent.slice(0,-1);
            if (this.input.textContent.length === 0) {
                this.input.textContent = '0';
                this.firstValueFlag = false;
            };
            if (this.input.textContent.indexOf(',') === -1) {
                this.commaFlag = false;
            };  
        };
        
        // displayInputStorage.textContent = this.inputStorage;

        // console.log(this.button);
    }
}