/*
    PROJECT PLANNING
    Planning Steps:
    1. User Stories (Description of the app's functionality from the user's perspective. All user stories put together describe the entire app)
    Common format: As a [type of user], I want [an action] so that [a benefit].
    2. Features (What we will need)
    3. Flowchart (What we will build)
    4. Architecture (How we will build it)
    Development Step
*/

"use strict";

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

////////////////////////////////////////////////////////////////////////////////////////////////////////
// GEOLOCATION API (a modern browser API)
////////////////////////////////////////////////////////////////////////////////////////////////////////

class Workout {
  date = new Date();
  // convert the date to string and take the last 10 characters
  id = (Date.now() + "").slice(-10);

  constructor(coords, distance, duration) {
    this.coords = coords;
    this.distance = distance; // in km
    this.duration = duration; // in min
  }

  _setDescription() {
    // prettier-ignore
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }
}

class Running extends Workout {
  type = "running";

  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
  }

  calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = "cycling";

  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDescription();
  }

  calcSpeed() {
    // km / h
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

////////////////////////////////////////////////////////////////////////////////////
// APPLICATION ARCHITECTURE
////////////////////////////////////////////////////////////////////////////////////

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

class App {
  // private instance properties
  #map;
  #mapZoomLevel = 13;
  #mapEvent;
  #workouts = [];

  constructor() {
    // Get user's position
    this._getPosition();
    // We want to load the data from the local storage
    this._getLocalStorage();
    // Attach event handlers
    // Without the bind the this keyword points to the form.
    form.addEventListener("submit", this._newWorkout.bind(this));

    inputType.addEventListener("change", this._toggleElevationField.bind(this));

    containerWorkouts.addEventListener("click", this._moveToPopup.bind(this));
  }

  _getPosition() {
    // The navigator object contains information about the browser.
    if (navigator.geolocation)
      // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
      // https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPosition
      navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), () => alert("Could not get your position"));
  }

  _loadMap(position) {
    // It's called in _getPosition() as a regular function, so the this keyword is undefined, so we use this._loadMap.bind(this)
    const { latitude } = position.coords;
    const { longitude } = position.coords;

    // DISPLAYING A MAP USING LEAFLET LIBRARY
    // Any variable that is global to a script it's available to any other script that appears after that script.
    // We need an element with the id of map to at the L.map.
    // 13 is the value of the zoom. Bigger the number ---> more zoomed in.
    this.#map = L.map("map").setView([latitude, longitude], this.#mapZoomLevel);

    L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    L.marker([latitude, longitude]).addTo(this.#map).bindPopup("Your current location!").openPopup();

    // This method comes from the Leaflet library, that will use as event listener
    // Handling clicks on map
    // Without the bind the this keyword is attached to the map.
    this.#map.on("click", this._showForm.bind(this));

    // We call this method here when the map has already been loaded, and not at the beginning!!!
    this.#workouts.forEach(workout => {
      this._renderWorkoutMarker(workout);
    });

  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    // When we click on the map the form is shown
    form.classList.remove("hidden");
    inputDistance.focus();
  }

  _hideForm() {
    // Empty inputs
    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = "";
    form.style.display = "none";
    form.classList.add("hidden");
    setTimeout(() => form.style.display = "grid", 1000);
  }

  _toggleElevationField() {
    inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
    inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
  }

  _newWorkout(e) {
    // Check the input to be a number and also positive
    const validInputs = (...inputs) => inputs.every((input) => Number.isFinite(input));
    const allPositive = (...inputs) => inputs.every((input) => input > 0);

    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    e.preventDefault();

    // Get the data from the form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;

    // If activity is running, create a running object
    if (type === "running") {
      const cadence = +inputCadence.value;
      // Check if the data is valid
      if (!validInputs(distance, duration, cadence) || !allPositive(distance, duration, cadence))
        return alert("Inputs have to positive numbers!");

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    // If workout is cycling, create a cycling object
    if (type === "cycling") {
      const elevation = +inputElevation.value;
      // Check if the data is valid
      if (!validInputs(distance, duration, elevation) || !allPositive(distance, duration))
        return alert("Inputs have to positive numbers!");

      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    // Add the new object to the workout array
    this.#workouts.push(workout);

    // Render workout on map as marker
    this._renderWorkoutMarker(workout);

    
    // Render workout on list
    this._renderWorkout(workout);
    
    // Hide form and clear the input fields of the form
    this._hideForm();

    // Set local storage to all workouts
    this._setLocalStorage();
  }


  _renderWorkoutMarker(workout) {
    let emoji;
    workout.type === "running" ? (emoji = "🏃‍♂️") : (emoji = "🚴");
    // Display the marker | the mapEvent comes from when we click the on the map (mapEvent = mapE)
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(`${emoji} ${workout.description}`)
      .openPopup();
  }

  _renderWorkout(workout) {
    let html = `
      <li class="workout workout--${workout.type}" data-id="${workout.id}">
        <h2 class="workout__title">${workout.description}</h2>
        <div class="workout__details">
          <span class="workout__icon">${workout.type === "running" ? "🏃‍♂️" : "🚴"}‍</span>
          <span class="workout__value">${workout.distance}</span>
          <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${workout.duration}</span>
          <span class="workout__unit">min</span>
        </div>
    `;

    if (workout.type === "running") {
      html += `
          <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace.toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>
      </li>
      `;
    }
    if (workout.type === "cycling") {
      html += `
          <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed.toFixed(1)}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevationGain}</span>
            <span class="workout__unit">m</span>
          </div>
       </li>
      `;
    }

    form.insertAdjacentHTML("afterend", html);
  }

  _moveToPopup(e) {
    const workoutEl = e.target.closest(".workout");
    // We will use the id of the element to find it to the workouts array
    if(!workoutEl) return;

    const workout = this.#workouts.find(workout => workout.id === workoutEl.dataset.id);

    // Leaflet method
    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1
      },
    });
  }

  _setLocalStorage() {
    // We will use the local storage API | it's key value item
    // Only to be used for small amounts of data, because it's blocking
    // Application tab --> Local Storage
    // When we converted the objects to strings and then back at _getLocalStorage() we lost the prototype chain!
    // We now have just regular objects.
    localStorage.setItem("workouts", JSON.stringify(this.#workouts));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem("workouts"));

    if(!data) return; 

    this.#workouts = data;

    this.#workouts.forEach(workout => {
      this._renderWorkout(workout);
    });
  }

  reset() {
    // Remove the local items from local storage
    localStorage.removeItem("workouts");
    // location is a big object that contains methods of the browser.
    location.reload();
  }
}

const app = new App();
