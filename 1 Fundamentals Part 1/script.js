/*
/////////////////////////////////////////////////////////////////
// VARIABLES AND VALUES
/////////////////////////////////////////////////////////////////
let js = "amazing";
// if (js === "amazing") alert("JavaScript is fun!");
console.log(40 + 8 + 23 -10);

// Values
console.log("Gregory");
console.log(23);

// Variables
// Declaring Variables
// Using camelCase.
let firstName = "Gregory";
console.log(firstName);
// Don't use "name" as the name of your variable.

// We write constants in uppercase.
const PI = 3.1415;
// Use descriptive names for the variables.
let myFirstJob = "Programmer";
let myCurrentJob = "Teacher";
*/


/*
///////////////////////////////////////////////////////////////////
// PRIMITIVE TYPES
///////////////////////////////////////////////////////////////////
// Primitive: Boolean
let javascriptIsFun = true;
console.log(javascriptIsFun);
console.log(typeof javascriptIsFun);
console.log(typeof true);
console.log(typeof 23);
console.log(typeof "Gregory");

// assigning new value to a variable.
javascriptIsFun = "YES";
console.log(typeof javascriptIsFun);

let book;
// undefined is both the value and the type of the variable.
console.log(book);
console.log(typeof book);

book = "Harry Potter and Goblet of Fire";
console.log(book);
console.log(typeof book);

// error in the typeof operator
console.log(typeof null); // BUG!!! object It should return null, not an object
*/

/*
////////////////////////////////////////////////////////////////////////
// LET, CONST, VAR
////////////////////////////////////////////////////////////////////////
// let: for variables that will change later.
// We mutate the variable.
// let is block scoped.
let age = 30;
age = 31;

// const: for variables that are not supposed to change at any point to the future.
// Immutable variable. We can't declare empty variables.
const birthYear = 1991;
// birthYear = 1990; // TypeError

// const job; // Missing initializer in const declaration

//  !!!!!!!!!!! For clean code BY DEFAULT use const and let when you are only sure that should change in the future. !!!!!!!!!!!

// var: it should be avoided. At first sight it works as let.
// var is function scoped.
var job = "programmer";
job = "teacher";

var tiger;
console.log(typeof tiger);

// We should always create the variables properly. Never just write a variable without declaring it, JS is creating it as property in the global object.
*/


/*
////////////////////////////////////////////////////////////////////////////////////
// OPERATORS
////////////////////////////////////////////////////////////////////////////////////
// Math operators
const now = 2037;
const ageGregory = now - 1991;
const ageSarah = now - 2018;
console.log(ageGregory, ageSarah);

console.log(ageGregory * 2, ageGregory / 10, 2 ** 3);

const firstName = "Gregory";
const lastName = "Kaframanis";

console.log(firstName + " " + lastName);

// ASSIGNMENT OPERATORS
let x = 10 + 5;  // 15 
x += 10;  // 15 + 10
x *= 4;  // 25 * 4
x++;  // 101
x--;  // 100
x--;  // 99
console.log(x);

// COMPARISON OPERATORS
// To produce boolean operators 
console.log(ageGregory > ageSarah);  // >, <, >=, <=
console.log(ageSarah >= 18);

const isFullAge = ageSarah >= 18;

console.log(now - 1991 > now - 2018);
*/


/*
//////////////////////////////////////////////////////////////////
// PRECEDENCE
//////////////////////////////////////////////////////////////////
const now = 2037;
const ageGregory = now - 1991;
const ageSarah = now - 2018;

console.log(now - 1991 > now - 2018);

let x, y;

x = y = 25 - 10 - 5; // x = y = 10, x = 10 right to left
console.log(x, y);

const averageAge = (ageGregory + ageSarah) / 2;
console.log(ageGregory, ageSarah, averageAge);
*/

/*
//////////////////////////////////////////////////////
// CODING CHALLENGE 1
///////////////////////////////////////////////////////
let markBMI = 78 / (1.69 ** 2);
let johnBMI = 92 / (1.95 ** 2);

let markHigherBMI = markBMI > johnBMI;
console.log(markBMI, johnBMI, markHigherBMI);

markBMI = 95 / (1.88 ** 2);
johnBMI = 85 / (1.76 ** 2);

markHigherBMI = markBMI > johnBMI;
console.log(markBMI, johnBMI, markHigherBMI);
*/


