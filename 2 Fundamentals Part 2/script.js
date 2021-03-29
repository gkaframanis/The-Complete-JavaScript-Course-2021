// Activating strict mode to write more secure code and JS doesn't fail silently
"use strict";

/*
/////////////////////////////////////////////////////////////////////
// STRICT MODE 
/////////////////////////////////////////////////////////////////////
let hasDriversLicense = false;
const passTest = true;

if (passTest) {
    hasDriversLicense = true;
}
if (hasDriversLicense) {
    console.log("I can drive :D");  
}
*/

/*
///////////////////////////////////////////////////////////////////////
// FUNCTIONS 
///////////////////////////////////////////////////////////////////////

function logger() {
    console.log("My name is Gregory!");  
}

// Invoking, running or calling the function
logger();

// Functions can also receive (parameters) and return data.
function fruitProcessor(apples, oranges) {
    console.log(apples, oranges);  
    const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
    return juice;
}

const appleJuice = fruitProcessor(5, 0);
console.log(appleJuice);  
console.log(fruitProcessor(5, 0));  

const orangeJuice = fruitProcessor(0, 5);
console.log(orangeJuice);  

const appleOrangeJuice = fruitProcessor(2, 4);
console.log(appleOrangeJuice);  
*/


/*
//////////////////////////////////////////////////////////////////////
// FUNCTION DECLARATIONS VS EXPRESSIONS
//////////////////////////////////////////////////////////////////////

// function declaration // They can be called before they are defined.
function calcAge1(birthYear) {
    return 2037 - birthYear;
}

// The argument is the actual value we use to fill in the placeholder which is the parameter.
const age1 = calcAge1(1986);
console.log(age1);  


// function expression: an anonymous function that produces a value. They can't be called before they are initialized.
// functions in JS are values.
const calcAge2 = function (birthYear) {
    return 2037 - birthYear;
};

const age2 = calcAge2(1986);

console.log(age1, age2);  
*/

/*
///////////////////////////////////////////////////////////////////////
// ARROW FUNCTIONS (ES6)
///////////////////////////////////////////////////////////////////////

// Arrow function (a special form of a function expression)  || Arrow functions DO NOT get the "this" keyword.
// Simplest form for 1 parameter and one line of code in whice we have to return something.
const calcAge3 = birthYear => 2037 - birthYear;
const age3 = calcAge3(1986);
console.log(age3);  


const yearsUntilRetirement = (birthYear, firstName) => {
    const age = 2037 - birthYear;
    const retirement = 65 - age;
    return `${firstName} retires in ${retirement} years.`;
};

console.log(yearsUntilRetirement(1986, "Gregory"));  
console.log(yearsUntilRetirement(1980, "Bob"));  
*/


/*
////////////////////////////////////////////////////////////////////////
// FUNCTIONS CALLING OTHER FUNCTIONS
////////////////////////////////////////////////////////////////////////

function cutFruitPieces(fruit) {
    return fruit * 4;
}

function fruitProcessor(apples, oranges) {
    const applePieces = cutFruitPieces(apples);
    const orangePieces = cutFruitPieces(oranges);

    console.log(apples, oranges);  
    const juice = `Juice with ${applePieces} pieces of apple and ${orangePieces} pieces of orange.`;
    return juice;
}

console.log(fruitProcessor(2, 3));  
*/

