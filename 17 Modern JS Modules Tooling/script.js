/*
   modules ==> Bundling (performance + old browsers support)  ==> Transpiling / Polyfilling
   (Babel: convertion of modern JavaScript to ES5) ==> JavaScript Bundle
   [webpack or parcel: tools for the building process (Bundling + Transpiling / Polyfilling)]
   
    Module: Reusable piece of code that encapsulates implementation details. Usually a standalone file, but it doesn't have to be.
        import - export to use things from the modules. 
        Compose software: Modules are small building blocks that we put together to build complex apps.
        Isolate components: Modules can be developedd in isolation without thinking about the entire codebase.
        Abstract code: Implement low-level code in modules and import these abstractions into other modules
        Organised code: Modules naturally lead to a more organized code
        Reuse code: Modules allow us to easily reuse the same code, even across multiple platforms.

    ES6 Modules: Modules stored in files, exactly one module per file

    ES6 Module vs Script:
    Top-level variables: Scoped to module - Global
    Default mode: Strict mode - "Sloppy mode"
    Top-level this: undefined - window
    Imports and exports: YES - NO
    HTML linking: <script type="module"> - <script>
    File downloading: Asynchronous - Synchronous
*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMPORTING MODULES
//////////////////////////////////////////////////////////////////////////////////////////////////////////

// // Importing module

// // 1st Example
// The code of the imports are executed first.
// import { addToCart, totalPrice as price, tq } from "./shoppingCart.js";
// console.log("Importing module");

// addToCart("bread", 5);
// console.log(price, tq);

// // 2nd Example
// Import everything from a module
// import * as ShoppingCart from "./shoppingCart.js";
// console.log("Importing module");

// ShoppingCart.addToCart("bread", 5);
// console.log(ShoppingCart.totalPrice, ShoppingCart.tq);

// 3rd Example
// Importing the export default from the shoppingCart module with any name we want.
import add from "./shoppingCart.js";
import { cart } from "./shoppingCart.js";
// We can also mix the imports for the named and default exports
// import add, { addToCart, totalPrice as price, tq } from "./shoppindCart.js"
add("pizza", 2);
add("bread", 5);
add("apples", 4);

// // We don't get the empty cart we exported | The import is not a copy of the value, it's a live connection.
// // IMPORTS ARE NOT A COPY OF EXPORTS!!!
console.log(cart);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// THE MODULE PATTERN | Used before the ES6
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

// // Using functions | IIFE (to create a new scope and return data once)
// const ShoppingCart2 = (function() {
//     const cart = [];
//     const shippingCost = 10;
//     const totalPrice = 237;
//     const totalQuantity = 23;

//     const addToCart = function(product, quantity) {
//         cart.push({product, quantity});
//         console.log(`${quantity} ${product} added to cart (shipping cost is ${shippingCost}).`)
//     };

//     const orderStock = function(product, quantity) {
//         cart.push({product, quantity});
//         console.log(`${quantity} ${product} ordered from supplier.`)
//     };

//     return {
//         addToCart,
//         cart,
//         totalPrice,
//         totalQuantity,
//     };
// })();

// ShoppingCart2.addToCart("apple", 4);
// ShoppingCart2.addToCart("pizza", 2);
// console.log(ShoppingCart2);
// console.log(ShoppingCart2.shippingCost);  // undefined

////////////////////////////////////////////////////////////////////////////////////////////////////
// COMMONJS MODULES | They are used in nodejs
////////////////////////////////////////////////////////////////////////////////////////////////////

// // Import
// const { addToCart } = require("./shoppingCart.js");

//////////////////////////////////////////////////////////////////////////////////////////////////////
// INTRODUCTION TO NPM (NODE PACKAGE MANAGER) | to manage our dependencies
//////////////////////////////////////////////////////////////////////////////////////////////////////

// First we need to initialize
// npm init

// Install the leaflet library and create a depedency in the package.json file and we get the node_modules folder
// npm install leaflet or npm i leaflet

// Installing lodash-es
// npm i lodash-es

// Using the cloneDeep function from the lodash-es library
// import cloneDeep from "./node_modules/lodash-es/cloneDeep.js";

// Parcel will automatically find it without having to type the entire path.
import cloneDeep from "lodash-es";

const state = {
    cart: [
        { product: "bread", quantity: 5 },
        { product: "pizza", quantity: 5 },
    ],
    user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
console.log(stateClone);

// When we change the state object
const stateDeepClone = cloneDeep(state);

state.user.loggedIn = false;
console.log(stateClone); // It is now also false

console.log(stateDeepClone); // It's still true!

// Activate it in parcel | Only parcel understands this code
// Whenever we change one of the modules, it will trigger a rebuilt but the new modified bundle will automatically
// injected to the browser without triggering a whole page reload. To maintain our state.
if (module.hot) {
    module.hot.accept();
}

// To get the node_modules folder back when you move or product or getting it using git to get back your dependencies.
// npm istall or npm i

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  BUNDLING WITH PARCEL AND NPM SCRIPTS | parcel is like webpack | It also works with all commonjs modules.
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

// It's just a tool to help us build our project | New field in package-json devDependencies
// npm install parcel --save-dev  || To use a specific version: eg. npm install parcel@2.0.0-beta.2

// To uninstall it
// npm uninstall parcel

// The goal is to bundle all 3 modules together (cloneDeep.js, shoppingCart.js and script.js)  using parcel
// npx parcel index.html

// Running locally installed packages in the cmd line with npm scripts. | Check scripts in package.json
// npm run start or npm start | The 2nd one we can use it only with "start".
// npm run build

// To install packages globally
// npm i <package> -g

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CONFIGURING BABEL AND POLYFILLING | Works with plugins and presets that we can configure.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Parcel uses automatically babel to transpile our code. Parcel transpiles ONLY syntax!!!
// Parcel makes default decisions for babel.

// For promises and array functions we need to use polyfilling.
// Polyfilling
// npm install core-js or npm i core-js
// import "core-js/stable";
// To polyfill something specific
import "core-js/stable/array/find";

// Polyfilling async functions
// npm i regenerator-runtime
import "regenerator-runtime/runtime";
