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
        console.log([this.firstValue, this.secondValue, this.operation, this.result]);
        if (this.historyElements.children[0].textContent === "Nie ma jeszcze żadnej historii") {
            this.changeStyleForElement();
        };
        // console.log(historyElements.children[0].textContent === "Nie ma jeszcze żadnej historii");
    }

    changeStyleForElement() {
        this.historyElements.children[0].textContent = '';
        this.historyElements.style.height = 'auto';
        this.historyHandle.style.alignItems = 'flex-end';
        this.historyHandle.style.paddingTop = '30px';
        let bin = document.createElement('div');
        bin.classList.toggle('binHandle');
        bin.innerHTML = '<iconify-icon class="bin" icon="ri:delete-bin-line"></iconify-icon>';
        bin.addEventListener('click', () => this.deleteHistory());
        this.historyHandle.appendChild(bin);
    }

    deleteHistory() {
        this.historyHandle.style.alignItems = 'flex-start';
        this.historyHandle.style.paddingTop = '10px';
        this.historyElements.children[0].textContent = 'Nie ma jeszcze żadnej historii';
        const bin = document.querySelector('.binHandle');
        bin.remove();
    }
}