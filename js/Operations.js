class Operations {
    constructor(firstVariable, secondVariable, operation) {
        this.firstVariable = firstVariable;
        this.secondVariable = secondVariable;
        this.operation = operation;
    }

    commaToDot(valuesOfVariables) {
        const variables = this.parse(valuesOfVariables);
        this.firstVariable = variables[0];
        this.secondVariable = variables[1];
    }

    parse(values) {
        const valuesFloat = values.map(value => {
            if (value.includes(',')) {
                value = value.replace("," , ".");
            };
            return value = parseFloat(value);
        })
        return valuesFloat;
    }

    dotToComma(dotToComma) {
        return dotToComma.toString().replace('.', ',');
    }

    choice() {
        let valuesOfVariables = [this.firstVariable, this.secondVariable];
        this.commaToDot(valuesOfVariables);
        // console.log([this.firstVariable, this.secondVariable, this.operation]);
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
        let result = this.firstVariable + this.secondVariable;
        return this.dotToComma(result);
       } else {
        throw new Error ('Nieprawidłowe dane');
       }
    }

    subtraction() {
        if (typeof this.firstVariable === 'number' && typeof this.secondVariable === 'number') {
            let result = this.firstVariable - this.secondVariable;
            return this.dotToComma(result);
           } else {
            throw new Error ('Nieprawidłowe dane');
           }
    }

    multiplication() {
        if (typeof this.firstVariable === 'number' && typeof this.secondVariable === 'number') {
            let result = this.firstVariable * this.secondVariable;
            return this.dotToComma(result);
           } else {
            throw new Error ('Nieprawidłowe dane');
           }
    }

    division() {
        if (typeof this.firstVariable === 'number' && typeof this.secondVariable === 'number') {
            if (!(this.secondVariable === 0)) {
                let result = this.firstVariable / this.secondVariable;
                return this.dotToComma(result);
            } else {
                throw new Error ('Niewolno dzielić przez 0');
            }
        } else {
            throw new Error ('Nieprawidłowe dane');
        }
    }
    reciprocal(value) {
        const result = 1/this.parse([value]);
        return this.dotToComma(result);
    }

    squared(value) {
        const result = Math.pow(this.parse([value]), 2);
        return this.dotToComma(result);
    }

    squareRoot(value) {
        const result = Math.sqrt(this.parse([value]));
        return this.dotToComma(result);
    }

}