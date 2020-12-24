'use strict';
import Player from './Player.js';
import Pig from './Pig.js';
import Dice from './Dice.js';
import Button from './Button.js';

// // Selecting elements
// const score0El = document.getElementById('score--0');
// const score1El = document.getElementById('score--1');
// const diceEl = document.querySelector('.dice');
// const btnRoll = document.querySelector('.btn--roll');
// const btnNew = document.querySelector('.btn--new');
// const btnHold = document.querySelector('.btn--hold');
// const current0El = document.getElementById('current--0');
// const current1El = document.getElementById('current--1');

// // Variables
// let currentScore = 0;
// let activePlayer = 0;
// const scores = [0, 0];
// let isWinner = false;

// score0El.textContent = 0;
// score1El.textContent = 0;
// diceEl.classList.add('hidden');

// const rollDiceHandler = () => {
//   if (isWinner) {
//     return;
//   }
//   let score;
//   // 1. Generate a random dice roll
//   const dice = Math.trunc(Math.random() * 6) + 1;
//   // 2. Display dice
//   diceEl.classList.remove('hidden');
//   // diceEl.setAttribute('src', `dice-${dice}.png`);
//   diceEl.src = `dice-${dice}.png`;
//   // 3. Check for rolled 1: if true - switch to the next player
//   if (dice !== 1) {
//     // Add dice to current score
//     currentScore += dice;
//     document.getElementById(
//       `current--${activePlayer}`
//     ).textContent = currentScore;
//   } else if (dice === 1 && scores[activePlayer] === 99) {
//     currentScore += dice;
//     getCurrentPlayerEl(activePlayer).textContent = currentScore;
//     scores[activePlayer] += currentScore;
//     checkWinner();
//   } else {
//     currentScore = 0;
//     getCurrentPlayerEl(activePlayer).textContent = currentScore;
//     switchPlayer();
//   }
// };

// const checkWinner = function () {
//   if (scores[activePlayer] >= 10) {
//     // getCurrentPlayerEl(activePlayer).classList.add('player--winner');
//     score0El.textContent = scores[0];
//     score1El.textContent = scores[1];

//     document
//       .querySelector(`.player--${activePlayer}`)
//       .classList.add('player--winner');
//     isWinner = true;
//     // btnRoll.removeEventListener('click', rollDiceHandler);
//     // btnHold.removeEventListener('click', holdHandler);
//   }
// };

// const getCurrentPlayerEl = function (activePlayer) {
//   return document.getElementById(`current--${activePlayer}`);
// };

// const switchPlayer = () => {
//   if (isWinner) {
//     return;
//   }
//   // remove active state from current player on UI
//   document
//     .querySelector(`.player--${activePlayer}`)
//     .classList.remove('player--active');
//   // switch player
//   activePlayer = activePlayer === 0 ? 1 : 0;
//   // add active state to current player on UI
//   document
//     .querySelector(`.player--${activePlayer}`)
//     .classList.add('player--active');
// };

// const holdHandler = () => {
//   if (isWinner) {
//     return;
//   }
//   scores[activePlayer] += currentScore;
//   score0El.textContent = scores[0];
//   score1El.textContent = scores[1];
//   getCurrentPlayerEl(activePlayer).textContent = 0;
//   currentScore = 0;
//   checkWinner();
//   if (!isWinner) switchPlayer();
// };

// const newGameHandler = () => {
//   // btnRoll.addEventListener('click', rollDiceHandler);
//   // btnHold.addEventListener('click', holdHandler);
//   if (document.querySelector('.player--winner'))
//     document
//       .querySelector('.player--winner')
//       .classList.remove('player--winner');
//   score0El.textContent = '0';
//   score1El.textContent = '0';
//   console.log(score0El);
//   scores[0] = 0;
//   scores[1] = 0;
//   activePlayer = 0;
//   currentScore = 0;
//   isWinner = false;
// };

// btnRoll.addEventListener('click', rollDiceHandler);
// btnHold.addEventListener('click', holdHandler);
// btnNew.addEventListener('click', newGameHandler);

const main = document.createElement('main');
document.body.prepend(main);
const pig = new Pig(main);

console.log(pig);
