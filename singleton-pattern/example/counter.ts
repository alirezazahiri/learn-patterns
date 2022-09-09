let counter: number = 0;
let instance: Counter;

interface ICounter {
  getInstance(): Counter;
  getCount(): number;
  increment(): number;
  decrement(): number;
}

class Counter implements ICounter {
  constructor() {
    if (instance) {
      throw new Error("you can only create one instance!");
    }
    instance = this;
  }

  /**
   *
   * @returns the value of the instance
   */
  getInstance(): Counter {
    return this;
  }

  /**
   *
   * @returns the current value of the counter
   */
  getCount(): number {
    return counter;
  }

  /**
   * @description increments the value of the counter
   * @returns the incremented value of the counter by one
   */
  increment(): number {
    return ++counter;
  }

  /**
   * @description decrements the value of the counter
   * @returns the decremented value of the counter by one
   */
  decrement(): number {
    return --counter;
  }
}

const signletonCounter = Object.freeze(new Counter());

export default signletonCounter