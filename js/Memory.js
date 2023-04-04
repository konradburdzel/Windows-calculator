class Memory {
    constructor(firstValue, secondValue, operation, result) {
        this.firstValue = firstValue;
        this.secondValue = secondValue;
        this.operation = operation;
        this.result = result;
        this.historyHandle = document.querySelector('.display-memory');
        this.historyElements = document.querySelector('.memory-elements');
    }

}