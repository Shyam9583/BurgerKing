import React, { Component } from "react";
import axios from "../../axios-orders";
import Order from "./Order/Order";

class Orders extends Component {
  state = {
    orders: [],
  };

  componentDidMount() {
    axios
      .get("orders.json")
      .then((result) => {
        const orders = [];
        for (let key in result.data) {
          orders.push({ id: key, ...result.data[key] });
        }
        this.setState({ orders: orders });
      })
      .catch((error) => console.log(error));
  }
  render() {
    const orders = this.state.orders.map((order) => (
      <Order
        ingredients={order.ingredients}
        price={order.price}
        key={order.id}
      />
    ));
    return <div>{orders}</div>;
  }
}

export default Orders;
