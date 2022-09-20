class Command {
  execute: Function;
  constructor(execute: Function) {
    this.execute = execute;
  }
}

function PlaceOrderCommand(order: string, id: string) {
  return new Command((orders: { order: string; id: string }[]) => {
    orders.push({ order, id });

    return `You have successfully ordered ${order} (${id})`;
  });
}

function CancelOrderCommand(id: string) {
  return new Command((orders: { order: string; id: string }[]) => {
    orders = orders.filter(
      (order: { order: string; id: string }) => order.id !== id
    );

    return `You have canceled your order ${id}`;
  });
}

function TrackOrderCommand(id: string) {
  return new Command(() => `Your order (${id}) will arrive in 20 minutes.`);
}

class OrderManager {
  orders: { order: string; id: string }[];

  constructor() {
    this.orders = [];
  }

  execute(command: Command, ...args: any[]) {
    return command.execute(this.orders, ...args);
  }

  placeOrder(order: string, id: string) {
    this.orders.push({ order, id });

    return `You have successfully ordered ${order} (${id})`;
  }

  trackOrder(id: string) {
    return `Your order (${id}) will arrive in 20 minutes.`;
  }

  cancelOrder(id: string) {
    this.orders = this.orders.filter((order) => order.id !== id);
    return `You have canceled your order ${id}`;
  }
}

const manager1 = new OrderManager();

console.log(manager1.execute(PlaceOrderCommand("Pad Thai", "1234"))); // You have successfully ordered Pad Thai (1234)
console.log(manager1.execute(TrackOrderCommand("1234"))); // Your order (1234) will arrive in 20 minutes.
console.log(manager1.execute(CancelOrderCommand("1234"))); // You have canceled your order 1234

console.log("================================");

const manager2 = new OrderManager();

console.log(manager2.placeOrder("Pad Thai", "1234")); // You have successfully ordered Pad Thai (1234)
console.log(manager2.trackOrder("1234")); // Your order (1234) will arrive in 20 minutes.
console.log(manager2.cancelOrder("1234")); // You have canceled your order 1234
