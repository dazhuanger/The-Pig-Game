/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, prevDice;
// var winScore = 100;

function init() {
  gamePlaying = true;
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  document.querySelector(".dice-1").style.display = "none";
  document.querySelector(".dice-2").style.display = "none";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}

function nextPlayer() {
  roundScore = 0;
  // Clear the current accumulated score of the active player
  document.querySelector("#current-" + activePlayer).textContent = 0;
  // Switch the active player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  // Toggle the display of active player
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  document.querySelector(".dice-1").style.display = "none";
  document.querySelector(".dice-2").style.display = "none";
}

// Start the game
init();

// Roll the dice
document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlaying) {
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
    var dice1DOM = document.querySelector(".dice-1");
    var dice2DOM = document.querySelector(".dice-2");
    dice1DOM.style.display = "block";
    dice2DOM.style.display = "block";
    dice1DOM.src = "dice-" + dice1 + ".png";
    dice2DOM.src = "dice-" + dice2 + ".png";

    // if (dice === 6 && prevDice === 6) {
    //   // Lose the entire score if rolls two 6 in a roll
    //   scores[activePlayer] = 0;
    //   document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
    //   prevDice = 0;
    //   nextPlayer();
    // } else if (dice !== 1) {
    //   // Accumulating the round scores if it's not 1
    //   roundScore += dice;
    //   document.querySelector("#current-" + activePlayer).textContent = roundScore;
    //   // Store the previous dice number
    //   prevDice = dice;
    // } else {
    //   // Next player
    //   nextPlayer();
    // }

    if (dice1 != 1 && dice2 != 1) {
      //  Accumulating the round scores if it's not 1
      roundScore += dice1 + dice2;
      document.querySelector("#current-" + activePlayer).textContent = roundScore;
    } else {
      nextPlayer();
    }
  }
});

// Hold the points
document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlaying) {
    // Add current score to global score
    scores[activePlayer] += roundScore;
    // Update the UI
    document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
    // Set the winning score
    var winScore = document.querySelector(".winning-score").value;
    // Detect if there is an input
    if (winScore) {
      winScore = document.querySelector(".winning-score").value;
    } else {
      // If no input, default winning score is ...
      winScore = 50;
    }

    // Check if player has won the game
    if (scores[activePlayer] >= winScore) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document.querySelector(".dice-1").style.display = "none";
      document.querySelector(".dice-2").style.display = "none";
      document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
      document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

// Start a new game
document.querySelector(".btn-new").addEventListener("click", init);
