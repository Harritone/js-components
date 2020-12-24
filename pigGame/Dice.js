export default class Dice {
  imgUrl;
  dice;
  show = false;
  element;
  constructor() {}

  getDiceEl() {
    const img = document.createElement('img');
    if (this.imgUrl) {
      img.src = `dice-${this.imgUrl}.png`;
    }
    img.alt = 'Playing dice';
    img.classList.add('dice');
    if (!this.show) [img.classList.add('hidden')];
    this.element = img;
    return img;
  }

  roll() {
    const dice = Math.trunc(Math.random() * 6) + 1;
    this.imgUrl = dice;
    this.show = true;
    this.dice = dice;
    this.showDice(this.show);
    console.log(dice);
  }

  showDice(show) {
    if (!show) {
      return;
    }

    this.element.classList.remove('hidden');
    this.element.src = `dice-${this.imgUrl}.png`;
  }
}