/*
//////////////////////////////////////////////////////
// STRINGS AND TEMPLATE LITERALS
////////////////////////////////////////////////////////
const firstName = "Gregory";
const job = "programmer";
const birthYear = 1986;
const year = 2037;

const gregory = "I'm " + firstName + ", a " + (year - birthYear) + " years old " + job + "!";
console.log(gregory); 

// ES6 template literals
const gregoryNew = `I'm ${firstName}, a ${year - birthYear} years old ${job}!`;
console.log(gregoryNew);

console.log(`Just a regular string...`);

console.log("String with \n\
multiple \n\
lines");

console.log(`String
multiple
lines`);  
*/

/*
////////////////////////////////////////////////////////////////////////////////
// IF - ELSE
////////////////////////////////////////////////////////////////////////////////
const age = 17;
const isOldEnough = age >= 18;

if (isOldEnough) {
    console.log("Sarah can start driving lessons for her driving license.");
}
else {
    const yearsLeft = 18 - age;
    console.log(`Sarah is too young. Wait another ${yearsLeft} year(s) :)`);
}

const birthYear = 1991;
let century;
if (birthYear <= 2000) {
    century = 20;
}
else {
    century = 21;
}

console.log(century);
*/

/*
//////////////////////////////////////////////////////////////////////////////////
// CODING CHALLENGE 2
//////////////////////////////////////////////////////////////////////////////////
let markBMI = 78 / (1.69 ** 2);
let johnBMI = 92 / (1.95 ** 2);

let markHigherBMI = markBMI > johnBMI;

if (markHigherBMI) {
    console.log(`Mark's BMI (${markBMI}) is higher than John's (${johnBMI})!`);
}
else {
    console.log(`Mark's BMI (${markBMI}) is lower than John's (${johnBMI})!`);
}

markBMI = 95 / (1.88 ** 2);
johnBMI = 85 / (1.76 ** 2);

markHigherBMI = markBMI > johnBMI;

if (markHigherBMI) {
    console.log(`Mark's BMI (${markBMI}) is higher than John's (${johnBMI})!`);
}
else {
    console.log(`Mark's BMI (${markBMI}) is lower than John's (${johnBMI})!`);
}
*/

/*
//////////////////////////////////////////////////////////////////////////////////
// TYPE CONVERSION AND TYPE COERSION
/////////////////////////////////////////////////////////////////////////////////

// Type conversion is when we manually convert from one type to another. (explicitly)
// We can convert to a number, to a string and to a boolean
const inputYear = "1991";
// Type conversion from string to number.
console.log(Number(inputYear), inputYear);
console.log(Number(inputYear) + 18);

console.log(Number("Gregory")); // NaN (Not a Number: invalid number) typeof Nan --> number

// Type conversion from number to string.
console.log(String(23), 23);

// Type coersion is when JavaScript automatically converts types behind the scenes for us. (implicitly)
// The plus operator "triggers" a type coersion and converts numbers to strings.
// The "-", "*" and "/", ">" operators "trigger" the opposite, convert strings to numbers.
console.log("I'm " + 23 + " years old.");
console.log("23" - "10" - 3);
console.log("23" - "10" - "3");
console.log("23" / "2");
console.log("23" > "18");

let n = "1" + 1;  // '11'
n = n - 1;  //  '11' - 1
console.log(n);  // 10
*/


/*
////////////////////////////////////////////////////////////////////////////////////
// TRUTHY AND FALSY VALUES
////////////////////////////////////////////////////////////////////////////////////

// Falsy values are not exactly false but will become false when we try to convert them into a boolean.
// In JS there are only 5 falsy values: 0, '', undefined, null, NaN

console.log(Boolean(0)); // false
console.log(Boolean(undefined)); // false
console.log(Boolean("Gregory"));  // true
console.log(Boolean({}));  // true
console.log(Boolean(""));  // false 

// JS does type coersion to booleans: 1) when using logical operators 2) in a logical context eg. if - else statement.

const money = 100;
if (money) {
    console.log("Don't spend it all!");
}
else {
    console.log("You should get a job!");
}

// let height;
let height = 0;  // Problem: The height is defined, but is zero.

if (height) {
    console.log("Yay! Height is defined!");
}
else {
    console.log("Height is UNDEFINED!");
}
*/


