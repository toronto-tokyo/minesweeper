import { steps } from './mine';

class Message {
  constructor() {
    this.message = document.createElement('div');
    this.message.className = 'message';
  }

  displayLose() {
    this.message.innerText = 'Game over. Try again';
    document.body.append(this.message);
  }

  displayWin(time) {
    this.message.innerText = `Hooray! You found all mines in ${time} seconds and ${steps} moves`;
    document.body.append(this.message);
  }
}

export default Message;
