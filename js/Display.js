class Display {
    constructor() {
        this.input = document.querySelector('.input-data');
        this.inputStorage = document.querySelector('.input-storage');
        // this.changeHeight = 
        this.app = document.querySelector('html');

    }

    displayInput(valueInput) {
        this.input.textContent = valueInput;
    }

    displayStorage(valueStorage) {
        this.inputStorage.textContent = valueStorage;
    }

    displayOverLoad() {
        let inputLength = this.input.textContent.length;
        let fontSize = parseInt(window.getComputedStyle(this.input).getPropertyValue("font-size"));
        
        if (this.input.clientWidth >= (this.app.clientWidth * 0.8) && fontSize > 30) {
            this.input.style.fontSize = `${fontSize * 0.8}px`;
        } else if (this.input.clientWidth <= (this.app.clientWidth * 0.5)) {
            this.input.style.fontSize = `55px`;
        };
        // console.log(inputLength);
        // if (inputLength > 13) {
        //     new Calculator().overLoadNumber();
        // }
    }
}