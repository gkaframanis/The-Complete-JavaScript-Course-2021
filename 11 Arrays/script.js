'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


//////////////////////////////////////////////////////////////////////////////////////////////
// SIMPLE ARRAY METHODS
//////////////////////////////////////////////////////////////////////////////////////////////

// let arr = ["a", "b", "c", "d", "e"];

// // slice method (without changing the original array)
// console.log(arr.slice(2));  // start at position 2 till the end
// console.log(arr.slice(2, 4)); // the end parameter in NOT included
// console.log(arr.slice(-2));  // starts from the end
// console.log(arr.slice(-1));  // the last element of the array
// console.log(arr.slice(1, -2));  // b, c

// // to create a shallow copy!!!!!
// console.log(arr.slice());  // if we want to chain multiple methods
// console.log([...arr]); // the exact same result

// // splice method (it mutates - changes the original array)
// // console.log(arr.splice(2));
// console.log(arr); // The extracted elements are gone from the original array

// // usually we are interested in this method when we want to delete an element.
// arr.splice(-1);
// arr.splice(1, 2);  // the second parameter is the number of elements we want to delete
// console.log(arr);

// // reverse method (it mutates the original array)
// arr = ["a", "b", "c", "d", "e"];
// const arr2 = ["j", "i", "h", "g", "f"];
// console.log(arr2.reverse());
// console.log(arr2);

// // concat method (it doesn't mutate the original array)
// const letters = arr.concat(arr2);
// console.log(letters);
// console.log([...arr, ...arr2]); // the same thing

// // join method
// console.log(letters.join("-")); // The result is a string


/////////////////////////////////////////////////////////////////////////////////////////
// forEach() method | it passes the current element, the index and the entire array
/////////////////////////////////////////////////////////////////////////////////////////

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // for (const movement of movements) {
// for (const [i, movement] of movements.entries()) {
//   if(movement > 0) {
//     console.log(`Movement ${i + 1}: You deposited ${movement}`);
//   } else {
//     console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
//   }
// }

// console.log("----------------------------------- forEach ---------------------------------------------");
// // You cannot use break and continue with forEach.
// movements.forEach((mov, i, arr) => {   // forEach(function(mov, i, arr) {})
//   if(mov > 0) {
//     console.log(`Movement ${i + 1}: You deposited ${mov}`);
//   } else {
//     console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
//   }
// });

/////////////////////////////////////////////////////////////////////////////////////////
// forEach() method with maps and sets
/////////////////////////////////////////////////////////////////////////////////////////

// // Map
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);


// currencies.forEach((value, key, map) => {
//   console.log(`${key}: ${value}`);
// });
// // Set
// const currenciesUnique = new Set(["USD", "GBP", "USD", "EUR", "EUR"]);
// console.log(currenciesUnique);
// currenciesUnique.forEach((value, _, set) => {  // key or index doesn't have meaning in sets!
//   console.log(`${value}: ${value}`);
// });


//////////////////////////////////////////////////////////////////////////////////////////////
// map, filter, reduce array methods (to create new arrays by transforming other arrays)
// We can chain these methods all together, which is impossible with for loop.
//////////////////////////////////////////////////////////////////////////////////////////////

// map() method similar to forEach but it creates a brand new array based on the original array.

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300]; // we will try to convert them to US dollars
const eurToUsd = 1.1;

// The modern way
const movementsUSD = movements.map(mov => mov * eurToUsd); // movements.map(function(mov) { return mov * eurToUsd; }) | (mov, i, arr)
console.log(movements);
console.log(movementsUSD);

// The same with for of
const movementsUSDfor = [];
for(const mov of movements) {
  movementsUSDfor.push(mov * eurToUsd);
}
console.log(movementsUSDfor);

// With the map method we also have access to the index and the whole array.
// Each time the map() calls the callback function for each element of the array.
const movementsDescriptions = movements.map((mov, i) => `Movement ${i + 1}: You ${mov > 0 ? "deposited" : "withdrew"} ${Math.abs(mov)}`);
console.log(movementsDescriptions);


// filter() method filters for elements in the original array that satisfy a specified condition and returns a new array.
// The trick is to return a boolean.
const deposits = movements.filter(mov => mov > 0);  // (mov, i, arr)
console.log(deposits);

const depositsFor = [];
// The same with for of
for(const mov of movements) {
  if (mov > 0) {
    depositsFor.push(mov);
  }
}
console.log(depositsFor);

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);


// reduce() method "reduces" all array elements down to one single value (e.g. adding all elements together)
// acc + current (acc: accumulator) | the snowball effect

console.log(`Movements: ${movements}`);

