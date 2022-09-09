import BlueButton from "./blueButton";
import signletonCounter from "./counter";
import RedButton from "./redButton";

const counter = signletonCounter;
const redButton = new RedButton();
const blueButton = new BlueButton();

redButton.setOnClick = counter.increment;
blueButton.setOnClick = counter.decrement;

console.log("Incrementing...");
console.log(redButton.click());
console.log(redButton.click());
console.log(redButton.click());

console.log("Decrementing...");
console.log(blueButton.click());
console.log(blueButton.click());
console.log(blueButton.click());
