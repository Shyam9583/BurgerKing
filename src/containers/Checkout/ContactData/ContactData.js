import React, { Component } from "react";
import Button from "../../../UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../UI/Spinner/Spinner";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
    loading: false,
  };

  startLoading = () => {
    this.setState({ loading: true });
  };

  stopLoading = () => {
    this.setState({ loading: false });
  };

  orderHandler = (event) => {
    event.preventDefault();
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: "Shyam Sahoo",
        address: {
          street: "Sector 19",
          zipCode: "769005",
          country: "India",
        },
        email: "strikerallin1@gmail.com",
      },
      deliveryMethod: "fastest",
    };
    this.startLoading();
    axios
      .post("/orders.json", order)
      .then(() => {
        this.stopLoading();
        this.props.history.replace("/");
      })
      .catch((error) => {
        console.log(error);
        this.stopLoading();
      });
  };

  render() {
    let form = (
      <form>
        <input type="text" name="name" placeholder="Your Name" />
        <input type="email" name="email" placeholder="Your Email" />
        <input type="text" name="street" placeholder="Street" />
        <input type="text" name="postalCode" placeholder="Postal Code" />
        <Button buttonType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
