'use strict';

export default class Player {
  score = 0;
  currentScore = 0;
  active;
  element;

  constructor(name) {
    this.name = name;
  }

  getPlayerEl() {
    const sectionEl = document.createElement('section');
    sectionEl.className = `player player--${this.name}${
      this.active ? ' player--active' : ''
    }`;
    const titleEl = document.createElement('h2');
    titleEl.classList.add('name');
    titleEl.id = `name--${this.name}`;
    titleEl.textContent = `Player ${this.name + 1}`;

    const parahraphEL = document.createElement('p');
    parahraphEL.classList.add('score');
    parahraphEL.id = `score--${this.name}`;
    parahraphEL.textContent = this.score;

    const divEl = document.createElement('div');
    divEl.classList.add('current');
    const divParagraphEl1 = document.createElement('p');
    divParagraphEl1.classList.add('current-label');
    divParagraphEl1.textContent = 'Current';
    const divParagraphEl2 = document.createElement('p');
    divParagraphEl2.classList.add('current-score');
    divParagraphEl2.id = `current--${this.name}`;
    divParagraphEl2.textContent = `${this.currentScore}`;
    divEl.append(divParagraphEl1, divParagraphEl2);

    sectionEl.append(titleEl, parahraphEL, divEl);
    this.element = sectionEl;
    return sectionEl;
  }
}
