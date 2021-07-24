"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// OUR FIRST AJAX CALL: XMLHTTPREQUEST
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const renderCountry = function(data, className="") {
    const html = `
        <article class="country ${className}">
            <img class="country__img" src="${data.flag}" alt="flag"/>
            <div class="country__data">
                <h3 class="country__name">${data.name}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}</p>
                <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
                <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
            </div>
        </article>
        `;

    countriesContainer.insertAdjacentHTML("beforeend", html);
    // countriesContainer.style.opacity = 1;
}

const renderError = function(msg) {
    countriesContainer.insertAdjacentText("beforeend", msg);
    // countriesContainer.style.opacity = 1;
};

/*const getCountryData = function(country) {
    // The most old school of doing AJAX
    const request = new XMLHttpRequest();
    // We need the url to make the request
    // We will use the https://restcountries.eu/ API | We want to search by country name.
    request.open("GET", `https://restcountries.eu/rest/v2/name/${country}`);
    // Now we need to send the request | this fetches the data in the background
    request.send();

    // As soon as the data arrives
    request.addEventListener("load", function () {
        // Destructuring an array and getting the first element which is an object
        const [data] = JSON.parse(this.responseText); // We get JSON data so we need to convert it
        console.log(data);

        renderCountry(data);
    });
};


// Two AJAX callings. If we reload there is a chance they will show in different order.
// They run in parallel
getCountryData("greece");
getCountryData("portugal");*/

/*// Now we will create a sequence: Based on the borders property of the first object we will create call the second one.
const getCountryAndNeighbour = function(country) {
    // AJAX call country 1
    const request = new XMLHttpRequest();
    request.open("GET", `https://restcountries.eu/rest/v2/name/${country}`);
    request.send();

    request.addEventListener("load", function () {
        const [data] = JSON.parse(this.responseText);
        console.log(data);
        // Render country 1
        renderCountry(data);

        // Get neighbour country 2
        const [neighbour] = data.borders;

        if(!neighbour) return;

        const request2 = new XMLHttpRequest();
        request2.open("GET", `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
        request2.send();

        // The country code are uniques so no array is returned.
        // Here we have nested callbacks. (callback hell: a lot of nested callbacks)
        request2.addEventListener("load", function () {
            const data2 = JSON.parse(this.responseText);

            renderCountry(data2, "neighbour");
        });
    });
};

// getCountryAndNeighbour("greece");
getCountryAndNeighbour("usa");*/

/*// Callback hell: When we want asynchronous tasks to happen in sequence.
// Code hard to understand and to maintain!!!
setTimeout(() => {
   console.log("1 second passed");
   setTimeout(() =>  {
       console.log("2 seconds passed");
       setTimeout(() =>  {
         console.log("3 seconds passed");
         setTimeout(() => {
             console.log("4 seconds passed");
         }, 1000);
       }, 1000);
   }, 1000);
}, 1000);*/


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PROMISES AND FETCH API
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*// The modern way to make a simple GET request.
// The Fetch API builds the Promise.
const request = fetch("https://restcountries.eu/rest/v2/name/greece");
// It returns a Promise
console.log(request);*/

/*const getCountryData = function (country) {
    // then() is a Promise method and there we need to pass a callback function
    // we want to be executed when the Promise is fulfilled (as soon as the result is available).
    fetch(`https://restcountries.eu/rest/v2/name/${country}`).then(function(response) {
        // The result is in the body but we can't read it.
        console.log(response);
       // The json() method is available to all the Response objects coming from the fetch method.
        // json also returns a Promise, so we need a new callback function using the then() method.
       return response.json();
    }).then(function(data) {
        console.log(data);
        renderCountry(data[0]);
    });
};*/

const getJSON = function (url, errorMsg = 'Something went wrong...') {
    return fetch(url).then(response => {
        if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

        return response.json();
    });
};