/*
///////////////////////////////////////////////////////////////////////////
// ARRAYS
///////////////////////////////////////////////////////////////////////////

// Literal syntax which is more usual
const friends = ["Michael", "Steven", "Peter"];
console.log(friends);  

// const years = new Array(1991, 1984, 2008, 2020);
// console.log(years);  

// Bracket syntax to get the elements
console.log(friends[0]);  
console.log(friends[2]);  

// Number of items in the array  || it's not zero based
console.log(friends.length);  
// To get the last element of the array. In the brackets we can put any expression.
console.log(friends[friends.length - 1]);  

// We could change an element in the array, although we declared it as const.
// Only primitive values are immutable, but an array is not an primitive value, so we can always change it.
// We can mutate arrays, although they were declared as const.
// But we can NOT replace the entire array!!!
friends[2] = "Jay";
console.log(friends);  

// An array can keep values of different types.
const firstName = "Gregory";
const gregory = [firstName, "Kaframanis", 2037 - 1986, "programmer", friends];
console.log(gregory);  
console.log(gregory.length);  


// Exercise
const calcAge = function (birthYear) {
    return 2037 - birthYear;
};

const years = [1990, 1967, 2002, 2010, 2018];

const age1 = calcAge(years[0]);
const age2 = calcAge(years[1]);
const age3 = calcAge(years[years.length - 1]);
console.log(age1, age2, age3);  

const ages = [calcAge(years[0]), calcAge(years[1]), calcAge(years[years.length - 1])];
console.log(ages);  
*/

/*
//////////////////////////////////////////////////////////////////////////////////
// BASIC ARRAY OPERATIONS (METHODS)
//////////////////////////////////////////////////////////////////////////////////

const friends = ["Michael", "Steven", "Peter"];

// Add Elements
// push method: puts element at the end of the array || it returns the length of the new array
const newLength = friends.push("Jay");
console.log(friends);  
console.log(newLength);  

// unshift method: puts element at the beginning of the array || also returns the length of the new array
friends.unshift("John");
console.log(friends);  


// Remove Elements
// pop method: removes the last element of the array || it returns the removed element.
const popped = friends.pop();
console.log(friends);  
console.log(popped);  

// shift method: removes the first element of the array || it returns the removed element
friends.shift();
console.log(friends);  

// indexOf method: in which position an element is. || It returns -1 if the element doesn't exist.
console.log(friends.indexOf("Steven"));  

// ES6 method: includes method returns true of false. It checks with strict equality!
console.log(friends.includes("Steven"));  
console.log(friends.includes("Bob"));  
*/


/*
//////////////////////////////////////////////////////////////////////////////////////////////////
// OBJECTS  - DOT vs. BRACKET NOTATION
//////////////////////////////////////////////////////////////////////////////////////////////////

// We key - value pairs {}. Each of the keys is called property.

const gregory = {
    firstName: "Gregory",
    lastName: "Kaframanis",
    age: 2037 - 1986,
    job: "programmer",
    friends: ["Michael", "Peter", "Steven"]
};

console.log(gregory.firstName);  
console.log(gregory["lastName"]);  

console.log(gregory.friends[0]);  

const nameKey = "Name";
// This won't work with dot notation!!! If we need to first compute the property name we have to use the bracket notation.
console.log(gregory["first" + nameKey]);  
console.log(gregory["last" + nameKey]);  

const interestedIn = prompt("What do you want to know about Gregory? Choose between firstName, lastName, age, job and friends.");   

if (gregory[interestedIn]) {
    console.log(gregory[interestedIn]);   
}
else {
    console.log("Wrong request! Choose between firstName, lastName, age, job and friends.");  
}

gregory.location = "Greece";
gregory["twitter"] = "@gkaframanis";
console.log(gregory);

// Challenge
// "Gregory has 3 friends, and his best friend is called Michael."

console.log(`${gregory.firstName} has ${gregory.friends.length} friends, and his best friend is called ${gregory.friends[0]}.`);
*/

