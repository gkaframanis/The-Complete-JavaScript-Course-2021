"use strict";

//////////////////////////////////////////////////////////////////////////////////////////////
// PASSING ARGUMENTS WORKS: VALUE VS. REFERENCE
//////////////////////////////////////////////////////////////////////////////////////////////

// JavaScript has ONLY passing by value, even though it seems like passing by reference.

const flight = "LH234";
const greg = {
    name: "Gregory Kaframanis",
    passport: 24739479284
};

// flightNum contains a copy, not a original value.
// for the passenger is copied just the reference to the object in the memory heap. They both point to the same object. tHAT REFERENCE IS STILL A VALUE!
const checkIn = function(flightNum, passenger) {  
    flightNum = "LH999";
    passenger.name = "Mr. " + passenger.name;

    if(passenger.passport === 24739479284) {
        console.log("Check in");
    }
    else {
        console.log("Wrong passport!");
    }
};

checkIn(flight, greg);
console.log(flight);  // LH234
console.log(greg);   // name: "Mr. Gregory Kaframanis"

const newPassport = function(person) {
    person.passport = Math.trunc(Math.random() * 100000000000);
};

newPassport(greg);
checkIn(flight, greg);
console.log(greg);