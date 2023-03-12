class History {
    constructor(firstValue, secondValue, operation, result) {
        this.firstValue = firstValue;
        this.secondValue = secondValue;
        this.operation = operation;
        this.result = result;
        this.showKittyWhatYouHaveInside();
    }

    showKittyWhatYouHaveInside() {
        console.log([this.firstValue, this.secondValue, this.operation, this.result]);
    }
}