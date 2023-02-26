// precision
// minus operation dont write - on inputStorage
// operation on x witchout second value - second value is equal two value
// entering number and basic operation after use only one operation on x
// niie wyswietla się liczna po wukonaniu operatiion on x
// when use equal operatiion multiple times  and change operator then not correct display secondvalue


class Calculator {
    constructor() {
        document.querySelector('#keys').addEventListener('click', e => this.buttonCreate(e));
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
        this.backspaceFlag = true;
        this.equalMulti = {
            value: '',
            flag: true
        }

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
            //if only first value and operation on x enter without choice basic operations
            console.log(`;inputStorage include =: ${Boolean(this.dis.inputStorage.textContent.includes(
                '='))}`, `;operator name: ${this.operator.name}`, `;operatiiononX: ${this.operationsOnXFlag}`, `;second flag: ${this.secondValue.flag}`, `;first flag: ${this.firstValue.flag}`, `equal: ${this.equalMulti.flag}`);


            if (this.dis.inputStorage.textContent.includes('=') && !this.operator.name && this.operationsOnXFlag) {
                console.log(`this.dis.displayStorage(this.firstValue.value + ' =')`);
                return this.dis.displayStorage(this.firstValue.value + ' =');
            };

            if (this.operationsOnXFlag && !this.secondValue.flag && !this.operator.name) {
                return this.dis.displayStorage(`${this.dis.inputStorage.textContent} =`);
            };

            //if secondValue not enter
            if (!this.operationsOnXFlag && !this.secondValue.flag && this.equalMulti.flag) {
                console.log(`niie kliiknieto drugierj wartosci`);
            this.equalMulti.value = this.firstValue.value;
            this.equalMulti.flag = false;
            this.secondValue.value = this.equalMulti.value;
            console.log(this.equalMulti.value);
            } else if (!this.equalMulti.flag && !this.secondValue.flag) {
                console.log(`przypisanie this.secondValue.value = this.equalMulti.value;`);
                this.secondValue.value = this.equalMulti.value;
                console.log(this.secondValue.value);
            };
            //check operations on x operation
            if (this.operationsOnXFlag && this.secondValue.value) {
                this.dis.displayStorage(`${this.dis.inputStorage.textContent} =`);
            } else if (this.operationsOnXFlag && !this.secondValue.value){
                //if operation on x and only firstValue enter
                console.log(this.dis.inputStorage.textContent);
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
            this.secondValue.flag = false;
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
                this.equalMulti.flag = true;
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
                this.secondValue.value = '';
                this.secondValue.flag = false;
                this.operator.name = this.button.operationButton();
                this.operationsOnXFlag = false;
            };
        };
        
        // entry second value
        if (this.button.operationButton() === 'number' && this.operator.name !== '' && this.firstValue.flag) {
            if (this.dis.inputStorage.textContent.includes('=')) {
                this.clear();
                return this.valueOne();
            }
            if (this.firstValue.flag && !this.secondValue.flag) {
                this.dis.displayInput('');
            };
            this.secondValue.flag = true;
            this.secondValue.value += this.button.valueButton();
            this.dis.displayInput(this.secondValue.value)
            this.backspaceFlag = true;
        };

        // entry firstValue 
        if (this.button.operationButton() === 'number' && this.operator.name === '' && !this.secondValue.flag) {
            this.valueOne();
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
        if (this.button.operationButton() === 'backspace' && this.backspaceFlag) {
            if (this.dis.inputStorage.textContent.includes('=')) {
                this.dis.displayStorage('');
                this.backspaceFlag = false;
                this.secondValue.value = '';
                this.secondValue.flag = false;
            };
            
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
            this.backspaceFlag = true;
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
            this.backspaceFlag = false;
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
            this.backspaceFlag = false;
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
            this.backspaceFlag = false;
        };

        if (this.button.operationButton() === 'percent' && this.secondValue.flag) {
            if (this.operator.name === 'addition' || this.operator.name === 'subtraction') {
                this.secondValue.value = this.results.percentAdditionOrSubtraction(this.firstValue.value, this.secondValue.value);
        } else this.secondValue.value = `${this.results.percent(this.secondValue.value)}`;
            this.dis.inputStorage.textContent += ` ${this.secondValue.value}`;
            // this.dis.displayStorage(this.dis.inputStorage.textContent);
            this.dis.displayInput(this.secondValue.value);
            this.backspaceFlag = false;
        };
        
    }

    valueOne() {
        if (this.dis.inputStorage.textContent.includes('=')) {
            this.clear();
            console.log('testujemy wprowadzanie pierwszej wartosci');
        }
        if (!this.firstValue.flag) {
            this.dis.displayInput('');
        };
        this.firstValue.flag = true;
        this.firstValue.value += this.button.valueButton();
        this.dis.displayInput(this.firstValue.value);
        this.backspaceFlag = true;
    }

    clear() {
        this.firstValue.value = '';
        this.secondValue.value = '';
        this.firstValue.flag = false;
        this.secondValue.flag = false;
        this.dis.displayInput('0');
        this.dis.displayStorage('');
        this.operator.name = '';
        this.operator.value = '';
        this.backspaceFlag = true;
        this.equalMulti.flag = true;
        this.operationsOnXFlag = false;
    }
}