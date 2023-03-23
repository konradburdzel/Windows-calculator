
class Calculator {
    constructor() {
        this.addEventListeners();
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
        // this.results = new Operations();
        // this.history = new History();
        this.history = [];
    }

    addEventListeners() {
        document.querySelector('#keys').addEventListener('click', e => this.buttonCreate(e));
        document.querySelector('.history-key').addEventListener('click', () => this.historyToggleClass());
        document.querySelector('.history-top-background').addEventListener('click', e => this.historyToggleClass(e));
    }

    historyToggleClass() {
        this.historyWindow = document.querySelector('.history-window');
        this.historyWindow.classList.toggle('active');
        this.historyElements = [...document.querySelectorAll('.history-element')]
        this.historyElements.forEach(historyElement => {
            historyElement.addEventListener('click', e => this.chooseHistory(e));
        })
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

        // when press equal sign
        if (this.button.operationButton() === 'equal') {
          this.equal();
        };

        // when press some operation buttons
        if (this.basicOperations.includes(this.button.operationButton()) && !this.dividePerZeroFlag) {
            this.basicOperationButton();
        };

        //backspace
        if (this.button.operationButton() === 'backspace' && this.backspaceFlag) {
            this.backspace();
        };
        
        // C
        if (this.button.operationButton() === 'C') {
            this.clear();
        };  
        
        // CE
        if (this.button.operationButton() === 'CE') {
            this.ce();
        };

        // entry second value
        if (this.button.operationButton() === 'number' && this.operator.name !== '' && this.firstValue.flag) {

            if (this.secondValue.value.length < 16) {
                this.enterSecondValue();
            }
        }

        // entry firstValue 
        if (this.button.operationButton() === 'number' && this.operator.name === '' && !this.secondValue.flag) {
                        
            if (this.firstValue.value.length < 16) {
            
                if (this.dividePerZeroFlag) {
                    return this.clear();
                }

                this.valueOne();
            }
        }
        
        
        if (!this.dividePerZeroFlag) {
        
            // adding comma to input
            if (this.button.operationButton() === 'comma') {
                this.comma();
            };


            // change sign
            if (this.button.operationButton() === 'change-sign') {
                this.changeSign();
            };

            //reciprocal
            if (this.button.operationButton() === 'reciprocal') {
                this.reciprocal();
            }

            //squared
            if (this.button.operationButton() === 'squared') {
                this.squared();
            };

            //square-root
            if (this.button.operationButton() === 'square-root') {
                this.squareRoot();
            };

            //percent
            if (this.button.operationButton() === 'percent' && this.secondValue.flag) {
                this.percent();
            }
        }
    this.dis.displayOverLoad();

    }

    equal() {
        this.checkMethod();
        if (this.dividePerZeroFlag) {
            return this.clear();
        };

        //if only first value and operation on x enter without choice basic operations
        if (!this.operator.name && this.operationsOnXFlag) {
            return this.dis.displayStorage(this.firstValue.value + ' =');
        };

        //if secondValue not enter
        if (!this.secondValue.flag && this.equalMulti.flag && this.operator.name) {
            this.equalMulti.value = this.firstValue.value;
            this.equalMulti.flag = false;
            this.secondValue.value = this.equalMulti.value;
            if (this.operationsOnXFlag) {
                this.operationsOnXFlag = false;
            };
            this.dis.inputStorage.textContent += ` ${this.secondValue.value} = `;
            this.dis.displayStorage(this.dis.inputStorage.textContent);
        } else if (!this.equalMulti.flag && !this.secondValue.flag) {
            this.secondValue.value = this.equalMulti.value;
        };
        //check operations on x operation
        if (this.operationsOnXFlag && this.secondValue.value) {
            this.dis.displayStorage(`${this.dis.inputStorage.textContent} =`);
        } 
        this.results = new Operations(this.firstValue.value, this.secondValue.value, this.operator.name);

        try {
            this.addHistory();
            let result = this.results.choice();
            this.dis.displayStorage(`${this.firstValue.value} ${this.operator.value} ${this.secondValue.value} = `)
            this.dis.displayInput(result);
            this.firstValue.value = `${result}`;
            this.operationsOnXFlag = false;
            this.secondValue.value = '';
            this.secondValue.flag = false;
        }
        catch {
            this.dividePerZeroFlag = true;
            this.dividePerZero();
            return this.dis.displayInput(this.results.errorDivideZero());
        }
    }

