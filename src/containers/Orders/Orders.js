import React, { Component } from "react";
import Order from "./Order/Order";
import Spinner from "../../UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";

class Orders extends Component {
  componentDidMount() {
    this.props.onSetLoading(true);
    this.props.onFetchPrevOrders();
  }
  render() {
    const orders = this.props.loading ? (
      <Spinner />
    ) : (
      this.props.prevOrders.map((order) => (
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

const stateToProps = (state) => {
  return {
    prevOrders: state.order.prevOrders,
    loading: state.order.purchasing,
  };
};

const dispatchToProps = (dispatch) => {
  return {
    onFetchPrevOrders: () => dispatch(actions.fetchPrevOrders()),
    onSetLoading: (loading) => dispatch(actions.setPurchasing(loading)),
  };
};

export default connect(stateToProps, dispatchToProps)(Orders);
