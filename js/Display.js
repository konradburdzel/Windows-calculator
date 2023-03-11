class Display {
    constructor() {
        this.input = document.querySelector('.input-data');
        this.inputStorage = document.querySelector('.input-storage');
        this.app = document.querySelector('html');
        this.operations = new Operations();
    }

    displayInput(valueInput) {
        this.input.textContent = this.insertWhiteSpace(valueInput);
    }

    displayStorage(valueStorage) {
        this.inputStorage.textContent = valueStorage;
    }

    displayOverLoad() {
        let fontSize = parseInt(window.getComputedStyle(this.input).getPropertyValue("font-size"));
        // console.log([this.input.clientWidth, this.app.clientWidth * 0.8, fontSize]);
        if (this.input.clientWidth >= (this.app.clientWidth * 0.8) && fontSize > 28) {
            while  (this.input.clientWidth >= this.app.clientWidth * 0.8)  {
                fontSize = fontSize * 0.9;
                this.input.style.fontSize = `${fontSize}px`;
            }
        } else if (this.input.clientWidth <= (this.app.clientWidth * 0.7) && fontSize < 55) {
            while (this.input.clientWidth < this.app.clientWidth * 0.7 && fontSize < 55) {
                fontSize = fontSize * 1.1;
                this.input.style.fontSize = `${fontSize}px`;
            }
        }
    }

    insertWhiteSpace(value) {
        if (value === this.operations.errorDivideZero()) return value;
        console.log([value === this.operations.errorDivideZero(), value, this.operations.errorDivideZero()]);
        if (value.includes(',')) return value;
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
        return valueWithWS;
}
}