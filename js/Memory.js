class Memory {
    constructor() {
        this.value = 0;
        this.memoryHandle = document.querySelector('.display-memory');
        this.memoryElements = document.querySelector('.memory-elements');
        this.operationsSpan = ['MC', 'M+', 'M-'];
    }

    addToMemory(value) {
        this.addClassKey();
        this.value = value;
        if (this.memoryElements.children[0].textContent === 'Brak elementów zapisanych w pamięci') {
            this.changeStyleForElement();
        };
        const newMemoryElement = document.createElement('li');
        newMemoryElement.classList.add('memory-element');
        this.memoryElements.insertBefore(newMemoryElement, this.memoryElements.children[0]);

        const ulInsideMemoryElement = document.createElement('ul');
        ulInsideMemoryElement.classList.add('ul-in-memory-element');
        newMemoryElement.appendChild(ulInsideMemoryElement);

        const liElementMemory = document.createElement('li');
        liElementMemory.classList.add('li-element-memory');
        liElementMemory.textContent = `${this.value}`;
        ulInsideMemoryElement.appendChild(liElementMemory);

        const divMemoryOperations = document.createElement('div');
        divMemoryOperations.classList.add('div-memory-operations');
        ulInsideMemoryElement.appendChild(divMemoryOperations);

        for (let i = 0; i < 3; i++) {
            const spanOperation = document.createElement('span');
            spanOperation.classList.add('span-operation');
            spanOperation.textContent = this.operationsSpan[i];
            divMemoryOperations.appendChild(spanOperation);
            }

    }

    changeStyleForElement() {
        this.memoryElements.children[0].remove();
        this.memoryHandle.style.alignItems = 'flex-end';
        this.memoryHandle.style.paddingTop = '30px';
        let bin = document.createElement('div');
        bin.classList.add('binHandle');
        bin.innerHTML = '<iconify-icon class="bin" icon="ri:delete-bin-line"></iconify-icon>';
        bin.addEventListener('click', () => this.deleteMemory());
        this.memoryHandle.appendChild(bin);
    }

    deleteMemory() {
        this.removeClassKey();
        this.memoryHandle.style.alignItems = 'flex-start';
        this.memoryHandle.style.paddingTop = '10px';
        const lengthChildren = [...this.memoryElements.children].length;
        for (let i = 0; i < lengthChildren; i++) {
            this.memoryElements.removeChild(this.memoryElements.children[0]);
        }
        const firstChildren = document.createElement('li');
        this.memoryElements.appendChild(firstChildren);
        this.memoryElements.children[0].textContent = 'Brak elementów zapisanych w pamięci';
        if (document.querySelector('.binHandle')) {
           const bin = document.querySelector('.binHandle');
        bin.remove(); 
        }
    }

    additionToMemory(value) {
        let liElementHandle = document.querySelector('.li-element-memory');

        const variablesHandle = [liElementHandle.textContent, value];

        //comma to dot and parse to float
        const dotVariables = this.commaToDot(variablesHandle);

        const parseVariables = this.parseToFloat(dotVariables);

        const addition = parseVariables[0] + parseVariables[1];

        liElementHandle.textContent = `${this.dotToComma(addition)}`;
    }

    subtractionToMemory(value) {
        let liElementHandle = document.querySelector('.li-element-memory');

        const variablesHandle = [liElementHandle.textContent, value];
        console.log(variablesHandle);
        //comma to dot and parse to float
        const dotVariables = this.commaToDot(variablesHandle);
        console.log(dotVariables);
        const parseVariables = this.parseToFloat(dotVariables);
        console.log(parseVariables);
        const subtraction = parseVariables[0] - parseVariables[1];
        console.log(subtraction);
        liElementHandle.textContent = `${this.dotToComma(subtraction)}`;
    }

    memoryRecall() {
        const liElementHandle = document.querySelector('.li-element-memory');
        if (liElementHandle) {
            return liElementHandle.textContent; 
        }
    }

    addClassKey() {
        let mc = document.querySelector('.mc');
        let mr = document.querySelector('.mr');
        let mv = document.querySelector('.mv');
        mc.classList.add('memory-key');
        mr.classList.add('memory-key');
        mv.classList.add('memory-key');
    }

    removeClassKey() {
        let mc = document.querySelector('.mc');
        let mr = document.querySelector('.mr');
        let mv = document.querySelector('.mv');
        mc.classList.remove('memory-key');
        mr.classList.remove('memory-key');
        mv.classList.remove('memory-key');
    }

    commaToDot(commaVariables) {
        const dotVariables = commaVariables.map(variable => {
            if (variable.includes(',')) {
                variable = variable.replace("," , ".");
            };
            return variable;
        })
        return dotVariables;
    }

    parseToFloat(dotVariables) {
        const parseToFloatVariables = dotVariables.map  (dotVariable => {
            dotVariable = parseFloat(dotVariable);
            return dotVariable;
        })
        return parseToFloatVariables;
    }

    dotToComma(dotToComma) {
        return dotToComma.toString().replace('.', ',');
    }
}