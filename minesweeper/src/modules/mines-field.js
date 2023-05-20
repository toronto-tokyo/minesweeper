import getRndInteger from './getRandom';
import Box from './mine';

class MinesField {
  constructor(sizeX = 10, sizeY = 10, minesCount = 10) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.minesCount = minesCount;
    this.matrix = [];
  }

  addField() {
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
    document.body.append(this.minesField);
  }

  addContent() {
    for (let i = 0; i < this.sizeY; i += 1) {
      for (let j = 0; j < this.sizeX; j += 1) {
        const box = this.matrix[i][j] === 1
          ? new Box(true, { y: i, x: j })
          : new Box(false, { y: i, x: j });
        const content = box.addBox(this.matrix);
        box.onClick(this.boxesMatrix);
        this.fieldRows[i].append(content);
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

  placeMines() {
    let count = this.minesCount;
    while (count) {
      const x = getRndInteger(0, this.sizeX);
      const y = getRndInteger(0, this.sizeY);
      if (this.matrix[y][x] !== 1) {
        this.matrix[y][x] = 1;
        count -= 1;
      }
    }
  }
}

export default MinesField;
