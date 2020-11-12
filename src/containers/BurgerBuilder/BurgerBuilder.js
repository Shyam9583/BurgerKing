import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OderSummary";
import axios from "../../axios-orders";
import Spinner from "../../UI/Spinner/Spinner";
import withErrorHandler from "../withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";

export const DEFAULT_COST = 4;

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
  };

  // _isMounted = false;

  // componentDidMount() {
  //   this._isMounted = true;
  //   axios
  //     .get("/ingredients.json")
  //     .then((response) => {
  //       if (this._isMounted) {
  //         this.setState({ ingredients: response.data });
  //       }
  //     })
  //     .catch((error) => console.log(error));
  // }

  // componentWillUnmount() {
  //   this._isMounted = false;
  // }

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
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
  };
};

const dispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingredientName) => {
      dispatch({
        type: actionTypes.ADD_INGREDIENT,
        payload: { ingredient: ingredientName },
      });
    },
    onIngredientRemoved: (ingredientName) => {
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        payload: { ingredient: ingredientName },
      });
    },
  };
};

export default withErrorHandler(
  connect(stateToProps, dispatchToProps)(BurgerBuilder),
  axios
);
