const person = {
  name: "John Doe",
  age: 42,
  nationality: "American",
};

type TPerson = typeof person;
type Keys = keyof typeof person;
type Values = TPerson[Keys];

const personProxy = new Proxy(person, {
  get: (obj: TPerson, prop: keyof TPerson) => {
    console.log(`The value of ${prop} is ${obj[prop]}`);
  },
  set: (obj: TPerson, prop: keyof TPerson, value: Values) => {
    console.log(`Changed ${prop} from ${obj[prop]} to ${value}`);
    return Reflect.set(obj, prop, value);
  },
});

personProxy.name;
personProxy.age = 43;
personProxy.name = "Jane Doe";
