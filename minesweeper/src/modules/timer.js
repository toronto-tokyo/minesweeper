class Timer {
  constructor() {
    this.time = 0;
  }

  countTime() {
    if (this.time === 0) {
      setInterval(() => {
        console.log(this.time / 10);
        this.time += 1;
      }, 100);
    }
  }

  getTime() {
    return this.time / 10;
  }
}

export default Timer;
