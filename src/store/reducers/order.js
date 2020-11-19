import * as actionTypes from "../actions/actionsTypes";

const initialState = {
  purchasing: false,
  order: null,
  error: null,
  prevOrders: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return {
        ...state,
        order: action.payload.orderData,
      };
    case actionTypes.PURCHASE_BURGER_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    case actionTypes.SET_PURCHASING:
      return {
        ...state,
        purchasing: action.payload.purchasing,
      };
    case actionTypes.RESET_ORDER:
      return {
        ...state,
        order: null,
      };
    case actionTypes.SET_PREV_ORDERS:
      return {
        ...state,
        prevOrders: action.payload.prevOrders,
      };
    default:
      return state;
  }
};

export default reducer;
