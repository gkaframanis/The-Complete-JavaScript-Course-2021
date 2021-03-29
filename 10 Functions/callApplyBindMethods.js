"use strict";

// To set the "this" keyword manually

const lufthansa = {
    airline: "Lufthansa",
    iataCode: "LH",
    bookings: [],
    book(flightNum, name) {
        console.log(`${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`);
        this.bookings.push({flight: `${this.iataCode}${flightNum}`, name});
    },
};

lufthansa.book(239, "Gregory Kaframanis");
lufthansa.book(635, "John Smith");
console.log(lufthansa.bookings);

const eurowings = {
    airline: "Eurowings",
    iataCode: "EW",
    bookings: [],

};

const book = lufthansa.book;  // We store it to new variable.

// How do we use the book regular function for lufthansa or eurowings
// We need to explicitly tell to JS what the "this" keyword should look like.

// book(23, "Sarah Williams"); // doesn't work

// Call Method
// A function is really is just an object and they have methods!
// The first argument sets the "this" keyword and the next are the original arguments.
book.call(eurowings, 23, "Sarah Williams");
console.log(eurowings);

book.call(lufthansa, 239, "Mary Cooper");
console.log(lufthansa);

const swiss = {
    airline: "Swiss Air Lines",
    iataCode: "LX",
    bookings: [], 
};

book.call(swiss, 583, "Mary Cooper");
console.log(swiss);

// Apply Method
// The same, but it takes an array of arguments, not a list after the this keyword.
const flightData = [583, "George Cooper"];
book.apply(swiss, flightData);
console.log(swiss);

// We can just always use the call method using the spread operator for the array.
book.call(swiss, ...flightData);

// Bind Method
// USING BIND GIVES US A NEW FUNCTION!!!!!!!!!!!
// It doesn't immediately calls the function, instead it returns a new function where the "this" keywork is bound.

const bookEW = book.bind(eurowings); // it returns a new function where the "this" keyword is always set to eurowings
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(23, "Steven Williams"); // This function has the "this" keyword set.

// Partial Application
const bookEW23 = book.bind(eurowings, 23); // Now we have also the first argument set. Now we need only the name.
bookEW23("Gregory Kaframanis");
bookEW23("Martha Cooper");

// Objects with Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function() {
    console.log(this);

    this.planes++;
    console.log(this.planes++);
};

// lufthansa.buyPlane();
// "this" keyword points to the element the handler is attached to.
// The call() method calls a function and we need to pass a function, so we use bind.
// IMPORTANT!!!!!!!!!!!!!!!!!!!!!!!!!
document.querySelector(".buy").addEventListener("click", lufthansa.buyPlane.bind(lufthansa));

// Partial application to preset parameters

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

// Here we don't care for the "this" keyword, so we set it to null
const addVAT = addTax.bind(null, 0.23);
// addVAT = value => value + value * 0.23;

console.log(addVAT(100));
console.log(addVAT(23));

const addTaxRate = function(rate) {
    return function(value) {
        return value + value * rate;
    };
};

const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));
console.log(addVAT2(23));

