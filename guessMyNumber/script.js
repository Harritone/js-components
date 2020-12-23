'use strict';

const startButtonElement = document.querySelector('.check');
const newGameButtonElement = document.querySelector('.again');
const numberElement = document.querySelector('.number');
const messageElement = document.querySelector('.message');
const inputElement = document.querySelector('input');
const scoreElement = document.querySelector('.score');

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;

numberElement.textContent = secretNumber;
scoreElement.textContent = score;

const buttonOnClick = () => {
  const guess = +document.querySelector('.guess').value;
  console.log(secretNumber);

  if (score > 1) {
    if (!guess) {
      messageElement.textContent = '⛔ No number!';
    } else if (guess === secretNumber) {
      messageElement.textContent = '🎉 Correct Number!';
      document.body.style.backgroundColor = '#60b347';
      numberElement.style.width = '30rem';
    } else if (guess > secretNumber) {
      messageElement.textContent = 'Too high! 📈';
      score--;
    } else if (guess < secretNumber) {
      messageElement.textContent = 'Too low! 📉';
      score--;
    }
    scoreElement.textContent = score;
  } else {
    messageElement.textContent = '🧨 You lost the game!';
    scoreElement.textContent = 0;
  }
};

const clearInput = () => {
  inputElement.value = '';
};

startButtonElement.addEventListener('click', buttonOnClick);
