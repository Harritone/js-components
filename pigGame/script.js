'use strict';

// Selecting elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

// Variables
let currentScore = 0;
let activePlayer = 0;
const scores = [99, 99];

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const rollDiceHandler = () => {
  let score;
  // 1. Generate a random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;
  // 2. Display dice
  diceEl.classList.remove('hidden');
  // diceEl.setAttribute('src', `dice-${dice}.png`);
  diceEl.src = `dice-${dice}.png`;
  // 3. Check for rolled 1: if true - switch to the next player
  if (dice !== 1) {
    // Add dice to current score
    // currentScore += dice;
    scores[activePlayer] += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      scores[activePlayer];

    checkWinner();
  } else {
    // reset current player's scores
    // currentScore = 0;
    scores[activePlayer] = 0;
    document.getElementById(`current--${activePlayer}`).textContent = '0';
    // // remove active state from current player on UI
    // document
    //   .querySelector(`.player--${activePlayer}`)
    //   .classList.remove('player--active');
    // // switch player
    // activePlayer = activePlayer === 0 ? 1 : 0;
    // // add active state to current player on UI
    // document
    //   .querySelector(`.player--${activePlayer}`)
    //   .classList.add('player--active');
    switchPlayer();
  }
};

const checkWinner = function () {
  if (scores[activePlayer] >= 100) {
    // getCurrentPlayerEl(activePlayer).classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
  }
};

const getCurrentPlayerEl = function (activePlayer) {
  return document.getElementById(`current--${activePlayer}`);
};

const switchPlayer = () => {
  // remove active state from current player on UI
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');
  // switch player
  activePlayer = activePlayer === 0 ? 1 : 0;
  // add active state to current player on UI
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
};

const holdHandler = () => {
  switchPlayer();
};

btnRoll.addEventListener('click', rollDiceHandler);
btnHold.addEventListener('click', holdHandler);
