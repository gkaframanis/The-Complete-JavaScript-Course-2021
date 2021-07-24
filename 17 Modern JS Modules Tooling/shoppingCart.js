// Exporting module
console.log("Exporting module");

// All top variables are private for this module. They are scoped to the current module.
const shippingCost = 10;
export const cart = [];

export const addToCart = function(product, quantity) {
    cart.push({product, quantity});
    console.log(`${quantity} ${product} added to cart.`)
};

// Export multiple things using named exports
const totalPrice = 237;
const totalQuantity = 23;

export {totalPrice, totalQuantity as tq}


// Default exports when we want to export one thing per module and we use the value.
// We can import this function with any name we want.
export default function(product, quantity) {
    cart.push({product, quantity});
    console.log(`${quantity} ${product} added to cart.`)
};


// CommonJS
// export.addToCart = function (product, quantity) {
//     cart.push({ product, quantity });
//     console.log(`${quantity} ${product} added to cart`);
// };