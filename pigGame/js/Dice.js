export default class Dice {
  imgUrl;
  number;
  show = false;
  element;
  constructor() {
    this.getDiceEl();
  }

  getDiceEl() {
    const img = document.createElement('img');
    if (this.imgUrl) {
      img.src = `../img/dice-${this.imgUrl}.png`;
    }
    img.alt = 'Playing dice';
    img.classList.add('dice');
    if (!this.show) [img.classList.add('hidden')];
    this.element = img;
  }

  roll() {
    const dice = Math.trunc(Math.random() * 6) + 1;
    this.imgUrl = dice;
    this.show = true;
    this.number = dice;
    this.showDice(this.show);
  }

  showDice(show) {
    if (!show) {
      return;
    }
    this.element.classList.remove('hidden');
    this.element.src = `../img/dice-${this.imgUrl}.png`;
  }
}