/*
////////////////////////////////////////////////////////////////////////////
// EQUALITY OPERATORS: == VS. === 
////////////////////////////////////////////////////////////////////////////

// AVOID LOOSE EQUALITY AS MUCH AS YOU CAN!!! PREFER TO MANUALLY CONVERT THE TYPES.

// const age = "18";
const age = 18;

// If both sides are exactly the same
// === Strict equality: it doesn't perform type coercion
if (age === 18) console.log("(===) You just became an adult :D");

// == loose equality: it does perform type coersion
if (age == 18) console.log("(==) You just became an adult :D");

const favourite = Number(prompt("What's your favorite number?"));

console.log(favourite);
console.log(typeof favourite);

if (favourite == 23) {
    console.log("(==) Cool! 23 is an amazing number!");
}

if (favourite === 23) {
    console.log("(===) Cool! 23 is an amazing number!");
}
else if (favourite === 7) {
    console.log("7 is also a cool number");
}
else if (favourite === 9) {
    console.log("9 is also a cool number");
}
else {
    console.log("Number is not 23 or 7 or 9");
}

//  strict inequality !==
// loose inequality !=
// Avoid the loose version in both the above cases!!!!
if (favourite !== 23) console.log("Why not 23?");
*/

/*
/////////////////////////////////////////////////////////////////////
// LOGICAL OPERATORS
/////////////////////////////////////////////////////////////////////

const hasDriversLicense = true;
const hasGoodVision = false;  


console.log(hasDriversLicense && hasGoodVision);  // true
console.log(hasDriversLicense || hasGoodVision);  // true
console.log(!hasDriversLicense);  // false

// if (hasDriversLicense && hasGoodVision) {
//     console.log("Sarah is able to drive!");
// }
// else {
//     console.log("Someone else should drive...");
// }

const isTired = false;
console.log(hasDriversLicense && hasGoodVision && isTired);  // if one is false the whole is false.
console.log(hasDriversLicense || hasGoodVision || isTired);  // if one is true the whole thing is true.

if (hasDriversLicense && hasGoodVision && !isTired) {
    console.log("Sarah is able to drive!");
}
else {
    console.log("Someone else should drive...");
}
*/


/*
/////////////////////////////////////////////////////////////////////////////
// SWITCH STATEMENT
/////////////////////////////////////////////////////////////////////////////

const day = "monday";

switch (day) {
    case "monday":
        console.log("Plan course structure");
        console.log("Go to coding meetup");
        break;
    case "tuesday":
        console.log("Prepare theory videos");
        break;
    case "wednesday":
    case "thursday":
        console.log("Write code examples");
        break;
    case "friday":
        console.log("Record videos");
        break;
    case "saturday":
    case "sunday":
        console.log("Enjoy the weekend :D");
        break;
    default:
        console.log("This isn't a day of the week...");
        break;
}


if (day === "monday") {
    console.log("Plan course structure");
    console.log("Go to coding meetup");
}
else if (day === "tuesday") {
    console.log("Prepare theory videos");
}
else if (day === "wednesday" || day === "thursday") {
    console.log("Write code examples");
}
else if (day === "friday") {
    console.log("Record videos");
}
else if (day === "saturday" || day === "sunday") {
    console.log("Enjoy the weekend :D");
}
else {
    console.log("This isn't a day of the week...");
}

*/



///////////////////////////////////////////////////////////////////////////////////////////////////
// STATEMENTS AND EXPRESSIONS
///////////////////////////////////////////////////////////////////////////////////////////////////

// An expression is a piece of code that produces a value. eg. 3 + 4, 1991, true && false && !false
// A statement is bigger piece of code that is executed but it doesn't produce a value. eg. if - else, switch statement.


/////////////////////////////////////////////////////////////////////////////////////////////////////
// THE CONDITIONAL (TERNARY) OPERATOR
////////////////////////////////////////////////////////////////////////////////////////////////////

const age = 15;

// age >= 18 ? console.log("I like drink wine!") : console.log("I like to drink water!");

// This is an expression because it produces a value.
const drink = age >= 18 ? "wine" : "water";
console.log(drink);

let drink2;
// Every variable we define inside the block is not available outside.
if (age >= 18) {
    drink2 = "wine";
}
else {
    drink2 = "water";
}

console.log(drink2);

console.log(`I like to drink ${age >=18 ? "wine" : "water"}!`);