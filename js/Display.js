class Display {
    constructor() {
        this.input = document.querySelector('.input-data');
        this.inputStorage = document.querySelector('.input-storage');
        // this.changeHeight = 
        this.app = document.querySelector('html');

    }

    displayInput(valueInput) {
        this.input.textContent = this.insertWhiteSpace(valueInput);
    }

    displayStorage(valueStorage) {
        this.inputStorage.textContent = valueStorage;
    }

    displayOverLoad() {
        let inputLength = this.input.textContent.length;
        let fontSize = parseInt(window.getComputedStyle(this.input).getPropertyValue("font-size"));
        
        if (this.input.clientWidth >= (this.app.clientWidth * 0.8) && fontSize > 28) {
            this.input.style.fontSize = `${fontSize * 0.8}px`;
        } else if (this.input.clientWidth <= (this.app.clientWidth * 0.5)) {
            this.input.style.fontSize = `55px`;
        };
        // console.log(inputLength);
        // if (inputLength > 13) {
        //     new Calculator().overLoadNumber();
        // }
    }

    insertWhiteSpace(value) {
        // value = '9991234'
        let valueWithWS = '';
        let valueWithoutWS = value.split(' ').join('');
        let k = 0;
        let spaceForSpaces = valueWithoutWS.length % 3;
        // console.log(`spaceforspaces ${spaceForSpaces}; valueWWS ${valueWithoutWS}; value.length ${valueWithoutWS.length} `);
        for (let i = 0; i < valueWithoutWS.length; i++) {
            
            if (i === spaceForSpaces && spaceForSpaces !== 0) {
                valueWithWS += ' ';
                k++;
            };

            if (!((i - spaceForSpaces) % 3) && valueWithWS[k - 1] !== ' ' && i !== 0) {
                valueWithWS += ' ';
                i--;
                k++;
            } else {
                valueWithWS += valueWithoutWS[i];
                k++;
            }
        }
        console.log(valueWithWS);
        return valueWithWS;
}
}