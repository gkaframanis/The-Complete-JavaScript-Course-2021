"use strict";

///////////////////////////////////////////////////////////////////////////////////////////////////////
// CONSTRUCTOR FUNCTIONS AND THE NEW OPERATOR
///////////////////////////////////////////////////////////////////////////////////////////////////////

// // The constructor function is a normal function we use with the new operator (simulates a class)
// // The convention is the constructor function to start with capital letter
// // The convention is the properties to have the same name as the parameters.
// const Person = function (firstName, birthYear) {
//   // Instance properties
//   this.firstName = firstName;
//   this.birthYear = birthYear;

//   // // Never do this!!! Terrible for the performance if each instance has a copy of the function.
//   // this.calcAge = function() {
//   //     console.log(2037 - this.birthYear);
//   // };
// };

// /*
// The steps that happen when we call the constructor function with the new keyword:
//  1. A new empty {} is created.
//  2. The function is called, the this keyword is assigned to this new object that was created.
//  3. This new object is linked to the constructor function prototype.
//  4. The object that was created is returned by the constructor.
// */

// const gregory = new Person("Gregory", 1986);
// console.log(gregory);

// const matilda = new Person("Matilda", 2017);
// const jack = new Person("Jack", 1975);
// console.log(matilda, jack);

// // To check if something is an instance of a constructor function
// console.log(gregory instanceof Person);

///////////////////////////////////////////////////////////////////////////////////////////////////
// PROTOTYPES
///////////////////////////////////////////////////////////////////////////////////////////////////

// // Each and every function in js has a property named prototype.

// // Add a method to the prototype. Each object has created by this constructor function has access to the prototype and to the methods.
// // Now we will have only one copy of the function!
// console.log(Person.prototype);

// Person.prototype.calcAge = function () {
//   console.log(2037 - this.birthYear);
// };

// // We have access to it due to prototypal inheritance.
// // Any object always has access to the methods and properties of its prototype. (Person.prototype)
// gregory.calcAge();
// matilda.calcAge();

// console.log(gregory.__proto__); // The prototype of gregory object | thanks to the step number 3.
// // Person.prototype is not the prototype of the Person but it's the prototype of all the objects that are created with Person constructor function!
// console.log(gregory.__proto__ === Person.prototype); // true
// console.log(Person.prototype.isPrototypeOf(gregory)); // true
// console.log(Person.prototype.isPrototypeOf(Person)); // false

// // species it's not their own properties
// Person.prototype.species = "Homo Sapiens";
// console.log(gregory.species, matilda.species);

// console.log(gregory.hasOwnProperty("firstName")); // true
// console.log(gregory.hasOwnProperty("species")); // false

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PROTOTYPAL INHERITANCE AND THE PROTOTYPE CHAIN
////////////////////////////////////////////////////////////////////////////////////////////////////////////

// console.log(gregory.__proto__);
// console.log(gregory.__proto__.__proto__); // the Object.prototype because of the prototype chain (top of the prototype chain)
// console.log(gregory.__proto__.__proto__.__proto__); // null

// console.dir(Person.prototype.constructor);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PROTOTYPAL INHERITANCE ON BUILT-IN OBJECTS
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const arr = [3, 6, 4, 5, 6, 9, 3, 9, 3]; // new Array === []
// console.log(arr.__proto__); // Array.prototype
// console.log(arr.__proto__ === Array.prototype); // true
// console.log(arr.__proto__.__proto__); // Object.prototype

// // We added a new method to the Array.prototype | BAD IDEA TO DO THIS!!!
// Array.prototype.unique = function () {
//   return [...new Set(this)];
// };

// console.log(arr.unique());

// const h1 = document.querySelector("h1");

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ES6 CLASSES (behind the scenes are functions)
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// // class expression
// // const PersonCl = class {};

// // class declaration
// class PersonCl {
//   // The name MUST be constructor
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }

//   // Instance methods
//   // The methods will be added at the prototype property of the class.
//   // Just like before, prototypal inheritance
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   }

//   greet() {
//     console.log(`Hey, ${this.firstName}!`);
//   }

