"use strict";

// The pop up window
const modal = document.querySelector(".modal");
// The behind of the modal.
const overlay = document.querySelector(".overlay");
// The "x" of the modal
const btnCloseModal = document.querySelector(".btn--close-modal");
// The "open account" buttons of the page | a nodelist, but it has a forEach method
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

// Click Learn more and scroll to the first section
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector("#section--1");



///////////////////////////////////////
// Modal window
///////////////////////////////////////


const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// Event listener for the open account buttons
btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

// To close the modal if it's open by pressing the escape key.
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////
// SMOOTH SCROLLING
//////////////////////////////////////////////////////////////////////////////////////////////////////

// BUTTON SCROLLING
// Click Learn more and scroll to the first section

// // THE OLD SCHOOL WAY
// btnScrollTo.addEventListener("click", (e) => {
//   // We need the coordinates of the first element we need to scroll to.
//   // getBoundingClientRect() returns a DOMRect object.
//   const s1coords = section1.getBoundingClientRect();
//   console.log(s1coords);

//   // DOMRect for the btnScrollTo (the getBoundingClientRect() is relative to the current viewport)
//   console.log(e.target.getBoundingClientRect());

//   console.log("Current scroll (X/Y)", window.pageXOffset, window.pageYOffset);

//   // To see the current width and height of the viewport.
//   console.log("width/height viewport", document.documentElement.clientWidth, document.documentElement.clientHeight);

//   // Scrolling (the top specifed here is relative to the viewport and not to the document [the top of the page])
//   // window.scrollTo(s1coords.left, s1coords.top);
//   // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset);  // current position + current scroll (not smooth)

//   // To make the animation smooth we need to specify an object with left, top and behavior properties.
//   window.scrollTo({
//     left: s1coords.left + window.pageXOffset,
//     top: s1coords.top + window.pageYOffset,
//     behavior: "smooth",
//   });
// });

