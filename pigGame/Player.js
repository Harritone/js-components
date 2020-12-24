'use strict';

export default class Player {
  score = 0;
  currentScore = 0;
  element;

  constructor(name, active = false) {
    this.name = name;
    this.active = active;
    this.getPlayerEl();
  }

  getPlayerEl() {
    const sectionEl = document.createElement('section');
    sectionEl.className = `player player--${this.name}${
      this.active ? ' player--active' : ''
    }`;
    this.sectionEl = sectionEl;
    const titleEl = document.createElement('h2');
    titleEl.classList.add('name');
    titleEl.id = `name--${this.name}`;
    titleEl.textContent = `Player ${this.name + 1}`;

    const parahraphEL = document.createElement('p');
    parahraphEL.classList.add('score');
    parahraphEL.id = `score--${this.name}`;
    parahraphEL.textContent = this.score;
    this.scoreEl = parahraphEL;

    const divEl = document.createElement('div');
    divEl.classList.add('current');
    const divParagraphEl1 = document.createElement('p');
    divParagraphEl1.classList.add('current-label');
    divParagraphEl1.textContent = 'Current';
    const divParagraphEl2 = document.createElement('p');
    this.currentScoreEl = divParagraphEl2;
    divParagraphEl2.classList.add('current-score');
    divParagraphEl2.id = `current--${this.name}`;
    divParagraphEl2.textContent = `${this.currentScore}`;
    divEl.append(divParagraphEl1, divParagraphEl2);

    sectionEl.append(titleEl, parahraphEL, divEl);
    this.element = sectionEl;
  }

  activate() {
    this.active = true;
    this.sectionEl.classList.add('player--active');
  }

  deactivate() {
    this.active = false;
    this.sectionEl.classList.remove('player--active');
  }

  renderCurrentScore() {
    this.currentScoreEl.textContent = this.currentScore;
  }

  renderScore() {
    this.scoreEl.textContent = this.score;
  }

  hold() {
    this.score += this.currentScore;
    this.currentScore = 0;
    this.renderCurrentScore();
    this.renderScore();
  }
}
