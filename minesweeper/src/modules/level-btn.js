class BtnLevel {
  constructor(level, sizeX, sizeY) {
    this.level = level;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
  }

  createBtn() {
    this.button = document.createElement('button');
    this.button.dataset.value = this.level;
    this.button.dataset.sizeX = this.sizeX;
    this.button.dataset.sizeY = this.sizeY;
    this.button.className = 'choose-lvl__btn';
    this.button.textContent = this.level;
    return this.button;
  }
}

function createLvlButtons() {
  const buttonsWrapper = document.createElement('div');
  buttonsWrapper.className = 'choose-lvl';
  const easyBtn = new BtnLevel('easy', 10, 10);
  const mediumBtn = new BtnLevel('medium', 15, 15);
  const hardBtn = new BtnLevel('hard', 25, 25);
  const easyBtnElem = easyBtn.createBtn();
  const mediumBtnElem = mediumBtn.createBtn();
  const hardBtnElem = hardBtn.createBtn();
  buttonsWrapper.append(easyBtnElem);
  buttonsWrapper.append(mediumBtnElem);
  buttonsWrapper.append(hardBtnElem);
  return buttonsWrapper;
}

function setActiveLvlBtn(level, buttonsWrapper) {
  const chooseLvlButtons = Array.from(buttonsWrapper.querySelectorAll('button'));
  chooseLvlButtons.forEach((el) => el.classList.remove('active'));
  const activeBtn = chooseLvlButtons.find((el) => el.dataset.value === level);
  activeBtn.classList.add('active');
}

function getActiveBtn(level, buttonsWrapper) {
  const chooseLvlButtons = Array.from(buttonsWrapper.querySelectorAll('button'));
  const activeBtn = chooseLvlButtons.find((el) => el.dataset.value === level);
  return activeBtn;
}

export {
  BtnLevel,
  createLvlButtons,
  setActiveLvlBtn,
  getActiveBtn,
};
