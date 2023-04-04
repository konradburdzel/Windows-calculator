class Memory {
    constructor() {
        this.value = 0;
        this.memoryKey = '';
        this.memoryHandle = document.querySelector('.display-memory');
    }

    addToMemory(value, memoryKey) {
        this.value = value;
        this.memoryKey = memoryKey;
        this.memoryElements = document.querySelector('.memory-elements')
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

        const liElementResult = document.createElement('li');
        liElementResult.classList.add('li-element-result');
        liElementResult.textContent = ` ${this.value}`;
        ulInsideMemoryElement.appendChild(liElementResult);

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
        this.memoryHandle.style.alignItems = 'flex-start';
        this.memoryHandle.style.paddingTop = '10px';
        const lengthChildren = [...this.memoryElements.children].length;
        for (let i = 0; i < lengthChildren - 1; i++) {
            this.memoryElements.removeChild(this.memoryElements.children[0]);
        }
        this.memoryElements.children[0].textContent = 'Brak elementów zapisanych w pamięci';
        const bin = document.querySelector('.binHandle');
        bin.remove();
    }

}