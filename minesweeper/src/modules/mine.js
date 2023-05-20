class Box {
  constructor(isMine, place) {
    this.isMine = isMine;
    this.place = place;
  }

  addBox(matrix) {
    this.box = document.createElement('div');
    this.cap = document.createElement('div');
    this.boxContent = document.createElement('div');
    this.box.className = 'box';
    this.cap.className = 'cap';
    this.boxContent.className = 'box__content';
    if (this.isMine === true) {
      this.boxContent.classList.add('mine');
    } else {
      const number = this.countNearMines(matrix) > 0 ? this.countNearMines(matrix) : '';
      this.isNumber = number > 0;
      this.isEmpty = number === '';
      this.boxContent.textContent = number;
      if (number === 1) this.boxContent.classList.add('number-one');
      if (number === 2) this.boxContent.classList.add('number-two');
      if (number === 3) this.boxContent.classList.add('number-three');
      if (number === 4) this.boxContent.classList.add('number-four');
      if (number === 5) this.boxContent.classList.add('number-five');
      if (number === 6) this.boxContent.classList.add('number-six');
      if (number === 7) this.boxContent.classList.add('number-seven');
      if (number === 7) this.boxContent.classList.add('number-eight');
    }
    this.box.append(this.cap);
    this.box.append(this.boxContent);
    return this.box;
  }

  countNearMines(matrix) {
    const { y, x } = this.place;
    let count = 0;
    const topLeftBox = matrix[y - 1]?.[x - 1] === 1 ? 1 : 0;
    const topBox = matrix[y - 1]?.[x] === 1 ? 1 : 0;
    const topRightBox = matrix[y - 1]?.[x + 1] === 1 ? 1 : 0;
    const rightBox = matrix[y]?.[x + 1] === 1 ? 1 : 0;
    const botRightBox = matrix[y + 1]?.[x + 1] === 1 ? 1 : 0;
    const botBox = matrix[y + 1]?.[x] === 1 ? 1 : 0;
    const botLeftBox = matrix[y + 1]?.[x - 1] === 1 ? 1 : 0;
    const leftBox = matrix[y]?.[x - 1] === 1 ? 1 : 0;
    count = topLeftBox + topBox + topRightBox
      + rightBox
      + botRightBox + botBox + botLeftBox
      + leftBox;
    return count;
  }

  onClick(matrix) {
    function removeCap(matr, box) {
      if (!box || box.cap.className.includes('hidden')) {
        return;
      }
      if (box.isMine === true) {
        alert('lose');
      } else if (box.isNumber === true) {
        box.cap.classList.add('hidden');
      } else {
        box.cap.classList.add('hidden');
        console.log(box.box);
        const { y, x } = box.place;
        const roundBoxes = [];
        const topLeftBox = matr[y - 1]?.[x - 1];
        const topBox = matr[y - 1]?.[x];
        const topRightBox = matr[y - 1]?.[x + 1];
        const rightBox = matr[y]?.[x + 1];
        const botRightBox = matr[y + 1]?.[x + 1];
        const botBox = matr[y + 1]?.[x];
        const botLeftBox = matr[y + 1]?.[x - 1];
        const leftBox = matr[y]?.[x - 1];
        roundBoxes.push(topBox);
        roundBoxes.push(rightBox);
        roundBoxes.push(botBox);
        roundBoxes.push(leftBox);
        roundBoxes.push(topLeftBox);
        roundBoxes.push(topRightBox);
        roundBoxes.push(botRightBox);
        roundBoxes.push(botLeftBox);
        roundBoxes.forEach((el) => removeCap(matr, el));
      }
    }

    this.box.addEventListener('click', () => {
      removeCap(matrix, this);
    });
  }
}

export default Box;
