class History {
    constructor(firstValue, secondValue, operation, result) {
        this.firstValue = firstValue;
        this.secondValue = secondValue;
        this.operation = operation;
        this.result = result;
        this.historyHandle = document.querySelector('.display-history');
        this.historyElements = document.querySelector('.history-elements');

    }

    addToHistory() {
        // console.log([this.firstValue, this.secondValue, this.operation, this.result]);
        if (this.historyElements.children[0].textContent === "Nie ma jeszcze żadnej historii") {
            this.changeStyleForElement();
        };
        const newHitoryElement = document.createElement('li');
        newHitoryElement.classList.add('history-element');
        this.historyElements.insertBefore(newHitoryElement, this.historyElements.children[0]);

        const ulInsideHistoryElement = document.createElement('ul');
        ulInsideHistoryElement.classList.add('ul-in-history-element');
        newHitoryElement.appendChild(ulInsideHistoryElement);

        const liElementOperation = document.createElement('li');
        liElementOperation.classList.add('li-element-operation');
        liElementOperation.textContent = `${this.firstValue}  ${this.operation}  ${this.secondValue} =`;
        ulInsideHistoryElement.appendChild(liElementOperation);

        const liElementResult = document.createElement('li');
        liElementResult.classList.add('li-element-result');
        liElementResult.textContent = `${this.result}`;
        ulInsideHistoryElement.appendChild(liElementResult);
        // console.log(historyElements.children[0].textContent === "Nie ma jeszcze żadnej historii");
    }

    changeStyleForElement() {
        this.historyElements.children[0].remove();
        this.historyElements.style.height = 'auto';
        this.historyHandle.style.alignItems = 'flex-end';
        this.historyHandle.style.paddingTop = '30px';
        let bin = document.createElement('div');
        bin.classList.add('binHandle');
        bin.innerHTML = '<iconify-icon class="bin" icon="ri:delete-bin-line"></iconify-icon>';
        bin.addEventListener('click', () => this.deleteHistory());
        this.historyHandle.appendChild(bin);
    }

    deleteHistory() {
        this.historyHandle.style.alignItems = 'flex-start';
        this.historyHandle.style.paddingTop = '10px';
        const lengthChildren = [...this.historyElements.children].length;
        for (let i = 0; i < lengthChildren - 1; i++) {
            console.log(this.historyElements.firstChild.textContent);
            this.historyElements.removeChild(this.historyElements.children[0]);
            console.log(i);
        }
        this.historyElements.children[0].textContent = 'Nie ma jeszcze żadnej historii';
        const bin = document.querySelector('.binHandle');
        bin.remove();
    }
}