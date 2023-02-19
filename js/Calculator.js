// Dodanie opcji zmiany znaku
// poprawic ce
class Calculator {
    constructor() {
        document.querySelector('#keys').addEventListener('click', e => this.Calculator(e));
        // this.input = document.querySelector('.input-data');
        // this.inputStorage = document.querySelector('.input-storage');
        // firstValue - false and secondValue - false => before enter firstValue use to delete default 0 and when backspace all sign enter 0
        // firstValue - true and secondValue - false => firstValue is entering and secondValue is not enter
        // firstValue - true and secondValue - true => firstValue is ready and secondValue is entering - after equal is done and transfer data to Operations with firstValue and secondValue and operator
        this.operations = ['division', 'multiplication', 'addition', 'subtraction'];
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
        this.commaFlag = false;

        this.dis = new Display();
    }

    Calculator(e) {
        const valueButton = e.target.textContent;
        const operation = e.target.dataset.operation;
        this.button = new Buttons(valueButton, operation);
        this.display();
        // console.log(typeof(this.button.value));
        if (operation !== 'number' && operation !== 'change-sign' && operation !== 'equal') {
            this.operator.value = valueButton;
        };
    }

    display() {
        // when press equal sign
        if (this.button.operationButton() === 'equal') {
            this.dis.displayStorage(`${this.firstValue.value} ${this.operator.value} ${this.secondValue.value} =`);
            this.results = new Operations(this.firstValue.value, this.secondValue.value, this.operator.name);
            this.dis.displayInput(this.results.choice());
            this.firstValue.value = `${this.results.choice()}`;
            this.secondValue.value = '';
            // this.firstValue.flag = false;
            this.secondValue.flag = false;
            this.operator.name = '';
        };

        // when press some operation buttons
        if (this.operations.includes(this.button.operationButton())) {

            //do change operation when only first Value is enter
            if (this.operator.name && this.firstValue.flag && !this.secondValue.flag) {
                this.operator.name = this.button.operationButton();
                return this.dis.displayStorage(`${this.firstValue.value} ${this.button.valueButton()} `);
            };

            // first select operation
            if (this.operator.name === '' && this.firstValue.flag && !this.secondValue.flag) {
                this.operator.name = this.button.operationButton();
                this.commaFlag = false;
                this.dis.displayStorage(`${this.firstValue.value} ${this.button.valueButton()} `);
            };

            // do operation when choice two Value are complete
            if (this.firstValue.flag && this.secondValue.flag) {
                this.results = new Operations(this.firstValue.value, this.secondValue.value, this.operator.name);
                this.firstValue.value = `${this.results.choice()}`; 
                this.dis.displayInput(this.firstValue.value);
                this.dis.displayStorage(`${this.firstValue.value} ${this.button.valueButton()}`);
                this.commaFlag = false;
                console.log(typeof(this.firstValue.value));
                this.secondValue.value = '';
                this.secondValue.flag = false;
                this.operator.name = this.button.operationButton();
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
            if (!this.firstValue.flag) {
                this.dis.displayInput('');
            };
            this.firstValue.flag = true;
            this.firstValue.value += this.button.valueButton();
            this.dis.displayInput(this.firstValue.value);
        };  

        // adding one comma to input
        if (this.button.operationButton() === 'comma' && this.commaFlag === false) {
            if (!this.secondValue.flag) {
                console.log(typeof(this.button.valueButton()));
                this.firstValue.value += this.button.valueButton();
                this.dis.displayInput(this.firstValue.value);
            };

            if (this.secondValue.flag) {
                this.secondValue.value += this.button.valueButton();
                this.dis.displayStorage(this.secondValue.value);
            };
            console.log('commas');
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

        // C
        if (this.button.operationButton() === 'C') {
            this.clear();
        };  
        
        // CE
        if (this.button.operationButton() === 'CE') {
            if (this.dis.inputStorage.textContent.includes('=')) {
                this.clear();
            };
            if (this.secondValue.flag) {
            this.secondValue.value = '';
            this.dis.displayInput('0');
            };
            if (!this.secondValue.flag) {
            this.firstValue.value = '0';
            this.dis.displayInput('0');
            };

        };

        // change sign
        if (this.button.operationButton() === 'change-sign' && this.input.textContent !== '0') {
            if (this.input.textContent[0] !== '-') {
               this.input.textContent = '-' + this.input.textContent;
               if (this.firstValue.flag) {
                    this.secondValue.value = this.input.textContent;
               } else {
                    this.firstValue.value = this.input.textContent;
               };
               
            };
            console.log(this.input.textContent);
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