//   get age() {
//     return 2037 - this.birthYear;
//   }

//   // Set a property that already exists!!!
//   set fullName(name) {
//     if (name.includes(" ")) this._fullName = name;
//     else alert(`${name} is not a full name!`);
//   }

//   get fullName() {
//     return this._fullName;
//   }

//   // Static method
//   static hey() {
//     console.log("Hey there 👋");
//     console.log(this);
//   }
// }

// const jessica = new PersonCl("Jessica Davis", 2000);
// console.log(jessica);
// jessica.calcAge();
// console.log(jessica.age);

// console.log(jessica.__proto__ === PersonCl.prototype); // true

// // // This will also work
// // PersonCl.prototype.greet = function() {
// //     console.log(`Hey, ${this.firstName}!`)};

// jessica.greet();

// const walter = new PersonCl("Walter White", 1965);
// console.log(walter.fullName);

// PersonCl.hey();

// /*
//     1. Classes are NOT hoisted!!! (must be declared first)
//     2. Classes are first-class citizens. (we can pass them into functions and also return them from functions)
//     3. Classes are executed in strict mode.
// */

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SETTERS AND GETTERS
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// // functions that get and set a value

// const account = {
//   owner: "gregory",
//   movements: [200, 530, 120, 300],

//   get latest() {
//     return this.movements.slice(-1).pop();
//   },

//   set latest(mov) {
//     this.movements.push(mov);
//   },
// };

// // We write it like it was a property
// console.log(account.latest);

// account.latest = 50;
// console.log(account.movements);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// STATIC METHODS
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// // Functions attached to the constructors.

// // For the constructor at the beginning
// // !!! This is NOT inherited!!!
// Person.hey = function () {
//     console.log("Hey there 👋");
//     console.log(this);  // The entire constructor function
// };

// Person.hey(); 


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// OBJECT.CREATE() [SET THE PROTOTYPE TO ANY OBJECT] 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const PersonProto = {
//     calcAge() {
//         console.log(2037 - this.birthYear);
//     },

//     // it's NOT a constructor, not new keyword is used!
//     init(firstName, birthYear) {
//         this.firstName = firstName;
//         this.birthYear = birthYear;
//     },
// };

// const steven = Object.create(PersonProto);
// steven.name = "Steven";
// steven.birthYear = 2002;
// steven.calcAge();

// console.log(steven.__proto__);  // The object PersonProto
// console.log(steven.__proto__ === PersonProto);  // true

// const sarah = Object.create(PersonProto);
// sarah.init("Sarah", 1979);
// sarah.calcAge();


///////////////////////////////////////////////////////////////////////////////////////////////////////////
// INHERITANCE BETWEEN "CLASSES": CONSTRUCTOR FUNCTIONS
///////////////////////////////////////////////////////////////////////////////////////////////////////////

// Student "class" that inherits from the Person "class"

const Person = function (firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  };

Person.prototype.calcAge = function () {
    console.log(2037 - this.birthYear);
  };

const Student = function (firstName, birthYear, course) {
    Person.call(this, firstName, birthYear);
    this.course = course;
};

// It's important to do this here at the code, before we add any new methods to the Student.prototype.
// We need to link the Student.prototype to the Person.prototype.
// Now the Student.prototype object inherits from the Person.prototype.
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function() {
    console.log(`My name is ${this.firstName} and I study ${this.course}.`);
}

const mike = new Student("Mike", 2020, "Computer Science");
console.log("Mike");
mike.introduce();
mike.calcAge();

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

console.dir(Student.prototype.constructor);  // Person because we used Object.create, so we need to fix it
Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);  // Student

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// INHERITANCE BETWEEN "CLASSES": ES6 CLASSES
///////////////////////////////////////////////////////////////////////////////////////////////////////////

class PersonCl {
    constructor(fullName, birthYear) {
      this.fullName = fullName;
      this.birthYear = birthYear;
    }

    // Instance Methods
    calcAge() {
      console.log(2037 - this.birthYear);
    }
  
