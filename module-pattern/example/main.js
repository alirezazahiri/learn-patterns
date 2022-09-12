const button = document.getElementById("btn");

button.addEventListener("click", () => {
  import("./math.js").then((module) => {
    console.log("Add: ", module.add(1, 2));
    console.log("Multiply: ", module.multiply(1, 2));

    const button = document.getElementById("btn");
    button.innerHTML = "Check the console";
  });
});

