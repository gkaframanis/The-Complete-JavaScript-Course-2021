"use.strict";

/////////////////////////////////////////////////////////////////////////////
//  FUNCTIONS ACCEPTING CALLBACK FUNCTIONS
/////////////////////////////////////////////////////////////////////////////

const oneWord = function(str) {
    return str.replace(/ /g, "").toLowerCase();
};

const upperFirstWord = function(str) {
    const [first, ...others] = str.split(" ");
    return [first.toUpperCase(), ...others].join(" ");
};

// Higher order function
const transformer = function(str, fn) {
    console.log(`Original string: ${str}`);
    console.log(`Transformed string: ${fn(str)}`);

    console.log(`Transformed by: ${fn.name}`);
};

transformer("JavaScript is the best!", upperFirstWord);
transformer("JavaScript is the best!", oneWord);


const high5 = function() {
    console.log("👋️");
};

// addEventListener here is the higher order function, high5 is the callback function
document.body.addEventListener("click", high5);

// We used again a callback function
["Greg", "Martha", "Adam"].forEach(high5);


/////////////////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS RETURNING FUNCTIONS
/////////////////////////////////////////////////////////////////////////////////////////////

const greet = function(greeting) {
    return function (name) {
        console.log(`${greeting} ${name}!`);
    };
};

const greeterHey = greet("Hey");
greeterHey("Greg");
greeterHey("Steven");

greet("Hello")("Maria");  // This also works (Hello Maria!)

// The above as arrow function (an arrow function returning an arrow function)
const greetArr = greeting => username => console.log(`${greeting} ${username}!`);

greetArr("Hello")("Kostas");