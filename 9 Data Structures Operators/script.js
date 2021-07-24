"use strict";

/*
// Data needed for a later exercise
const flights =
  "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30";

// Data needed for first part of the section
const restaurant = {
  restaurantName: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function ({ starterIndex = 1, mainIndex = 0, time = "20:00", address }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be deliverd to ${address} at ${time}.`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}.`);
  },

  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};
*/

/*
/////////////////////////////////////////////////////////////////////////////
// DESTRUCTURING OBJECTS
/////////////////////////////////////////////////////////////////////////////

// The order in objects doesn't matter and we don't need holes. We use {}.
const {restaurantName, openingHours, categories} = restaurant;
console.log(restaurantName, openingHours, categories);

// If we wanted the variables names to be different than the properties names.
const {restaurantName: restName, openingHours: hours, categories: tags} = restaurant;
console.log(restName, hours, tags);

// Default values for unexisting properties
const {menu = [], starterMenu: starters = []} = restaurant;
console.log(menu, starters);  // without default value we get undefined

// Mutating variables while destructuring objects
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14};

// The trick is to wrap it into parentheses.
({a, b} = obj);
console.log(a, b);

// Nested objects
const {fri: {open: o = 12, close: c = 24}} = openingHours;
console.log(o, c);

// Passing an object as argument, so you don't have to remember the order of the arguments.
restaurant.orderDelivery({
  time: "22:30",
  address: "Via del Sole, 21",
  mainIndex: 2,
  starterIndex: 2,
});


// Using the default values we set.
restaurant.orderDelivery({
  address: "Via del Sole, 21",
  starterIndex: 2,
});
*/

/*
//////////////////////////////////////////////////////////////////////////////////////
// ARRAY DESTRUCTURING
/////////////////////////////////////////////////////////////////////////////////////
const arr = [2, 3, 4];
// destructuring assignment | the original array in not affected
const [a, b, c] = arr;
console.log(a, b, c);

// We don't have to take all the elements of the array
// const [first, second] = restaurant.categories;
// console.log(first, second);
// To take the first and the third we just leave a hole in the destructuring operator.
let [main, ,secondary] = restaurant.categories;
console.log(main, secondary);

// Switching variables
// To switch the above values we create a new array with the values in switched order and we destructure it.
[main, secondary] = [secondary, main];
console.log(main, secondary);

// Receive 2 or more return values from a function
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

// DESTRUCTURING NESTED ARRAYS
const nested = [2, 4, [5, 6]];
const [first, , third] = nested;
console.log(first, third);

const [firstVal, , [firstNestedVal, secondNestedVal]] = nested;
console.log(firstVal, firstNestedVal, secondNestedVal);


// DEFAULT VALUES
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);
*/

/*
/////////////////////////////////////////////////////////////////////////////////////////////////
//  SPREAD OPERATOR (UNPACKING ALL THE ELEMENTS AT ONCE) ES6
//  We can use the operator when building an array, or when we pass arguments to a function.
/////////////////////////////////////////////////////////////////////////////////////////////////

const arr = [7, 8, 9];

const newArr = [1, 2, ...arr];
console.log(newArr);

console.log(...newArr);

// We simply creating a new array
// The spread operator takes all the values from the array and IT DOESN'T create new variables.
// We can only use it in places where otherwise we would write values separated by commas.
const newMenu = [...restaurant.mainMenu, "Gnocci"];
console.log(newMenu);

// Copy array (shallow copy)
const mainMenuCopy = [...restaurant.mainMenu];

// Join 2 arrays
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu);

// The spread operator works on all the iterables.
// Iterables: arrays, strings, maps or sets BUT NOT objects!
const str = "Gregory";
const letters = [...str, " ", "K."];
console.log(letters);
console.log(...str);

// Real world example
// const ingredients = [prompt("Let's make pasta! Ingredent 1? "),
//                      prompt("Let's make pasta! Ingredent 2? "),
//                      prompt("Let's make pasta! Ingredent 3? "),];

// console.log(ingredients);

// restaurant.orderPasta(...ingredients);

// Objects
const newRestaurant = { founded: 1998, ...restaurant, founder: "Gregory" };
console.log(newRestaurant);

const restaurantCopy = { ...restaurant };
restaurantCopy.restaurantName = "Ristorante Roma";
console.log(restaurantCopy.restaurantName);
console.log(restaurant.restaurantName);
*/

