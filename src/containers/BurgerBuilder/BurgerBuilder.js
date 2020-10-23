import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OderSummary";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const DEFAULT_COST = 4;

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: DEFAULT_COST,
    purchasing: false,
  };

  dismissModal = () => {
    this.setState({ purchasing: false });
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  increaseIngredient = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
      [type]: updatedCount,
    };
    const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice,
    });
  };

  decreaseIngredient = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
      [type]: updatedCount,
    };
    const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice,
    });
  };

  render() {
    return (
      <React.Fragment>
        <Modal show={this.state.purchasing} dismissModal={this.dismissModal}>
          <OrderSummary
            clicked={this.dismissModal}
            ingredients={this.state.ingredients}
            totalPrice={this.state.totalPrice}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          increased={this.increaseIngredient}
          decreased={this.decreaseIngredient}
          state={this.state}
          ordered={this.purchaseHandler}
        />
      </React.Fragment>
    );
  }
}

export default BurgerBuilder;
export { DEFAULT_COST };