    basicOperationButton() {
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

            this.addHistory();

            this.firstValue.value = `${this.results.choice()}`; 
            this.dis.displayInput(this.firstValue.value);
            this.dis.displayStorage(`${this.firstValue.value} ${this.button.valueButton()}`);
            this.secondValue.value = '';
            this.secondValue.flag = false;
            this.operator.name = this.button.operationButton();
            this.operationsOnXFlag = false;
        };
    }

    backspace() {
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
    }

    ce() {
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
    }

    enterSecondValue() {
        if (this.dividePerZeroFlag) {
            this.clear();
            return this.valueOne();
        }

        if (this.dis.inputStorage.textContent.includes('=')) {
            this.clear();
            return this.valueOne();
        }

        if (this.firstValue.flag && !this.secondValue.flag) {
            this.dis.displayInput('');
        }

        this.secondValue.flag = true;
        this.secondValue.value += this.button.valueButton();
        this.dis.displayInput(this.secondValue.value)
        this.backspaceFlag = true;
    }

    valueOne() {
        if (this.dis.inputStorage.textContent.includes('=')) {
            this.clear();
        }
        if (!this.firstValue.flag) {
            this.dis.displayInput('');
        };
        this.firstValue.flag = true;
        this.firstValue.value += this.button.valueButton();
        this.dis.displayInput(this.firstValue.value);
        this.backspaceFlag = true;
    }

    comma() {
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
    }

    changeSign() {
        if (!this.secondValue.flag && this.firstValue.value[0] !== '-') {
            this.firstValue.value = '-' + this.firstValue.value;
            this.dis.displayInput(this.firstValue.value);
            };
            if (this.secondValue.flag && this.secondValue.value[0] !== '-') {
                this.secondValue.value = '-' + this.secondValue.value;
                this.dis.displayInput(this.secondValue.value);
            };
    }

    reciprocal() {
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

    squared() {
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
    }

    squareRoot() {
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
    }

    percent() {
        if (this.operator.name === 'addition' || this.operator.name === 'subtraction') {
            this.secondValue.value = this.results.percentAdditionOrSubtraction(this.firstValue.value, this.secondValue.value);
        } else { 
            this.secondValue.value = `${this.results.percent(this.secondValue.value)}`;
            this.dis.inputStorage.textContent += ` ${this.secondValue.value}`;
            this.dis.displayInput(this.secondValue.value);
            this.backspaceFlag = false;
        }
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

    addHistory() {
        let saveHistory = new History(this.firstValue.value, this.secondValue.value, this.operator.value, `${this.results.choice()}`);
        saveHistory.addToHistory();
        this.history.push(saveHistory);
    }

    chooseHistory(e) {
        const target = e.currentTarget.textContent;
        const array = target.split(' ');
        this.firstValue.value = array[0];
        this.secondValue.value = array[2];
        this.operator.value = array[1];
        this.secondValue.flag = true;
        this.historyToggleClass();

        switch (array[1]) {
            case 'x':
                this.operator.name = 'multiplication';  
                break;
            case '/':
                this.operator.name = 'division';
                break;
            case '+':
                this.operator.name = 'addition';
                break;
            case '-':
                this.operator.name = 'subtraction';
                break;
        
            default:
                throw new Error('Check out this error! Transfer data from History class.')
                break;
        }
        this.equal();
    }
}