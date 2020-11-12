import React, { Component } from "react";
import axios from "../../axios-orders";
import Order from "./Order/Order";
import Spinner from "../../UI/Spinner/Spinner";

class Orders extends Component {
  state = {
    orders: [],
    loading: false,
  };

  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get("orders.json")
      .then((result) => {
        this.setState({ loading: false });
        const orders = [];
        for (let key in result.data) {
          orders.push({ id: key, ...result.data[key] });
        }
        this.setState({ orders: orders });
      })
      .catch((error) => {
        this.setState({ loading: false });
        console.log(error);
      });
  }
  render() {
    const orders = this.state.loading ? (
      <Spinner />
    ) : (
      this.state.orders.map((order) => (
        <Order
          ingredients={order.ingredients}
          price={order.price}
          key={order.id}
        />
      ))
    );
    return <div>{orders}</div>;
  }
}

export default Orders;