    greet() {
      console.log(`Hey, ${this.firstName}!`);
    }
  
    get age() {
      return 2037 - this.birthYear;
    }
    set fullName(name) {
      if (name.includes(" ")) this._fullName = name;
      else alert(`${name} is not a full name!`);
    }
  
    get fullName() {
      return this._fullName;
    }
  
    // Static method
    static hey() {
      console.log("Hey there 👋");
      console.log(this);
    }
}

class StudentCl extends PersonCl {
    constructor(fullName, birthYear, course) {
        // The constructor function of the parent class
        // Always needs to happen first, so we can access the this keyword.
        super(fullName, birthYear);
        // If we didn't have any new property here, we wouldn't need the constructor at all at the child class.
        this.course = course;
    }

    introduce () {
        console.log(`My name is ${this.fullName} and I study ${this.course}.`);
    }

    // We overwrite the method of the parent class, this method appears first in the prototype chain.
    calcAge() {
        console.log(`I'm ${2037 - this.birthYear} years old, but as a student I feel more like ${2037 - this.birthYear + 10}!`);
    }
}

const martha =  new StudentCl("Martha Jones", 2012, "Computer Science");
martha.introduce();
martha.calcAge();

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// INHERITANCE BETWEEN "CLASSES": OBJECT.CREATE
///////////////////////////////////////////////////////////////////////////////////////////////////////////

const PersonProto = {
    calcAge() {
        console.log(2037 - this.birthYear);
    },

    // it's NOT a constructor, not new keyword is used!
    init(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    },
};

const steven = Object.create(PersonProto);

// The PersonProto is the prototype of the StudentProto (Student inherits from Person)
const StudentProto = Object.create(PersonProto);
StudentProto.init = function(firstName, birthYear, course) {
    PersonProto.init.call(this, firstName, birthYear);
    this.course = course;
};

StudentProto.introduce = function() {
    console.log(`My name is ${this.firstName} and I study ${this.course}.`);
};
// The StudentProto is the prototype of the jay object and the PersonProto is in the prototype chain for jay. 
// (jay inherits from Student and Person)
const jay = Object.create(StudentProto);
jay.init("Jay", 2010, "Computer Science");
console.log(jay);
jay.introduce();
jay.calcAge();


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ANOTHER CLASS EXAMPLE
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Account {
    // 1) Public fields (instances)
    // referencable by the this keyword
    locale = navigator.language;
    
    // 2) Private fields (instances)
    #movements = [];
    #pin;

    constructor(owner, currency, pin) {
        this.owner = owner;
        this.currency = currency;
        this.#pin = pin;
        // protected property, but the data are still accessible.
        // this._movements = [];  // This is just a convention, it's not truly private
        // this.locale = navigator.language;

        console.log(`Thanks for opening an account, ${owner}!`);
    }

    // Public interface
    getMovements() {
        return this.#movements;
    }

    deposit(val) {
        this.#movements.push(val);
        return this;
    }

    withdraw(val) {
        this.deposit(-val);
        return this;
    }

    requestLoan(val) {
        if(this._approveLoan(val)) {
            this.deposit(val);
            console.log(`Loan approaved`);
        }
        return this;
    }

    // 4) Private methods
    // #approveLoan(val) {
    _approveLoan(val) {
        return true;
    }
}

const acc1 = new Account("Gregory", "EUR", 1111);
acc1.deposit(250);
acc1.withdraw(140);
console.log(acc1);
acc1.requestLoan(1000);

// We need data encapsulation and data
console.log(acc1.getMovements());

// Class Fields (New Features to be added)
// 1. Public Fields 2. Private Fields 3. Public Methods 4. Private Methods (There is also their static version)
// static are only available for the class.

// 2) Private Fields
// console.log(acc1.#movements);  // Uncaught SyntaxError: Private field '#movements' must be declared in an enclosing class

// 4) Private Method
// acc1.#approveLoan(1000); // Uncaught SyntaxError: Private field '#movements' must be declared in an enclosing class




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CHAINING METHODS
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);
console.log(acc1.getMovements());

