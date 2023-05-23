function createMinesAmountArea(value) {
  const area = document.createElement('div');
  const input = document.createElement('input');
  input.type = 'text';
  input.value = value;
  area.className = 'mines-amount';
  input.className = 'mines-amount__input';
  area.innerHTML = '<span>Mines: </span>';
  area.append(input);
  return area;
}

export default (createMinesAmountArea);
