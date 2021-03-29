"use strict";
///////////////////////////////////////////////////////////////////////////////////////////
// SCOPE 
///////////////////////////////////////////////////////////////////////////////////////////

/*
// Defined in a global scope
function calcAge(birthYear) {
    const age = 2037 - birthYear;
    
    function printAge() {
        let output = `${firstName}, you are ${age} years old, born in ${birthYear}.`;
        console.log(output);

        if(birthYear >= 1991 && birthYear <= 1996) {
            // var variables are function-scoped
            var millenial = true;
            // We define a new variable with the same name as outer scope variable in block-scope.
            const firstName = "Steven";
            // let and const variables are block-scoped
            const str = `Oh, and you're a millenial, ${firstName}`;
            console.log(str);

            // Function are block-scoped in strict mode!!!
            function add(a, b) {
                return a + b;
            }
            // we manipulate an existing variable of outer scope
            // output = "NEW OUTPUT!";
        }
        // console.log(str);
        // add(2, 3);
        console.log(millenial);
    }

    printAge();

    return age;
}

// global variable
const firstName = "Gregory";
calcAge(1994);
*/

/*
///////////////////////////////////////////////////////////////////////////////////////////
// HOISTING AND TDZ
///////////////////////////////////////////////////////////////////////////////////////////

// Hoisting with variables
console.log(me);
// console.log(programmer);
// console.log(year);  // year is not defined

var me = "Gregory";  // undefined
let job = "programmer";  // can't access "job" before intialization


// Hoisting with functions
console.log(addDecl(2, 3)); // 5
// console.log(addExpr(2, 3));  // cannot access addExpr before initialization
// console.log(addArrow(2, 3));  // addArrow is not a function


function addDecl(a, b) {
    return a + b;
}

const addExpr = function(a, b) {
    return a + b;
}

// If we declare the arrow or the expression function with var is like calling undefined(2, 3) above in the console.log()
var addArrow = (a, b) => a + b;

// Example
// !undefined: true || DON'T USE var and declare the variables at the top of the scope.
if (!numProducts) deleteShoppingCart();

var numProducts = 10;

function deleteShoppingCart() {
    console.log("All products deleted!");
}

// window is the global object of JS in the browser.
var x = 1;  // creates property to the global window object.
let y = 2;
const z = 3;

console.log(x === window.x);  // true
console.log(y === window.y);  // false
console.log(z === window.z);  // false
*/

/*
///////////////////////////////////////////////////////////////////////////////////////////
// this KEYWORD
///////////////////////////////////////////////////////////////////////////////////////////

console.log(this); // the window object

const calcAge = function(birthYear) {
    console.log(2037 - birthYear);
    console.log(this);  // undefined (strict mode)
};

calcAge(1986); 


const calcAgeArrow = birthYear => {
    console.log(2037 - birthYear);
    console.log(this);  // the window object || it uses the this keyword of its parent scope.
};

calcAgeArrow(1986); 

const gregory = {
    year: 1986,
    // method
    calcAge: function () {
        console.log(this);
        console.log(2037 - this.year);
    }
}

gregory.calcAge();  // the gregory object 

const matilda = {
    year: 2017,
};


// Method borrowing
matilda.calcAge = gregory.calcAge;

matilda.calcAge();  // this points to matilda, which is the object that called the method.

// A function is just a value
const f = gregory.calcAge;

// f(); // undefined just a simple function without owner 
*/

/*
///////////////////////////////////////////////////////////////////////////////////////////
// REGULAR FUNCTIONS VS. ARROW FUNCTIONS
///////////////////////////////////////////////////////////////////////////////////////////

// var firstName = "Matilda";

const gregory = {
    // This is NOT a code block, it's an object literal.
    firstName: "Gregory",
    year: 1986,
    calcAge: function () {
        console.log(this);
        console.log(2037 - this.year);

        // 1st solution
        // const self = this;  // self or that
        // const isMillenial = function() {
        //     // It's basically a regular function call, so this is undefined.
        //     console.log(self);
        //     console.log(self.year >= 1981 && self.year <= 1996);
        // };
        // isMillenial();
        

        // 2nd solution || to use an arrow function that inherits the this keyword of the parent scope.
        const isMillenial = () => {
            console.log(this);
            console.log(this.year >= 1981 && this.year <= 1996);
        };
        isMillenial();
    },

    // DON'T EVER USE AN ARROW FUNCTION AS METHOD!!!
    greet: () => console.log(`Hey ${this.firstName}!`),
};

gregory.greet();  // Hey undefined!  // When we try to access the property of an object that doesn't exist (window.firstName) we get undefined.

// If we globally define var firstName = "Matilda"; This property is added to the window because it's declared with var.
// gregory.greet();  // Hey Matilda!

gregory.calcAge(1986);

// The arguments keyword is available only to regular functions.
const addExpr = function(a, b) {
    console.log(arguments);
    return a + b;
};

addExpr(2, 5);  // we get an array with 2 and 5
addExpr(2, 5, 8, 12);

// The arrow functions don't get the arguments keyword.
const addArrow = (a, b) => {
    console.log(arguments);
    return a + b;
};

addArrow(2, 5, 8);
*/

///////////////////////////////////////////////////////////////////////////////////////////
// PRIMITIVES VS. OBJECTS (PRIMITIVES VS. REFERENCE TYPES)
///////////////////////////////////////////////////////////////////////////////////////////


// PRIMITIVE TYPES
let age = 30;
let oldAge = age;
age = 31;
console.log(age);  // 31
console.log(oldAge);  // 30


// REFERENCE TYPES
const me = {
    name: "Gregory",
    age: 30,
};

const friend = me;
friend.age = 27;

console.log(friend.age);  // 27
console.log(me.age);  // 27


// PRIMITIVE TYPES
let lastName = "Williams";
let oldLastName = lastName;
lastName = "Davis";
console.log(lastName, oldLastName);


// REFERENCE TYPES
const jessica = {
    firstName: "Jessica", 
    lastName: "Williams",
    age: 27,
};

const marriedJessica = jessica;
marriedJessica.lastName = "Davis";
console.log("Before marriage: ", jessica);
console.log("After marriage: ", marriedJessica);

// This doesn't allowed because it's const.
// We can change its properties, but changing the whole object means different value at the call stack.
// marriedJessica = {};


// COPYING OBJECTS
const jessica2 = {
    firstName: "Jessica", 
    lastName: "Williams",
    age: 27,
    family: ["Alice", "Bob"],
};

// A new object was created to the heap. This works ONLY at the first level. (SHALLOW COPY)
// If the object contained a second object, the second object would still be the same.
const jessicaCopy = Object.assign({}, jessica2);
jessicaCopy.lastName = "Davis";
// The array changed to both objects!!!
jessicaCopy.family.push("Mary");
jessicaCopy.family.push("John");
console.log("========================== COPYING OBJECT ============================== ");
console.log("Before marriage: ", jessica2);
console.log("After marriage: ", jessicaCopy);


// DEEP CLONE COPIES EVERYTHING