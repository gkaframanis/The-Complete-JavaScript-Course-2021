"use strict";

// A closure happens automatically in certain situations

const secureBooking = function() {
    let passengerCount = 0;

    return function() {
        passengerCount++;
        console.log(`${passengerCount} passengers`);
    };
};

const booker = secureBooking();

// The environment is which it was created it is gone (the execution context), but it has access to the variables! That is closure!
// Remembers the variables of the function's birthplace, where it was created!
// A function has access to the variable environment (VE) of the execution context in which it was created, even after it's gone!!!
booker();
booker();
booker();

console.dir(booker);  // Scopes --> 0: Closure (secureBooking)  [[ ]] internal property we can't access form our code.

// Closure examples
// Example 1
let f;

const g = function() {
    const a = 23;
    f = function() {
        console.log(a * 2);
    };
};

const h = function() {
    const b = 777;
    f = function() {
        console.log(b * 2);
    };
}

g();
// [[Scopes]] 0: Closure (g) a: 23
f(); //  46 Keeps the variable environment of the EC in which the function was defined.

h();
// Re-assigning the f function
f();  //1554
console.dir(f);  // [[Scopes]] 0: Closure (h) b: 777

// Example 2
const boardPassengers = function(n, wait) {
    const perGroup = n / 3;

    // It executed completely indepedently, but it had access to the variables of the boardPassengers.
    setTimeout(() => {
        console.log(`We are now boarding all ${n} passengers`);
        console.log(`There are 3 groups, each with ${perGroup} passengers`);
    }, wait * 1000);

    // This will not wait for the setTimeout to be executed
    console.log(`Will start boarding in ${wait} seconds`);
};

// Closure has priority over the scope chain.
const perGroup = 1000;
boardPassengers(180, 3);
