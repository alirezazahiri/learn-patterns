# **_Observer Pattern_**

> Use observables to notify subscribers when an event occurs

With the observer pattern, we can subscribe certain objects, the observers, to
another object, called the observable. Whenever an event occurs, the
observable notifies all its observers!

An observable object usually contains 3 important parts:

- <b>observers</b>: an array of observers that will get notified whenever a specific
  event occurs

- `subscribe()`: a method in order to add observers to the observers list

- `unsubscribe()`: a method in order to remove observers from the
  observers list

- `notify()`: a method to notify all observers whenever a specific event
  occurs

Perfect, let’s create an observable! An easy way of creating one, is by using
an ES6 class

```ts
class Observable {
  private observers: any[];
  constructor() {
    this.observers = [];
  }

  subscribe(func) {
    this.observers.push(func);
  }

  unsubscribe(func) {
    this.observers = this.observers.filter((observer) => observer !== func);
  }

  notify(data) {
    this.observers.forEach((observer) => observer(data));
  }
}
```

Awesome! We can now add observers to the list of observers with the
subscribe method, remove the observers with the unsubscribe method, and
notify all subscribes with the notify method.

Let’s build something with this observable. We have a very basic app that only
consists of two components: a Button, and a `Switch`.

```jsx
export default function App() {
  return (
    <div className="App">
      <Button>Click me!</Button>
      <FormControlLabel control={<Switch />} />
    </div>
  );
}
```

We want to keep track of the user interaction with the application. Whenever a
user either clicks the button or toggles the switch, we want to log this event
with the timestamp. Besides logging it, we also want to create a toast
notification that shows up whenever an event occurs!

Whenever the user invokes the `handleClick` or `handleToggle` function, the
functions invoke the notify method on the observer. The notify method notifies
all subscribers with the data that was passed by
the `handleClick` or `handleToggle` function!

First, let's create the `logger` and `toastify` functions. These functions will
eventually receive data from the notify method.

```jsx
import { ToastContainer, toast } from "react-toastify";

function logger(data) {
  console.log(`${Date.now()} ${data}`);
}

function toastify(data) {
  toast(data);
}

export default function App() {
  return (
    <div className="App">
      <Button>Click me!</Button>
      <FormControlLabel control={<Switch />} />
      <ToastContainer />
    </div>
  );
}
```

Currently, the `logger` and `toastify` functions are unaware of observable:
the observable can't notify them yet! In order to make them observers, we’d
have to subscribe them, using the subscribe method on the observable!

```jsx
import { ToastContainer, toast } from "react-toastify";

function logger(data) {
  console.log(`${Date.now()} ${data}`);
}

function toastify(data) {
  toast(data);
}

observable.subscribe(logger);
observable.subscribe(toastify);

export default function App() {
  return (
    <div className="App">
      <Button>Click me!</Button>
      <FormControlLabel control={<Switch />} />
      <ToastContainer />
    </div>
  );
}
```

Whenever an event occurs, the logger and toastify functions will get
notified. Now we just need to implement the functions that actually notify the
observable: the handleClick and handleToggle functions! These functions
should invoke the notify method on the observable, and pass the data that the
observers should receive.

```jsx
import { ToastContainer, toast } from "react-toastify";

function logger(data) {
  console.log(`${Date.now()} ${data}`);
}

function toastify(data) {
  toast(data);
}

observable.subscribe(logger);
observable.subscribe(toastify);

export default function App() {
  function handleClick() {
    observable.notify("User clicked button!");
  }

  function handleToggle() {
    observable.notify("User toggled switch!");
  }
  return (
    <div className="App">
      <Button>Click me!</Button>
      <FormControlLabel control={<Switch />} />
      <ToastContainer />
    </div>
  );
}
```

Awesome! We just finished the entire flow: handleClick and handleToggle
invoke the notify method on the observer with the data, after which the
observer notifies the subscribers: the logger and toastify functions in this
case.

Whenever a user interacts with either of the components, both the logger and
the toastify functions will get notified with the data that we passed to
the notify method!

```ts
class Observable {
  private observers: any[];
  constructor() {
    this.observers = [];
  }

  subscribe(func) {
    this.observers.push(func);
  }

  unsubscribe(func) {
    this.observers = this.observers.filter((observer) => observer !== func);
  }

  notify(data) {
    this.observers.forEach((observer) => observer(data));
  }
}

export default new Observable();
```

```tsx
import React from "react";
import { Button, Switch, FormControlLabel } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import observable from "./observable";

function handleClick() {
  observable.notify("User clicked button!");
}

function handleToggle() {
  observable.notify("User toggled switch!");
}

function logger(data) {
  console.log(`${Date.now()} ${data}`);
}

function toastify(data) {
  toast(data, {
    position: toast.POSITION_BOTTOM_RIGHT,
    closeButton: false,
    autoClose: 2000,
  });
}

export default function App() {
  return (
    <div className="App">
      <Button variant="contained" onClick={handleClick}>
        Click me!
      </Button>
      <FormControlLabel
        control={<Switch name="" onChange={handleToggle} />}
        label="Toggle me!"
      />
      <ToastContainer />
    </div>
  );
}
```

Although we can use the observer pattern in many ways, it can be very useful
when working with asynchronous, event-based data. Maybe you want certain
components to get notified whenever certain data has finished downloading,
or whenever users sent new messages to a message board and all other
members should get notified.

<hr>

## Benefits

Using the observer pattern is a great way to enforce separation of
concerns and the single-responsiblity principle. The observer objects aren’t
tightly coupled to the observable object, and can be (de)coupled at any time.
The observable object is responsible for monitoring the events, while the
observers simply handle the received data.

## Disadvantages

If an observer becomes too complex, it may cause performance issues when
notifying all subscribers.

## Case Study

A popular library that uses the observable pattern is _RxJS_.

_ReactiveX_ combines the _Observer pattern_ with the _Iterator pattern_ and
functional programming with collections to fill the need for an ideal way of
managing sequences of events. - _RxJS_

With RxJS, we can create observables and subscribe to certain events! Let’s
look at an example that’s covered in their documentation, which logs whether
a user was dragging in the document or not.

```js
import React from "react";
import ReactDOM from "react-dom";
import { fromEvent, merge } from "rxjs";
import { sample, mapTo } from "rxjs/operators";

import "./styles.css";

merge(
  fromEvent(document, "mousedown").pipe(mapTo(false)),
  fromEvent(document, "mousemove").pipe(mapTo(true))
)
  .pipe(sample(fromEvent(document, "mouseup")))
  .subscribe((isDragging) => {
    console.log("Were you dragging?", isDragging);
  });

ReactDOM.render(
  <div className="App">Click or drag anywhere and check the console!</div>,
  document.getElementById("root")
);
```
