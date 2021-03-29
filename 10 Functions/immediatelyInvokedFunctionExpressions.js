"use strict";
// !!!!!!!!!!!!!  IIFE !!!!!!!!!!!!!!!!!!!
// A function that is only being executed once and never again.
// We transform it into an IIFE expression
(function() {
    console.log("This will never run again");
    const isPrivate = 23;
})();

// console.log(isPrivate);

(() => console.log("This will also never run again"))();

{
    const isPrivate = 23;
    var notPrivate = 46;
}

// console.log(isPrivate);
console.log(notPrivate);