/*
/////////////////////////////////////////////////////////////////////////////////////////////////
//  REST PATTERN --> (Where we would write variable names separated by commas) AND PARAMETERS
/////////////////////////////////////////////////////////////////////////////////////////////////


// 1) DESTRUCTURING
// REST IN ARRAYS
// Looks like the spread operator, but it does exactly the opposite.
// Rest operator packs elements into an array.

// SPREAD, because on RIGHT side of = assignment operator.
const arr = [1, 2, ...[3, 4]];

// REST, because on LΕFT side of = assignment operator
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others);

const [pizza, ,risotto, ...otherFood] = [...restaurant.mainMenu, ...restaurant.starterMenu];
// It doesn't include any skipped elements. The rest element must always be the last element.
console.log(pizza, risotto, otherFood);


// REST IN OBJECTS

const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);


// 2) FUNCTIONS
// REST PARAMETERS
const add = function(...numbers) {
  // Takes multiple values and packs them in an array
  let sum = 0;
  for(let i = 0; i < numbers.length; i++)
    sum += numbers[i];
  console.log(sum);
}

add(2, 3)
add(5, 3, 7, 2)
add(8, 2, 5, 3, 2, 1, 4);

const x = [23, 5, 7];
// Spread operator | We unpack the values
add(...x);

restaurant.orderPizza("mushrooms", "onion", "olives", "spinach");
restaurant.orderPizza("mushrooms");
*/

/*
/////////////////////////////////////////////////////////////////////////////////////////////////
//  SHORT CIRCUITING (&& AND ||)
/////////////////////////////////////////////////////////////////////////////////////////////////

console.log("------------------------- OR ------------------------------");
// Use non-boolean values as operands
// They can use ANY data type, return ANY data type, short-circuiting.
// OR: short-circuiting: if the first value is a truthy value it will immediately return that first value.
console.log(3 || "Gregory");  // 3 The result doesn't have to be boolean!
console.log("" || "Gregory"); // Gregory
console.log(true || 0);  // true
console.log(undefined || null);  // null (It gives null despite the fact that null is also a falsy value)

console.log(undefined || 0 || "" || "Hello" || 23 || null);  // "Hello"  | "Hello" is the first truthy value.


// Practical Example
// This WON'T WORK if the number of guests is 0!
// restaurant.numGuests = 23;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);  // 10

// To set default values
const guests2 = restaurant.numGuests || 10;
console.log(guests2);  // 10

console.log("------------------------------------ AND --------------------------------");
// AND: short-circuiting if the value is falsy: returns the first falsy value.
console.log(0 && "Gregory");  // 0
console.log(7 && "Gregory");  // "Gregory" If it's truthy, the evaluation continues and the last value is returned.

console.log("Hello" && 23 && null && "Gregory");  // null The first falsy value

// Practical Example
if (restaurant.orderPizza) {
  restaurant.orderPizza("mushrooms", "spinach");
}

// The same as above
restaurant.orderPizza && restaurant.order.orderPizza("mushrooms", "spinach");
*/

/*
////////////////////////////////////////////////////////////////////////////////////////////////
//  THE NULLISH COALESCING OPERATOR ??
////////////////////////////////////////////////////////////////////////////////////////////////

// To solve the following issue with the zero value.

// This WON'T WORK if the number of guests is 0!
restaurant.numGuests = 0;
// To set default values
const guests2 = restaurant.numGuests || 10;
console.log(guests2);  // 10 instead of 0!

// ES2020
// Works with the idea of nullish values instead of falsy values. Only nullish values will short-circuit the evaluation.
// Nullish: null and undefined (NOT 0 or "")
const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect);  // 0 which is correct!!!
*/

