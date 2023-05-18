import getRndInteger from './getRandom';

class MinesField {
  constructor(sizeX = 10, sizeY = 10, minesCount = 10) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.minesCount = minesCount;
    this.matrix = [];
  }

  createMatrix() {
    for (let i = 0; i < this.sizeY; i += 1) {
      this.matrix.push([]);
      for (let j = 0; j < this.sizeX; j += 1) {
        this.matrix[i][j] = 0;
      }
    }
  }
}

export default MinesField;
