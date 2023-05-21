import getRndInteger from './getRandom';
import { Box, openedBoxes, removeCap } from './mine';

class MinesField {
  constructor(sizeX = 10, sizeY = 10, minesCount = 10) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.minesCount = minesCount;
    this.matrix = [];
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
        box.onClick(this.boxesMatrix);
        this.fieldRows[i].append(boxElem);
        this.boxesMatrix[i][j] = box;
      }
    }
  }

  createMatrix() {
    for (let i = 0; i < this.sizeY; i += 1) {
      this.matrix.push([]);
      for (let j = 0; j < this.sizeX; j += 1) {
        this.matrix[i][j] = 0;
      }
    }
    this.boxesMatrix = JSON.parse(JSON.stringify(this.matrix));
  }

  placeMines(firstClickY, firstClickX) {
    let count = this.minesCount;
    while (count) {
      const x = getRndInteger(0, this.sizeX);
      const y = getRndInteger(0, this.sizeY);
      if (this.matrix[y][x] !== 1 && x !== +firstClickX && y !== +firstClickY) {
        this.matrix[y][x] = 1;
        count -= 1;
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
        if (!this.firstClickPlace) {
          this.firstClickPlace = box.dataset;
          this.placeMines(y, x);
          for (let i = 0; i < this.sizeY; i += 1) {
            for (let j = 0; j < this.sizeX; j += 1) {
              this.boxesMatrix[i][j].addContent(this.matrix);
            }
          }
        }
        removeCap(this.boxesMatrix, this.boxesMatrix[y][x]);
        if ((this.sizeX * this.sizeY) - openedBoxes === this.minesCount) {
          const time = timer.getTime();
          message.displayWin(time);
        }
        if (this.matrix[y][x] === 1) message.displayLose(timer.getTime());
      }
    });
    this.minesField.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      if (e.target.closest('.box')) {
        timer.countTime();
        const boxElem = e.target.closest('.box');
        const x = boxElem.dataset.x;
        const y = boxElem.dataset.y;
        const box = this.boxesMatrix[y][x];
        box.isFlagged = !box.isFlagged;
        box.box.classList.toggle('flagged');
        if (box.isFlagged) {
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
}

export default MinesField;
