import getRndInteger from './getRandom';
import { Box, removeCap } from './mine';
import playMusic from './playMusic';

class MinesField {
  constructor(sizeX = 10, sizeY = 10, minesCount = 10) {
    this.sizeX = +sizeX;
    this.sizeY = +sizeY;
    this.minesCount = minesCount;
    this.matrix = [];
    this.steps = 0;
    this.openedBoxesAmount = [0];
  }

  createField() {
    this.fieldRows = [];
    this.minesField = document.createElement('div');
    const minesFieldRow = document.createElement('div');
    this.minesField.className = 'mines-field';
    minesFieldRow.className = 'mines-field__row';
    for (let i = 0; i < this.sizeY; i += 1) {
      const row = minesFieldRow.cloneNode();
      this.fieldRows.push(row);
      this.minesField.append(row);
    }
    this.addContent();
    return this.minesField;
  }

  addContent() {
    for (let i = 0; i < this.sizeY; i += 1) {
      for (let j = 0; j < this.sizeX; j += 1) {
        const box = new Box(false, { y: i, x: j });
        const boxElem = box.addBox();
        this.fieldRows[i].append(boxElem);
        this.boxesMatrix[i][j] = box;
      }
    }
  }

  createMatrix() {
    for (let i = 0; i < this.sizeY; i += 1) {
      this.matrix.push([]);
      for (let j = 0; j < this.sizeX; j += 1) {
        if (this.sizeX === 10 && this.minesCount > 50) {
          this.matrix[i][j] = 1;
        }
        if (this.sizeX !== 10 || this.minesCount <= 50) {
          this.matrix[i][j] = 0;
        }
      }
    }
    this.boxesMatrix = JSON.parse(JSON.stringify(this.matrix));
  }

  placeMines(firstClickY, firstClickX) {
    let count = this.minesCount;
    if (this.sizeX === 10 && this.minesCount > 50) {
      this.matrix[+firstClickY][+firstClickX] = 0;
      if ((this.sizeX * this.sizeY) - this.minesCount - 1 === 0) count = 0;
      else count += 1;
    }
    while (count) {
      const x = getRndInteger(0, this.sizeX);
      const y = getRndInteger(0, this.sizeY);
      if (this.sizeX === 10 && this.minesCount > 50) {
        if (this.matrix[y][x] !== 0) {
          this.matrix[y][x] = 0;
          if ((this.sizeX * this.sizeY) - (count + 1) === 0) {
            count = 0;
          } else {
            count += 1;
          }
        }
      }
      if (this.sizeX !== 10 || this.minesCount <= 50) {
        if (this.matrix[y][x] !== 1 && x !== +firstClickX && y !== +firstClickY) {
          this.matrix[y][x] = 1;
          count -= 1;
        }
      }
    }
  }

  onClick(timer, message) {
    this.minesField.addEventListener('click', (e) => {
      if (e.target.closest('.box')) {
        timer.countTime();
        const box = e.target.closest('.box');
        const x = box.dataset.x;
        const y = box.dataset.y;
        if (this.boxesMatrix[y][x].isFlagged) return;
        if (!this.boxesMatrix[y][x].cap.className.includes('hidden')) {
          playMusic('openBox');
          this.steps += 1;
          this.stepsDisplay.setValue(this.steps);
        }
        if (!this.firstClickPlace) {
          this.firstClickPlace = box.dataset;
          this.placeMines(y, x);
          for (let i = 0; i < this.sizeY; i += 1) {
            for (let j = 0; j < this.sizeX; j += 1) {
              this.boxesMatrix[i][j].addContent(this.matrix);
            }
          }
        }
        removeCap(this.boxesMatrix, this.boxesMatrix[y][x], this.openedBoxesAmount);
        if ((this.sizeX * this.sizeY) - this.openedBoxesAmount === this.minesCount) {
          const time = timer.getTime();
          message.displayWin(time, this.steps);
          playMusic('win');
          this.results.addWinResult(this.level, timer.getTime(), this.steps);
        }
        if (this.matrix[y][x] === 1) {
          playMusic('lose');
          message.displayLose(timer.getTime(), this.steps);
        }
      }
    });
    this.minesField.addEventListener('contextmenu', (e) => {
      if (e.target.closest('.box')) {
        e.preventDefault();
        timer.countTime();
        const boxElem = e.target.closest('.box');
        const x = boxElem.dataset.x;
        const y = boxElem.dataset.y;
        const box = this.boxesMatrix[y][x];
        if (box.cap.className.includes('hidden')) return;
        box.isFlagged = !box.isFlagged;
        box.box.classList.toggle('flagged');
        if (box.isFlagged) {
          playMusic('setFlag');
          this.flagsDisplay.incrValue();
          this.minesDisplay.decrValue();
        } else {
          this.minesDisplay.incrValue();
          this.flagsDisplay.decrValue();
        }
      }
    });
  }

  setFlagsDisplay(display) {
    this.flagsDisplay = display;
  }

  setMinesDisplay(display) {
    this.minesDisplay = display;
    this.minesDisplay.setValue(this.minesCount);
  }

  setStepsDisplay(display) {
    this.stepsDisplay = display;
  }

  setTimeDisplay(display) {
    this.timeDisplay = display;
  }

  setResults(results) {
    this.results = results;
  }

  setLevel(value) {
    this.level = value;
  }
}

export default MinesField;
