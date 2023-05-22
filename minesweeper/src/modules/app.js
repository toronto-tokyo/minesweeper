import MinesField from './mines-field';
import Timer from './timer';
import Message from './message';
import Display from './display';
import { createLvlButtons, setActiveLvlBtn, getActiveBtn } from './level-btn';
import createMinesAmountArea from './mines-amount-area';

class App {
  constructor() {
    this.level = 'easy';
    this.minesCount = 10;
    this.customMinesCount = null;
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
    if (!this.customMinesCount) {
      if (this.level === 'easy') this.minesCount = 10;
      if (this.level === 'medium') this.minesCount = 23;
      if (this.level === 'hard') this.minesCount = 63;
    } else {
      this.minesCount = this.customMinesCount;
    }
    this.minesAmount = createMinesAmountArea(this.minesCount);
    this.lvlButtons = createLvlButtons();
    setActiveLvlBtn(this.level, this.lvlButtons);
    const activeBtn = getActiveBtn(this.level, this.lvlButtons);
    const minesFieldSizeX = activeBtn.dataset.sizeX;
    const minesFieldSizeY = activeBtn.dataset.sizeY;
    const minesField = new MinesField(minesFieldSizeX, minesFieldSizeY, this.minesCount);
    minesField.createMatrix();
    const field = minesField.createField();
    const message = new Message(this.newGameButtonInMessage);
    const timer = new Timer();
    const flagsDisplay = new Display();
    const minesDisplay = new Display();
    const stepsDisplay = new Display();
    const timeDisplay = new Display();
    minesField.onClick(timer, message);
    appHeader.append(this.lvlButtons);
    appHeader.append(this.minesAmount);
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
      this.changeLvl();
      this.changeMinesCount();
    });
    this.newGameButtonInMessage.addEventListener('click', () => {
      document.body.innerHTML = '';
      this.createApp();
      this.restartApp();
      this.changeLvl();
      this.changeMinesCount();
    });
  }

  changeLvl() {
    this.lvlButtons.addEventListener('click', (e) => {
      const button = e.target.closest('button');
      if (button) {
        this.customMinesCount = null;
        const level = button.dataset.value;
        this.level = level;
        document.body.innerHTML = '';
        this.createApp();
        this.restartApp();
        this.changeLvl();
        this.changeMinesCount();
      }
    });
  }

  changeMinesCount() {
    this.minesAmount.addEventListener('change', (e) => {
      const input = e.target.closest('input');
      let value = +input.value;
      if (value < 10) value = 10;
      if (value > 99) value = 99;
      this.customMinesCount = value;
      document.body.innerHTML = '';
      this.createApp();
      this.restartApp();
      this.changeLvl();
      this.changeMinesCount();
    });
  }
}

export default App;
