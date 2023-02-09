class Operations {
    constructor(firstVariable, secondVariable, operation) {
        this.firstVariable = firstVariable;
        this.secondVariable = secondVariable;
        this.operation = operation;
        this.choice();
    }

    choice() {
        switch (this.operation) {
            case 'division':
                return this.division(this.firstValue, this.secondValue);
            case 'multiplication':
                return this.multiplication(this.firstValue, this.secondValue);
            case 'addition':
                return this.addition(this.firstValue, this.secondValue);
            case 'subtraction':
                return this.subtraction(this.firstValue, this.secondValue);
            default:
                console.log('Something went wrong! Check out this!');
                break;
        }
    }

    addition() {
       if (typeof this.firstVariable === 'number' && typeof this.secondVariable === 'number') {
        return this.firstVariable + this.secondVariable;
       } else {
        throw new Error ('Nieprawidłowe dane');
       }
    }

    subtraction() {
        if (typeof this.firstVariable === 'number' && typeof this.secondVariable === 'number') {
            return this.firstVariable - this.secondVariable;
           } else {
            throw new Error ('Nieprawidłowe dane');
           }
    }

    multiplication() {
        if (typeof this.firstVariable === 'number' && typeof this.secondVariable === 'number') {
            return this.firstVariable * this.secondVariable;
           } else {
            throw new Error ('Nieprawidłowe dane');
           }
    }

    division() {
        if (typeof this.firstVariable === 'number' && typeof this.secondVariable === 'number') {
            if (!(this.secondVariable === 0)) {return this.firstVariable / this.secondVariable;} else {
                throw new Error ('Niewolno dzielić przez 0');
            }
        } else {
            throw new Error ('Nieprawidłowe dane');
        }
    }

}