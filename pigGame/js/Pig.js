'use strict';
import Button from './Button.js';
import Dice from './Dice.js';
import Player from './Player.js';

export default class Pig {
  hasWinner = false;
  constructor(container) {
    this.container = container;
    this.player0 = new Player(0, true);
    this.player1 = new Player(1);
    this.dice = new Dice();
    this.buttonNew = new Button('new');
    this.buttonRoll = new Button('roll');
    this.buttonHold = new Button('hold');
    this.render();
    this.connectRollBtn();
    this.connectHoldBtn();
    this.connectNewBtn();
    this.activePlayer = this.player0;
  }

  render() {
    this.container.append(
      this.player0.element,
      this.player1.element,
      this.dice.element,
      this.buttonNew.element,
      this.buttonRoll.element,
      this.buttonHold.element
    );
  }

  connectRollBtn() {
    this.buttonRoll.element.addEventListener('click', this.rollBtnHandler);
  }

  connectHoldBtn() {
    this.buttonHold.element.addEventListener('click', this.holdBtnHandler);
  }

  connectNewBtn() {
    this.buttonNew.element.addEventListener('click', this.newBtnHandler);
  }

  rollBtnHandler = () => {
    if (this.hasWinner) {
      return;
    }
    this.dice.roll();
    const { number } = this.dice;
    console.log(number);
    if (number !== 1) {
      this.activePlayer.currentScore += number;
      this.activePlayer.renderCurrentScore();
    } else if (number === 1) {
      this.activePlayer.currentScore = 0;
      this.activePlayer.renderCurrentScore();
      this.switchPlayer();
    }
  };

  holdBtnHandler = () => {
    console.log('Hold');
    this.activePlayer.hold();
    this.hasWinner = this.activePlayer.checkWinner();
    if (!this.hasWinner) {
      this.switchPlayer();
    }
  };

  newBtnHandler = () => {
    this.player0.reset();
    this.player1.reset();
    this.activePlayer = this.player0;
    this.activePlayer.activate();
    this.hasWinner = false;
  };

  switchPlayer() {
    this.activePlayer.deactivate();
    this.activePlayer =
      this.activePlayer === this.player0 ? this.player1 : this.player0;
    this.activePlayer.activate();
  }
}
