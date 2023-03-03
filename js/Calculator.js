// only 16 numbers can be enter
// wynik z przecinkiem wychodzi poza zakres aplikacji

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
        this.dividePerZeroFlag = false;
        this.overLoad = false;
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
            if (this.dividePerZeroFlag) {
                return this.clear();
            };

            //if only first value and operation on x enter without choice basic operations
            console.log(`;inputStorage include =: ${Boolean(this.dis.inputStorage.textContent.includes(
                '='))}`, `;operator name: ${this.operator.name}`, `;operatiiononX: ${this.operationsOnXFlag}`, `;second flag: ${this.secondValue.flag}`, `;first flag: ${this.firstValue.flag}`, `equal: ${this.equalMulti.flag}`);


            if (!this.operator.name && this.operationsOnXFlag) {
                console.log(`this.dis.displayStorage(this.firstValue.value + ' =')`);
                return this.dis.displayStorage(this.firstValue.value + ' =');
            };

            //if secondValue not enter
            if (!this.secondValue.flag && this.equalMulti.flag && this.operator.name) {
                console.log(`niie kliiknieto drugierj wartosci`);
            this.equalMulti.value = this.firstValue.value;
            this.equalMulti.flag = false;
            this.secondValue.value = this.equalMulti.value;
            console.log(this.equalMulti.value);
                if (this.operationsOnXFlag) {
                    this.operationsOnXFlag = false;

                    console.log('tactic .');
                };
                this.dis.inputStorage.textContent += ` ${this.secondValue.value} = `;
                this.dis.displayStorage(this.dis.inputStorage.textContent);
            } else if (!this.equalMulti.flag && !this.secondValue.flag) {
                this.secondValue.value = this.equalMulti.value;
                console.log(this.secondValue.value);
            };
            //check operations on x operation
            if (this.operationsOnXFlag && this.secondValue.value) {
                this.dis.displayStorage(`${this.dis.inputStorage.textContent} =`);
                console.log('opteams');
            } 

            this.results = new Operations(this.firstValue.value, this.secondValue.value, this.operator.name);
            try {
                let result = this.results.choice();
                this.dis.displayStorage(`${this.firstValue.value} ${this.operator.value} ${this.secondValue.value} = `)
                this.dis.displayInput(result);
                this.firstValue.value = `${result}`;
                this.operationsOnXFlag = false;
            }
            catch {
                this.dividePerZeroFlag = true;
                this.dividePerZero();
                return this.dis.displayInput('Nie można dzielić przez zero');
            }
        };

        // when press some operation buttons
        if (this.basicOperations.includes(this.button.operationButton()) && !this.dividePerZeroFlag) {

            if (this.dividePerZeroFlag) {
                return this.clear();
            };

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

        //backspace
        if (this.button.operationButton() === 'backspace' && this.backspaceFlag) {
            
            if (this.dividePerZeroFlag) {
                return this.clear();
            };

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

            if (this.dividePerZeroFlag) {
                return this.clear();
            };

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

        // entry second value
        if (this.button.operationButton() === 'number' && this.operator.name !== '' && this.firstValue.flag) {

            if (this.dividePerZeroFlag) {
                this.clear();
                return this.valueOne();
            };

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
            
            
            if (this.firstValue.value.length <= 16) {
                console.log('jest mniej niz 16 liczb');
                console.log(this.firstValue.value.length);
            };

            if (this.dividePerZeroFlag) {
                return this.clear();
            };

            // if (!(this.firstValue.value.length % 4)) {
            //     console.log('kolejne 3 znaki');
            //     this.firstValue.value += ' ';
            // };
            this.valueOne();
        };  
        
        
        if (!this.dividePerZeroFlag) {
        
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
    this.dis.displayOverLoad();

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
        this.dividePerZeroFlag = false;
        this.dividePerZero();
    }

    dividePerZero() {
        this.notClickKeys = [...document.querySelectorAll('.zero')];
        if (this.dividePerZeroFlag) {
            this.notClickKeys.forEach(key => {
                key.addEventListener('click', console.log('test'));
                key.style.opacity = 0.5;
                key.classList.remove('number-no-hover');
                key.classList.remove('no-hover');
            })
        } else {
            for (let i = 0; i < this.notClickKeys.length; i++) {
                let key = this.notClickKeys[i];
                key.style.opacity = 1;
                if (i <= 7) {
                    key.classList.add('no-hover');
                } else {
                    key.classList.add('number-no-hover');
                }
            }
        }
    }

    overLoadNumber() {
        this.overLoad = true;
    }
    
}