const resultsData = [];

function setResDBLocalStorage() {
  window.addEventListener('beforeunload', () => {
    const data = JSON.stringify(resultsData);
    localStorage.setItem('resultsDB', data);
  });
}

function getResDBLocalStorage(results) {
  window.addEventListener('load', () => {
    if (localStorage.getItem('resultsDB')) {
      resultsData.length = 0;
      resultsData.push(...JSON.parse(localStorage.getItem('resultsDB')));
      results.setResultStory(resultsData);
    }
  });
}

export {
  resultsData,
  setResDBLocalStorage,
  getResDBLocalStorage,
};
