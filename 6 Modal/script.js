"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal")
// The querySelector with multiple elements only selects the first one.
// That's why we use the querySelectorAll and we get a NodeList who acts like an array.
const btnsOpenModal = document.querySelectorAll(".show-modal");


// We use the functionality of adding and removing classes all the time
// to change the appearence of elements on our page. Classes allows us to aggregate
// multiple css properties at once. (A container with a lot of properties)
const openModal = function () {
    // We can pass multiple classes using comma.
    // The dot is ONLY for the selector.
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
}

const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};

// Event handler and event listener is pretty much the same thing.
for(let i = 0; i < btnsOpenModal.length; i++) {
    btnsOpenModal[i].addEventListener("click", openModal);
}

// If we added it () the function would be executed immediately, and not when we clicked.
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

// keyboard events are global events because they don't happen to a specific element.
// Three types of events for the keyboard: keydown, keypress or keyup
// Which key was pressed is gonna be stored in the event that is gonna occur as soon as any key is pressed.
// As soon as any key pressed a keydown event is generated and our handler function is waiting for that event to happen.
// Anytime an event like this occurs, JS generates an object, and that object contains all the information about the
// event itself and we can access that object in the event handler function. The handler function
// is called with the event as argument. We don't call the function, WE JUST DEFINE IT!!!
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden"))
        closeModal();
});