/*
//////////////////////////////////////////////////////////////////////////////////////////////
// OBJECT METHODS 
//////////////////////////////////////////////////////////////////////////////////////////////

const gregory = {
    firstName: "Gregory",
    lastName: "Kaframanis",
    birthYear: 1986,
    job: "programmer",
    friends: ["Michael", "Peter", "Steven"],
    hasDriversLicense: true,
    // function expression || method of the object, property with a function value || only this one works
    // 1st version
    // calcAge: function (birthYear) {
    //     return 2037 - birthYear;
    // }

    // // 2nd version with this keyword
    // calcAge: function() {
    //     return 2037 - this.birthYear;
    // }

    // 3rd version: create a new property for the object
    calcAge: function () {
        this.age = 2037 - this.birthYear;
        return this.age;
    },

    getSummary: function () {
        return `${this.firstName} is a ${this.calcAge()} years old ${this.job}, and he has ${this.hasDriversLicense ? "a" : "no"} driver's license.`;
    }

};

// 1st version
// console.log(gregory.calcAge(gregory.birthYear));  // dot notation
// console.log(gregory["calcAge"](gregory["birthYear"]));  // brackets notation


// // 2nd version
// console.log(gregory.calcAge());
// console.log(gregory["calcAge"]());


// 3rd version
// We need to calculate the age once. The most efficient solution
console.log(gregory.calcAge());
console.log(gregory.age);
console.log(gregory["age"]);


// Challenge
// "Gregory is a 51 years old programmer, and he has a driver's license".
console.log(gregory.getSummary());
*/


/*
///////////////////////////////////////////////////////////////////////////////////
// THE FOR LOOP - BREAKING AND CONTINUING - LOOPING BACKWARDS AND LOOPS IN LOOPS
///////////////////////////////////////////////////////////////////////////////////

// for loop keeps running while condition is TRUE
for (let rep = 1; rep <= 10; rep++) {
    console.log(`Lifting weights repetition ${rep}`);
}

const types = [];

const gregory = [
    "Gregory",
    "Kaframanis",
    2037 - 1986,
    "programmer", 
    ["Michaer", "Peter", "Steven"],
    true
];

for (let i = 0; i < gregory.length; i++) {
    // Reading from jonas array
    console.log(gregory[i], typeof gregory[i]);

    // Filling types array
    // types[i] = typeof gregory[i];
    types.push(typeof gregory[i]);
}

console.log(types);

const years = [1991, 2007, 1969, 2020];
const ages = [];

for (let i = 0; i < years.length; i++) {
    ages.push(2037 - years[i]);
}

console.log(ages);


// continue and break statements
// continue: to exit the current iteration of the loop and continue with the next one.
// break: to completetely the entire loop.

console.log("------------------------ ONLY STRINGS ---------------------");
for (let i = 0; i < gregory.length; i++) {
    if (typeof gregory[i] !== "string") continue;

    console.log(gregory[i], typeof gregory[i]);
}

console.log("------------------------ BREAK ON NUMBER ---------------------");
for (let i = 0; i < gregory.length; i++) {
    if (typeof gregory[i] === "number") break;

    console.log(gregory[i], typeof gregory[i]);
}


console.log("------------------------ LOOP BACKWARDS ---------------------");
for (let i = gregory.length-1; i >= 0; i--) {
    console.log(gregory[i], typeof gregory[i]);
}

console.log("------------------------ LOOP INSIDE A LOOP ---------------------");

for (let exercise = 1; exercise < 4; exercise++) {
    console.log(`-------------- Starting exercise ${exercise} ---------------------`);
    for (let rep = 1; rep <= 5; rep++){
        console.log(`-------------- Exercise ${exercise}, repetition ${rep} ---------------------`);
    }
}
*/


///////////////////////////////////////////////////////////////////////////////////////////////////
// THE WHILE LOOP || When you don't know beforehand how many iterations you will have.
///////////////////////////////////////////////////////////////////////////////////////////////////

for (let rep = 1; rep <= 10; rep++) {
    console.log(`FOR LOOP: Lifting weights repetition ${rep}`);
}

let rep = 1;
while(rep <= 10) {
    console.log(`WHILE LOOP: Lifting weights repetition ${rep}`);
    rep++;
}

let dice = Math.trunc(Math.random() * 6) + 1;

while (dice !== 6) {
    console.log(`You rolled a ${dice}!`);
    dice = Math.trunc(Math.random() * 6) + 1;
    if (dice === 6) console.log("Loop is about to end...");
}