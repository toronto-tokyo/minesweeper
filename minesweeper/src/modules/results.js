class Results {
  constructor(resultStory, resultsAmount = 10) {
    this.resultsAmount = resultsAmount;
    this.resultsStory = resultStory;
  }

  createResults() {
    this.results = document.createElement('div');
    const resButton = document.createElement('button');
    this.resPopUp = document.createElement('div');
    const resPopUpContent = document.createElement('div');
    const closeResPopUpBtn = document.createElement('div');
    const closeResPopUpBtnContent = document.createElement('div');
    const resPopUpHeader = document.createElement('h2');
    this.resultsRecords = document.createElement('div');
    this.resultRecord = document.createElement('div');
    const recordNumber = document.createElement('div');
    const recordLevel = document.createElement('div');
    const recordTime = document.createElement('div');
    const recordMoves = document.createElement('div');
    this.results.className = 'results';
    resButton.className = 'results__open-btn';
    this.resPopUp.className = 'results__popup hidden';
    resPopUpContent.className = 'results__popup-content';
    closeResPopUpBtn.className = 'results__close-btn';
    closeResPopUpBtnContent.className = 'results__close-btn-symbol';
    resPopUpHeader.className = 'results__header';
    this.resultsRecords.className = 'results__records';
    this.resultRecord.className = 'results__record record';
    recordNumber.className = 'record__number';
    recordLevel.className = 'record__level';
    recordTime.className = 'record__time';
    recordMoves.className = 'record__moves';
    this.resultRecord.append(recordNumber);
    this.resultRecord.append(recordLevel);
    this.resultRecord.append(recordTime);
    this.resultRecord.append(recordMoves);
    this.addRecords();
    const recordsHeaders = this.resultRecord.cloneNode(true);
    const recordLevelHeaderElem = recordsHeaders.querySelector('.record__level');
    const recordTimeHeaderElem = recordsHeaders.querySelector('.record__time');
    const recordMovesHeaderElem = recordsHeaders.querySelector('.record__moves');
    recordsHeaders.classList.add('records-headers');
    this.resultsRecords.prepend(recordsHeaders);
    recordLevelHeaderElem.textContent = 'Level';
    recordTimeHeaderElem.textContent = 'Time';
    recordMovesHeaderElem.textContent = 'Moves';
    resPopUpHeader.textContent = 'Results';
    closeResPopUpBtn.append(closeResPopUpBtnContent);
    resPopUpContent.append(closeResPopUpBtn);
    resPopUpContent.append(resPopUpHeader);
    resPopUpContent.append(this.resultsRecords);
    this.resPopUp.append(resPopUpContent);
    resButton.textContent = 'results';
    this.results.append(resButton);
    this.results.append(this.resPopUp);
    this.onClick();
    return this.results;
  }

  addRecords() {
    for (let i = 0; i < this.resultsAmount; i += 1) {
      const recordElem = this.resultRecord.cloneNode(true);
      const recordNumElem = recordElem.querySelector('.record__number');
      const recordLevelElem = recordElem.querySelector('.record__level');
      const recordTimeElem = recordElem.querySelector('.record__time');
      const recordMovesElem = recordElem.querySelector('.record__moves');
      recordNumElem.textContent = i + 1;
      if (this.resultsStory?.[i]) {
        recordLevelElem.textContent = `${this.resultsStory[i].level}`;
        recordTimeElem.textContent = `${this.resultsStory[i].time}`;
        recordMovesElem.textContent = `${this.resultsStory[i].moves}`;
      } else {
        recordLevelElem.textContent = '---';
        recordTimeElem.textContent = '---';
        recordMovesElem.textContent = '---';
      }
      this.resultsRecords.append(recordElem);
    }
  }

  setResultStory(value) {
    this.resultsStory = value;
    this.addRecords();
  }

  onClick() {
    this.results.addEventListener('click', (e) => {
      if (e.target.closest('.results__open-btn')) {
        this.resPopUp.classList.remove('hidden');
        this.resPopUp.classList.add('popup-visible');
        return;
      }
      if (e.target.closest('.results__close-btn')) {
        this.resPopUp.classList.add('hidden');
        this.resPopUp.classList.remove('popup-visible');
      }
      if (!e.target.closest('.results__popup-content') && this.resPopUp.className.includes('popup-visible')) {
        this.resPopUp.classList.add('hidden');
        this.resPopUp.classList.remove('popup-visible');
      }
    });
  }

  addWinResult(level, time, moves) {
    const result = {
      level,
      time,
      moves,
    };
    if (this.resultsStory.length > 10) {
      this.resultsStory.pop();
      this.resultsStory.unshift(result);
    } else {
      this.resultsStory.unshift(result);
    }
    console.log(this.resultsStory);
    this.updateResults();
  }

  updateResults() {
    this.results = '';
    this.createResults();
    this.addRecords();
  }
}

export default Results;
