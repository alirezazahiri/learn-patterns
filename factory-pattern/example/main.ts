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

// =============================================

const createObjectFromArray = ([key, value]) => ({
  [key]: value,
});

createObjectFromArray(["name", "John"]);
