// import { steps } from './mine';

class Message {
  constructor(button) {
    this.message = document.createElement('div');
    this.content = document.createElement('div');
    this.contentText = document.createElement('p');
    this.restartBtn = button;
    this.message.className = 'message';
    this.content.className = 'message__content';
    this.contentText.className = 'message__content-row';
    this.restartBtn.className = 'message__btn-new-game';
    this.content.append(this.contentText);
    this.content.append(this.restartBtn);
    this.message.append(this.content);
  }

  displayLose() {
    console.log(this.restartBtn);
    this.contentText.innerText = 'Game over. Try again';
    document.body.append(this.message);
  }

  displayWin(time, steps) {
    this.contentText.innerText = `Hooray! You found all mines in ${time} seconds and ${steps} moves`;
    document.body.append(this.message);
  }
}

export default Message;
