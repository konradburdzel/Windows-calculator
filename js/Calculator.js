// Poprawić obliczenia za pomocą operation button 8 / 7 + 6 = 21
class Calculator {
    constructor() {
        document.querySelector('#keys').addEventListener('click', e => this.Calculator(e));
        this.input = document.querySelector('.input-data');
        this.inputStorage = document.querySelector('.input-storage');
        // firstValue - false and secondValue - false => before enter firstValue use to delete default 0 and when backspace all sign enter 0
        // firstValue - true and secondValue - false => firstValue is entering and secondValue is not enter
        // firstValue - true and secondValue - true => firstValue is ready and secondValue is entering - after equal is done and transfer data to Operations with firstValue and secondValue and operator
        this.operations = ['division', 'multiplication', 'addition', 'subtraction'];
        this.firstValue = {
            value: 0,
            flag: false
        };
        this.secondValue = {
            value: 0,
            flag: false
        };
        this.operator = {
            value: '',
            name: ''
        };
        this.commaFlag = false;
    }

    Calculator(e) {
        const valueButton = e.target.textContent;
        const operation = e.target.dataset.operation;
        this.button = new Buttons(valueButton, operation);
        this.display();
        if (operation !== 'number') {
            this.operator.value = valueButton;
        };
    }

    display() {
        // when press equal sign
        if (this.button.operationButton() === 'equal') {
            this.inputStorage.textContent = `${this.firstValue.value} ${this.operator.value} ${this.secondValue.value} =`
            this.results = new Operations(this.firstValue.value, this.secondValue.value, this.operator.name);
            this.input.textContent = this.results.choice();
            this.firstValue.flag = false;
            this.secondValue.flag = false;
        };

        // when press some operation buttons
        if (this.operations.includes(this.button.operationButton())) {
            // console.log(this.firstValue.flag);
            // console.log(this.secondValue.flag);

            //do change operation when only first Value is enter
            if (this.operator.name && this.firstValue.flag === true && this.secondValue.flag === false) {
                this.operator.name = this.button.operationButton();
                return this.inputStorage.textContent = `${this.input.textContent} ${this.button.valueButton()} `;
            };

            // first select operation
            if (this.firstValue.flag === true && this.secondValue.flag === false) {
                this.firstValue.value = this.input.textContent;
                this.operator.name = this.button.operationButton();
                this.commaFlag = false;
                this.inputStorage.textContent = `${this.input.textContent} ${this.button.valueButton()} `;
                // this.secondValue.flag = true;
                // this.firstValue.flag = false;
            };

            // do operation when choice two Value are complete
            if (this.firstValue.flag === true && this.secondValue.flag === true) {
                // this.secondValue = parseFloat(this.input.textContent);
                this.results = new Operations(this.firstValue.value, this.secondValue.value, this.operator.name);
                //try no working right
                try {
                    this.input.textContent = this.results.choice();
                } catch (e) {
                    this.input.textContent = e;
                }
                this.inputStorage.textContent = `${this.input.textContent} ${this.button.valueButton()}`;
                this.firstValue.value = this.input.textContent;
                this.commaFlag = false;
                // this.firstValue.flag = false;
                this.secondValue.flag = false;
                this.operator.name = this.button.operationButton();
            };
            // console.log(this.firstValue.flag);
            // console.log(this.secondValue.flag);
        };
        
        // entry second value
        if (this.button.operationButton() === 'number' && this.operator.name !== '' && this.firstValue.flag === true) {
            if (this.firstValue.flag === true && this.secondValue.flag === false) {
                this.input.textContent = '';
            };
            this.secondValue.flag = true;
            this.input.textContent += this.button.valueButton();
            this.secondValue.value = this.input.textContent;
        };

        // entry firstValue 
        if (this.button.operationButton() === 'number' && this.secondValue.flag === false) {
            if (this.firstValue.flag === false && this.secondValue.flag === false) {
                this.input.textContent = '';
            };
            if (this.inputStorage) {
                this.inputStorage.textContent = '';
            };
            this.firstValue.flag = true;
            this.input.textContent += this.button.valueButton();
            console.log('pierwsza wartość wprowadzona');
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

        console.log(this.button);
    }
}