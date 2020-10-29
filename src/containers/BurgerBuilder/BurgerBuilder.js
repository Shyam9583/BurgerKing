import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OderSummary';
import axios from '../../axios-orders';
import Spinner from '../../UI/Spinner/Spinner';
import withErrorHandler from '../withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const DEFAULT_COST = 4;

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: DEFAULT_COST,
    purchasing: false,
    loading: false,
  };

  componentDidMount() {
    axios.get('/ingredients.json')
    .then(response => {
      this.setState({ingredients: response.data})
    })
    .catch(error => {});
  }

  dismissModal = () => {
    this.setState({ purchasing: false });
  };

  continuePurchaseHandler = () => {
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Shyam Sahoo',
        address: {
          street: 'Sector 19',
          zipCode: '769005',
          country: 'India',
        },
        email: 'strikerallin1@gmail.com',
      },
      deliveryMethod: 'fastest',
    };
    this.startLoading();
    axios
      .post('/orders.json', order)
      .then(() => {
        this.stopLoading();
        this.dismissModal();
      })
      .catch((error) => {
        console.log(error);
        this.stopLoading();
        this.dismissModal();
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
    let content = <Spinner />;
    if(this.state.ingredients) {
      content = (<React.Fragment>
      <Modal show={this.state.purchasing} dismissModal={this.dismissModal}>
          {this.state.loading ? (
            <Spinner />
          ) : (
            <OrderSummary
              clicked={this.dismissModal}
              continuePurchase={this.continuePurchaseHandler}
              ingredients={this.state.ingredients}
              totalPrice={this.state.totalPrice}
            />
          )}
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          increased={this.increaseIngredient}
          decreased={this.decreaseIngredient}
          state={this.state}
          ordered={this.purchaseHandler}
        />
    </React.Fragment>) };
    return (
      <React.Fragment>{content}</React.Fragment>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
export { DEFAULT_COST };
