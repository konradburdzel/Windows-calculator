// precision
// minus operation dont write - on inputStorage

class Calculator {
    constructor() {
        document.querySelector('#keys').addEventListener('click', e => this.buttonCreate(e));
        // this.input = document.querySelector('.input-data');
        // this.inputStorage = document.querySelector('.input-storage');
        // firstValue - false and secondValue - false => before enter firstValue use to delete default 0 and when backspace all sign enter 0
        // firstValue - true and secondValue - false => firstValue is entering and secondValue is not enter
        // firstValue - true and secondValue - true => firstValue is ready and secondValue is entering - after equal is done and transfer data to Operations with firstValue and secondValue and operator
        this.basicOperations = ['division', 'multiplication', 'addition', 'subtraction'];
        this.firstValue = {
            value: '',
            flag: false
        };
        this.secondValue = {
            value: '',
            flag: false
        };
        this.operator = {
            value: '',
            name: ''
        };
        this.operationsOnXFlag = false;

        this.dis = new Display();
        this.results = new Operations();
    }

    buttonCreate(e) {
        const valueButton = e.target.textContent;
        const operation = e.target.dataset.operation;
        this.button = new Buttons(valueButton, operation);
        this.calculator();
        if (this.basicOperations.includes(operation)) {
            this.operator.value = valueButton;
        };
    }

