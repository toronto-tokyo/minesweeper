class Display {
  constructor(description) {
    this.value = 0;
    this.description = description;
  }

  createDisplay() {
    this.display = document.createElement('div');
    this.display.className = 'display';
    this.display.innerHTML = `<span>${this.description}</span><br><span>${this.value}</span>`;
    return this.display;
  }

  setValue(value) {
    this.value = value;
    this.display.innerHTML = `<span>${this.description}</span><br><span>${this.value}</span>`;
  }

  incrValue() {
    this.value += 1;
    this.display.innerHTML = `<span>${this.description}</span><br><span>${this.value}</span>`;
  }

  decrValue() {
    this.value -= 1;
    this.display.innerHTML = `<span>${this.description}</span><br><span>${this.value}</span>`;
  }
}

export default Display;