// (accumulator, currentElement, index, array) | accumulator is like a snowball
// const balance = movements.reduce((balance, mov, i, arr) => {
//   console.log(`Iteration ${i}: ${balance}`);
//   return balance + mov;
// }, 0);  // The 2nd argument, zero in this case, is the initial value of the accumulator

const balance = movements.reduce((acc, cur) => acc + cur, 0);
console.log(`Total Balance: ${balance}`);  

let balance2 = 0;
// The same with for of
for (const mov of movements) balance2 += mov;
console.log(`Total Balance with for of: ${balance2}`);

// Maximum value of movements
const maxMovement = movements.reduce((acc, mov) => acc < mov ? acc = mov : acc = acc, movements[0]);
console.log(maxMovement);


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// THE MAGIC OF CHAINING METHODS
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// PIPELINE
// Take the total sum of deposits in US dollars.
// We can inspect the array each method is using with the the third parameter of the callback function array from the (currentElement, index, array).
const totalDepositsUSD = movements.filter(mov => mov > 0).map(mov => mov * eurToUsd).reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// find() - Retrieve an element from an array based on a condition
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Needs a callback function that returns a boolean.
// Returns the first element in the array that satisfies the condition.
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);  // an array of objects

const account = accounts.find(acc => acc.owner === "Jessica Davis");
console.log(account);


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// findIndex() - Returns the index of the found element
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// To delete an element of an array

movements.splice(movements.findIndex(mov => mov === 70), 1);

console.log(movements);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// some and every methods
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

console.log(movements);
// Checks for equality
console.log(movements.includes(-130));  

// SOME: CONDITION
// What if we want to check for a condition (any value that meets the condition)
const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits); // true

// EVERY: CONDITION
// If all the elements in the array satisfy the condition that we pass in.
console.log(movements.every(mov => mov > 0));  // false
console.log(account4.movements.every(mov => mov > 0));  // true

// Separate callback
const deposit = mov => mov > 0;
console.log(movements.some(deposit));  // true
console.log(movements.every(deposit));  // false
console.log(movements.filter(deposit)); 

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// flat() and flatMap() methods
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat()); // We get a full array, by removing the nested arrays

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2));  // It contains the two inner arrays, flat goes 1 level deep | we can use the depth argument

// const accountMovements = accounts.map(acc => acc.movements);
// console.log(accountMovements);

// const allMovements = accountMovements.flat();
// console.log(allMovements);

// const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
// console.log(overallBalance);


// Pretty common to use map() and then flat() | flatMap() combines the two of them
const overallBalance = accounts.map(acc => acc.movements).flat().reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);

// flatMap()  | it only goes one level deep and we cannot change it. For deeper that 1 level we need to use flat.
const overallBalance2 = accounts.flatMap(acc => acc.movements).reduce((acc, mov) => acc + mov, 0);  
console.log(overallBalance2);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SORTING ARRAYS: sort()
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Array of strings
const owners = ["Greg", "Zach", "Adam", "Martha"];
console.log(owners.sort()); // It mutates the original array!!!

// Array of numbers
console.log(movements);
console.log(movements.sort());  // the result is not what we expect | sort makes the sorting based on strings, it converts the numbers first to strings.

// How to fix the above!!! (a is the current value and b the next one)
// If compareFunction(a, b) returns less than 0, leave a and b unchanged.
// If compareFunction(a, b) returns 0, leave a and b unchanged with respect to each other, but sorted with respect to all different elements.
// If compareFunction(a, b) returns greater than 0, sort b before a.

// ascending order (small to large)
// movements.sort((a, b) => {
//   if (a > b)
//     return 1;
//   if (a < b)
//     return -1;
// });

// movements.sort((a, b) => a > b ? 1 : -1);
movements.sort((a, b) => a - b);
console.log(movements);

// descending order
// movements.sort((a, b) => a > b ? -1 : 1);
movements.sort((a, b) => b - a);
console.log(movements);


////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CREATING AND FILLING ARRAYS
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const array = [1, 2, 3, 4, 5, 6, 7];

// EMPTY ARRAYS + FILL METHOD
// Generating them programmatically
const x = new Array(7); // It creates an empty array with length 7!
console.log(x);

// We can only call the fill() method to empty array. It mutates the original array.
// x.fill(0);
x.fill(1, 3, 5);  // value, begin and end parameter | the end parameter is not included
console.log(x);

array.fill(23, 2, 6);
console.log(array);

// Array.from() | we are using the from() on the constructor
const y = Array.from({length: 7}, () => 1);  // An array with 7 ones in the array positions.
console.log(y);

const z = Array.from({length: 7}, (_, i) => i + 1);  // An array with elements from 1 to 7.
console.log(z);


// querySelectorAll() returns a nodeList. To use the array methods we need to convert the nodelist to an array using Array.from(),
// or use the spread operator to the result of the querySelectorAll(), but we would have to do the mapping seperately.

