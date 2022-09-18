# **_Factory Pattern_**

> Use a factory function in order to create objects

With the factory pattern we can use factory functions in order to create new
objects. A function is a factory function when it returns a new object without
the use of the `new` keyword!

Say that we need many users for our application. We can create new users
with a `firstName`, `lastName`, and email property. The factory function
adds a fullName property to the newly created object as well, which returns
the `firstName` and the `lastName`.

```ts
const createUser = ({ firstName, lastName, email }) => ({
  firstName,
  lastName,
  email,
  fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
});
```

Perfect! We can now easily create multiple users by invoking
the `createUser` function.

```ts
type TUser = {
  firstName: string;
  lastName: string;
  email: string;
};

type TCreateUser = ({ ...TUser }) => TUser & { fullName(): string };

const createUser: TCreateUser = ({ firstName, lastName, email }) => ({
  firstName,
  lastName,
  email,
  fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
});

const user1 = createUser({
  firstName: "John",
  lastName: "Doe",
  email: "john@doe.com",
});

const user2 = createUser({
  firstName: "Jane",
  lastName: "Doe",
  email: "jane@doe.com",
});

console.log(user1, user1.fullName());
console.log(user2, user2.fullName());
```

The factory pattern can be useful if we're creating relatively complex and
configurable objects. It could happen that the values of the keys and values
are dependent on a certain environment or configuration. With the factory
pattern, we can easily create new objects that contain the custom keys and
values!

```ts
const createObjectFromArray = ([key, value]) => ({
  [key]: value,
});

createObjectFromArray(["name", "John"]);
```

## Benefits

The factory pattern is useful when we have to create multiple smaller objects
that share the same properties. A factory function can easily return a custom
object depending on the current environment, or user-specific configuration.

## Disadvantages

In JavaScript, the factory pattern isn't much more than a function that returns
an object without using the new keyword. ES6 arrow functions allow us to
create small factory functions that implicitly return an object each time.

However, in many cases it may be <b>more memory efficient</b> to create new
instances instead of new objects each time.
