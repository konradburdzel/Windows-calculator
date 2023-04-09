class Memory {
    constructor() {
        this.value = 0;
        this.memoryHandle = document.querySelector('.display-memory');
        this.memoryElements = document.querySelector('.memory-elements');
        this.operationsSpan = ['MC', 'M-', 'M+'];
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
        for (let i = 0; i < lengthChildren - 1; i++) {
            this.memoryElements.removeChild(this.memoryElements.children[0]);
        }
        this.memoryElements.children[0].textContent = 'Brak elementów zapisanych w pamięci';
        if (document.querySelector('.binHandle')) {
           const bin = document.querySelector('.binHandle');
        bin.remove(); 
        }
    }

    additionToMemory(value) {
        let liElementHandle = document.querySelector('.li-element-memory');
        liElementHandle.textContent = parseFloat(liElementHandle.textContent) + parseFloat(value);
    }

    subtractionToMemory(value) {
        let liElementHandle = document.querySelector('.li-element-memory');
        liElementHandle.textContent = parseFloat(liElementHandle.textContent) - parseFloat(value);
    }

    memoryRecall() {
        const liElementHandle = document.querySelector('.li-element-memory');
        if (liElementHandle) {
            return liElementHandle.textContent; 
        }
        console.log(liElementHandle);
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
}