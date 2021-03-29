// Simple Poll App

const poll = {
    question: "What is your favourite programming language?",
    options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
    answers: new Array(4).fill(0),
    registerNewAnswer() {
        const answer = Number(prompt(`${this.question}\n ${this.options.join("\n")}\n(Write option number)`));
        if(typeof answer === "number" && answer >=0 && answer < 4){
            this.answers[answer]++;
        }
        else {
            alert("The anwer should be 0, 1, 2 or 3...");
            this.registerNewAnswer();
        }
        this.displayResults()
        this.displayResults("string");
    },
    displayResults(type="array"){
        if(type === "array") {
            console.log(this.answers);
        }
        else if(type === "string") {
            console.log(`Poll results are ${this.answers.join(", ")}`);
        }
    },
};


document.querySelector(".poll").addEventListener("click", poll.registerNewAnswer.bind(poll));

// We need to pass the new object
poll.displayResults.call({answers: [5, 2, 3]}, "string");
poll.displayResults.call({answers: [1, 5, 3, 9, 6, 1]}, "string");

// BONUS TEST DATA 1: [5, 2, 3]
// BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]