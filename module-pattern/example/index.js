import {
  add as addValues,
  multiply as multiplyValues,
  subtract,
  square,
} from "./math.js";

function add(...args) {
  return args.reduce((acc, cur) => cur + acc);
} /* Error: add has already been declared */

function multiply(...args) {
  return args.reduce((acc, cur) => cur * acc);
} /* Error: multiply has already been declared */

// from math.js module
console.log(addValues(2, 3));
console.log(multiplyValues(2));
console.log(subtract(2, 3));
console.log(square(2));

// from index.js file
console.log(add(8, 9, 2, 10));
console.log(multiply(8, 9, 2, 10));