/*
////////////////////////////////////////////////////////////////////////////////////////////////////////
//  CODING CHALLENGE 1
////////////////////////////////////////////////////////////////////////////////////////////////////////

const game = {
  team1: "Bayern Munich",
  team2: "Borrussia Dortmund",
  players: [
    [
      "Neuer",
      "Pavard",
      "Martinez",
      "Alaba",
      "Davies",
      "Kimmich",
      "Goretzka",
      "Coman",
      "Muller",
      "Gnarby",
      "Lewandowski",
    ],
    ["Burki", "Schulz", "Hummels", "Akanji", "Hakimi", "Weigl", "Witsel", "Hazard", "Brandt", "Sancho", "Gotze"],
  ],
  printGoals: function (goals, ...players) {
    console.log(`The numbers of goals scored to the match were ${goals}.`);
    console.log("The scorers were: ");
    for(let i = 0; i < players.length; i++)
      console.log(`${players[i]}`);
  },
  score: "4:0",
  scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
  date: "Nov 9th, 2037",
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};


// TASK 1
console.log("---------------------- TASK 1 -------------------------");
const [players1, players2] = game.players;
console.log(players1, players2);

// TASK 2
console.log("---------------------- TASK 2 -------------------------");
const [gk, ...fieldPlayers] = players1;
console.log(gk, fieldPlayers);

// TASK 3
console.log("---------------------- TASK 3 -------------------------");
const allPlayers = [...players1, ...players2];
console.log(allPlayers);


// TASK 4
console.log("---------------------- TASK 4 -------------------------");
const players1Final = [...players1, "Thiago", "Coutinho", "Perisic"];
console.log(players1Final);

// TASK 5
console.log("---------------------- TASK 5 -------------------------");
const {team1, x: draw, team2} = game.odds;
console.log(team1, draw, team2);

// TASK 6
console.log("---------------------- TASK 6 -------------------------");
game.printGoals(4, "Davies", "Muller", "Lewandowski", "Kimmich");
game.printGoals(4, ...game.scored);

// TASK 7
console.log("---------------------- TASK 7 -------------------------");

team1 < team2 && console.log("Team 1 has better odds to win!") || team1 > team2 && console.log("Team 2 has better odds to win!");
*/

/*
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  LOOPING ARRAYS: THE FOR-OF LOOP (ES6)
///////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

// We can still use the break and continue keywords.
for (const item of menu) {
  console.log(item);
}

// If we also want the index
// menu.entries() is an array iterator.
// The item of menu.entries is an array which contains the index and the element, so we destructure it!!!
for (const [index, element] of menu.entries()) {
  console.log(`${index + 1}: ${element}`);
}

// console.log([...menu.entries()]);
*/

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  ENHANCED OBJECT LITERALS
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const weekdays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

// Let's say we have a separate object variable
const openingHours = {
  // We can compute the values of properties.
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0,
    close: 24,
  },
};

