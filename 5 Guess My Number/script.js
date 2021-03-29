"use strict";

// The DOM and the DOM methods are not part of the JS, but
// they are part of the WEB APIs and we can interact with them with JS.
// The WEB APIs are written is JS.

/*
// Reading the content of the element.
console.log(document.querySelector(".message").textContent);

// We change the content of the element.
document.querySelector(".message").textContent = "Correct Number!";

document.querySelector(".number").textContent = 13;
document.querySelector(".score").textContent = 18;

// To get the input value or set the value
document.querySelector(".guess").value = 23;
console.log(document.querySelector(".guess").value);
*/

// Handling click events 
// To the element we add an event listener || 1st arg: the name of the event, 2nd arg: the function expression is the event handler
// A function is just a value. The JS engine calls the function when the event happens.

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = Number(document.querySelector(".highscore").textContent);
console.log(highscore);


const displayMessage = function(message) {
    document.querySelector(".message").textContent = message;
};


document.querySelector(".check").addEventListener("click", function() {
    const guess = Number(document.querySelector(".guess").value);
    

    // When there is no input
    if (!guess) {
        displayMessage("⛔️ No number!");
    }


    // When player wins
    else if (guess === secretNumber) {
        displayMessage("🎉️ Correct Number!");
        // We display the secret number
        document.querySelector(".number").textContent = secretNumber;

        // inline styles: camelCase notation for the css properties.
        document.querySelector("body").style.backgroundColor = "#60b347";

        // We need to always specify a string with units.
        document.querySelector(".number").style.width = "30rem";

        if (score > highscore) {
            console.log("I am here!");
            document.querySelector(".highscore").textContent = score;
        }
    }

    // When guess is wrong
    else if (guess !== secretNumber){
        if(score > 1) {
            displayMessage(guess > secretNumber ? "📈️ Too high!" : "📉️ Too low!");
            score--;
            document.querySelector(".score").textContent = score;  
        }
        else {
            displayMessage("💥️ You lost the game...");
            document.querySelector(".score").textContent = 0;
        }
    }
});

document.querySelector(".again").addEventListener("click", function() {
    displayMessage("Start guessing...");
    document.querySelector(".score").textContent = 20;
    document.querySelector(".guess").value = " ";
    document.querySelector(".number").textContent = "?";
    document.querySelector("body").style.backgroundColor = "#222";
    document.querySelector(".number").style.width = "15rem";
    secretNumber = Math.trunc(Math.random() * 20) + 1
    score = 20;
    highscore = Number(document.querySelector(".highscore").textContent);
});