// MODERN WAY
btnScrollTo.addEventListener("click", (e) => {
  section1.scrollIntoView({
    behavior: "smooth",
  })
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  EVENT DELEGATION (SMOOTH SCROLLING FOR THE NAVIGATION LINKS)
////////////////////////////////////////////////////////////////////////////////////////////////////////////

// PAGE NAVIGATION
// Create a smooth scrolling when we clink the links at the nav__links container at the navigation.

// // Returns a NodeList.
// // With using forEach is not a "clean" solution, because we create for each element a copy of the callback function adding the event listener.
// document.querySelectorAll(".nav__link").forEach(function(elem) {
//   // When we click to the buttons thanks to the anchor tags we move straight to the corresponding section.
//   // We need to prevent this default behavior.
//   elem.addEventListener("click", function(e) {
//     e.preventDefault();
//     // We get the href of the navigation links.
//     const id = this.getAttribute("href");
//     // The id looks like a selector (e.g. #section--1) so we can use it to select an element we want to scroll to.
//     document.querySelector(id).scrollIntoView({behavior: "smooth"});
//   });
// });


// A more "clean" way is to use event delegation! Also hepps when elements are not on the page on runtime, by the time loads.
// 1. WE ADD THE EVENT LISTENER TO A COMMON PARENT ELEMENT OF ALL THE ELEMENTS WE ARE INTERESTED IN!!!
// 2. DETERMINE WHICH ELEMENT ORIGINATED THE EVENT AND WORK WITH THAT ELEMENT. (e.target)
document.querySelector(".nav__links").addEventListener("click", (e) => {
  e.preventDefault();
  // Matching strategy to ignore clicks happening anywhere else, but the links.
  if(e.target.classList.contains("nav__link")){
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({behavior: "smooth"});
  }
});


///////////////////////////////////////////////////////////////////////////////////////////////////////
// TABBED COMPONENT
///////////////////////////////////////////////////////////////////////////////////////////////////////

// When you click a tab the area below changes (section--2 operations div in index.html)
const tabs = document.querySelectorAll(".operations__tab");  // NodeList
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");  // NodeList

// Adding event handlers to the buttons using event delegation
tabsContainer.addEventListener("click", e => {
  // We need the button element even if we click on the span element of the button.
  // Finds the closest parent with this class, which is the button itself when we click on the button, or the span.
  const clicked = e.target.closest(".operations__tab");

  // We also need to ignore any clicks that happen in the tabsContainer, besides these on the buttons.
  // Guard clause
  if(!clicked) return;
  
  // Remove from all the tabs the operations__tab--active
  tabs.forEach(tab => tab.classList.remove("operations__tab--active"));

  // Activate tab. We need the button clicked to be the active one.
  clicked.classList.add("operations__tab--active");

  // Activate content area
  // if(clicked.classList.contains("operations__tab")) {
  //   const id = clicked.getAttribute("data-tab");
  //   // Choose the tabContent for the clicked button.
  //   const tabContent = document.querySelector(`.operations__content--${id}`);

  //   // Remove from all the tabsContent the active state.
  //   tabsContent.forEach(tabContent => tabContent.classList.remove("operations__content--active"));

  //   // Add the active status to the tabContent.
  //   tabContent.classList.add("operations__content--active");
  // }

  // Remove active class from the content area.
  tabsContent.forEach(tabContent => tabContent.classList.remove("operations__content--active"));
  // Activate content area.
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add("operations__content--active");

});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// HOW TO PASS ARGUMENTS TO EVENT HANDLER FUNCTIONS
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Menu fade animation
// We need to include also the logo container, so we get as common parent for event delegation the nav element with class .nav.
const nav = document.querySelector(".nav");

// It can only have one real parameter, the event.
// To pass additional parameters we need the "this" keyword.
const handleHover = function(e) {
  if(e.target.classList.contains("nav__link")) {
    const link = e.target;
    // We need to select the sibling elements
    // We get the parent element and from there we select the links and the image to make it more robust.
    // The siblings contain the initial link as well.
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach(el => {
      if(el !== link) el.style.opacity = this;
    });

    logo.style.opacity = this;
  }
};

// The mouseover is similar to mouseenter, but the mouseenter DOESN'T BUBBLE!
// The opposite of mouseenter is mouseleave and the opposite of mouseover is mouseout.
// nav.addEventListener("mouseover", e => handleHover(e, 0.5));  // It expects a function

// nav.addEventListener("mouseout", e => handleHover(e, 1));

// We can use the bind method to remove the arrow functions.
// The bind method creates a copy of the function that is called on and it will set the "this" keyword
// in this function call to whatever value that we pass into bind.
// Passing "argument" into  | For multiple parameters we can pass an array or an object.
nav.addEventListener("mouseover", handleHover.bind(0.5));

nav.addEventListener("mouseout", handleHover.bind(1));


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// STICKY NAVIGATION THE SCROLL EVENT
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Sticky navigation
// // 1st way with the scroll event, but not the best one because it lacks performance.
// const initialCoords = section1.getBoundingClientRect();

// window.addEventListener("scroll", function() {
//   console.log(window.scrollY); // position from the top
//   // As soon we reach the first section, we want to make the navigation sticky.
//   window.scrollY > initialCoords.top ? nav.classList.add("sticky") : nav.classList.remove("sticky");
// });


// 2nd way: The Intersection Observer API.
// // 1. We need to create a new IntersectionObserver
// We want the nav to become sticky when the entire header is no longer visible.
const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;


const stickyNav = function(entries) {
  const [entry] = entries;
  // console.log(entry);
  !entry.isIntersecting ? nav.classList.add("sticky") : nav.classList.remove("sticky");
};


const obsHeaderOptions = {
  root: null,
  threshold: 0,
  // Is a box of eg 90px that will be applied outside of our target element.
  // A visual margin that is applied.
  rootMargin: `-${navHeight}px`,  // rem and % don't work.
};

// 2. We use the observer to observe a certain target
const headerObserver = new IntersectionObserver(stickyNav, obsHeaderOptions);
headerObserver.observe(header);


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// REVEALING ELEMENTS ON SCROLL (Reveal each section as we approach it) section--hidden to all the sections
// Remove the section--hidden class as we approach this section
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Reveal sections
const allSections = document.querySelectorAll(".section");

const revealSection = function(entries, observer) {
  const [entry] = entries;
  // The target is now important, because we use the same observer
  if(!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');

  // We can now unobserve what already happened
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function(section){
  sectionObserver.observe(section);
  // section.classList.add("section--hidden");
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LAZY LOADING IMAGES (great for performance!)
////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Lazy loading images
const imgTargets = document.querySelectorAll("img[data-src]");  // We select all the images which have the property data-src

// The observer function
const loadImg = function(entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  // Replace src with data-src at the img element
  entry.target.src = entry.target.dataset.src;
  // We also have to remove the blur filter (the lazy img class)
  // We can't remove it immediately, we need the new src image to load first and THEN remove the blur filter.
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
};

// We create a new observer
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

// We add the imgObserver to each image.
imgTargets.forEach(img => imgObserver.observe(img));




/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SLIDER COMPONENT
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const slider = document.querySelector(".slider");
  const dotContainer = document.querySelector(".dots");
  
  let curSlide = 0;
  const maxSlide = slides.length;
  
  
  // FUNCTIONS
  const createDots = function () {
    slides.forEach(function(_, i) {
      dotContainer.insertAdjacentHTML("beforeend", `<button class="dots__dot" data-slide="${i}"></button>`);
    })
    activateDot(0);
  };
  
  const activateDot = function(slide) {
    document.querySelectorAll(".dots__dot").forEach(dot => dot.classList.remove("dots__dot--active"));
    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add("dots__dot--active");
  };
  
  const goToSlide = function(slide) {
    // s: slide, i: index
    slides.forEach((s, i) => s.style.transform = `translateX(${(i - slide) * 100}%)`);
  }
  
  const init = function () {
    // 0%, 100%, 200%, 300%
    goToSlide(0);
    createDots();
  };
  
  init();
  
  const nextSlide = function() {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    }
    else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };
  
  const prevSlide = function() {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    }
    else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };
  
  // EVENT HANDLERS
  // curslide = 1: -100%, 0%, 100%, 200%
  btnRight.addEventListener("click", function() {
    nextSlide();
  });
  
  btnLeft.addEventListener("click", function() {
    prevSlide();
  });
  
  // Using the left and right keyboard arrows
  document.addEventListener("keydown", function(e) {
    if(e.key === "ArrowLeft") prevSlide();
    // We can als use short-circuiting
    e.key === "ArrowRight" && nextSlide();
  
  });
  
  // The dots
  // We will use event delegation
  dotContainer.addEventListener("click", function(e) {
    if(e.target.classList.contains("dots__dot")) {
      const slide = e.target.dataset.slide;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};

slider();

