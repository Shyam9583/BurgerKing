import React, { Component } from "react";
import { Route } from "react-router";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { DEFAULT_COST } from "../BurgerBuilder/BurgerBuilder";
import ContactData from "./ContactData/ContactData";
class Checkout extends Component {
  state = {
    ingredients: {
      salad: 0,
      meat: 0,
      cheese: 0,
      bacon: 0,
    },
    totalPrice: DEFAULT_COST,
  };

  componentDidMount() {
    const ingredients = {};
    const searchString = this.props.location.search;
    const query = searchString.substring(searchString.indexOf("?") + 1);
    query.split("&").forEach((item) => {
      const position = item.indexOf("=");
      if (item.substring(0, position) === "price") {
        this.setState({ totalPrice: +item.substring(position + 1) });
      } else
        ingredients[item.substring(0, position)] = +item.substring(
          position + 1
        );
    });
    this.setState({ ingredients: ingredients });
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          exact
          render={(props) => (
            <ContactData
              totalPrice={this.state.totalPrice}
              ingredients={this.state.ingredients}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
