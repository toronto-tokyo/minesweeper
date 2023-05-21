class Timer {
  constructor() {
    this.time = 0;
  }

  countTime() {
    if (this.time === 0) {
      setInterval(() => {
        this.time += 1;
        this.displayTime();
      }, 100);
    }
  }

  displayTime() {
    const seconds = Math.floor(this.time / 10);
    this.display.setValue(seconds);
  }

  getTime() {
    return this.time / 10;
  }

  setDisplay(display) {
    this.display = display;
  }
}

export default Timer;