/*// We have a flat chain of promises
// then() is called when a promise is fulfilled, the catch() method when a promise is rejected
// and the finally() method is called always.
const getCountryData = function (country) {
    // Country 1
    fetch(`https://restcountries.eu/rest/v2/name/${country}`).
        then(response => {
            console.log(response);  // the response's ok property is false
            // Throwing error manually which we will be caught by the catch() method.
            if(!response.ok)
                throw new Error(`Country not found... (${response.status})`)
            return response.json()
        }).
        then(data => {
            renderCountry(data[0]);
            // const neighbour = data[0].borders[0];
            const neighbour = "dfdsdklsd";

            if(!neighbour) return;
            // Country 2
            // Always return the Promise and handle it outside the callback function by continuing the chain.
            return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
        })
        .then(response => {
            if(!response.ok)
                throw new Error(`Country not found... (${response.status})`)
            return response.json();
        })
        .then(data => renderCountry(data, "neighbour"))
        // Catches any error that occurs at any place in the promise chain. It also returns a promise.
        .catch(err => {
            console.error(`${err} 🔥 🔥 🔥`);
            renderError(`Something went wrong 🔥 🔥 🔥 ${err.message}. Try again!`);
        })
        .finally(() => {
            // Like to hide a rotating spinner when an asynchronous function loads.
            countriesContainer.style.opacity = 1;
        });
};*/


const getCountryData = function (country) {
    // Country 1
    getJSON(
        `https://restcountries.eu/rest/v2/name/${country}`,
        'Country not found'
    )
        .then(data => {
            renderCountry(data[0]);
            const [neighbour] = data[0].borders;
            if (!neighbour) throw new Error('No neighbour found!');
            // Country 2
            return getJSON(
                `https://restcountries.eu/rest/v2/alpha/${neighbour}`,
                'Country not found...'
            );
        })
        .then(data => renderCountry(data, 'neighbour'))
        .catch(err => {
            console.error(`${err} 💥💥💥`);
            renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
        })
        .finally(() => {
            countriesContainer.style.opacity = "1";
        });
};

// getCountryData("germany");

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// HANDLING REJECTED PROMISES
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// To get the error when we don't have internet connection. That's the only error for fetch to reject a promise.
// Use the catch method


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// THROWING ERRORS MANUALLY
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// When a country doesn't exist at all. // 404 error during the fetch (the promise still gets fulfilled)
/*btn.addEventListener("click", function() {
    getCountryData("dsfddsfsdf");
});*/


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CODING CHALLENGE 1
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
* PART I:
* 1. Create a function "whereAmI" which takes as inputs a latitude value (lat) and longitude value (lng).
* 2. Do "reverse geocoding" of the provided coordinates. Use this API to do reverse geocoding: https://geocode.xyz/api.
* The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API
* and promises to get the data. Do NOΤ use the getJSON function we created, that's cheating.
* 3. Once you have the data, take a look at it in the console to see all the attributes that you received about the
* provided location. Then, using this data, log a message like this to the console: 'You are in Berlin, Germany.'.
* 4. Chain a .catch method to the end of the promise chain and log errors to the console.
* 5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403.
* This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to
* reject the promise yourself, with a meaningful error message.
*
* PART II:
* 6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API
* result, and plug it into the countries API that we have been using.
* 7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code,
* no need to type the same code)
*
* TEST COORDINATES 1: 52.508, 13.381, 2: 19.037, 72.873, 3: -33.933, 18.474
* */

// const whereAmI = function(lat, lng) {
//     const API_KEY = "668667716384948627469x6235";
//     const url = `https://geocode.xyz/${lat},${lng}?json=1&auth=${API_KEY}`;
//     fetch(url).
//     then(response => {
//         if (!response.ok) throw new Error(`Problem with geocoding... (${response.status})`);
//         return response.json();
//     }).
//     then(data => {
//         console.log(`You are in ${data.city}, ${data.country}.`);

//         fetch(`https://restcountries.eu/rest/v2/name/${data.country}`).
//         then(response => {
//             if(!response.ok) throw new Error(`Country not found... (${response.status})`);
//             return response.json();
//         }).
//         then(data => {
//             renderCountry(data[0]);
//             const neighbour = data[0].borders[0];

//             if (!neighbour) throw new Error('No neighbour found!');
//             // Country 2
//             return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//         })
//         .then(response => {
//             if(!response.ok) throw new Error(`Country not found... (${response.status})`)
//             return response.json();
//         })
//         .then(data => renderCountry(data, "neighbour"))
//         .catch(error => {
//             console.log(error);
//             renderError(`Something went wrong 💥💥 ${error.message}. Try again!`);
//         })
//         .finally(() => countriesContainer.style.opacity = "1");

