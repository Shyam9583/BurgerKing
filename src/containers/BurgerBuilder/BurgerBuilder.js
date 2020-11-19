import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OderSummary";
import axios from "../../axios-orders";
import Spinner from "../../UI/Spinner/Spinner";
import withErrorHandler from "../withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

export const DEFAULT_COST = 4;

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
  };

  componentDidMount() {
    this.props.onInitIngredients();
    this.props.onOrderReset();
  }

  dismissModal = () => {
    this.setState({ purchasing: false });
  };

  continuePurchaseHandler = () => {
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }

    queryParams.push("price=" + this.state.totalPrice);
    const queryString = queryParams.join("&");

    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    });
  };

  startLoading = () => {
    this.setState({ loading: true });
  };

  stopLoading = () => {
    this.setState({ loading: false });
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  render() {
    let content = <Spinner />;
    if (this.props.ingredients) {
      content = (
        <React.Fragment>
          <Modal show={this.state.purchasing} dismissModal={this.dismissModal}>
            {this.state.loading ? (
              <Spinner />
            ) : (
              <OrderSummary
                clicked={this.dismissModal}
                continuePurchase={this.continuePurchaseHandler}
                ingredients={this.props.ingredients}
                totalPrice={this.props.totalPrice}
              />
            )}
          </Modal>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            increased={this.props.onIngredientAdded}
            decreased={this.props.onIngredientRemoved}
            state={{
              ingredients: this.props.ingredients,
              totalPrice: this.props.totalPrice,
            }}
            ordered={this.purchaseHandler}
          />
        </React.Fragment>
      );
    }
    return <React.Fragment>{content}</React.Fragment>;
  }
}

const stateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
  };
};

const dispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingredientName) => {
      dispatch(actions.addIngredient(ingredientName));
    },
    onIngredientRemoved: (ingredientName) => {
      dispatch(actions.removeIngredient(ingredientName));
    },
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onOrderReset: () => dispatch(actions.resetOrder()),
  };
};

export default withErrorHandler(
  connect(stateToProps, dispatchToProps)(BurgerBuilder),
  axios
);