const restaurant = {
  restaurantName: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],
  // openingHours: openingHours,
  // ES6 enhanced object literals
  openingHours,

  // ES6 enhanced function
  // order: function (starterIndex, mainIndex) {
  //   return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  // },
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery({ starterIndex = 1, mainIndex = 0, time = "20:00", address }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be deliverd to ${address} at ${time}.`
    );
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(`Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}.`);
  },

  orderPizza(mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

/*
///////////////////////////////////////////////////////////////////////////////////////////////
// OPTIONAL CHAINING (?.) (ES2020)
///////////////////////////////////////////////////////////////////////////////////////////////

if (restaurant.openinHours && restaurant.openingHours.mon)
  console.log(restaurant.openingHours.mon.open);  

// WITHOUT OPTIONAL CHAINING
// console.log(restaurant.openingHours.mon.open);  // error
// WITH OPTIONAL CHAINING
// If a property doesn't exist it returns undefined immediately, instead of an error.
console.log(restaurant.openingHours.mon?.open);  // only if monday exists, then the open property will be read from there.

// We can have MULTIPLE optional chaining
console.log(restaurant.openingHours?.mon?.open);


// Example

for(const day of weekdays) {
  const open = restaurant.openingHours[day]?.open ?? "closed";
  console.log(`On ${day}, we open at ${open}`);

}

// METHODS
console.log(restaurant.order?.(0, 1) ?? "Method does not exist");
console.log(restaurant.orderRisotto?.(0, 1) ?? "Method does not exist");

// ARRAYS
const users = [
  {username: "Gregory", email: "gregory@email.com"}
];

// Checks if the value at the left exists
console.log(users[0]?.username ?? "User array empty");
*/

///////////////////////////////////////////////////////////////////////////////////////////////
// LOOPING OBJECTS: OBJECT KEYS, VALUES AND ENTRIES
///////////////////////////////////////////////////////////////////////////////////////////////

// const properties = Object.keys(openingHours);
// console.log(properties);

// let openStr = `We are open ${properties.length} days`;

// // property names also called keys
// for (const day of Object.keys(openingHours)) {
//   openStr += `${day}, `;
// }

// console.log(openStr);

// // Property values
// const values = Object.values(openingHours);
// console.log(values);

// // Entire object
// const entries = Object.entries(openingHours);
// // console.log(entries);

// // entry --> [key, value]
// // The destructure the entry which is an array and the value which is an object.
// for (const [key, { open, close }] of entries) {
//   console.log(`On ${key} we open at ${open} and close at ${close}.`);
// }

///////////////////////////////////////////////////////////////////////////////////////////////
// SETS (A collection of unique values)
///////////////////////////////////////////////////////////////////////////////////////////////

// // We pass to set an iterable, most common iterable is an array | The order of the elements is irrelevant
// const ordersSet = new Set(["Pasta", "Pizza", "Pizza", "Risotto", "Pasta", "Pizza"]);
// console.log(ordersSet);

// console.log(new Set("Gregory"));

// // size and NOT length like the arrays
// console.log(ordersSet.size);

// // similar to the includes() of the array
// console.log(ordersSet.has("Pizza"));
// console.log(ordersSet.has("Bread"));

// // add elements
// ordersSet.add("Garlic Bread");
// ordersSet.add("Garlic Bread");
// console.log(ordersSet);

// // delete elements
// ordersSet.delete("Risotto");
// console.log(ordersSet);

// // Retrieve elements (WE CAN'T USE INDEXES: there is no order, we can't get data out of a set)
// // We need to know if a certain value is in a set.

// // To delete the elements of all the set
// // ordersSet.clear();

// // Loop over the set
// for (const order of ordersSet) console.log(order);

// // The biggest use of them is to remove duplicates from arrays
// // Example
// const staff = ["Waiter", "Chef", "Waiter", "Mananger", "Chef", "Waiter"];
// // The spread operator works on all iterables
// // To make it an array again
// const differentPositions = [...new Set(staff)];
// console.log(differentPositions);

// console.log(new Set(staff).size);

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MAPS FUNDAMENTALS (to map values to keys, the keys can be any types, not just strings like in objects)
////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const restaurantMap = new Map();
// // fill up the map
// // The set call returns the updated map
// restaurantMap.set("name", "Classico Italiano");
// restaurantMap.set(1, "Firenze, Italy");
// console.log(restaurantMap.set(2, "Lisbon, Portugal"));

// // Since it returns the updated map we can do the following:
// restaurantMap
//   .set("categories", ["Italian", "Pizzeria", "Vegeterian", "Organic"])
//   .set("open", 11)
//   .set("close", "23")
//   .set(true, "We are open :D")
//   .set(false, "We are closed :(");

// console.log(restaurantMap.get("name"));
// console.log(restaurantMap.get(true));

// const time = 21;
// // The expression inside the () returns true or false
// console.log(restaurantMap.get(time > restaurantMap.get("open") && time < restaurantMap.get("close")));

// // Check if we have a key
// console.log(restarantMap.has("categories"));
// // To delete a key
// restaurantMap.delete(2);
// console.log(restaurantMap);

// // size property
// console.log(restaurantMap.size);

// // remove of the elements of the map
// // restaurantMap.clear();

// // Use arrays or objects as keys
// const arr = [1, 2];
// restaurantMap(arr, "Test")
// // restaurantMap.set([1, 2], "Test");
// console.log(restaurantMap);
// console.log(restaurantMap.size);

// // console.log(restaurantMap.get([1, 2])); // undefined, this doesn't work | They aren't the same object in the heap | We need to define the array
// console.log(restaurantMap.get(arr));

// // DOM elements are special types of objects
// restaurantMap.set(document.querySelector("h1"), "Heading");

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MAPS ITERATION
////////////////////////////////////////////////////////////////////////////////////////////////////////////

// // New way instead of set to populate a map (array of arrays)
// const question = new Map([
//   ["question", "What is the best programming language in the world?"],
//   [1, "C"],
//   [2, "Java"],
//   [3, "JavaScript"],
//   ["correct", 3],
//   [true, "Correct"],
//   [false, "Try again!"],
// ]);

// console.log(question);

// // The same structure as the following (an array of arrays)
// console.log(Object.entries(openingHours));
// // So there is an easy way to convert objects to map
// const hoursMap = new Map(Object.entries(openingHours));
// console.log(hoursMap);

// // Iteration
// // Quiz App
// console.log(question.get("question"));

// for (const [key, value] of question) {
//   if (typeof key === "number") console.log(`Answer ${key}: ${value}`);
// }

// // const answer = Number(prompt("Your answer"));
// const answer = 3;
// console.log(answer);

// // The question.get("correct") === answer will evaluate to true or false
// console.log(question.get(question.get("correct") === answer));

// // convert map to array
// console.log([...question]);  // the same as question.entries()
// console.log(question.keys());
// console.log([...question.keys()]);
// console.log(question.values());
// console.log([...question.values()]);


////////////////////////////////////////////////////////////////////////////////////////////////////////////
// STRINGS (PART I)
////////////////////////////////////////////////////////////////////////////////////////////////////////////

const airline = "TAP Air Portugal";
const plane = "A320";

// get a character of a string
console.log(plane[0]);
console.log("B737"[0]);

// length property
console.log(airline.length);
console.log("B737".length);

// methods
// indexOf() - gives the first occurence
console.log(airline.indexOf("r"));
// We can check for an entire word
console.log(airline.indexOf('Portugal'));

// lastindexOf() - gives the last occurence
console.log(airline.lastIndexOf("r"));

// slice() get indexes as arguments | always return a new string
console.log(airline.slice(4));
console.log(airline.slice(4, 7)); // the 7 is not included!!!

// extract the first word
console.log(airline.slice(0, airline.indexOf(" ")));
// extract the last word
console.log(airline.slice(airline.lastIndexOf(" ") + 1));  // + 1 because the " " is included

// negative beginning argument
console.log(airline.slice(-2));
console.log(airline.slice(1, -1)); // -1 cuts off the last character

// Example (B and E are the middle seats)
const checkMiddleSeat = function(seat) {
  // To get the last letter
  const s = seat.slice(-1);
  if(s === "B" ||  s === "E") {
    console.log("You got the middle seat...");
  }
  else console.log("You got lucky");
};

checkMiddleSeat("11B");
checkMiddleSeat("23C");
checkMiddleSeat("3E");

// All string methods return primitives!!! During the use of methods JS converts the strings to objects.

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// STRINGS (PART II)
////////////////////////////////////////////////////////////////////////////////////////////////////////////

console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

console.log("gregory".toUpperCase());

// Fix capitalization in name
const passenger = "GrEGoRy";   // Gregory
const passengerLower = passenger.toLowerCase();
const passengerCorrect = passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

// Comparing user input email
const email = "hello@gregory.io";
const loginEmail = "  Hello@Gregory.Io  \n";

// const lowerEmail = loginEmail.toLowerCase();
// const trimmedEmail = lowerEmail.trim();  // to remove all the white spaces
// console.log(trimmedEmail);

const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);

console.log(email === normalizedEmail);


// replacing
const priceGB = "288,97£";
const priceUS = priceGB.replace("£", "$").replace(",", ".");
console.log(priceUS);

const announcement = "All passengers come to boarding door 23. Boarding door 23!";
console.log(announcement.replace("door", "gate"));  // Only replaced the first occurence!!!
console.log(announcement.replaceAll("door", "gate"));  // To replace all the occurences!

// Regular Expressions
console.log(announcement.replace(/door/g, "gate"));  // for all the occurences

// Methods that return booleans
const airplane = "Airbus A320neo";

console.log(airplane.includes("A320"));  // true
console.log(airplane.includes("B230"));  // false
console.log(airplane.startsWith("Air"));  // true
console.log(airplane.endsWith("neo"));  // true

if (airplane.startsWith("Airbus") && airplane.endsWith("neo")){
  console.log("Part of the NEW Airbus family");
}

// Practice exercise
const checkBaggage = function(items) {
  const baggage = items.toLowerCase();
  if(baggage.includes("knife") || baggage.includes("gun")) {
    console.log("You are not allowed on board...");
  }
  else {
    console.log("Welcome aboard!");
  }
};

checkBaggage("I have a laptop, some Food and a pocket Knife");
checkBaggage("Socks and a camera");
checkBaggage("Got some snacks and a gun for protection");


////////////////////////////////////////////////////////////////////////////////////////////////////////////
// STRINGS (PART III)
////////////////////////////////////////////////////////////////////////////////////////////////////////////

// split() a string to multiple parts based on a divider string  and join()
console.log("a+very+nice+string".split("+"));  // we get an array
console.log("Gregory Kaframanis".split(" "));

const [firstName, lastName] = "Gregory Kaframanis".split(" ");

const newName = ["Mr.", firstName, lastName.toUpperCase()].join(" ");
console.log(newName);


const capitalizeName = function(name) {
  const namesUpper = [];
  for (const namePart of name.split(" ")) {
    // namesUpper.push(namePart[0].toUpperCase() + namePart.slice(1));
    namesUpper.push(namePart.replace(namePart[0], namePart[0].toUpperCase()));
  }
  const nameCapitalized = namesUpper.join(" ");
  console.log(nameCapitalized);
};

capitalizeName("jessica ann smith davis");
capitalizeName("gregory kaframanis");

// Padding a string (adding number of characters to the string so it has the desired length)

const message = "Go to gate 23!";
console.log(message.padStart(25, "+"));  // 25 the length of the entire string.
console.log("Greg".padStart(25, "-"));

console.log(message.padStart(25, "+").padEnd(35, "+"));  // we add ten more + at the end of the string.
console.log("Greg".padStart(25, "-").padEnd(35, "-"));


// Masking a credit card
const maskCreditCard = function(number) {
  const str = number + "";  // other way to convert it to a string
  const last = str.slice(-4);
  return last.padStart(str.length, "*");

};

console.log(maskCreditCard(4555662278945621));
console.log(maskCreditCard("4859996578451235"));

// repeat method - to repeat the same string multiple times
const  message2 = "Bad weather... All Departures Delayed...\n";

console.log(message2.repeat(5));

const planesInLine = function(n) {
  console.log(`There are ${n} planes in line ${"✈️".repeat(n)}`);
};

planesInLine(5);
planesInLine(3);
planesInLine(12);


