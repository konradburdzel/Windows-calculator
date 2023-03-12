class History {
    constructor(firstValue, secondValue, operation, result) {
        this.firstValue = firstValue;
        this.secondValue = secondValue;
        this.operation = operation;
        this.result = result;

    }

    addToHistory() {
        console.log([this.firstValue, this.secondValue, this.operation, this.result]);
        let historyElements = document.querySelector('.history-elements');
        if (historyElements.children[0].textContent === "Nie ma jeszcze żadnej historii") {
            this.changeStyleForElement(historyElements);
        };
        // console.log(historyElements.children[0].textContent === "Nie ma jeszcze żadnej historii");
    }

    changeStyleForElement(historyElements) {
        let historyHandle = document.querySelector('.display-history');
        historyElements.children[0].textContent = '';
        historyElements.style.height = 'auto';
        historyHandle.style.alignItems = 'flex-end';
        historyHandle.style.paddingTop = '30px';
        let bin = document.createElement('div');
        bin.style.height = '30px';
        bin.style.width = '30px';
        bin.style.backgroundColor = 'red';
        historyHandle.appendChild(bin);
    }
}