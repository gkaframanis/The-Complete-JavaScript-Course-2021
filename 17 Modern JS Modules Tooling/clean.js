
"strict mode";

// It only freezes the first level of the object. We can change the object values inside the list.
const budget = Object.freeze([
    { value: 250, description: "Sold old TV 📺", user: "gregory" },
    { value: -45, description: "Groceries 🥑", user: "gregory" },
    { value: 3500, description: "Monthly salary 👩‍💻", user: "gregory" },
    { value: 300, description: "Freelancing 👩‍💻", user: "gregory" },
    { value: -1100, description: "New iPhone 📱", user: "gregory" },
    { value: -20, description: "Candy 🍭", user: "matilda" },
    { value: -125, description: "Toys 🚂", user: "matilda" },
    { value: -1800, description: "New Laptop 💻", user: "gregory" },
]);

// To make the object immutable, we can no longer add new properties to this object.
const spendingLimits = Object.freeze({
    gregory: 1500,
    matilda: 100,
});

// const getLimit = (limits, user) => limits[user] ? limits[user] : 0;
const getLimit = (limits, user) => limits?.[user] ?? 0;

// Pure function
// State will be the budget object and limits the spendingLimits.
const addExpense = function (state, limits, value, description, user = "gregory") {
    // We create a new variable so we don't mutate the user data.
    const cleanUser = user.toLowerCase();

    return value <= getLimit(limits, cleanUser)  ?
        // We create a copy of the state array
        [...state, { value: -value, description, user: cleanUser }]
        : state;
        // budget.push({ value: -value, description, user: cleanUser });
};

// In real world we would use composing, instead of using the intermediate variables to store the result.
const newBudget1 = addExpense(budget, spendingLimits, 10, "Pizza 🍕");
// We use the previous budget which has been mutated.
const newBudget2 = addExpense(newBudget1, spendingLimits, 100, "Going to movies 🍿", "Matilda");
// We use the previous budget which has been mutated.
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, "Stuff", "Jay");
console.log(newBudget3);

// Pure function
// const checkExpenses = function (state, limits) {
//     return state.map(entry => entry.value < -getLimit(limits, entry.user) ? {...entry, flag: "limit"} : entry);
//     // for (const entry of budget)
//     //     if (entry.value < -getLimit(limits, entry.user)) {
//     //         entry.flag = "limit";
//     //     }
// };

// The above pure function using arrow functions.
const checkExpenses = (state, limits) => state.map(entry => entry.value < -getLimit(limits, entry.user) ? {...entry, flag: "limit"} : entry);


const finalBudget = checkExpenses(newBudget3, spendingLimits);
console.log(finalBudget);

const logBigExpenses = function (state, bigLimit) {
    const bigExpenses = state
        .filter(entry => entry.value <= -bigLimit)
        // .map(entry => entry.description.slice(-2))
        // .join(" / ");
        // The below code to replace map and join.
        .reduce((str, cur) => `${str} ${cur.description.slice(-2)} /`, "");

    return bigExpenses;

    // let output = "";

    // for (const entry of budget) 
    //     output += entry.value <= -bigLimit ? `${entry.description.slice(-2)} / ` : "";

    // output = output.slice(0, -2); // Remove last '/ '
    // console.log(output);
};

console.log(budget);
const bigExpenses = logBigExpenses(finalBudget, 500);
console.log(bigExpenses);