class Calculator {
    constructor() {
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
        this.history = [];
        this.memory = new Memory();
        this.memoryUse = false;
        this.historyWindowHandle = document.querySelector('.history-title');
        this.memoryWindowHandle = document.querySelector('.memory-title');
        this.historyWindow = document.querySelector('.history-window');
        this.memoryWindow = document.querySelector('.memory-window');
        this.wideViewFlag = false;
        //if false -> history storage is active
        this.activeStorage = false;
        this.historyClass = new History();
        this.addEventListeners();
        this.startSettings();
    }

    addEventListeners() {
        document.querySelector('#keys').addEventListener('click', e => this.buttonCreate(e));
        document.querySelector('.history-key').addEventListener('click', () => this.historyToggleClass());
        document.querySelector('.history-top-background').addEventListener('click', e => this.historyToggleClass(e));
        document.querySelector('.memory-top-background').addEventListener('click', e => this.memoryToggleClass(e));
        [...document.querySelectorAll('.memory-key')].forEach(key => {
            key.addEventListener('click', e => this.memoryPanel(e));
        });
        [...document.querySelectorAll('.key-memory-spec')].forEach(key => {
            key.addEventListener('click', e => this.memoryPanel(e));
        });

        this.historyWindowHandle.addEventListener('click', e => this.addClassActive(e));

        this.memoryWindowHandle.addEventListener('click', e => this.addClassActive(e));
        
        window.addEventListener('resize', e => {
            this.activeStorageToggleClass(e);
        })

    }

    startSettings() {
        if (window.innerWidth >= 555) {
            this.toggleClassResize();
        };
    }

    //change class active for history and memory when resize window
    activeStorageToggleClass(event) {
        const width = event.target.innerWidth;
        if (width >= 555 && !this.activeStorage) {
            this.historyWindow.classList.add('active');
            this.historyWindowHandle.classList.add('active');
        } else if (width >= 555 && this.activeStorage) {
            this.memoryWindow.classList.add('active');
            this.memoryWindowHandle.classList.add('active');
        } else {
            this.memoryWindow.classList.remove('active');
            this.historyWindow.classList.remove('active');
        }
    }

    addClassActive(event) {
        const handle = event.target.classList;

        if (!this.historyWindowHandle.classList.contains('active') && handle.contains('history-title')) {
            this.historyWindow.classList.add('active');
            this.historyWindowHandle.classList.add('active');
            this.activeStorage = false;
            this.memoryWindow.classList.remove('active');
            this.memoryWindowHandle.classList.remove('active');
        } else if (!this.memoryWindowHandle.classList.contains('active') && handle.contains('memory-title')) {
            this.historyWindow.classList.remove('active');
            this.historyWindowHandle.classList.remove('active');
            this.activeStorage = true;
            this.memoryWindow.classList.add('active');
            this.memoryWindowHandle.classList.add('active');
        }
    }

    toggleClassResize() {
        this.wideViewFlag = true; 
        this.historyWindowHandle.classList.add('active');
        this.historyWindow.classList.add('active');
        this.memoryWindowHandle.classList.remove('active');
        this.memoryWindow.classList.remove('active');
    }

    historyToggleClass() {
        this.historyWindow.classList.toggle('active');
        this.activeStorage = false;
        this.memoryWindowHandle.classList.remove('active');
    }

    addEventToHistoryElement() {
        this.historyElement = document.querySelector('.history-element');
        this.historyElement.addEventListener('click', e => {
                this.chooseHistory(e);
        })
    } 

    memoryToggleClass() {
        this.memoryWindow.classList.toggle('active');
        this.activeStorage = true;
        this.historyWindowHandle.classList.remove('active');
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
                    this.clear();
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

        if (this.memoryUse) {
            this.secondValue.value = '';
        }

        this.secondValue.flag = true;
        this.secondValue.value += this.button.valueButton();
        this.dis.displayInput(this.secondValue.value)
        this.backspaceFlag = true;
        this.memoryUse = false;
    }

