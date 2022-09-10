class Dog {
  constructor(name) {
    this.name = name;
  }
  bark() {
    return "Woof!";
  }
}

Dog.prototype.play = () => {
  console.log("Playing now...");
};

export default Dog;