    calculator() {
        console.log(this.button);

        // when press equal sign
        if (this.button.operationButton() === 'equal') {
            //if only first value enter without choice basic operations
            if (this.operationsOnXFlag && !this.secondValue.flag && !this.operator.name) {
                return this.dis.displayStorage(`${this.dis.inputStorage.textContent} =`);
            };

            //if secondValue not enter
            if (!this.operationsOnXFlag && !this.secondValue.flag) {
            this.secondValue.value = this.firstValue.value;
            };
            //check reciprocal operation
            if (this.operationsOnXFlag && this.secondValue.value) {
                this.dis.displayStorage(`${this.dis.inputStorage.textContent} =`);
            } else if (this.operationsOnXFlag && !this.secondValue.value){
                //if reciprocal and only firstValue enter
                this.dis.displayStorage(`${this.dis.inputStorage.textContent} ${this.dis.inputStorage.textContent.slice(0, -2)} =`);
                this.secondValue.value = this.firstValue.value;
            } else {
                this.dis.displayStorage(`${this.firstValue.value} ${this.operator.value} ${this.secondValue.value} =`);
            }

            this.results = new Operations(this.firstValue.value, this.secondValue.value, this.operator.name);
            let result = this.results.choice();
            this.dis.displayInput(result);
            this.firstValue.value = `${result}`;
            this.secondValue.value = '';
            // this.firstValue.flag = false;
            this.secondValue.flag = false;
            this.operator.name = '';
            this.operationsOnXFlag = false;
        };

        // when press some operation buttons
        if (this.basicOperations.includes(this.button.operationButton())) {

            //do change operation when only first Value is enter
            if (this.operator.name && this.firstValue.flag && !this.secondValue.flag) {
                this.operator.name = this.button.operationButton();
                return this.dis.displayStorage(`${this.firstValue.value} ${this.button.valueButton()} `);
            };

            // first select operation
            if (this.operator.name === '' && this.firstValue.flag && !this.secondValue.flag) {
                this.operator.name = this.button.operationButton();
                // this.commaFlag = false;
                if (this.operationsOnXFlag && this.dis.inputStorage.textContent.includes('=')) {
                    this.dis.inputStorage.textContent = this.firstValue.value;
                };
                if (this.operationsOnXFlag) {
                    this.dis.displayStorage(`${this.dis.inputStorage.textContent} ${this.button.valueButton()}`);
                } else this.dis.displayStorage(`${this.firstValue.value} ${this.button.valueButton()} `);
            };

            // do operation when choice two Value are complete
            if (this.firstValue.flag && this.secondValue.flag) {
                this.results = new Operations(this.firstValue.value, this.secondValue.value, this.operator.name);
                this.firstValue.value = `${this.results.choice()}`; 
                this.dis.displayInput(this.firstValue.value);
                this.dis.displayStorage(`${this.firstValue.value} ${this.button.valueButton()}`);
                this.commaFlag = false;
                this.secondValue.value = '';
                this.secondValue.flag = false;
                this.operator.name = this.button.operationButton();
                this.operationsOnXFlag = false;
            };
        };
        
        // entry second value
        if (this.button.operationButton() === 'number' && this.operator.name !== '' && this.firstValue.flag) {
            if (this.firstValue.flag && !this.secondValue.flag) {
                this.dis.displayInput('');
            };
            this.secondValue.flag = true;
            this.secondValue.value += this.button.valueButton();
            this.dis.displayInput(this.secondValue.value)
        };

        // entry firstValue 
        if (this.button.operationButton() === 'number' && this.operator.name === '' && !this.secondValue.flag) {
            if (this.dis.inputStorage.textContent.includes('=')) this.clear();
            if (!this.firstValue.flag) {
                this.dis.displayInput('');
            };
            this.firstValue.flag = true;
            this.firstValue.value += this.button.valueButton();
            this.dis.displayInput(this.firstValue.value);
        };  

        // adding comma to input
        if (this.button.operationButton() === 'comma') {
            if (!this.secondValue.flag && !this.firstValue.value.includes(',')) {
                if (!this.firstValue.value) this.firstValue.value = '0';
                this.firstValue.value += ',';
                return this.dis.displayInput(this.firstValue.value);
            };

            if (!this.secondValue.value.includes(',') && (this.secondValue.flag || (!this.secondValue.flag && this.firstValue.flag && this.operator.name !== ''))) {
                if (!this.secondValue.value) this.secondValue.value = '0';
                this.secondValue.value += ',';
                this.dis.displayInput(this.secondValue.value);
            };
        };

        //backspace
        if (this.button.operationButton() === 'backspace') {
            if (this.secondValue.flag) {
                this.secondValue.value = this.secondValue.value.slice(0, -1);
                this.dis.displayInput(this.secondValue.value);
                if (!this.secondValue.value) {
                    this.dis.displayInput('0');
                };
            };

            if (!this.secondValue.flag) {
                this.firstValue.value = this.firstValue.value.slice(0, -1);
                this.dis.displayInput(this.firstValue.value);
                if (!this.firstValue.value) {
                    this.dis.displayInput('0');
                };
            };
        };

        // C
        if (this.button.operationButton() === 'C') {
            this.clear();
        };  
        
        // CE
        if (this.button.operationButton() === 'CE') {
            if (this.dis.inputStorage.textContent.includes('=')) {
                return this.clear();
            };
            if (this.secondValue.flag) {
                this.secondValue.value = '';
                return this.dis.displayInput('0');
            };
            if (!this.secondValue.flag) {
                this.firstValue.value = '0';
                return this.dis.displayInput('0');
            };

        };

        // change sign
        if (this.button.operationButton() === 'change-sign') {
            if (!this.secondValue.flag && this.firstValue.value[0] !== '-') {
               this.firstValue.value = '-' + this.firstValue.value;
               this.dis.displayInput(this.firstValue.value);
            };
            if (this.secondValue.flag && this.secondValue.value[0] !== '-') {
                this.secondValue.value = '-' + this.secondValue.value;
                this.dis.displayInput(this.secondValue.value);
            };
        };

        //reciprocal
        if (this.button.operationButton() === 'reciprocal') {

            if (this.secondValue.flag) {
                this.dis.inputStorage.textContent += ` 1/( ${this.secondValue.value} )`;
                this.secondValue.value = `${this.results.reciprocal(this.secondValue.value)}`;
                this.dis.displayInput(this.secondValue.value);

            };

            if (!this.secondValue.flag) {
                this.dis.displayStorage(` 1/( ${this.firstValue.value} )`);
                this.firstValue.value = `${this.results.reciprocal(this.firstValue.value)}`;
                this.dis.displayInput(this.firstValue.value);
            };
            this.operationsOnXFlag = true;

        }

        if (this.button.operationButton() === 'squared') {
            if (this.secondValue.flag) {
                this.dis.inputStorage.textContent += ` sqr( ${this.secondValue.value} )`;
                this.secondValue.value = `${this.results.squared(this.secondValue.value)}`;
                this.dis.displayInput(this.secondValue.value);

            };

            if (!this.secondValue.flag) {
                this.dis.displayStorage(` sqr( ${this.firstValue.value} )`);
                this.firstValue.value = `${this.results.squared(this.firstValue.value)}`;
                this.dis.displayInput(this.firstValue.value);
            };
            this.operationsOnXFlag = true;
        };

        if (this.button.operationButton() === 'square-root') {
            if (this.secondValue.flag) {
                this.dis.inputStorage.textContent += ` √( ${this.secondValue.value} )`;
                this.secondValue.value = `${this.results.squareRoot(this.secondValue.value)}`;
                this.dis.displayInput(this.secondValue.value);

            };

            if (!this.secondValue.flag) {
                this.dis.displayStorage(` √( ${this.firstValue.value} )`);
                this.firstValue.value = `${this.results.squareRoot(this.firstValue.value)}`;
                this.dis.displayInput(this.firstValue.value);
            };
            this.operationsOnXFlag = true;
        };

        if (this.button.operationButton() === 'percent' && this.secondValue.flag) {
            this.secondValue.value = `${this.results.percent(this.secondValue.value)}`;
            this.dis.inputStorage.textContent += ` ${this.secondValue.value}`;
            // this.dis.displayStorage(this.dis.inputStorage.textContent);
            this.dis.displayInput(this.secondValue.value);
        };

    }

    clear() {
        this.firstValue.value = '';
        this.secondValue.value = '';
        this.firstValue.flag = false;
        this.secondValue.flag = false;
        this.dis.displayInput('0');
        this.dis.displayStorage('');
        this.commaFlag = false;
        this.operator.name = '';
        this.operator.value = '';
    }
}