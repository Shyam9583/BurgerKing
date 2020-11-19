import React, { Component } from "react";
import { Redirect, Route } from "react-router";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";

class Checkout extends Component {
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        {this.props.order ? <Redirect to="/" /> : null}
        <div>
          <CheckoutSummary
            ingredients={this.props.ingredients}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            exact
            render={(props) => (
              <ContactData
                totalPrice={this.props.totalPrice}
                ingredients={this.props.ingredients}
                {...props}
              />
            )}
          />
        </div>
      </div>
    );
  }
}

const stateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    order: state.order.order,
  };
};

export default connect(stateToProps)(Checkout);
