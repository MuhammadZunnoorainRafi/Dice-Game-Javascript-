'use strict';

//!Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnInstruction = document.querySelector('.btn--instruction');
const showInstruction = document.querySelector('.instructionDoc');
const closeInstruction = document.querySelector('.close-instruction');
const showOverlay = document.querySelector('.overlay');

//==>> GLOBAL VARIABLES
let score, currentScore, activePlayer, playing;

//!FUNCTIONS
const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  //Switch to next player
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Starting Conditions
const init = function () {
  playing = true;
  currentScore = 0;
  activePlayer = 0;
  score = [0, 0];

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
};

// <<==||==>>
init();
// <<==||==>>

const displayInstruction = function () {
  showInstruction.classList.remove('hidden');
  showOverlay.classList.remove('hidden');
};

const hideInstruction = function () {
  showInstruction.classList.add('hidden');
  showOverlay.classList.add('hidden');
};

//! Rolling Dice Functionality

btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1.Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. Check for rolled 1
    if (dice !== 1) {
      //Add dice to current Score

      currentScore += dice; // same as ==> currentScore = currentScore + dice ;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

//!Button Hold Functionality

btnHold.addEventListener('click', function () {
  if (playing) {
    //1.Add current score to active player's score
    score[activePlayer] += currentScore;
    // score[1] = score[1] + currentScore

    document.querySelector(`#score--${activePlayer}`).textContent =
      score[activePlayer];

    //2.Check if player's score >= 100
    //Finish the game
    if (score[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden'); //for hiding dice
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //Switch to the next player
      switchPlayer();
    }
  }
});

//!Button New Game Functionality

btnNew.addEventListener('click', init);

//!Displaying Instructions
btnInstruction.addEventListener('click', displayInstruction);
closeInstruction.addEventListener('click', hideInstruction);
showOverlay.addEventListener('click', hideInstruction);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    hideInstruction();
  }
});