    valueOne() {
        if (this.dis.inputStorage.textContent.includes('=')) {
            this.clear();
        }

        if (!this.firstValue.flag) {
            this.dis.displayInput('');
        }

        if (this.memoryUse) {
            this.firstValue.value = '';
        }

        this.firstValue.flag = true;
        this.firstValue.value += this.button.valueButton();
        this.dis.displayInput(this.firstValue.value);
        this.backspaceFlag = true;
        this.memoryUse = false;
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
        this.results = new Operations();

        if (this.dis.input.textContent === '0') {
            this.dividePerZeroFlag = true;
            this.dividePerZero();
            return this.dis.displayInput(this.results.errorDivideZero());
        }

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
        this.historyClass.addToHistory(this.firstValue.value, this.secondValue.value, this.operator.value, `${this.results.choice()}`);
        this.addEventToHistoryElement();
    }

    chooseHistory(e) {
        const target = e.currentTarget.textContent;
        const array = target.split(' ');
        this.firstValue.value = array[0];
        this.secondValue.value = array[2];
        this.operator.value = array[1];
        this.secondValue.flag = true;
        if (window.innerWidth < 555) this.historyToggleClass();

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

    memoryPanel(e) {
        const target = e.target;
        const memoryKey = [...target.classList];
        const valueToMemory = document.querySelector('.input-data').textContent;

        this.mv = document.querySelector('.mv');
        const bin = document.querySelector('.binHandle');
        
        if (!bin && (memoryKey.includes('ms') || memoryKey.includes('m-minus') || memoryKey.includes('m-plus'))) {
            this.mv.classList.add('active');
        }

        if (memoryKey.includes('mv') && memoryKey.includes('active')) this.memoryToggleClass();

        if (!bin && memoryKey.includes('m-plus')) {
            return this.addMemory('', valueToMemory); 
        }

        if (!bin && memoryKey.includes('m-minus')) {
            return this.addMemory('-', valueToMemory);
        }

        if (memoryKey.includes('ms')) {
            this.addMemory('', valueToMemory);
            this.memoryUse = true;
        }

        if (memoryKey.includes('m-plus')) {
            this.memory.additionToMemory(valueToMemory);
            this.memoryUse = true;
        }


        if (memoryKey.includes('m-minus')) {
            this.memory.subtractionToMemory(valueToMemory);
            this.memoryUse = true;
        }


        if (memoryKey.includes('mr') && bin) {
            let recall = this.memory.memoryRecall()
            this.addMemoryToCalculatorValue(recall);
        }

        if (memoryKey.includes('mc')) {
            this.memory.deleteMemory();
            this.memoryUse = true;
            this.mv.classList.remove('active');
        }
    }

    addMemory(sign, valueToMemory) {
        this.memory.addToMemory(sign + valueToMemory);
        this.addEventToMemoryElement();
    }

    addEventToMemoryElement() {
        this.memoryElement = document.querySelector('.memory-element');
        this.memoryElement.addEventListener('click', e => this.chooseMemory(e))
    }

    chooseMemory(e) {
        const target = e.target;
        const outerText = [...e.target.outerText];
        const addAndSubElement = target.parentElement.previousElementSibling;
        const value = document.querySelector('.input-data').textContent;

        //Click on element which hold number in memory
        if ([...e.target.classList].includes('ul-in-memory-element')) {
            const memoryValue = outerText.slice(0, outerText.indexOf('\n')).join('');
            this.addMemoryToCalculatorValue(memoryValue);
            if (window.innerWidth < 555) this.memoryToggleClass();
        }

        if (target.textContent === 'MC') {
            target.parentElement.parentElement.parentElement.remove();
            if (!document.querySelector('.memory-elements').children[0]) this.memory.deleteMemory();
            this.mv.classList.remove('active');
        }

        if (target.textContent === 'M-') {
            this.memory.subtractionToMemory(addAndSubElement, value);

        }

        if (target.textContent === 'M+') {
            this.memory.additionToMemory(addAndSubElement, value);
        }
        
    }

    addMemoryToCalculatorValue(memValue) {
        if (this.secondValue.flag) {
            this.secondValue.value = memValue;
        } else {
            this.firstValue.value = memValue;
        }
        this.dis.displayInput(memValue);
    }
}