//     })
//     .catch(error => {
//         console.log(error);
//         renderError(`Something went wrong 💥💥 ${error.message}. Try again!`);
//     })
//     .finally(() => countriesContainer.style.opacity = "1");
// };


// btn.addEventListener("click", function() {
//     getCountryData("india");
//     // whereAmI(52.508, 13.381);
//     // whereAmI(19.037, 72.873);
//     // whereAmI(-33.933, 18.474);
// });


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// THE EVENT LOOP IN PRACTICE
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// // Any code outside callbacks will run first in sequence!!!
// console.log("Test start")  // 1st 
// // After 0 seconds this call will be put in the callback queue.
// setTimeout(() => console.log("0 seconds timer"), 0)  // 4th
// // A promise that resolves immediately (microtasks queue which has priority over the callback queue)
// Promise.resolve("Resolved promise 1").then(res => console.log(res))  // 3rd
// Promise.resolve("Resolved promise 2").then(res => {  // A microtask that takes a long time so the timer won't run after 0 seconds.
//     for (let i = 0; i < 1000000; i++) {
//     }
//     console.log(res);
// })
// console.log("Test end")  // 2nd


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BUILDING A SIMPLE PROMISE
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const lotteryPromise = new Promise(function(resolve, reject) {
    
//     console.log("Lottery draw is happening 🔮...");
//     setTimeout(() => {
//         // Executor function that contains the asynchronous behavior
//         if (Math.random() >= 0.5) {
//             // Mark the Promise as fulfilled | then()
//             resolve("You WIN 💸!");
//         }
//         else {
//             // Mark the Promise as rejected (catch())
//             reject(new Error("You lost your money 💩!"));
//         }
//     })
// });

// // We will now consume the above Promise we built
// lotteryPromise.then(res => console.log(res)).catch(err => console.log(err));


// // Promisifying | a function that returns a Promise
// // Promisifying setTimeout
// const wait = seconds => new Promise(resolve => setTimeout(resolve, seconds * 1000));

// wait(2).then(() => {
//     console.log("I waited for 2 seconds");
//     return wait(1);
// }).then(() => console.log("I waited for 1 second"))


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PROMISIFYING THE GEOLOCATION API (15. Mapty)
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//// Promisify a callback based API

// const getPosition = () => {
//     return new Promise((resolve, reject) => {
//         // navigator.geolocation.getCurrentPosition(
//         //     position => resolve(position),
//         //     err => reject(err)
//         // );

//         // The same as above | We automatically pass the position to resolve and err to reject.
//         navigator.geolocation.getCurrentPosition(resolve, reject);
//     });
// };


// getPosition().then(position => console.log(position));

// const whereAmI = () => {
//     getPosition().then(pos => {
//         const API_KEY = "668667716384948627469x6235";

//         const {latitude: lat, longitude: lng} = pos.coords;
        
//         return fetch(`https://geocode.xyz/${lat},${lng}?json=1&auth=${API_KEY}`);
//     })
//     .then(res => {
//         if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
//         return res.json();
//     })
//     .then(data => {
//         console.log(data);
//         console.log(`You are in ${data.city}, ${data.country}`);

//         return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
//     })
//     .then(res => {
//         if (!res.ok) throw new Error(`Country not found (${res.status})`);

//         return res.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(err => console.error(`${err.message} 💣`));
// };

// btn.addEventListener("click", whereAmI);


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CONSUMING PROMISES WITH ASYNC / AWAIT | Syntactic sugar for consuming the Promises.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// RETURNING VALUES FROM ASYNC FUNCTIONS
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const getPosition = () => {
    return new Promise((resolve, reject) => {
       // The same as above | We automatically pass the position to resolve and err to reject.
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};



// A function that runs in the background and is non-blocking
// When this function is done it automatically returns a Promise.
const whereAmI = async () => {
    const API_KEY = "668667716384948627469x6235";
    try {
        const position = await getPosition();
        const {latitude: lat, longitude: lng} = position.coords;
    
        const geoResponse = await fetch(`https://geocode.xyz/${lat},${lng}?json=1&auth=${API_KEY}`);
        if(!geoResponse.ok) throw new Error("Problem getting location data...")
        const geoData = await geoResponse.json();
        // We can have one or more await statements
        // After await we need a Promise and the returned value is the resolved value.
        const response = await fetch(`https://restcountries.eu/rest/v2/name/${geoData.country}`);
        if(!response) throw new Error("Problem getting country...")
        const data = await response.json();
        renderCountry(data[0])

        return `You are in ${geoData.city}, ${geoData.country}`;
    }
    catch(err) {
        console.log(`${err} 💣`);
        renderError(`Something went wrong 💣 ${err.message}`);

        // // Reject promise return from async function
        // throw err;
    }
}

console.log("1: Will get location");
// const city = whereAmI();
// console.log(city);  // We get a Promise, JavaScript doesn't know what will be returned from this function at this point.

// City is the returned value from the whereAmI async function.
// whereAmI()
//     .then(city => console.log(`2: ${city}`))
//     .catch(err => console.log(`2: ${err.meddage} 💣`))
//     .finally(() => console.log("3: Finished getting location"));

// We convert the above to use async await
// Immediately invoked functions
(async function() {
    try {
        const city =  await whereAmI();
        console.log(`2: ${city}`);
    }
    catch(err) {
        console.error(`2: ${err.message} 💣`);
    }
    console.log("3: Finished getting location");
})();


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TRY CATCH
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// try {
//     let y = 1;
//     const x = 2;
//     x = 3;
// }
// catch(err) {
//     alert(err.message)
// }


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// RUNNING PROMISES IN PARALLEL
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const get3Countries = async (country1, country2, country3) => {
    try {
        // // Running the promises in sequence here doesn't make much sense.
        // const [data1] = await getJSON(`https://restcountries.eu/rest/v2/name/${country1}`);
        // const [data2] = await getJSON(`https://restcountries.eu/rest/v2/name/${country2}`);
        // const [data3] = await getJSON(`https://restcountries.eu/rest/v2/name/${country3}`);

        // console.log([data1.capital, data2.capital, data3.capital]);


        // We can run them in parallel.
        // Promise.all() takes an array of Promises and will return a new Promise, which then run all the Promises in the array at the same time
        // and returns an array. Promise.all() shortcircuits in case one of the Promises is rejected. (Combinator function)
        const data = await Promise.all([
            getJSON(`https://restcountries.eu/rest/v2/name/${country1}`),
            getJSON(`https://restcountries.eu/rest/v2/name/${country2}`),
            getJSON(`https://restcountries.eu/rest/v2/name/${country3}`)
        ]);

        console.log(data.map(data => data[0].capital));
    } catch (err) {
        console.error(err);
    }
};

get3Countries("greece", "canada", "tanzania");


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// OTHER PROMISE COMBINATORS: RACE, ALLSETTLED AND ANY
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Promise.race | Returns an array of promises and returns a promise | It settles when a promise is settled, fulfilled or rejected.

(async function() {
    const response = await Promise.race([
        getJSON(`https://restcountries.eu/rest/v2/name/italy}`),
        getJSON(`https://restcountries.eu/rest/v2/name/egypt`),
        getJSON(`https://restcountries.eu/rest/v2/name/mexico`)
    ]);

    // A promise that gets rejected can also win the race.
    console.log(response[0]);
})();

const timeout = (seconds) => new Promise((_, reject) => setTimeout(() => reject(new Error("Request took too long!")), seconds * 1000));

Promise.race([
    getJSON(`https://restcountries.eu/rest/v2/name/${country1}`),
    timeout(1)
]).then(res => console.log(res[0])
  .catch(err => console.log(err)));


// Promise.allSettled (ES2020) | Takes an array of promises and returns an array with all the settled promises (rejected or not | never shortcircuits)
Promise.allSettled([
    Promise.resolve("Success"),
    Promise.reject("Error"),
    Promise.resolve("Another success")
]).then(res => console.log(res));


// Promise.any (ES2021) | Takes an array of promises and returns the first fulfilled promise and rejected promises are ignored.

Promise.any([
    Promise.resolve("Success"),
    Promise.reject("Error"),
    Promise.resolve("Another success")
])
    .then(res => console.log(res))
    .catch(err => console.error(err));