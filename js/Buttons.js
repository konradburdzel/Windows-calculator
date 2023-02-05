class Buttons {
    constructor() {
        document.getElementById('keys').addEventListener('click', this.selectButton.bind(this)); 
        let _firstValue = '';

        this.selectButton = e => {
            const target = e.target.textContent;
            _firstValue = _firstValue + target;
            // const display = new Display(firstValue, secondValue);
            console.log(this.firstValue);
        }
    }

    // selectButton(e) {
   
    // }

}