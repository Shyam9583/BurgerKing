import axios from "../../axios-orders";
import * as actionTypes from "./actionsTypes";

export function purchaseBurgerSuccess(id, orderData) {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    payload: {
      orderData: {
        ...orderData,
        orderId: id,
      },
    },
  };
}

export function purchaseBurgerFailed(error) {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILURE,
    payload: {
      error: error,
    },
  };
}

export function purchaseBurgerStart(orderData) {
  return (dispatch) => {
    axios
      .post("/orders.json", orderData)
      .then((response) => {
        dispatch(setPurchasing(false));
        dispatch(purchaseBurgerSuccess(response.data, orderData));
      })
      .catch((error) => {
        dispatch(setPurchasing(false));
        dispatch(purchaseBurgerFailed(error));
      });
  };
}

export function setPurchasing(purchasing) {
  return {
    type: actionTypes.SET_PURCHASING,
    payload: {
      purchasing,
    },
  };
}

export function resetOrder() {
  return {
    type: actionTypes.RESET_ORDER,
  };
}

export function setPrevOrders(orders) {
  return {
    type: actionTypes.SET_PREV_ORDERS,
    payload: {
      prevOrders: orders,
    },
  };
}

export function fetchPrevOrders() {
  return (dispatch) => {
    axios
      .get("orders.json")
      .then((result) => {
        dispatch(setPurchasing(false));
        const orders = [];
        for (let key in result.data) {
          orders.push({ id: key, ...result.data[key] });
        }
        dispatch(setPrevOrders(orders));
      })
      .catch(() => {
        dispatch(setPurchasing(false));
      });
  };
}
