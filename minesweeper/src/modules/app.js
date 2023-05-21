import MinesField from './mines-field';
import Timer from './timer';
import Message from './message';
import Display from './display';

class App {
  constructor() {
  }

  createApp() {
    const app = document.createElement('div');
    const appHeader = document.createElement('div');
    app.className = 'app';
    appHeader.className = 'app__header';
    this.newGameButton = document.createElement('button');
    this.newGameButton.className = 'btn-new-game';
    this.newGameButton.textContent = 'New game';
    this.newGameButtonInMessage = this.newGameButton.cloneNode();
    this.newGameButtonInMessage.textContent = 'New game';
    const minesField = new MinesField();
    minesField.createMatrix();
    const field = minesField.createField();
    const message = new Message(this.newGameButtonInMessage);
    const timer = new Timer();
    const flagsDisplay = new Display();
    const minesDisplay = new Display();
    const stepsDisplay = new Display();
    const timeDisplay = new Display();
    minesField.onClick(timer, message);
    appHeader.append(stepsDisplay.createDisplay());
    appHeader.append(timeDisplay.createDisplay());
    appHeader.append(this.newGameButton);
    appHeader.append(flagsDisplay.createDisplay());
    appHeader.append(minesDisplay.createDisplay());
    minesField.setFlagsDisplay(flagsDisplay);
    minesField.setMinesDisplay(minesDisplay);
    minesField.setStepsDisplay(stepsDisplay);
    // minesField.setTimeDisplay(timeDisplay);
    timer.setDisplay(timeDisplay);
    app.append(appHeader);
    app.append(field);
    document.body.append(app);
  }

  restartApp() {
    this.newGameButton.addEventListener('click', () => {
      document.body.innerHTML = '';
      this.createApp();
      this.restartApp();
    });
    this.newGameButtonInMessage.addEventListener('click', () => {
      document.body.innerHTML = '';
      this.createApp();
      this.restartApp();
    });
  }
}

export default App;
