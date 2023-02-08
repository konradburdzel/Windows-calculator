class Buttons {
    constructor(value, operation) {
        this.value = value;
        this.operation = operation;
        this.test(value, operation);
    }

    test(v, o) {
        // console.log(v, o);
    }

    valueButton() {
        return this.value;
    }

    operationButton() {
        return this.operation;
    }
}