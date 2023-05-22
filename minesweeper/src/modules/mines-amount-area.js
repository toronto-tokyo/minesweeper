function createMinesAmountArea(value) {
  const area = document.createElement('input');
  area.type = 'text';
  area.value = value;
  area.className = 'mines-amount';
  return area;
}

export default (createMinesAmountArea);
