'use strict';
import Button from './Button.js';
import Dice from './Dice.js';
import Player from './Player.js';

export default class Pig {
  constructor(container) {
    this.container = container;
    this.player0 = new Player(0);
    this.player1 = new Player(1);
    this.dice = new Dice();
    this.buttonNew = new Button('new');
    this.buttonRoll = new Button('roll');
    this.buttonHold = new Button('hold');
    this.activateFirstPlayer();
    this.render();
    this.connectRollBtn();
    console.log(this.buttonRoll.button);
    this.activePlayer = this.player0;
  }

  render() {
    console.log(this.buttonHold);
    this.container.append(
      this.player0.getPlayerEl(),
      this.player1.getPlayerEl(),
      this.dice.getDiceEl(),
      this.buttonNew.getButtonEl(),
      this.buttonRoll.getButtonEl(),
      this.buttonHold.getButtonEl()
    );
  }

  connectRollBtn() {
    this.buttonRoll.button.addEventListener('click', this.rollBtnHandler);
  }

  rollBtnHandler = () => {
    this.dice.roll();
  };

  activateFirstPlayer() {
    this.player0.active = true;
  }
}
