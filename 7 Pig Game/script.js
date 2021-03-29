"use strict";

// Selecting elements
const score0El = document.querySelector("#score--0");
// Alternative way: the 2nd way is a bit faster.
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

// Starting Conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

let currentScore = 0;
let totalScore0 = 0;
let totalScore1 = 0;
// Rolling dice functionality
btnRoll.addEventListener("click", function() {
    // Generating a random dice roll
    const diceRoll = Math.trunc(Math.random() * 6) + 1;

    // Displaying the dice
    diceEl.src = `dice-${diceRoll}.png`;
    diceEl.classList.remove("hidden"); 

    // Check for rolled 1: if true, switch to next player
    if (diceRoll === 1) {
        // Switch to next player
        if (player0El.classList.contains("player--active")) {
            currentScore = 0;
            current0El.textContent = currentScore;
            player0El.classList.remove("player--active");
            player1El.classList.add("player--active");
        }
        else {
            currentScore = 0;
            current1El.textContent = currentScore;
            player1El.classList.remove("player--active");
            player0El.classList.add("player--active");
        }
    }
    else {
        if (totalScore0 >= 100 || totalScore1 >= 100) {
            if (player0El.classList.contains("player--active")) {
                player0El.classList.remove("player--active");
            }
            else {
                player1El.classList.remove("player--active");
            }
        }
        else {
            // Add dice to the current score
            if (player0El.classList.contains("player--active")) {
                currentScore += diceRoll;
                current0El.textContent = currentScore;
            }
            else {
                currentScore += diceRoll;
                current1El.textContent = currentScore;
            }
        }
    }
});

btnNew.addEventListener("click", function () {
    currentScore = 0;
    totalScore0 = 0;
    totalScore1 = 0;
    score0El.textContent = totalScore0;
    score1El.textContent = totalScore1;
    current0El.textContent = currentScore;
    current1El.textContent = currentScore;
    diceEl.classList.add("hidden");
});


btnHold.addEventListener("click", function () {
    if (player0El.classList.contains("player--active") && currentScore > 0) {
        totalScore0 += currentScore;
        if (totalScore0 >= 100) {
            player0El.classList.remove("player--active");
            player0El.classList.add("player--winner");
        }
        else {
            score0El.textContent = totalScore0;
        }
        player0El.classList.remove("player--active");
        player1El.classList.add("player--active");
        currentScore = 0;
        current0El.textContent = currentScore;
    }
    else if (player1El.classList.contains("player--active") && currentScore > 0) {
        totalScore1 += currentScore;
        if (totalScore1 >= 100) {
            player1El.classList.remove("player--active");
            player1El.classList.add("player--winner");
        }
        else {
            score1El.textContent = totalScore1;
        }
        player0El.classList.add("player--active");
        player1El.classList.remove("player--active");
        currentScore = 0;
        current1El.textContent = currentScore;
    }
});

