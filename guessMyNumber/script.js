'use strict';

const startButtonElement = document.querySelector('.check');
const newGameButtonElement = document.querySelector('.again');
const numberElement = document.querySelector('.number');
const messageElement = document.querySelector('.message');
const inputElement = document.querySelector('input');
const scoreElement = document.querySelector('.score');
const highScoreElement = document.querySelector('.highscore');

// let secretNumber = Math.trunc(Math.random() * 20) + 1;
// let score = 20;
let score;
let secretNumber;
let highScore = window.localStorage.getItem('highScore') || 0;
highScoreElement.textContent = highScore;

// scoreElement.textContent = score;

const buttonOnClick = () => {
  const guess = +document.querySelector('.guess').value;

  if (score > 1) {
    if (!guess) {
      messageElement.textContent = '⛔ No number!';
    } else if (guess === secretNumber) {
      messageElement.textContent = '🎉 Correct Number!';
      document.body.style.backgroundColor = '#60b347';
      numberElement.style.width = '30rem';
      numberElement.textContent = secretNumber;
      if (score > highScore) {
        highScoreElement.textContent = score;
        window.localStorage.setItem('highScore', JSON.stringify(score));
      }
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

const newGameHandler = () => {
  numberElement.textContent = '?';
  score = 20;
  scoreElement.textContent = score;
  messageElement.textContent = 'Start guessing';
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  clearInput();
  document.body.style.backgroundColor = '#222';
  numberElement.style.width = '15rem';
};

const clearInput = () => {
  inputElement.value = '';
};

newGameHandler();

startButtonElement.addEventListener('click', buttonOnClick);
newGameButtonElement.addEventListener('click', newGameHandler);
