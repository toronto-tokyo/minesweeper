class Display {
  constructor() {
    this.value = 0;
  }

  createDisplay() {
    this.display = document.createElement('div');
    this.display.className = 'display';
    this.display.innerText = this.value;
    return this.display;
  }

  setValue(value) {
    this.value = value;
    this.display.innerText = this.value;
  }

  incrValue() {
    this.value += 1;
    this.display.innerText = this.value;
  }

  decrValue() {
    this.value -= 1;
    this.display.innerText = this.value;
  }
}

export default Display;
